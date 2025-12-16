import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/metaTags";
import metadata from "../components/common/metadata.json";

const TermsAndConditions = () => {
  const seo = metadata.termsandconditions;

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "You indicate that you have read, understood, and agree to abide by these Terms by using the Website and purchasing or downloading Themes. Please refrain from using our website or themes if you disagree with any aspect of these terms."
    },
    {
      title: "2. Use of Themes",
      content: "In line with the individual licensing conditions specified with each Theme, iThemes.xyz provides you a non-exclusive, non-transferable, and revocable license to use Themes solely for your personal or commercial use. Without express written consent from iThemes.xyz, Themes may not be resold, distributed, or used for unauthorized commercial purposes."
    },
    {
      title: "3. Account Registration",
      content: "You might need to register for an account to use some Website features and buy Themes. You are responsible for protecting your account information and actions taken with your account. During registration, provide accurate, current, and complete information, and update it as needed."
    },
    {
      title: "4. Pricing and Payment",
      content: "The prices for Themes are posted on the website and are subject to change at any time without notice. Payments are processed safely via our payment provider, and their rules apply."
    },
    {
      title: "5. Refund Policy",
      content: "Refunds for purchased Themes are subject to our refund policy, available on the Website. Please review before purchasing."
    },
    {
      title: "6. Intellectual Property",
      content: "All Themes, content, and materials on the Website are protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without written consent."
    },
    {
      title: "7. Disclaimer of Warranties",
      content: "Themes and content are provided “as is” and “as available.” We make no guarantees regarding reliability or fitness for purpose. Use is at your own risk."
    },
    {
      title: "8. Limitation of Liability",
      content: "iThemes.xyz disclaims all liability for any damages resulting from use or inability to use our website or themes. Total responsibility will not exceed the price paid for the disputed Themes."
    },
    {
      title: "9. Privacy Policy",
      content: "Our Privacy Policy governs how we collect, use, and safeguard your personal information."
    },
    {
      title: "10. Termination",
      content: "We may terminate your use of Themes or access to the Website at any time, with or without notice."
    },
    {
      title: "11. Governing Law",
      content: "These Terms are governed by the laws of Jurisdiction without regard to conflict of law principles."
    },
    {
      title: "12. Contact Information",
      content: "For questions or concerns, contact us at info@ithemes.xyz. By using the Website and Themes, you agree to these Terms. Periodically review for updates."
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



      <div className="max-w-6xl mx-auto p-6 md:p-12">
        {/* Breadcrumb */}
        <p className="text-medium text-black-800">
          <a class="hover:underline" href="/">Home/</a> <span className="text-gray-400 font-sm">Terms and Conditions</span>
        </p>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Terms and Conditions
        </h1>

        {/* Intro */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200 shadow-sm">
          <p className="text-gray-700">
            These General Terms and Conditions govern your use of the iThemes.xyz website
            and the purchase and use of website, iOS, and Android themes (“Themes”) provided by iThemes.xyz.
            By accessing the Website and using our services, you agree to abide by these Terms. Please read them carefully.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 shadow-md ${index % 2 === 0 ? "bg-white border-l-4 border-primary" : "bg-gray-50 border border-gray-200"
                }`}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
              <p className="text-gray-700">{section.content}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TermsAndConditions;
