import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const PopularCategories = ({ categories, onCategoryClick }) => {
  const router = useRouter();

  const handleCategoryClickS = (category) => {
    onCategoryClick(category);
    router.push(`/product-category/${category.slug}`);
  };

  return (
    <section className="py-12 bg-white">
      <div className="bg-indigo-50 w-[85%] mx-auto py-8 rounded-xl">

        {/* Banner */}
        <div className="flex flex-col items-center justify-center mb-4">
          <h2 className="text-5xl font-extrabold mt-2 text-center text-gray-800">
            Popular Categories
          </h2>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 h-50 gap-x-12 gap-y-6 px-6 mb-5 ml-5 mr-5">
          {categories && categories.length > 0 ? (
            categories.map((category, index) => {
              const boxColors = [
                "bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300",
                "bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-300",
                "bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300",
                "bg-gradient-to-r from-purple-500 via-purple-400 to-purple-300",
              ];

              const bgColor = boxColors[index % 4];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  whileHover={{ scale: 1.22, }} /* strong hover expand */
                  onClick={() => handleCategoryClickS(category)}
                  className={`${bgColor} w-full transform-gpu group relative rounded-2xl shadow-md cursor-pointer overflow-hidden border border-gray-200 hover:z-20 hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center h-48 p-5 mt-5 mb-5 `}
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-1 mt-4 group-hover:text-blue-700">
                    🛍️
                  </h3>

                  <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-2  group-hover:text-blue-700 "> {category.name} </h3>
                  <p className="text-xL text-gray-700 group-hover:text-gray-900"> Explore {category.name} </p>

                  {/* Shine effect */}
                  <motion.span
                    className="absolute inset-0  opacity-0 group-hover:opacity-100 rounded-2xl"
                    animate={{ x: ["-110%", "110%"] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              );
            })
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
