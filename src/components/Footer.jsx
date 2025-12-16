"use client";
import React, { useEffect, useState } from "react";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import LazyImage from "./common/LazyImage";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden py-10 px-6 md:px-12">
      {/* Animated background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 right-0 w-72 h-72 bg-blue-600 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {/* About Section */}
        <div>
          <LazyImage
            src="../transperant-logo.png"
            alt="ithemes"
            className="w-40 mb-4 filter brightness-0 invert drop-shadow-md hover:scale-105 transition-transform duration-300"
          />
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover a diverse collection of responsive mobile and website
            themes for your app. Look through our resources for beautiful
            designs and user-friendly layouts.
          </p>

          {/* Social Icons */}
          <div className="flex mt-4 space-x-5">
            {[
              {
                href: "https://www.facebook.com/profile.php?id=61550882554964&mibextid=2JQ9oc",
                icon: Facebook,
              },
              {
                href: "https://www.linkedin.com/company/i-theme/",
                icon: Linkedin,
              },
              {
                href: "https://www.instagram.com/ithemes02/?igshid=OGQ5ZDc2ODk2ZA%3D%3D",
                icon: Instagram,
              },
            ].map(({ href, icon: Icon }, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="w-6 h-6 text-gray-400 hover:text-white transition-colors duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">
            Products
          </h3>
          <ul className="space-y-2 text-gray-400">
            {[
              ["Team11", "/productdetail/team11"],
              ["Ionic 5 UI Starter Pack", "/productdetail/ionic-5-ui-component"],
              ["Clap App Framework 7", "/productdetail/urbanclape-clone-framework-7-clap-app-v1"],
              ["Ionic 3 Cab Application Theme", "/productdetail/driveease"],
            ].map(([title, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Latest Products Section */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">
            Latest Products
          </h3>
          <ul className="space-y-2 text-gray-400">
            {[
              ["GetBus", "/productdetail/get-by-travel"],
              ["Chat App", "/productdetail/chatapp"],
              ["Delivery App", "/productdetail/fooddelivery-app"],
              ["Donation App", "/productdetail/ngo-deck"],
            ].map(([title, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Quick Links Section */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-400">
            {[
              ["Contact Us", "/contactus"],
              ["Privacy Policy", "/privacypolicy"],
              ["Terms and Conditions", "/termsandconditions"],
              ["Cancellation Policy", "/cancellationpolicy"],
              ["About Us", "/aboutus"],
            ].map(([title, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Divider */}
      <motion.hr
        className="mt-12 border-gray-700 opacity-50"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Footer Bottom */}
      <motion.div
        className="mt-8 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center text-center md:text-left relative z-10"
        variants={fadeUp}
      >
        <p className="mb-3 md:mb-0">
          © {year} <span className="text-white font-semibold">IThemes</span>. All rights reserved.
        </p>

        <div className="text-gray-400 text-sm">
          <p>
            Email:{" "}
            <Link
              href="mailto:info@ithemes.xyz"
              className="underline hover:text-white transition-colors"
            >
              info@ithemes.xyz
            </Link>
          </p>
          <p>Phone: (+91) 882 985 1547</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
