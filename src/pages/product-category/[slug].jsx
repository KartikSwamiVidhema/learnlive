import React, { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import MetaTags from "@/components/metaTags";

import metadata from "../../components/common/metadata.json"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Star, StarHalf, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import LazyImage from "@/components/common/LazyImage";
import ProductCard from "@/components/ProductCard";
const StarRating = ({ rating }) => {
  const numericRating = parseFloat(rating) || 0;
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 !== 0;
  const emptyStars = Math.max(5 - fullStars - (hasHalfStar ? 1 : 0), 0);


  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={i + fullStars + 1} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

const MarketplaceFilter = ({ categoryData, productData }) => {
  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "true") {
      toast.success("Login successful! 🎉");
      localStorage.removeItem("loginSuccess");
    }
  }, []);
  const Products = productData.data;

  const [products, setProducts] = useState(Products);
  const [filteredProducts, setFilteredProducts] = useState(Products);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    Category: [],
    Price: [],
    Rating: [],
    Tags: [],
  });
  const [availableTags, setAvailableTags] = useState([]);
  const router = useRouter();
  const { addToCart } = useCart();
  const { slug } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  console.log(products, "productsproductsproductsproducts");

  // Calculate total pages


  // Slice the products for the current page
  const [displayedProducts, setDisplayedProducts] = useState(
    filteredProducts.slice(0, itemsPerPage)
  );

  const loadMoreProducts = () => {
    const nextProducts = filteredProducts.slice(
      displayedProducts.length,
      displayedProducts.length + itemsPerPage
    );
    setDisplayedProducts([...displayedProducts, ...nextProducts]);
  };

  // Handle pagination
  const nextPage = () => {
    console.log("test");

    if (currentPage < totalPages) {
      setLoading(true);
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setLoading(true);
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (slug && categoryData?.data) {
      const matchedCategory = categoryData.data.find(
        (item) => item.slug.toLowerCase() === slug.toLowerCase()
      );

      if (matchedCategory) {
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          Category: [matchedCategory.name], // Store as an array
        }));
      }
    }
  }, [slug, categoryData]);

  const handleFilterChange = (filterName, option, isChecked) => {
    setSelectedFilters((prevFilters) => {
      const updated = {
        ...prevFilters,
        [filterName]: isChecked
          ? [...prevFilters[filterName], option]
          : prevFilters[filterName].filter((item) => item !== option),
      };
      return updated;
    });
  };
  useEffect(() => {
    applyFilters(selectedFilters);
  }, [selectedFilters]);
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage]);
  const applyFilters = (filters) => {
    let filtered = products;

    if (filters.Category?.length > 0) {
      filtered = filtered.filter((product) =>
        product.categories.some((category) =>
          filters.Category.includes(category.name)
        )
      );
    }
    if (filters.Price?.length > 0) {
      filtered = filtered.filter((product) => {
        let productPrice = Number(product?.salePrice);
        return filters.Price.some((filterPrice) => {
          if (filterPrice === "Under $20") {
            return productPrice == null || productPrice < 20;
          } else if (filterPrice === "$20 - $50") {
            return productPrice >= 20 && productPrice <= 50;
          } else if (filterPrice === "$50 - $100") {
            return productPrice >= 50 && productPrice <= 100;
          } else if (filterPrice === "Over $100") {
            return productPrice > 100;
          } else if (filterPrice.includes("-")) {
            const [min, max] = filterPrice
              .replace("$", "")
              .split(" - ")
              .map(Number);
            return productPrice >= min && productPrice <= max;
          }
          return false;
        });
      });
    }
    if (filters.Rating?.length > 0) {
      filtered = filtered.filter((product) => {
        let productRating = Number(product?.rating);
        return filters.Rating.some((filterRating) => {
          if (filterRating === "4 stars & up") {
            return productRating >= 4;
          } else if (filterRating === "3 stars & up") {
            return productRating >= 3;
          } else if (filterRating === "2 stars & up") {
            return productRating >= 2;
          }
          return false;
        });
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const filters = [
    {
      name: "Category",
      options: categoryData?.data?.map((item) => item.name) || [],
    },
    {
      name: "Price",
      options: ["Under $20", "$20 - $50", "$50 - $100", "Over $100"],
    },
    {
      name: "Rating",
      options: ["4 stars & up", "3 stars & up", "2 stars & up"],
    },
    // { name: "Tags", options: availableTags },
  ];
  const handleNavigate = (slug) => {
    router.push(`/productdetail/${slug}`);
  };
  const seo = metadata.productcategory;


  return (
    <>

      <MetaTags
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      <div>
        <ToastContainer autoClose={3000} />


        <div>

          <div className="flex flex-col md:flex-row gap-6 mt-4 mb-4">
            {/* Left sidebar with filters */}
            <aside className=" mb-9 w-1/5 ml-6 sticky top-[100px] max-h-[calc(115vh-100px-2rem)] ">
              <Card>
                <CardHeader>
                  <CardTitle>Filters </CardTitle>
                </CardHeader>
                {/* <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" /> */}

                <CardContent>
                  <ScrollArea className="max-h-[520px] pr-2 overflow-y-auto custom-scroll">
                    {filters.map((filter, index) => (
                      <div>
                        <div key={index} className="mb-4">
                          <h3 className="font-semibold mb-2">{filter.name}</h3>

                          {filter.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center mb-2"
                            >
                              <Checkbox
                                id={`${filter.name}-${optionIndex}`}
                                checked={selectedFilters[filter.name]?.includes(
                                  option
                                )}
                                onCheckedChange={(checked) =>
                                  handleFilterChange(
                                    filter.name,
                                    option,
                                    checked
                                  )
                                }
                              />
                              <label
                                htmlFor={`${filter.name}-${optionIndex}`}
                                className="ml-2 text-sm"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                        <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </aside>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  className="md:hidden flex items-center gap-2"
                  onClick={() => setOpen(true)}
                >
                  <Filter size={18} />
                  Show Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <h2 className="text-lg font-semibold mb-2">Filters</h2>
                <ScrollArea className="max-h-[700px] pr-2 overflow-y-auto custom-scroll">
                  {filters.map((filter, index) => (
                    <div key={index}>
                      <div className="mb-4">
                        <h3 className="font-semibold mb-2">{filter.name}</h3>
                        {filter.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="flex items-center mb-2"
                          >
                            <Checkbox
                              id={`${filter.name}-${optionIndex}`}
                              checked={selectedFilters[filter.name]?.includes(
                                option
                              )}
                              onCheckedChange={(checked) =>
                                handleFilterChange(filter.name, option, checked)
                              }
                            />
                            <label
                              htmlFor={`${filter.name}-${optionIndex}`}
                              className="ml-2 text-sm"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                      <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
                    </div>
                  ))}
                  <Button onClick={() => setOpen(false)}
                    disabled={!Object.values(selectedFilters).some((arr) => arr.length > 0)}>Apply Filter</Button>
                </ScrollArea>
              </SheetContent>
            </Sheet>

            {/* Right side with product results */}
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {displayedProducts.length < filteredProducts.length && (
                <div className="flex justify-center mt-6 mb-6">
                  <Button onClick={loadMoreProducts} className="px-6 py-2">
                    Load More
                  </Button>

                </div>

              )}
            </div>
          </div>

        </div>

        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-70 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const productResponse = await axios.get(`${apiBaseUrl}/product`);

    const productData = productResponse.data || [];

    const categories = await axios.get(`${apiBaseUrl}/categories`);
    const categoryData = categories.data || [];

    return {
      props: { productData, categoryData },
    };
  } catch (error) {
    console.error("Error fetching products on server:", error);
    return { props: { productData: {}, categoryData: {} } };
  }
}

export default MarketplaceFilter;
