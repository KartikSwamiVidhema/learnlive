import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

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
        backgroundImage: `url(https://static.vecteezy.com/system/resources/thumbnails/003/570/649/small_2x/touching-virtual-screen-online-shopping-to-digital-cart-with-global-network-connection-intelligent-ecommerce-blue-background-free-photo.jpg)`, // Replace with the desired image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay color updated */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-blue-900/40 to-black/60"></div>

      <div className="relative z-10 pl-20 max-w-2xl text-left text-white space-y-6">
        {/* Headline with fade animation */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentHeadline}
            className="font-extrabold text-4xl md:text-5xl leading-tight"
            style={{ color: titleColor || "#fff" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            {currentHeadline}
          </motion.h2>
        </AnimatePresence>

        {/* Paragraph fade-in */}
        <motion.p
          className="text-lg max-w-lg"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          iThemes delivers the best responsive mobile app themes that are
          user-friendly, well organized, and crafted to save your time.
        </motion.p>

        {/* New feature highlights with staggered animation */}
        <motion.ul
          className="space-y-2 text-sm md:text-base list-disc list-inside text-gray-200"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {[
            "100% responsive & mobile-friendly designs",
            "Unlimited downloads with premium subscription",
            "Updated weekly with fresh content",
          ].map((item, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex items-center gap-2"
            >
              <span className="text-green-400 font-bold">✔</span> {item}
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA button with entrance animation */}

      </div>
    </section>
  );
};

export default HomeBanner;
