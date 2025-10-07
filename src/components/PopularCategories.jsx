import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/router';
import { motion } from "framer-motion";


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
const PopularCategories = ({ categories, onCategoryClick }) => {
  const router = useRouter();

  const handleCategoryClickS = (category) => {
    onCategoryClick(category);
    router.push(`/product-category/${category.slug}`);
  };

  return (
    <section className=" py-16 w-full categories-section ">
      <div className=" mx-auto w-full max-w-7xl px-6 py-10 rounded-lg border border-gray-200 bg-white shadow-md">
        <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-800">
          Popular Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  onClick={() => handleCategoryClickS(category)}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center"
                >
                  <div className="text-4xl mb-3 text-blue-600">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Explore {category.name}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No categories available
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;