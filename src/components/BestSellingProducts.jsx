import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowRight } from "lucide-react";


const BestSellingProducts = () => {
  const [data, setData] = useState("");
  const { addToCart } = useCart();
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/product`);
        const result = response.data;

        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNavigate = (slug) => {
    router.push(`productdetail/${slug}`);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold">Best Selling Products</h2>
      <p className="text-gray-600 mb-6">
        Top picks for you: Best-selling products that speak for themselves.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-5">
        {data?.data?.slice(4, 8).map((product) => (
          <Card key={product.id} className="shadow-md">
            <img
              src={product.coverImage}
              alt={product.name}
              className="w-full aspect-[4/3] object-contain rounded-t-lg bg-white"
              onClick={() => handleNavigate(product.slug)}
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold flex items-center cursor-pointer group"  onClick={() => handleNavigate(product.slug)}>
                {product.name}
                <ArrowRight className="ml-2 size-4 transition-transform duration-200 translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
              </h3>

              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: product.rating }, (_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
                <span className="text-sm text-gray-500">
                  ({product.reviews.length} Reviews)
                </span>
              </div>
              <div className="mt-2">
                {/* <span className="text-gray-400 line-through">{product.oldPrice}</span> */}
                <span className="text-black font-bold ml-2">
                  ${product.salePrice}
                </span>
              </div>
              <Link href="/checkoutform">
                <Button className="w-full" onClick={() => addToCart(product)}>
                  Buy Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
