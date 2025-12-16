import React, { useRef, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
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
import Footer from "@/components/Footer";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Image as ImageIcon } from "lucide-react";
import { SquareMousePointer } from "lucide-react";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Loader2 } from "lucide-react"; // for spinner

const stripePromise = loadStripe(
  "pk_test_51Q2TfeRpVqbYsgvrnKeVR5alcP24hdcpm53etjSTZ8iGhZDS2Uy4fUE44vRfg33TzIOVXruQiieNQ1e1Ki5xAhga00bQNh9MCq"
);

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// NEW: default image when product has no images
const DEFAULT_IMAGE = "https://tse1.mm.bing.net/th/id/OIP.mtFzdGV6x4bKHCxjmS7yrQHaF4?pid=Api&P=0&h=180";

// NEW: default demo video URL (fallback if product has no URL)
const DEFAULT_DEMO_URL = "https://www.youtube.com/embed/fbrYV1Oajc4?si=ceotL-3sDC3-QQck";

const ScreenshotsLightbox = ({ open, onClose, images = [], startIndex = 0 }) => {
  const [current, setCurrent] = useState(startIndex || 0);

  useEffect(() => {
    setCurrent(startIndex || 0);
  }, [startIndex, open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") setCurrent((c) => (c > 0 ? c - 1 : images.length - 1));
      if (e.key === "ArrowRight") setCurrent((c) => (c < images.length - 1 ? c + 1 : 0));
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, images.length, onClose]);

  if (!open) return null;
  if (!images || images.length === 0) return null;

  const goPrev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const goNext = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md">

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-8 top-6 text-white text-3xl hover:scale-110"
      >
        ✕
      </button>

      {/* Prev arrow */}
      {images.length > 1 && (
        <button
          onClick={goPrev}
          className="absolute left-10 top-1/2 -translate-y-1/2 text-white rounded-full bg-white/20 hover:bg-white/40 p-3"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Image */}
      <div className="relative bg-white/10 p-3 rounded-xl shadow-lg border border-white/20 max-w-[90%] max-h-[90%]">
        <LazyImage
          src={images[current] || "/placeholder.png"}
          alt={`Screenshot ${current + 1}`}
          className="max-h-[80vh] w-auto rounded-lg mx-auto"
        />

        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-md">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Next arrow */}
      {images.length > 1 && (
        <button
          onClick={goNext}
          className="absolute right-10 top-1/2 -translate-y-1/2 text-white rounded-full bg-white/20 hover:bg-white/40 p-3"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};


const getYouTubeEmbedUrl = (url) => {
  if (!url || typeof url !== "string") return "";

  let videoId = "";

  // Extract from youtube.com/watch?v=
  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  }
  // Extract from youtu.be/
  else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  }
  // Already in embed format
  else if (url.includes("youtube.com/embed/")) {
    return url;
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};

const ProductDetail = ({ productData }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState("details");

  // Lightbox states
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);

  const [descriptionHTML, setDescriptionHTML] = useState("");
  const [shortDescriptionHTML, setShortDescriptionHTML] = useState("");

  const { addToCart } = useCart();

  // add featured products state
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Demo tab state (remove fetch logic, use static iframe)
  // Remove demoUrl and demoLoading states if they exist

  if (!productData?.success || !productData.data.length) {
    return <div className="pt-8 pb-8 text-center">No product data available</div>;
  }

  // initial product from server props
  const initialProduct = productData.data[0];

  // CLIENT-SIDE product state so we can refresh it after review submission
  const [productState, setProductState] = useState(initialProduct);

  // When server prop changes (e.g., client navigation to a new slug),
  // update the client productState so UI reflects the new product.
  useEffect(() => {
    setProductState(initialProduct);
  }, [initialProduct]);

  // Build displayImages from productState
  // normalize image URLs and always provide at least one URL (DEFAULT_IMAGE)
  const toUrl = (img) => {
    if (!img || typeof img !== "string" || !img.trim()) return DEFAULT_IMAGE;
    return img.startsWith("http") ? img : `${baseUrl}${img}`;
  };

  const validImages = Array.isArray(productState.images)
    ? productState.images.filter((i) => typeof i === "string" && i.trim()).map(toUrl)
    : [];

  const displayImages = validImages.length
    ? validImages
    : productState.coverImage
      ? [toUrl(productState.coverImage)]
      : [DEFAULT_IMAGE];

  // Keep lightbox images and description updated whenever productState changes
  useEffect(() => {
    setDescriptionHTML(DOMPurify.sanitize(productState?.description || "No description available."));
    setShortDescriptionHTML(DOMPurify.sanitize(productState?.shortDescription || ""));
    setLightboxImages(displayImages);
  }, [productState]);

  // refresh product data from API (call after new review submitted)
  const refreshProduct = async () => {
    try {
      const apiUrl = `${baseUrl}/product?filter=${encodeURIComponent(JSON.stringify({ slug }))}`;
      const resp = await axios.get(apiUrl);
      const fresh = resp.data?.data?.[0] || resp.data?.data || resp.data || null;
      if (fresh) {
        // normalize to single product object if needed
        const newProduct = Array.isArray(fresh) ? fresh[0] : fresh;
        setProductState(newProduct);
      }
    } catch (err) {
      console.error("Failed to refresh product:", err);
    }
  };

  // goToSection: set active tab and update shallow query for deep linking
  const goToSection = (id) => {
    setActiveTab(id);
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, scrollTo: id },
      },
      undefined,
      { shallow: true }
    );
  };

  // Lightbox controls
  const openLightbox = (start = 0) => {
    if (!lightboxImages || lightboxImages.length === 0) return;
    setLightboxStart(start);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  // add to cart
  const handleAddToCart = () => {
    addToCart(productState);
    toast.success("Added to cart");
  };

  // Pricing
  const price = productState.salePrice || productState.price || 0;

  // fetch featured products (top 10) after component mounts / when slug changes
  useEffect(() => {
    let mounted = true;
    const fetchFeatured = async () => {
      try {
        const filter = { isFeatured: true };
        const resp = await axios.get(
          `${baseUrl}/product?filter=${encodeURIComponent(JSON.stringify(filter))}&limit=10`
        );
        let list = resp.data?.data || resp.data || [];
        if (!Array.isArray(list)) list = Array.isArray(list.data) ? list.data : [];

        // If server returned fewer than 10, fetch additional products to fill up to 10
        if (Array.isArray(list) && list.length < 10) {
          const needed = 10 - list.length;
          try {
            const resp2 = await axios.get(`${baseUrl}/product?limit=${needed}`);
            let extra = resp2.data?.data || resp2.data || [];
            if (!Array.isArray(extra)) extra = Array.isArray(resp2.data?.data) ? resp2.data.data : [];
            // dedupe by id
            const existingIds = new Set(list.map(p => p._id || p.id));
            const filteredExtra = extra.filter(p => !existingIds.has(p._id || p.id));
            list = list.concat(filteredExtra).slice(0, 10);
          } catch (err2) {
            console.warn("Failed to fetch extra products to fill featured list:", err2);
          }
        } else if (!Array.isArray(list)) {
          list = [];
        }

        if (mounted) setFeaturedProducts(Array.isArray(list) ? list.slice(0, 10) : []);
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
        if (mounted) setFeaturedProducts([]);
      }
    };
    fetchFeatured();
    return () => { mounted = false; };
  }, [slug]);

  return (
    <>
      <Head>
        <title>{productState.meta_title || productState.name}</title>
        <meta name="description" content={productState.meta_description?.replace(/<\/?[^>]+(>|$)/g, "") || ""} />
      </Head>

      <div className=" w-full min-h-screen bg-white">
        <main className=" w-full mx-auto ">
          {/* Breadcrumb + Title + tabs */}
          <div className="   bg-gray-100 border border-gray-200 rounded-md p-5 mb-6">
            <div className="text-xl items center ml-[12rem]">
              <Breadcrumb
                categories={productState.categories}
                productName={productState.name}
              />



              <div className="  mt-3 w-full">
                <h1 className="  text-4xl font-extrabold text-gray-800">{productState.name}</h1>

                {/* Tabs below title inside gray box */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button onClick={() => goToSection("details")} className={`text-sm font-medium ${activeTab === "details" ? "text-blue-600 text-sm" : "text-gray-700"} hover:text-blue-600`}>Item Details</button>
                  <span className="text-gray-400">|</span>

                  <button onClick={() => goToSection("reviews")} className={`text-sm font-medium ${activeTab === "reviews" ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}>Reviews</button>
                  <span className="text-gray-400">|</span>

                  <button onClick={() => goToSection("features")} className={`text-sm font-medium ${activeTab === "features" ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}>Features</button>
                  <span className="text-gray-400">|</span>
                  {/* Add Demo tab button */}
                  <button
                    onClick={() => goToSection("demo")}
                    className={`text-sm font-medium ${activeTab === "demo" ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}
                  >
                    Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main two-column area: show only when details tab is active */}
          {activeTab === "details" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 pl-[12rem] pr-[12rem]">
              {/* Left: cover image + screenshot button */}
              <div className="lg:col-span-8">
                <Card>
                  <CardContent className="p-0">
                    <div className="relative bg-gray-100 p-4">
                      <div
                        className="relative group cursor-pointer rounded-lg overflow-hidden"
                        onClick={() => openLightbox(0)}
                      >
                        {/* Image */}
                        <LazyImage
                          src={displayImages[0] || DEFAULT_IMAGE}
                          alt={productState.name}
                          className="w-full max-h-[400px] object-cover transition-all duration-300 group-hover:blur-xs group-hover:brightness-50"
                        />

                        {/* Hover icon */}
                        <div
                          className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-all duration-300 group-hover:opacity-100 "
                        >
                          <SquareMousePointer className="w-14 h-14" />
                        </div>
                      </div>





                      {/* Screenshots button below the card */}
                      {lightboxImages.length > 0 && (
                        <div className="mt-4 ml-[15rem] flex justify-start">
                          <Button
                            onClick={() => openLightbox(0)}
                            className="bg-[#0084B4] text-white px-6 py-2 rounded-md hover:bg-[#0b9adb] hover:scale-105 transition flex items-center gap-2"
                          >
                            View Screenshots
                            <ImageIcon className="w-4 h-4" />
                          </Button>
                        </div>

                      )}
                    </div>
                  </CardContent>
                </Card>
                {/* Dangerous HTML description right below image */}
                <div className="mt-6 mb-9 ">
                  <div className="mt-6 mb-9 ml-9 mr-9" dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
                </div>
              </div>

              {/* Right: Sticky pricing box */}
              <div className="lg:col-span-4">
                <div className="border border-gray-300">
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">

                    {/* Header Row */}
                    <div className="flex justify-between items-start">
                      <p className="text-gray-700 font-bold text-2xl">Starting at:</p>

                      <div className="flex items-start">
                        <span className="text-xl font-bold -mt-1">$</span>
                        <span className="text-4xl font-bold text-gray-700 leading-none">{price}</span>
                      </div>
                    </div>


                    {/* Grey Line */}
                    <div className="border-b border-gray-300 mt-3 mb-4"></div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <span className="rating-box bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold flex items-center">
                        ★ 4.3
                      </span>
                    </div>

                    {/* Feature list */}
                    <div className="text-xs text-gray-500">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                          Instant digital download
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                          Full lifetime access
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                          30-day money-back guarantee
                        </li>
                      </ul>
                    </div>

                    {/* Buy Button */}
                    <div className="mt-10 mb-5 ">
                      <Link href="/checkoutform" className="flex-1">
                        <Button
                          className="w-full bg-[#6f9a37] text-white px-6 py-3 hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 text-base font-semibold rounded-md"
                          onClick={() => addToCart(productState)}
                        >
                          <ShoppingCart className="w-5 h-5" />
                          Buy Now
                        </Button>
                      </Link>
                    </div>

                  </div>
                </div>

                {/* Replace placeholder with FeaturedProducts */}
                <div className="mt-6">
                  <FeaturedProducts products={featuredProducts} />
                </div>
              </div>

            </div>
          )}

          {/* Reviews tab */}
          {activeTab === "reviews" && (
            <div className="p-1">
              <Description
                slug={slug}
                product={productState}
                type="reviews"
                onReviewSubmitted={refreshProduct} // refresh product when review submitted
              />
            </div>
          )}

          {/* Features tab */}
          {activeTab === "features" && (
            <div className="p-1">
              <Description slug={slug} product={productState} type="features" />

            </div>
          )}

          {/* Description tab */}
          {activeTab === "description" && (
            <div className="p-6">
              <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
            </div>
          )}

          {/* Rating tab */}
          {activeTab === "rating" && (
            <div className="p-6">
              <StarRating productId={product._id} />
            </div>
          )}

          {/* Add Demo tab content - FETCH FROM BACKEND */}
          {activeTab === "demo" && (
            <div className="flex justify-center items-center py-4">
              <div className="w-full max-w-8xl mx-9 bg-gray-100 rounded-xl shadow-lg border border-gray-200 p-4">
                <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg border border-gray-200 p-4 ml-[140px]">
                  <h2 className="text-3xl font-bold mb-3 text-blue-700">Live Demo</h2>
                  <div className="w-full rounded-lg overflow-hidden border border-gray-300 shadow">
                    {productState?.url ? (
                      // Use URL from backend if available
                      <iframe
                        width="100%"
                        height="315"
                        src={getYouTubeEmbedUrl(productState.url)}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-[600px] min-h-[400px] rounded-lg border-0"
                        style={{ background: "#f9f9f9" }}
                      />
                    ) : (
                      // Use default fallback video if no URL in backend
                      <iframe
                        width="100%"
                        height="315"
                        src={DEFAULT_DEMO_URL}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-[600px] min-h-[400px] rounded-lg border-0"
                        style={{ background: "#f9f9f9" }} env
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* Lightbox (fullscreen viewer) */}
        <ScreenshotsLightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={lightboxImages}
          startIndex={lightboxStart}
        />

        {/* Checkout dialog */}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Complete your purchase</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-4">
                  <p>Enter your payment details below to complete your purchase.</p>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm productId={productState._id} />
                  </Elements>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Always visible */}
        <RelatedProducts product={productState} />
        <Footer />
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
