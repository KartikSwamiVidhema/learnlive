import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, StarHalf } from 'lucide-react';
import productsData from '../data/products.json';
import LazyImage from './common/LazyImage';
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={i + fullStars} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

const FeaturedProducts = () => {
  // const featuredProducts = productsData.slice(0, 4); // Display first 4 products as featured
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => { // Simulate API delay
      setFeaturedProducts(productsData); // Display first 4 products
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-5">Featured Products</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <LazyImage src={product.image} alt={product.title} className="w-full h-24 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="mb-2 ">{product.title}</CardTitle>
                  <div className="flex items-center mb-2">
                    <StarRating rating={product.rating} />
                    <span className="ml-2 text-sm text-gray-600">({product.reviewCount} reviews)</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                  <Button>Buy Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
