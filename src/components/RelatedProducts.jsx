
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const RelatedProducts = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        if (!product?.related_products?.length) {
          setRelatedProducts([]);
          return;
        }

        const relatedProductIds = product.related_products.map((p) => p._id);
        const response = await axios.get(`${apiBaseUrl}/product`, {
          params: {
            filter: JSON.stringify({ _id: { $in: relatedProductIds } }),
          },
        });

        setRelatedProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [apiBaseUrl, product]);

  const handleNavigate = (slug) => {
    router.push(`/productdetail/${slug}`);
  };

  // Responsive settings for different devices
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4, // Show 4 cards on desktop
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3, // Show 3 cards on tablet
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2, // Show 2 cards on mobile
    },
  };

  return (
    <div className="container mx-auto px-4">
    {relatedProducts.length > 0 && (
      <>
        <h2 className="text-3xl font-bold">Related Products</h2>
        <p className="text-gray-600 mb-6">
          Top picks for you: Best-selling products that speak for themselves.
        </p>
      </>
    )}
  
    {/* React Multi Carousel */}
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      swipeable={true}
      draggable={true}
      showDots={false}
      arrows={true}
    >
      {relatedProducts.map((product) => (
        <div key={product._id} className="p-2">
          <Card className="shadow-md">
            <img
              src={product.coverImage}
              alt={product.name}
              className="w-full mt-3 aspect-[4/3] object-contain rounded-t-lg bg-white cursor-pointer"
              onClick={() => handleNavigate(product.slug)}
            />
            <CardContent className="p-4">
              <h3
                className="text-lg font-semibold flex items-center justify-between cursor-pointer group"
                onClick={() => handleNavigate(product.slug)}
              >
                {product.name}
                <ArrowRight className="size-4 transition-transform duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-2" />
              </h3>
  
              {/* Star Rating */}
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
                <span className="text-sm text-gray-500">({product.reviews?.length || 0} Reviews)</span>
              </div>
  
              {/* Pricing Section */}
              <div className="mt-2">
                <span className="text-black font-bold">${product.salePrice}</span>
              </div>
  
              {/* Buy Now Button */}
              <Link href="/checkoutform">
                <Button className="w-full" onClick={() => addToCart(product)}>
                  Buy Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ))}
    </Carousel>
  </div>
  
  );
};

export default RelatedProducts;
