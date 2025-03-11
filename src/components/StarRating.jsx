import React from "react";
import { Star, StarHalf } from "lucide-react";

const StarRating = ({ rating }) => {
  // Ensure rating is a valid number between 0 and 5
  const validRating = Math.max(0, Math.min(5, Number(rating) || 0));

  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 !== 0;
  const emptyStars = Math.max(0, 5 - Math.ceil(validRating));

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={i + fullStars + 1} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

export default StarRating;
