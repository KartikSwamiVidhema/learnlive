import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Shield, Globe, Lock, Users, Database, Link, AlertCircle } from "lucide-react";
import MetaTags from "@/components/metaTags";
import metadata from "../components/common/metadata.json";

const PrivacyPolicy = () => {
  const seo = metadata.privacypolicy;

  return (
    <>
      <MetaTags
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />


      <div className="max-w-6xl mx-auto p-6 md:p-12">
        {/* Breadcrumb */}
        <p className="text-medium text-black-800">
          <a class="hover:underline" href="/">Home/</a> <span className="text-gray-400 font-sm">Privacy Policy</span>
        </p>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Privacy Policy
        </h1>

        {/* Effective Date Card */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 border-l-4 border-primary">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Effective Date</h2>
          <p className="text-gray-700 font-medium">20 July 2023</p>
        </div>

        {/* Introduction */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
          <p className="text-gray-700">
            At iThemes Technologies, your privacy is of utmost importance. This Privacy Policy provides clarity on how we handle your personal information when you engage with our website, products, and services.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {/* Information we collect */}
          <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-yellow-400">
            <h3 className="flex items-center text-xl font-semibold text-gray-900 mb-2">
              <Shield className="mr-2" /> Information We Collect
            </h3>
            <p className="text-gray-700">
              We may collect personal information such as name, email, phone, and postal address. Non-personal data like IP address, browser type, and device details are also collected.
            </p>
          </div>

          {/* Use of information */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="flex items-center text-xl font-semibold text-gray-900 mb-2">
              <Globe className="mr-2" /> Use of Information
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Communication: Use contact details for product updates and promotions.</li>
              <li>Website Improvement: Analyze user behavior and trends using non-personal data.</li>
              <li>Legal Compliance: Disclose data to meet legal obligations.</li>
            </ul>
          </div>

          {/* Data retention */}
          <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-400">
            <h3 className="flex items-center text-xl font-semibold text-gray-900 mb-2">
              <Lock className="mr-2" /> Data Retention
            </h3>
            <p className="text-gray-700">
              We retain personal data as long as necessary. When no longer needed, we securely delete or anonymize it.
            </p>
          </div>

          {/* Sharing of information */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="flex items-center text-xl font-semibold text-gray-900 mb-2">
              <Users className="mr-2" /> Sharing of Information
            </h3>
            <p className="text-gray-700">
              We do not sell or rent personal information. It may be shared with trusted third-party providers under strict confidentiality agreements.
            </p>
          </div>

          {/* Cookies */}
          <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-400">
            <h3 className="flex items-center text-xl font-semibold text-gray-900 mb-2">
              <Database className="mr-2" /> Cookies & Similar Technologies
            </h3>
            <p className="text-gray-700">
              We use cookies to enhance user experience. You can manage cookies through your browser settings.
            </p>
          </div>

          {/* Data security */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="flex items-center text-xl font-semibold text-gray-900 mb-2">
              <Lock className="mr-2" /> Data Security
            </h3>
            <p className="text-gray-700">
              We implement security measures to protect information, but no internet transmission is 100% secure.
            </p>
          </div>

          {/* Third-party links */}
          <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-purple-400">
            <h3 className="flex items-center text-xl font-semibold text-gray-900 mb-2">
              <Link className="mr-2" /> Third-Party Links
            </h3>
            <p className="text-gray-700">
              Our site may contain third-party links. We are not responsible for their content or privacy practices.
            </p>
          </div>

          {/* Children's privacy */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="flex items-center text-xl font-semibold text-gray-900 mb-2">
              <AlertCircle className="mr-2" /> Children's Privacy
            </h3>
            <p className="text-gray-700">
              Our services are not intended for individuals under 13. We do not knowingly collect information from children.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
