import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, StarHalf } from "lucide-react";
import { fetchProducts } from "../config/api";
import axios from "axios";
import HomeBanner from "@/components/HomeBanner";
import {
  Book,
  GraduationCap,
  FileText,
  Laptop,
  Key,
  Wrench,
  Globe,
  Monitor,
  ShoppingCart,
  DollarSign,
  Megaphone,
  PenTool,
  Folder,
  Smartphone,
  Cloud,
} from "lucide-react";
import BestSellingProducts from "@/components/BestSellingProducts";
import BestSellingThemes from "@/components/BestSellingTheme";
import ThemeMarketplace from "@/components/ThemeMarketPlace";
import CartPage from "./cartpage";
import { useCart } from "../../context/CartContext";
import { ArrowRight } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {/* {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={i + fullStars} className="w-4 h-4 text-gray-300" />
      ))} */}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const handleNavigate = () => {
    router.push(`productdetail/${product.slug}`);
  };

  return (
    <Card key={product.id}>
      <CardHeader onClick={handleNavigate}>
        <img
          src={product.coverImage}
          alt={product.name}
          className="w-full aspect-[4/3] object-contain rounded-t-lg bg-white"
        />
      </CardHeader>
      <CardContent>
        <CardTitle
          className="mb-2 flex items-center cursor-pointer group"
          onClick={handleNavigate}
        >
          {product.name}
          <ArrowRight className="ml-2 size-4 transition-transform duration-200 translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
        </CardTitle>
        <div className=" items-center space-x-2 mb-2">
          <StarRating rating={product?.rating} />
       
          <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: product.rating }, (_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
                <span className="text-sm text-gray-500">
                  ({product.reviews.length} Reviews)
                </span>
              </div>
              <div className="mt-2 ">
                {/* <span className="text-gray-400 line-through">{product.oldPrice}</span> */}
                <span className="text-black font-bold ml-2">
                  ${product.salePrice}
                </span>
              </div>

        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Link className="w-full" href="/checkoutform">
          <Button className="w-full" onClick={() => addToCart(product)}>
            Buy Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const PopularCategories = ({ categories, onCategoryClick }) => {
  const router = useRouter();

  const handleCategoryClickS = (category) => {
    onCategoryClick(category);
    router.push(`/product-category/${category.slug}`);
  };

  return (
    <section className="bg-gray-100 py-12 categories-section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleCategoryClickS(category)}
              >
                <CardHeader>
                  <div className="text-4xl mb-2">
                    {getCategoryIcon(category)}
                  </div>
                  <CardTitle>{category.name}</CardTitle>{" "}
                  {/* Assuming category has a 'name' property */}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Explore {category.name}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No categories available</p> // Add a fallback in case categories array is empty or undefined
          )}
        </div>
      </div>
    </section>
  );
};

const getCategoryIcon = (category) => {
  const icons = {
    memberships: "/icons/memberships.png",
    services: "/icons/services.png",
    html: "/icons/html-5.png",
    wordpress: "/icons/wordpress.png",
    shopify: "/icons/shopify.png",
    ecommerce: "/icons/shopping.png",
    marketing: "/icons/bullhorn.png",
    blogging: "/icons/blog.png",
    cms: "/icons/cms.png",
    "mobile app": "/icons/smartphone.png",
    hosting: "/icons/cloud-server.png",
  };

  return icons[category] || "🏷️";
};

const Index = ({ initialProducts, initialTab, categoriesData }) => {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(categoriesData);
  const [activeTab, setActiveTab] = useState(initialTab);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleCategoryClick = async (category) => {
    const selectedCategory =
      typeof category === "string"
        ? category
        : category?.slug || category?.name || null;

    // Prevent API call if selectedCategory is not a valid string
    if (!selectedCategory || typeof selectedCategory !== "string") {
      console.warn("Invalid category, API not called:", category);
      return;
    }

    setActiveTab(selectedCategory);


  
    try {
      const response = await axios.get(
        `${apiBaseUrl}/getProductByCategorySlug/${selectedCategory}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((product) =>
          product.categories?.some((category) => category.slug === activeTab)
        );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HomeBanner />
      <ThemeMarketplace />

      {/* Display the categories dynamically */}
      {/* <CategoryList
        categories={categories}
        onCategoryClick={handleCategoryClick}
      /> */}
      <main className="flex-grow">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-7">Featured Products</h2>
            <Tabs defaultValue={initialTab} className="mb-8">
              <TabsList>
                {/* Map over categories and display each category */}
                {
                  categories?.data && Array.isArray(categories.data) && categories.data.length > 0 ? (
                    categories.data.map((category) => (
                      <TabsTrigger
                        key={category._id}  // Use unique ID for the key
                        value={category.slug} // Use category slug as the value
                        onClick={() => handleCategoryClick(category.slug)}
                      >
                        {category.name} {/* Display category name */}
                      </TabsTrigger>
                    ))
                  ) : (
                    <p>No categories available</p> // Fallback message or loading state
                  )
                }
              </TabsList>
              <TabsContent value={activeTab}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredProducts.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <BestSellingProducts filteredProducts={filteredProducts} />

        <PopularCategories
          categories={Array.isArray(categories.data) ? categories.data.filter((cat) => cat.isFeatured) : []} // Safe filter
          onCategoryClick={handleCategoryClick}
        />
      </main>
      <BestSellingThemes />
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const initialTab = "ionic-3";
    const response = await axios.get(
      `${apiBaseUrl}/getProductByCategorySlug/${initialTab}`
    );

    // Fetch featured categories first
    const categoriesResponse = await axios.get(
      `${apiBaseUrl}/categories?filter={"isFeatured":"true"}`
    );

    const categoriesData = categoriesResponse.data || [];

    const initialProducts = response.data || [];

    return {
      props: { initialProducts, initialTab, categoriesData},
    };
  } catch (error) {
    console.error("Error fetching products on server:", error);
    return {
      props: { initialProducts: [], initialTab: "all", categoriesData: {} },
    };
  }
}

export default Index;
