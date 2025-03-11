import React, { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.success("Login successful! 🎉"); // ✅ Show success message
        localStorage.removeItem("loginSuccess"); // ✅ Remove it to prevent repeated toasts
    }
}, []);
  const Products = productData.data;

  const [products, setProducts] = useState(Products);
  const [filteredProducts, setFilteredProducts] = useState(Products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    Category: [],
    Price: [],
    Rating: [],
    Tags: [],
  });
  const [availableTags, setAvailableTags] = useState([]);
  const router = useRouter();
  const { slug } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Slice the products for the current page
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const nextPage = () => {
    console.log("test");

    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {

    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
      const updatedFilters = {
        ...prevFilters,
        [filterName]: isChecked
          ? [...prevFilters[filterName], option]
          : prevFilters[filterName].filter((item) => item !== option),
      };

      // Apply the filter after state update
      applyFilters(updatedFilters);
      return updatedFilters;
    });
  };
  useEffect(() => {
    applyFilters(selectedFilters);
  }, [selectedFilters]);

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
    { name: "Tags", options: availableTags },
  ];
  const handleNavigate = (slug) => {
    router.push(`/productdetail/${slug}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
     <ToastContainer autoClose={3000} /> 
   
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 ">
            {/* Left sidebar with filters */}
            <aside className=" w-full md:w-1/4 sticky top-[100px] max-h-[calc(100vh-2rem)]">
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <Input
                    type="text"
                    placeholder="Search products or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4"
                  /> */}
                  <ScrollArea className="max-h-[400px] pr-2 overflow-y-auto custom-scroll">
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

            {/* Right side with product results */}
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts?.map((product) => (
                  <Card key={product.id}>
                    <CardHeader onClick={() => handleNavigate(product.slug)}>
                      <img
                        src={product.coverImage}
                        alt={product?.title}
                        className="w-full h-49 max-h-36 object-contain rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle
                        className="mb-2 flex items-center cursor-pointer group"
                        onClick={() => handleNavigate(product.slug)}
                      >
                        {product.name}
                        <ArrowRight className="ml-2 size-4 transition-transform duration-200 translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                      </CardTitle>

                      <div className="flex items-center mb-2">
                        <StarRating rating={product.rating} />
                        <span className="ml-2 text-sm text-gray-600">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>

                      <p className="text-lg font-semibold mb-2">
                        ${product.salePrice}
                      </p>

                      <div className="flex  gap-1">
                        {product.tags?.split(", ").map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 flex items-center"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                      <Link href={`/productdetail/${product.slug}`}>
                      Buy Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
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
