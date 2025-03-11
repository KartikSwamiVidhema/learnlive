import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from "@/components/StarRating";
// import { fetchProductById, fetchSellerById } from "../config/api";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../checkoutform";
import { useCart } from "../../../context/CartContext";
import Description from "@/components/Description";
import RelatedProducts from "@/components/RelatedProducts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const stripePromise = loadStripe(
  "pk_test_51Q2TfeRpVqbYsgvrnKeVR5alcP24hdcpm53etjSTZ8iGhZDS2Uy4fUE44vRfg33TzIOVXruQiieNQ1e1Ki5xAhga00bQNh9MCq"
); // Replace with your Stripe publishable key

const createCheckoutSession = async (productId) => {
  // Replace this with the actual API call to create a checkout session
  return {
    id: "mock_session_id",
    url: `/thank-you/${productId}`,
  };
};

const ImageSlideshow = ({ images }) => {
  // Flattening the array
  const flattenedImages = images.flat();
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!Array.isArray(flattenedImages) || flattenedImages.length === 0) {
    return <p>No images available</p>;
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flattenedImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === flattenedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    // Set a timeout to stop showing the skeleton loader after 2 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout); // Cleanup the timeout
  }, []);

  return (
    <div className="relative w-full  ">
       {isLoading ? (
        <div className="animate-pulse bg-gray-300 w-full h-48 rounded-t-lg"></div>
      ) : (
      <img
        src={flattenedImages[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-49  object-contain rounded-t-lg"
      />
      )}
      <Button
        variant="outline"
        className="absolute top-1/2 left-2 transform -translate-y-1/2"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        className="absolute top-1/2 right-2 transform -translate-y-1/2"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
};

const ProductInfo = ({ product }) => (
  <div>
    <h1 className="text-3xl font-bold my-4">{product.name}</h1>
    <div className="flex items-center mb-4">
      <StarRating rating={product.rating} />
      <span className="ml-2 text-sm text-gray-600">
        ({product.reviews.length} reviews)
      </span>
    </div>
    <div className="mt-2">
      <span className="text-black font-bold ml-2 text-2xl">
        ${product.salePrice}
      </span>
    </div>
    <div className="flex flex-wrap gap-2 mb-6">
      {/* <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
        {product.tag}
      </span> */}
    </div>
  </div>
);

const ProductTabs = ({ product }) => {
  const [description, setDescription] = useState("Loading...");

  useEffect(() => {
    setDescription(
      DOMPurify.sanitize(product?.description || "No description available.")
    );
  }, [product]);

  return (
    <Tabs defaultValue="description">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="view">View</TabsTrigger>
      </TabsList>

      {/* Description Tab */}
      <TabsContent value="description" className="mt-4 ml-4">
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </TabsContent>

      {/* Features Tab */}
      <TabsContent value="features" className="mt-4">
        <ul className="space-y-2">
          {product?.features?.length > 0 ? (
            product.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                <span>{feature}</span>
              </li>
            ))
          ) : (
            <li>No features listed.</li>
          )}
        </ul>
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews" className="mt-4">
        <p>Reviews coming soon.</p>
      </TabsContent>
    </Tabs>
  );
};

const PurchaseInfo = ({ product, seller, onBuyNow }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleClick = () => {
    if (!product.webUrl) {
      toast.error("Demo is Not Present!");
      return;
    }

    if (product.webUrl.includes(".app")) {
      window.open(`/demo?id=${product._id}`, "_blank");
    } else if (product.webUrl.includes(".xyz") || product.webUrl.includes(".firebaseapp.com"))

       {
      window.open(`/webiframe?url=${product._id}`, "_blank");
    } else {
      console.error("Unknown URL type");
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <ToastContainer autoClose={3000} />
        {/* <h2 className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</h2> */}
        <Link className="w-full" href="/checkoutform">
          <Button className="w-full mb-5" onClick={() => addToCart(product)}>
            Buy Now
          </Button>
        </Link>

        <Button className="w-full mb-5" onClick={handleClick}>
          Demo
        </Button>

        <ul className="space-y-2 text-sm mb-6">
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            <span>Instant digital download</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            <span>Full lifetime access</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            <span>30-day money-back guarantee</span>
          </li>
        </ul>
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Last Updated:</strong> {product.lastUpdated || "N/A"}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Published:</strong> {product.publishedDate || "N/A"}
          </p>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              {/* <AvatarImage src={seller.avatar} alt={seller.name} /> */}
              {/* <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback> */}
            </Avatar>
            <div>
              {/* <Link
              href={`/seller/${seller.id}`}
              className="font-semibold hover:underline flex items-center"
            >
              {seller.name}
              {seller.verified && (
                <BadgeCheck className="w-4 h-4 text-blue-500 ml-1" />
              )}
            </Link> */}
              <p className="text-sm text-gray-600">Seller</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductDetail = ({ productData }) => {
  console.log(productData, "00000000000YYYY");

  const router = useRouter();
  const { slug } = router.query;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!productData?.success || !productData.data.length) {
    return <div>No product data available</div>;
  }

  const product = productData.data[0];

  const handleBuyNow = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardContent>
                  <ImageSlideshow images={[product.images]} />{" "}
                  {/* Adjusted to array */}
                  <ProductInfo product={product} />
                  <ProductTabs product={product} />
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-1">
              <PurchaseInfo product={product} onBuyNow={handleBuyNow} />
            </div>
          </div>
        </div>
      </main>
      <Description slug={slug} product={product} />
      <RelatedProducts product={product} />
      <Footer />
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete your purchase</AlertDialogTitle>
            <AlertDialogDescription>
              <p>Enter your payment details below to complete your purchase.</p>
              <Elements stripe={stripePromise}>
                <CheckoutForm productId={product._id} />
              </Elements>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  let filter = { slug: slug };

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const productResponse = await axios.get(
      `${apiBaseUrl}/product?filter=${encodeURIComponent(
        JSON.stringify(filter)
      )}`
    );
    const productData = productResponse.data || [];
    console.log(productData, "hello");

    return {
      props: { productData, slug },
    };
  } catch (error) {
    console.error("Error fetching products on server:", error);
    return { props: { productData: {} } };
  }
}

export default ProductDetail;
