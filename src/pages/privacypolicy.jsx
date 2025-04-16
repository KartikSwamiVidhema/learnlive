import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Shield, Globe, Lock, Users, Database, Link, AlertCircle } from "lucide-react";
import MetaTags from "@/components/metaTags";
import metadata from "../components/common/metadata.json"

const PrivacyPolicy =()=> {
  const seo = metadata.privacypolicy;
  return (
    <>
     <MetaTags
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-500">Home / Privacy Policy</p>

      <h2 className="text-xl font-semibold mt-6">Effective date: <span className="font-bold">[20 July 2023]</span></h2>
      <p className="mt-4 text-gray-700">
        At iThemes Technologies, your privacy is of utmost importance to us. This Privacy Policy aims to provide you with a
        clear understanding of how we handle your personal information when you engage with our website, products, and services.
      </p>

      <section className="mt-6">
        <h3 className="flex items-center text-lg font-semibold"><Shield className="mr-2" /> Information we collect</h3>
        <p className="mt-2 text-gray-700">
          We may collect personal information you provide, such as name, email, phone, and postal address. We also gather
          non-personal data like IP address, browser type, and device details.
        </p>
      </section>

      <section className="mt-6">
        <h3 className="flex items-center text-lg font-semibold"><Globe className="mr-2" /> Use of information</h3>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>Communication: We may use your contact details for product updates and promotional materials.</li>
          <li>Website Improvement: Non-personal information helps us analyze user behavior and trends.</li>
          <li>Legal Compliance: Your data may be disclosed to comply with legal obligations.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="flex items-center text-lg font-semibold"><Lock className="mr-2" /> Data retention</h3>
        <p className="mt-2 text-gray-700">
          We retain your personal data as long as necessary for our policies or legal requirements. When no longer needed,
          we securely delete or anonymize it.
        </p>
      </section>

      <section className="mt-6">
        <h3 className="flex items-center text-lg font-semibold"><Users className="mr-2" /> Sharing of information</h3>
        <p className="mt-2 text-gray-700">
          We do not sell or rent your personal information. However, we may share it with trusted third-party providers for
          operational purposes under strict confidentiality agreements.
        </p>
      </section>

      <section className="mt-6">
        <h3 className="flex items-center text-lg font-semibold"><Database className="mr-2" /> Cookies and similar technologies</h3>
        <p className="mt-2 text-gray-700">
          We use cookies and similar technologies to enhance user experience. You can manage cookies through your browser settings.
        </p>
      </section>

      <section className="mt-6">
        <h3 className="flex items-center text-lg font-semibold"><Lock className="mr-2" /> Data security</h3>
        <p className="mt-2 text-gray-700">
          We implement security measures to protect your information. However, no internet transmission is 100% secure.
        </p>
      </section>

      <section className="mt-6">
        <h3 className="flex items-center text-lg font-semibold"><Link className="mr-2" /> Third-party links</h3>
        <p className="mt-2 text-gray-700">
          Our site may contain third-party links. We are not responsible for their content or privacy practices.
        </p>
      </section>

      <section className="mt-6">
        <h3 className="flex items-center text-lg font-semibold"><AlertCircle className="mr-2" /> Children's Privacy</h3>
        <p className="mt-2 text-gray-700">
          Our services are not intended for individuals under 13. We do not knowingly collect information from children.
        </p>
      </section>
    </div>
    <Footer/>
    </>
  );
}
export default PrivacyPolicy;