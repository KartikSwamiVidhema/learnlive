import Header from "@/components/Header";
import { Briefcase, Users, Globe } from "lucide-react";
import Footer from "@/components/Footer";

export default function AboutUs() {
  return (
    <>
  
    <div className="container mx-auto p-8">
      {/* Breadcrumb */}
      <div className="text-gray-500 text-sm mb-4">
        Home / <span className="text-black">About Us</span>
      </div>

      {/* Header */}
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-gray-700 text-lg mb-8">
        Here’s the most important thing you need to know: <strong>we’re more than just a marketing agency.</strong> We help small businesses realize their full growth potential, and we’re invested in their success.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
        <div>
          <Briefcase className="mx-auto text-gray-700" size={36} />
          <h3 className="text-xl font-semibold mt-2">Since 2017</h3>
          <p className="text-gray-600">Acme Marketing was founded in New York City.</p>
        </div>
        <div>
          <Users className="mx-auto text-gray-700" size={36} />
          <h3 className="text-xl font-semibold mt-2">14 Experts</h3>
          <p className="text-gray-600">We’re proud of our diverse and talented team.</p>
        </div>
        <div>
          <Globe className="mx-auto text-gray-700" size={36} />
          <h3 className="text-xl font-semibold mt-2">3 Countries</h3>
          <p className="text-gray-600">We work with businesses just like yours.</p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-red-100 text-red-700 italic text-lg p-4 text-center rounded-lg mb-12">
        Our team is driven by your success. Every single day, we’ll support your business and help you to succeed.
      </div>

      {/* Our History */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our History</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </section>

      {/* Our Promise */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Our Promise</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </section>
    </div>
    <Footer/>
    </>
  );
}
