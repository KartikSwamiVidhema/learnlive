import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/router";

const HomeBanner = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [bannerImage, setDesktopBanner] = useState("");
  const [titleColor, setTitleColor] = useState("");

  const headlines = [
    "Explore 10K+ ready-to-use templates for designing",
    "Discover The Best Mobile Apps Themes & Website Templates For Your Project.",
    "Get Premium UI Kits, Illustrations & Icons for Your Next Project",
  ];
  const [currentHeadline, setCurrentHeadline] = useState(headlines[0]);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => {
        const nextIndex = (headlines.indexOf(prev) + 1) % headlines.length;
        return headlines[nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/gethomepage`);
        setDesktopBanner(response.data.data.desktopBanner);
        setTitleColor(response.data.data.titleColor);
      } catch (error) {
        console.error("Error fetching homepage banner:", error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <section
      className="relative py-10 px-6 md:px-12 flex justify-left items-center h-[500px] backdrop-blur"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay color updated */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-blue-900/40 to-black/60"></div>

      <div className="relative z-10 pl-20 max-w-2xl text-left text-white space-y-6">
        <h2
          className="font-extrabold text-4xl md:text-5xl leading-tight"
          style={{ color: titleColor || "#fff" }}
        >
          {currentHeadline}
        </h2>
        <p className="text-lg max-w-lg">
          iThemes delivers the best responsive mobile app themes that are
          user-friendly, well organized, and crafted to save your time.
        </p>

        {/* New feature highlights */}
        <ul className="space-y-2 text-sm md:text-base list-disc list-inside text-gray-200">
          <li>✔ 100% responsive & mobile-friendly designs</li>
          <li>✔ Unlimited downloads with premium subscription</li>
          <li>✔ Updated weekly with fresh content</li>
        </ul>

        {/* CTA buttons */}

      </div>
    </section>
  );
};

export default HomeBanner;
