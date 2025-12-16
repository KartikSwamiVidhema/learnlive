import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const bestSellingThemes = [
  { name: "Ionic 7 App Themes", percentage: 20 },
  { name: "Website Themes & Templates", percentage: 83 },
  { name: "Ionic 6 App Themes", percentage: 70 },
  { name: "Ionic 4 App Themes", percentage: 52 },
];

const BestSellingThemes = () => {
  return (
    <div className="w-full bg-indigo-50 py-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Left Content */}
        <div className="md:w-1/2 space-y-5 text-center md:text-left py-5">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Star className="text-yellow-500 w-6 h-6" />
            <h4 className="text-indigo-700 font-semibold tracking-wide uppercase">
              Best Selling Themes
            </h4>
          </div>

          <h2 className="md:text-4xl text-2xl font-extrabold leading-tight text-gray-900">
            Find the Top Mobile App Themes to Boost Your Business Growth
          </h2>
          <p className="text-gray-600 text-base">
            Explore this week’s most trending & creative mobile app templates crafted for success.
          </p>

          <Button
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-5 rounded-xl shadow-md hover:scale-[1.03] transition-transform "
          >
            <Link href="/product-category/all">View More</Link>
          </Button>
        </div>

        {/* Right Section – Animated Progress Bars */}
        <div className="md:w-1/2 w-full space-y-6 py-5">
          {bestSellingThemes.map((theme, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-800 font-medium">{theme.name}</p>
                <span className="text-indigo-700 font-semibold">{theme.percentage}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${theme.percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellingThemes;
