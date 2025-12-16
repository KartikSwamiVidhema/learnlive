import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/metaTags";
import metadata from "../components/common/metadata.json";

const CancellationPolicy = () => {
  const seo = metadata.cancellationpolicy;

  const sections = [
    {
      title: "Overview",
      content: [
        "Our refund and returns policy lasts 30 days. If 30 days have passed since your purchase, we can’t offer you a full refund or exchange.",
        "To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.",
        "Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers, or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases."
      ]
    },
    {
      title: "Additional non-returnable items",
      list: [
        "Gift cards",
        "Downloadable software products",
        "Some health and personal care items"
      ]
    },
    {
      title: "Partial Refunds",
      content: [
        "There are certain situations where only partial refunds are granted:"
      ],
      list: [
        "Books with obvious signs of use",
        "CDs, DVDs, software, or records that have been opened",
        "Any item not in its original condition, is damaged, or missing parts",
        "Any item that is returned more than 30 days after delivery"
      ]
    },
    {
      title: "Refunds",
      content: [
        "Once your return is received and inspected, we will notify you about the approval or rejection of your refund.",
        "If approved, the refund will be processed to your original payment method within a few days."
      ]
    },
    {
      title: "Late or Missing Refunds",
      content: [
        "If you haven’t received a refund yet, check your bank account again.",
        "Then contact your credit card company, as it may take some time before the refund is processed.",
        "If you’ve done all of this and still haven’t received your refund, contact us at info@ithemes.xyz."
      ]
    },
    {
      title: "Sale Items",
      content: ["Only regular-priced items may be refunded. Sale items cannot be refunded."]
    },
    {
      title: "Exchanges",
      content: [
        "We only replace items if they are defective or damaged. If you need an exchange, email us at info@ithemes.xyz."
      ]
    },
    {
      title: "Gifts",
      content: [
        "If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit once the return is processed.",
        "If the item wasn’t marked as a gift, we will issue a refund to the original purchaser."
      ]
    },
    {
      title: "Shipping Returns",
      content: [
        "To return your product, mail it to our returns address.",
        "Shipping costs are non-refundable, and you will be responsible for return shipping.",
        "For expensive items, consider using a trackable shipping service or purchasing shipping insurance."
      ]
    },
    {
      title: "Need Help?",
      content: ["Contact us at info@ithemes.xyz for questions related to refunds and returns."]
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



      <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-10">
        {/* Breadcrumb */}
        <p className="text-medium text-black-800">
          <a class="hover:underline" href="/">Home/</a> <span className="text-gray-400 font-sm">Refund and Returns Policy</span>
        </p>

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Refund and Returns Policy</h1>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-6 shadow-md border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h2>
              {section.content &&
                section.content.map((para, pIdx) => (
                  <p key={pIdx} className="text-gray-700 mb-2">{para}</p>
                ))}
              {section.list && (
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  {section.list.map((item, lIdx) => (
                    <li key={lIdx} className="mb-1">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CancellationPolicy;
