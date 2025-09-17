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






const ProductCard = ({ product }) => {
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
  const handleOptionClick = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNavigate = () => {
    if (product?.slug) {
      router.push(`productdetail/${product.slug}`);
    }
  };
  const randomRating = (Math.random() * 5).toFixed(1);





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


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    window.location.href = "/";

    e.preventDefault();

    // Example POST request to your backend API to save the form data
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Demo request submitted successfully!');
        router.push('/'); // Redirect or show success message
      } else {
        alert('Failed to submit demo request.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Try again later.');
    }
  };
  const handleArrowClick = () => {
    if (product?.slug) {
      // Just redirect to product page without any scroll indication
      router.push(`/productdetail/${product.slug}`);
    }
  };
  // Navigate and scroll to features (Features button)
  const handleFeaturesClick = () => {
    if (product?.slug) {
      // Pass a query param to indicate scrolling is desired
      router.push({
        pathname: `/productdetail/${product.slug}`,
        query: { scrollTo: 'features' },
      });
    }
  };



  return (
    <Card key={product.id} className="shadow-md">
      <CardHeader onClick={handleNavigate} className="cursor-pointer">
        <div className="flex p-4">
          <div className="w-24 h-24 flex-shrink-0 mr-4">

            <LazyImage
              src={product.coverImage}
              alt={product.name}
              className="w-full aspect-[4/3] object-contain rounded-t-lg bg-white mt-1"
            />
          </div>
          <h3
            className="mb-2 flex items-center cursor-pointer group text-base font-semibold"
            onClick={handleNavigate}
          >
            {product.name.length > 25 ? `${product.name.slice(0, 25)}...` : product.name}
            <ArrowRight className="ml-2 size-4 transition-transform duration-200 translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
          </h3>
        </div>

      </CardHeader>
      <CardContent className="p-4">



        <span class="star-icon">★</span>
        <span class="rating-number">4.3</span>

        {/* Features Button: */}





        <button className="btn features-btn" onClick={handleFeaturesClick}>Features</button>
        <button className="btn plans-btn">Plans</button>

        <div class="product-card">


          <div className="flex items-center justify-center ">
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-free-demo"
            >
              GET FREE DEMO
            </button>

            <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <h2 className="text-xl font-bold mb-2">Custom Popup</h2>
              <p>This popup is reusable and can contain anything.</p>
              <div className="container mx-auto p-6 max-w-md">
                <h1 className="text-xl font-bold mb-4">Please Enter Your Details Below</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full rounded"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full rounded"
                  />
                  <label className="block font-semibold mb-2">Choose Your Business Type</label>

                  {["Small and Medium Businesses", "Hospitality", "Healthcare", "Education", "Networking and Security", "Others"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      required
                      className={`btn py-1 px-3 rounded border ${formData.businessType === type ? 'bg-blue-600 text-white' : ''}`}
                      onClick={() => handleOptionClick('businessType', type)}
                    >
                      {type}
                    </button>
                  ))}

                  <label className="block font-semibold mb-2">Choose Your Budget</label>

                  {["<₹10,000", "₹10,000 - ₹50,000", "₹51,000 - ₹1,00,000", ">₹1,00,000"].map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      required
                      className={`btn py-1 px-3 rounded border ${formData.budget === budget ? 'bg-blue-600 text-white' : ''}`}
                      onClick={() => handleOptionClick('budget', budget)}
                    >
                      {budget}
                    </button>
                  ))}


                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </form>
              </div>


              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 px-3 py-1 bg-red-500 text-white rounded"
              >
                Close
              </button>
            </Popup>
          </div>

        </div>


        <div class="price-container">
          <span class="price-text"></span>
          <button class="get-price-button"></button>
        </div>
        {/* New container div to align text and button horizontally */}
        <div className="flex items-center space-x-4">
          {/* Text outside the button */}
          <span className="text-sm font-medium text-gray-700">
            2,999
          </span>
          <span className="text-xs text-gray-500">/Month</span>

          <Link href="/checkoutform">
            <Button className="get-price-btn" onClick={() => addToCart(product)}>
              GET PRICE
            </Button>
          </Link>
        </div>

      </CardContent>
    </Card >
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
        <h2 className="text-3xl font-bold mb-8 md:text-left text-center">Peehu Popular Categories</h2>
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

  console.log("filteredProducts ", filteredProducts);

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
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold md:text-left text-center">Featured Products </h2>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
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
