import React from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import LazyImage from "./common/LazyImage";

const DEFAULT_IMAGE = "https://tse1.mm.bing.net/th/id/OIP.mtFzdGV6x4bKHCxjmS7yrQHaF4?pid=Api&P=0&h=180";

const StarRating = ({ rating = 0 }) => {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center">
      {[...Array(full)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400" />
      ))}
      {[...Array(5 - full)].map((_, i) => (
        <Star key={i + full} className="w-4 h-4 text-gray-200" />
      ))}
    </div>
  );
};

const getImage = (p) => {
  const src = p?.coverImage || p?.scanner_url || "";
  if (!src || typeof src !== "string" || !src.trim()) return DEFAULT_IMAGE;
  return src.startsWith("http") ? src : src; // keep existing behavior; adjust if you need to prepend baseUrl
};

const FeaturedProducts = ({ products = [] }) => {
  const router = useRouter();



  // ensure max 10
  const list = products.slice(0, 10);

  const handleOpen = (p) => {
    const slug = p.slug || p._id || p.id;
    if (!slug) return;
    // use pathname + query so Next treats this as dynamic route navigation
    router.push({
      pathname: "/productdetail/[slug]",
      query: { slug },
    });
  };

  return (
    <div className="bg-white border border-gray-300 p-4 shadow-sm mb-9 ">
      <h3 className="  font-semibold mb-3">Top Featured Products</h3>
      <div className="space-y-0">
        {list.map((p, idx) => (
          <div
            key={p._id || p.id}
            role="button"
            tabIndex={0}
            onClick={() => handleOpen(p)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen(p); }}
            className={`flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition cursor-pointer ${idx !== list.length - 1 ? "border-b border-gray-200" : ""}`}
          >

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className=" text-sm font-medium truncate">{p.name || p.title}</div>

              </div>

            </div>
            <div className="w-16 h-12 flex-shrink-0 overflow-hidden rounded">
              <LazyImage
                src={getImage(p)}
                alt={p.name || p.title || "product"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
