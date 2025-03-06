import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
          <img
  src="../transperant-logo.png"
  alt="ithemes"
  className="w-40 mb-4 filter brightness-0 invert"
/>

            <p className="text-gray-400 text-sm">
              Discover a diverse collection of responsive mobile and website
              themes for your app. Look through our resources for beautiful
              design and user-friendly layouts.
            </p>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/productdetail/team11" className="hover:text-white">
                  Team11
                </a>
              </li>
              <li>
                <a href="/productdetail/ionic-5-ui-component/" className="hover:text-white">
                  Ionic 5 UI Starter Pack
                </a>
              </li>
              <li>
                <a href="/productdetail/urbanclape-clone-framework-7-clap-app-v1/" className="hover:text-white">
                  Clap App Framework 7
                </a>
              </li>
              <li>
                <a href="/productdetail/driveease/" className="hover:text-white">
                  Ionic 3 Cab Application Theme
                </a>
              </li>
            </ul>
          </div>

          {/* Latest Products Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Latest Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/productdetail/get-by-travel/" className="hover:text-white">
                  GetBus
                </a>
              </li>
              <li>
                <a href="/productdetail/chatapp/" className="hover:text-white">
                  Chat App
                </a>
              </li>
              <li>
                <a href="/productdetail/fooddelivery-app/" className="hover:text-white">
                  Delivery App
                </a>
              </li>
              <li>
                <a href="/productdetail/ngo-deck/" className="hover:text-white">
                  Donation App
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/contactus" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacypolicy" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="/refund_returns" className="hover:text-white">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="/aboutus" className="hover:text-white">
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          &copy; 2024 Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
