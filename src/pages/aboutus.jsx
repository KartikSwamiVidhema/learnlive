import Header from "@/components/Header";
import { Briefcase, Users, Globe } from "lucide-react";
import Footer from "@/components/Footer";
import MetaTags from "@/components/metaTags";
import metadata from "../components/common/metadata.json";

export default function AboutUs() {
  const seo = metadata.about;

  const stats = [
    {
      icon: <Briefcase className="text-gray-700" size={36} />,
      title: "Since 2017",
      description: "Acme Marketing was founded in New York City."
    },
    {
      icon: <Users className="text-gray-700" size={36} />,
      title: "14 Experts",
      description: "We’re proud of our diverse and talented team."
    },
    {
      icon: <Globe className="text-gray-700" size={36} />,
      title: "3 Countries",
      description: "We work with businesses just like yours."
    }
  ];

  const sections = [
    {
      title: "Our History",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      title: "Our Promise",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
  ];

  return (
    <>
      <MetaTags
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />



      <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
        {/* Breadcrumb */}
        <p className="text-medium text-black-800">
          <a class="hover:underline" href="/">Home/</a><span className="text-gray-400 font-sm">About Us</span>
        </p>

        {/* Page Title & Intro */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Here’s the most important thing you need to know: <strong>we’re more than just a marketing agency.</strong>
            We help small businesses realize their full growth potential, and we’re invested in their success.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
              {stat.icon}
              <h3 className="text-xl font-semibold mt-4">{stat.title}</h3>
              <p className="text-gray-600 mt-2 max-w-xs">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-red-100 text-red-700 italic text-lg p-6 text-center rounded-lg shadow-sm">
          Our team is driven by your success. Every single day, we’ll support your business and help you to succeed.
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-6 shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <p className="text-gray-700">{section.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with vertical date */}
      <Footer className="relative" />
      <div className="fixed bottom-4 right-4 flex flex-col items-center space-y-1 text-gray-400 text-sm">
        {new Date().toLocaleDateString("en-US").split("/").map((part, i) => (
          <span key={i}>{part}</span>
        ))}
      </div>
    </>
  );
}
