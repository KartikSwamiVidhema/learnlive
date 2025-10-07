import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import Header from "../components/Header";
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
// import { fetchProducts } from "../config/api";
import axios from "axios";
import HomeBanner from "@/components/HomeBanner";

// import {
//   Book,
//   GraduationCap,
//   FileText,
//   Laptop,
//   Key,
//   Wrench,
//   Globe,
//   Monitor,
//   ShoppingCart,
//   DollarSign,
//   Megaphone,
//   PenTool,
//   Folder,
//   Smartphone,
//   Cloud,
// } from "lucide-react";
import BestSellingProducts from "@/components/BestSellingProducts";
import BestSellingThemes from "@/components/BestSellingTheme";
import ThemeMarketplace from "@/components/ThemeMarketPlace";
import CartPage from "./cartpage";
import { useCart } from "../../context/CartContext";
import { ArrowRight } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import MetaTags from "@/components/metaTags";
import metadata from "../components/common/metadata.json"
import LazyImage from "@/components/common/LazyImage";
import { useEffect } from 'react';
import Popup from "@/components/Popup";
import demoform from "./demoform";
import ProductCard from "@/components/ProductCard";
import PopularCategories from "@/components/PopularCategories";

// const StarRating = ({ rating }) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   return (
//     <div className="flex items-center">
//       {[...Array(fullStars)].map((_, i) => (
//         <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//       ))}
//       {hasHalfStar && (
//         <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//       )}
//       {[...Array(5 - Math.ceil(rating))].map((_, i) => (
//         <Star key={i + fullStars} className="w-4 h-4 text-gray-300" />
//       ))}
//     </div>
//   );
// };











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

  console.log("filteredProducts ", filteredProducts);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const defaultImage = "https://tse1.mm.bing.net/th/id/OIP.mtFzdGV6x4bKHCxjmS7yrQHaF4?pid=Api&P=0&h=180";
  const router = useRouter();
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    email: '',
    businessType: '',
    budget: '',

  });
  const seo = metadata.home;
  return (
    <>
      <MetaTags
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      <div className="min-h-screen flex flex-col">

        <HomeBanner />
        <ThemeMarketplace />
        <main className="flex-grow">

          <section className="p-1">
            <h2 className="text-3xl font-bold text-center md:text-center md:ml- mb-4 mt-10">Featured Products  </h2>
            <div className=" mx-auto px-4">

              <Tabs defaultValue={initialTab} className="mt-5">
                {/* <TabsList>
                {
                  categories?.data && Array.isArray(categories.data) && categories.data.length > 0 ? (
                    categories.data.map((category) => (
                      <TabsTrigger
                        key={category._id}  
                        value={category.slug}
                        onClick={() => handleCategoryClick(category.slug)}
                      >
                        {category.name} 
                      </TabsTrigger>
                    ))
                  ) : (
                    <p>No categories available</p> 
                  )
                }
              </TabsList> */}

                <TabsContent value={activeTab}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-4">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))
                    ) : (
                      [...Array(4)].map((_, index) => <ProductCard key={index} product={null} />)
                    )}
                  </div>
                </TabsContent>
              </Tabs>

            </div>
          </section>
          <BestSellingProducts />

          <PopularCategories
            categories={Array.isArray(categories.data) ? categories.data.filter((cat) => cat.isFeatured) : []} // Safe filter
            onCategoryClick={handleCategoryClick}
          />
        </main>
        <BestSellingThemes />
        <Footer />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const initialTab = "ionic-7";
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
      props: { initialProducts, initialTab, categoriesData },
    };
  } catch (error) {
    console.error("Error fetching products on server:", error);
    return {
      props: { initialProducts: [], initialTab: "all", categoriesData: {} },
    };
  }
}

export default Index;
