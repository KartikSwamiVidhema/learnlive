import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const bestSellingThemes = [
  { name: "Ionic 7 App Themes", percentage:20  },
  { name: "Website Themes & Templates", percentage: 83 },
  { name: "Ionic 6 App Themes", percentage: 70 },
  { name: "Ionic 4 App Themes", percentage: 52 },
];

const BestSellingThemes = () => {
  return (
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between p-[4%]">
      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl font-bold leading-tight">
          Find the Best Selling Mobile App Themes to get your business growing.
        </h2>
        <p className="text-gray-600 my-4">
          This week’s best mobile APPs themes & templates have arrived.
        </p>
        <Button asChild><Link href="/product-category/all">View More</Link></Button>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 space-y-4">
        {bestSellingThemes.map((theme, index) => (
          <div key={index}>
            <p className="text-gray-700 font-medium">{theme.name}</p>
            <div className="w-full bg-gray-200 rounded-full h-6 relative">
              <div
                className="bg-[#0f172a] h-6 rounded-full text-white flex items-center px-3"
                style={{ width: `${theme.percentage}%` }}
              >
                <span className="ml-auto">{theme.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingThemes;
