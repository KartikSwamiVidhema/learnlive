import React from 'react';
import { Button } from "@/components/ui/button";

const categories = [
  "All", "eBooks", "Courses", "Templates", "Software", "Memberships", "Services", "Physical products"
];

const CategoryList = () => {
  return (
    <div className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-2 overflow-x-auto">
          {categories.map((category, index) => (
            <li key={index}>
              <Button  variant={index === 0 ? "default" : "outline"} size="sm">
                {category}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;