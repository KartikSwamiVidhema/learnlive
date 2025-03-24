import React, { useState } from "react";
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
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
    if (product?.slug) {
      router.push(`productdetail/${product.slug}`);
    }
  };

  if (!product) {
    return (
      <Card className="shadow-md">
        <Skeleton height={160} className="rounded-t-lg" />
        <CardContent className="p-4">
          <Skeleton height={20} width="75%" className="mb-2" />
          <Skeleton height={15} width="50%" className="mb-3" />
          <Skeleton height={20} width="25%" />
          <Skeleton height={40} className="mt-3" />
        </CardContent>
      </Card>
    );
  }
  

  return (
    <Card key={product.id} className="shadow-md">
      <CardHeader onClick={handleNavigate} className="cursor-pointer">
        <img
          src={product.coverImage}
          alt={product.name}
          className="w-full aspect-[4/3] object-contain rounded-t-lg bg-white mt-4"
        />
      </CardHeader>
      <CardContent>
        <h3 className="mb-2 flex items-center cursor-pointer group" onClick={handleNavigate}>
          {product.name}
          <ArrowRight className="ml-2 size-4 transition-transform duration-200 translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
        </h3>
        {/* <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: product.rating || 0 }, (_, index) => (
            <Star key={index} size={16} fill="currentColor" />
          ))}
          
          <span className="text-sm text-gray-500">
            ({product.reviews?.length || 0} Reviews)
          </span>
        </div> */}
        <div className="flex items-center gap-1">
  {Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      size={16}
      fill={index < (product.rating || 0) ? "currentColor" : "none"}
      stroke="currentColor"
      className={index < (product.rating || 0) ? "text-yellow-500" : "text-gray-300"} 
    />
  ))}

  <span className="text-sm text-gray-500">
    ({product.reviews?.length || 0} Reviews)
  </span>
</div>
        <div className="mt-2">
          <span className="text-black font-bold ml-2">${product.salePrice}</span>
        </div>
        <Link href="/checkoutform">
          <Button className="w-full" onClick={() => addToCart(product)}>
            Buy Now
          </Button>
        </Link>
      </CardContent>
      
      
    
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

                {/* {categories.data.map((category) => (
                  <TabsTrigger
                    key={category._id} 
                    value={category.slug} 
                    onClick={() => handleCategoryClick(category.slug)}
                  >
                    {category.name} 
                  </TabsTrigger>
                ))} */}

              </TabsList>

              <TabsContent value={activeTab}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.slice(0, 4).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  ) : (
                    // Show skeletons while loading
                    [...Array(4)].map((_, index) => <ProductCard key={index} product={null} />)
                  )}
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

export async function getServerSideProps() {
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
