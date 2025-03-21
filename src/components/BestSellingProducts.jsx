import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

const BestSellingProducts = () => {
  const [data, setData] = useState(null);
  const { addToCart } = useCart();
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/product`);
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

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold md:text-left text-center">Best Selling Products</h2>
      <p className="text-gray-600 mb-6 mt-2 md:text-left text-center">
        Top picks for you: Best-selling products that speak for themselves.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-5">
        {data ? data?.data?.slice(4, 8).map((product) => (
              <Card key={product.id} className="shadow-md">
                <img
                  src={product.coverImage}
                  alt={product.name}
                  className="w-full aspect-[4/3] mt-4 object-contain rounded-t-lg bg-white"
                  onClick={() => handleNavigate(product.slug)}
                />
                <CardContent className="p-4">
                <h3
  className="text-base font-semibold flex items-center cursor-pointer group"
  onClick={() => handleNavigate(product.slug)}
>
  {product.name.length > 25 ? `${product.name.slice(0, 25)}...` : product.name}
  <ArrowRight className="ml-2 size-4 transition-transform duration-200 translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
</h3>


                


                <div className="flex justify-between mb-3">
                <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: product.rating }, (_, index) => (
                      <Star key={index} size={16} fill="currentColor" />
                    ))}
                    <span className="text-sm text-gray-500">
                      ({product.reviews.length} Reviews)
                    </span>
                  </div>
                  <div>
                    <span className="text-black font-bold">
                      ${product.salePrice}
                    </span>
                  </div>
                </div>
                  <Link href="/checkoutform">
                    <Button className="w-full" onClick={() => addToCart(product)}>
                      Buy Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          : Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}
      </div>
    </div>
  );
};

export default BestSellingProducts;
