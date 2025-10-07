import React, { useRef, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
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
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar } from "@/components/ui/avatar";
import StarRating from "@/components/StarRating";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../checkoutform";
import { useCart } from "../../../context/CartContext";
import Description from "@/components/Description";
import RelatedProducts from "@/components/RelatedProducts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import LazyImage from "@/components/common/LazyImage";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from '@/components/Footer';
import Image from "next/image";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';  // Add this at start of the component
function MyComponent() {
  const myRef = useRef(null);
  return <div ref={myRef}>Content</div>;
}

const scrollToReview = () => {
  reviewRef.current?.scrollIntoView({ behavior: "smooth" });
};

const handleWriteReviewClick = () => {
  setTimeout(() => {
    reviewRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 1000);
};
const stripePromise = loadStripe(
  "pk_test_51Q2TfeRpVqbYsgvrnKeVR5alcP24hdcpm53etjSTZ8iGhZDS2Uy4fUE44vRfg33TzIOVXruQiieNQ1e1Ki5xAhga00bQNh9MCq"
);


const ImageSlideshow = ({ images, coverImage }) => {
  console.log(images, "test image");

  const [currentIndex, setCurrentIndex] = useState(0);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  // Filter out null, undefined, or falsy image entries
  const validImages = Array.isArray(images)
    ? images.filter(img => typeof img === 'string' && img.trim())
    : [];

  const displayImages = validImages.length
    ? validImages.map(img => img.startsWith('http') ? img : `${baseUrl}${img}`)
    : coverImage
      ? [coverImage.startsWith('http') ? coverImage : `${baseUrl}${coverImage}`]
      : [];

  if (displayImages.length === 0) {
    return <img src="https://cdn2.vectorstock.com/i/1000x1000/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg" alt="No Image Available" className="w-full h-64 sm:h-80 md:h-96 object-contain" />;
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };
  const goToNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };
  console.log("Display Images", displayImages);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Main image container */}
      <div className="relative bg-gray-100">
        <LazyImage
          src={displayImages[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-64 sm:h-80 md:h-96 object-contain"
        />

        {/* Navigation buttons */}
        {displayImages.length > 1 && (
          <>
            <Button
              variant="outline"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 transition-all duration-200 hover:scale-110"
              onClick={goToPrevious}
              type="button"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 transition-all duration-200 hover:scale-110"
              onClick={goToNext}
              type="button"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Image counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-10 py-6 rounded-md">
            {currentIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails container */}
      {displayImages.length > 1 && (
        <div className="p-3 bg-gray-50">
          <div className="flex gap-2 overflow-x-auto py-1 hide-scrollbar">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleThumbnailClick(idx)}
                className={`flex-shrink-0 focus:outline-none rounded-md border transition-all duration-200
                  ${idx === currentIndex
                    ? 'ring-2 ring-blue-500 border-blue-500 scale-105'
                    : 'border border-gray-200 opacity-70 hover:opacity-100 hover:scale-105'
                  }
                `}
                style={{ width: 60, height: 60, padding: 0, background: 'none' }}
                tabIndex={0}
                aria-label={`Show image ${idx + 1}`}
              >
                <div className="w-full h-full">
                  <LazyImage
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover rounded-md"
                    style={{ width: '100%', height: '100%', display: 'block' }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Updated ProductInfo component to accept props and handler
const ProductInfo = ({ product, onFeaturesClick, onDescriptionClick }) => (

  <div>

    <h1 className="text-3xl font-bold my-1">{product.name}</h1>
    <p className="space-y-2 text-sm mb-6">Brand : {product.brand || product.name}</p>

    <div className="flex items-center mb-0">

      <span className="rating-box bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold flex items-center">
        ★ 4.3
      </span>
      <span className="divider"></span>

      <button className=" features-btn" onClick={onFeaturesClick}>
        Features
      </button>
      <span className="divider"></span>

      <button className="features-btn" onClick={onDescriptionClick}> Description</button>
      <span className="divider"></span>
      <Tabs defaultValue="description">
        <TabsList>
          <div className="features-btn">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="reviews" className="mt-0">
          <p>No Data Found</p>
        </TabsContent>
      </Tabs>
    </div>
    <hr className="my-4 border-t border-gray-300" />
    <div className="space-y-2 text-sm mb-6">
      <p>Starting AT: </p>
      <span className="flex text-black font-bold ml-2  text-2xl gap-4">
        ${product.salePrice}

      </span>
    </div>
  </div>
);


const ProductTabs = ({ product }) => {
  const [description, setDescription] = useState("Loading...");
  console.log(product, "productproductproductproduct ");

  useEffect(() => {
    setDescription(DOMPurify.sanitize(product?.description || "No description available."));
  }, [product]);

  return (




    <div
      className="text-gray-600 mt-4"

      dangerouslySetInnerHTML={{ __html: product.shortDescription }}
    />





  );
};

const PurchaseInfo = ({ product }) => {
  const { addToCart } = useCart();

  const handleClick = () => {
    if (!product.webUrl) {
      toast.error("Demo is Not Present!");
      return;
    }

    if (product.webUrl.includes(".app")) {
      window.open(`/demo?id=${product._id}`, "_blank");
    } else if (
      product.webUrl.includes(".xyz") ||
      product.webUrl.includes(".firebaseapp.com")
    ) {
      window.open(`/webiframe?url=${product._id}`, "_blank");
    } else {
      console.error("Unknown URL type");
    }
  };

  return (
    <>
      <ul className="flex flex-row flex-wrap space-x-4 text-sm mb-2 mt-2">
        <li className="flex items-center">
          <CheckCircle className="w-8 h-8 text-green-500 mr-2" />
          <span>Instant digital download</span>
        </li>
        <li className="flex items-center">
          <CheckCircle className="w-8 h-8 text-green-500 mr-2" />
          <span>Full lifetime access</span>
        </li>
        <li className="flex items-center">
          <CheckCircle className="w-8 h-8 text-green-500 mr-2" />
          <span>30-day money-back guarantee</span>
        </li>
      </ul>

      <div class="flex gap-20 mt-10 ">
        <Button
          onClick={handleClick}
          className="flex-1 border border-blue-600 bg-white text-blue-600  rounded-full px-6 py-2 hover:bg-blue-50 transition duration-300"
        >
          Demo
        </Button>
        <Link href="/checkoutform" className="flex-1">
          <Button className="w-full bg-blue-600 border border-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700 transition duration-300" onClick={() => addToCart(product)}>
            Buy Now
          </Button>
        </Link>



      </div>

    </>





  );
};

const ProductDetail = ({ productData, }) => {
  const reviewRef = useRef(null);
  const router = useRouter();
  const { slug } = router.query;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!productData?.success || !productData.data.length) {
    return <div>No product data available</div>;
  }

  const product = productData.data[0];

  // Moved handlers inside component with access to `product` and `router`
  const handleBuyNow = () => setIsDialogOpen(true);

  const handleFeaturesClick = () => {
    if (product?.slug) {
      router.push({
        pathname: `/productdetail/${product.slug}`,
        query: { scrollTo: "features" },
      });
    }
  };
  const handleDescriptionClick = () => {
    if (product?.slug) {
      router.push({
        pathname: `/productdetail/${product.slug}`,
        query: { scrollTo: "description" },
      });
    }
  };
  const scrollToReview = () => {
    if (reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };



  useEffect(() => {
    // Only scroll if query param scrollTo=features is present
    if (router.query.scrollTo === "features") {
      const el = document.getElementById("features");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [router.query.scrollTo]);
  console.log(product.images, product.coverImage)

  return (
    <>
      <Head>
        <title>{product.meta_title || product.name}</title>
        <meta
          name="description"
          content={
            product.meta_description?.replace(/<\/?[^>]+(>|$)/g, "") ||
            "Default description"
          }
        />
        <meta name="keywords" content={product.meta_keywords || "default, keywords"} />
        <link
          rel="canonical"
          href={`https://ithemes-dev.netlify.app/productdetail/${product.slug}`}
        />
      </Head>

      <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-gray-100 py-8">
          <div className="mx-auto w-full max-w-8xl bg-white rounded-lg shadow-md px-10 py-10">
            <div className="flex flex-col md:flex-row md:space-x-16">
              <div className="image-section">
                <Card>
                  <CardContent>
                    <ImageSlideshow images={product.images} coverImage={product.coverImage} />
                  </CardContent>
                </Card>
              </div>

              <div className="md:w-1/2 flex flex-col">



                <CardContent>
                  <div className="container mx-auto px-4">
                    <Breadcrumb productName={product.name} />

                  </div>
                  {/* Pass `handleFeaturesClick` as prop to ProductInfo */}
                  <ProductInfo product={product} onFeaturesClick={handleFeaturesClick} onDescriptionClick={handleDescriptionClick} />



                  <div className="mb-10">
                    <ProductTabs product={product} />
                  </div>
                </CardContent>


                <PurchaseInfo product={product} />
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
    </>

  );
};

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  let filter = { slug: slug };

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const productResponse = await axios.get(
      `${apiBaseUrl}/product?filter=${encodeURIComponent(JSON.stringify(filter))}`
    );
    const productData = productResponse.data || {};

    return {
      props: { productData, slug },
    };
  } catch (error) {
    console.error("Error fetching products on server:", error);
    return { props: { productData: {} } };
  }
}

export default ProductDetail;