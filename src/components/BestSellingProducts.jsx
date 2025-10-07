import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LazyImage from "./common/LazyImage";
import ProductCard from "./ProductCard";
import Popup from "@/components/Popup";
import MetaTags from "@/components/metaTags";



const SkeletonCard = () => (
  <Card className="shadow-md">
    <Skeleton height={160} className="rounded-t-lg" />
    <CardContent className="p-4">
      <Skeleton height={20} width="75%" className="mb-2" />
      <Skeleton height={15} width="50%" className="mb-3" />
      <Skeleton height={20} width="25%" />
    </CardContent>
  </Card>
);
const handleArrowClick = () => {
  if (product?.slug) {
    // Just redirect to product page without any scroll indication
    router.push(`/productdetail/${product.slug}`);
  }
};
const handleFeaturesClick = () => {
  if (product?.slug) {
    // Pass a query param to indicate scrolling is desired
    router.push({
      pathname: `/productdetail/${product.slug}`,
      query: { scrollTo: 'features' },
    });
  }
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
const handleNavigate = () => {
  if (product?.slug) {
    router.push(`productdetail/${product.slug}`);
  }
};

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
const BestSellingProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const { addToCart } = useCart();
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    email: '',
    businessType: '',
    budget: '',

  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/getProductByCategorySlug/ionic-6`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleNavigate = (slug) => {
    router.push(`productdetail/${slug}`);
  };
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
    <section className="py-12 ">


      <h2 className="text-3xl font-bold mb-5  md:text-center mt-10">
        Best Selling Products
      </h2>
      <p className="text-gray-600 mb-6 mt-2 md:text-center text-center">
        Top picks for you: Best-selling products that speak for themselves.
      </p>


      <div className="mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 ">

        {data
          ? data.map((product) => (


            <ProductCard key={product.id} product={product} />

          ))
          : Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>

    </section>
  );
};

export default BestSellingProducts;
