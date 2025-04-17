import React, { useState, useMemo } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Search, Tag } from 'lucide-react';
import StarRating from '../components/StarRating';
import { fetchSellerById, fetchProductsForSeller } from '../config/api';
import LazyImage from '@/components/common/LazyImage';

const SellerBanner = ({ seller }) => (
  <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${seller.bannerImage})` }}>
    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    <div className="container mx-auto px-4 h-full flex items-end pb-8">
      <div className="flex items-end space-x-6">
        <div>
        <LazyImage src={seller.avatar} alt={seller.name} className="w-24 h-24 rounded-full border-4 border-[#000]" />
        {/* <span className="text-lg font-bold">
    {seller.name.charAt(0)} - {seller.name.charAt(seller.name.length - 1)}
  </span> */}

        </div>
        <div className="text-black">
          <h1 className="text-3xl font-bold flex items-center">
            {seller.name}
            {seller.verified && <BadgeCheck className="w-6 h-6 text-blue-500 ml-2" />}
          </h1>
          <p className="text-lg">{seller.slogan}</p>
        </div>
      </div>
    </div>
  </div>
);

const SearchAndMenu = ({ categories, onSearch, onCategoryClick, activeCategory }) => (
  <div className="bg-gray-100 py-4">
    <div className="container mx-auto px-4">
      <div className="flex flex-col  justify-between  space-y-4 md:space-y-6">
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search products or tags..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === activeCategory ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ProductCard = ({ product }) => (
  <Card>
    <CardHeader>
      <LazyImage src={product.image} alt={product.title} className="w-full h-24 object-cover rounded-t-lg" />
    </CardHeader>
    <CardContent>
      <CardTitle className="mb-2">{product.title}</CardTitle>
      <div className="flex items-center mb-2">
        <StarRating rating={product.rating} />
        <span className="ml-2 text-sm text-gray-600">({product.reviewCount} reviews)</span>
      </div>
      <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {product.tags.map((tag, index) => (
          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full" asChild>
        <Link href={`/product/${product.id}`}>View Details</Link>
      </Button>
    </CardFooter>
  </Card>
);

const Seller = () => {
  const router = useRouter();
  const { id } = router.query;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const { data: seller, isLoading: sellerLoading, error: sellerError } = useQuery({
    queryKey: ['seller', id],
    queryFn: () => fetchSellerById(id),
  });

  const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['sellerProducts', id],
    queryFn: () => fetchProductsForSeller(id),
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  const categories = useMemo(() => {
    if (!products) return ['All'];
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return ['All', ...uniqueCategories];
  }, [products]);

  if (sellerLoading || productsLoading) return <div>Loading...</div>;
  if (sellerError) return <div>Error: {sellerError.message}</div>;
  if (productsError) return <div>Error: {productsError.message}</div>;

  return (
    <div className="min-h-screen flex flex-col">
   
      <SellerBanner seller={seller} />
      <SearchAndMenu
        categories={categories}
        onSearch={handleSearch}
        onCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Seller;
