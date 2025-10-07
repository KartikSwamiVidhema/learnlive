import React from "react";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import LazyImage from "./common/LazyImage";

let currentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 p-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About Section (Full width) */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <LazyImage
            src="../transperant-logo.png"
            alt="ithemes"
            className="w-40 mb-4 filter brightness-0 invert"
          />
          <p className="text-gray-400 text-sm">
            Discover a diverse collection of responsive mobile and website
            themes for your app. Look through our resources for beautiful
            design and user-friendly layouts.
          </p>
          <div className="flex mt-2 space-x-4">
            <a href="https://www.facebook.com/profile.php?id=61550882554964&mibextid=2JQ9oc" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-white" />
            </a>
            <a href="https://www.linkedin.com/company/i-theme/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-white" />
            </a>
            <a href="https://www.instagram.com/ithemes02/?igshid=OGQ5ZDc2ODk2ZA%3D%3D" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6 text-gray-400 hover:text-white" />
            </a>
          </div>
        </div>

        {/* Products Section (Full width) */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Products</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/productdetail/team11" className="hover:text-white">Team11</a></li>
            <li><a href="/productdetail/ionic-5-ui-component/" className="hover:text-white">Ionic 5 UI Starter Pack</a></li>
            <li><a href="/productdetail/urbanclape-clone-framework-7-clap-app-v1/" className="hover:text-white">Clap App Framework 7</a></li>
            <li><a href="/productdetail/driveease/" className="hover:text-white">Ionic 3 Cab Application Theme</a></li>
          </ul>
        </div>

        {/* Latest Products Section (50% width on mobile) */}
        <div className="col-span-1 sm:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Latest Products</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/productdetail/get-by-travel/" className="hover:text-white">GetBus</a></li>
            <li><a href="/productdetail/chatapp/" className="hover:text-white">Chat App</a></li>
            <li><a href="/productdetail/fooddelivery-app/" className="hover:text-white">Delivery App</a></li>
            <li><a href="/productdetail/ngo-deck/" className="hover:text-white">Donation App</a></li>
          </ul>
        </div>

        {/* Quick Links Section (50% width on mobile) */}
        <div className="col-span-1 sm:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/contactus" className="hover:text-white">Contact Us</a></li>
            <li><a href="/privacypolicy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/termsandconditions" className="hover:text-white">Terms and Conditions</a></li>
            <li><a href="/cancellationpolicy" className="hover:text-white">Cancellation Policy</a></li>
            <li><a href="/aboutus" className="hover:text-white">About Us</a></li>
          </ul>
        </div>
      </div>



      {/* Copyright Section */}

      <div className="mt-8 pt-6 border-t border-gray-700 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p>&copy; {currentYear} IThemes. All rights reserved.</p>
        <div className="mt-2 md:mt-0 flex flex-col md:flex-row gap-2 md:gap-4">
          <p>
            Email:{" "}
            <a
              href="mailto:info@ithemes.xyz"
              className="text-grey-400 underline hover:text-white"
            >
              info@ithemes.xyz
            </a>
          </p>
          <p className="text-grey-400">Phone: (+91) 882 985 1547</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
