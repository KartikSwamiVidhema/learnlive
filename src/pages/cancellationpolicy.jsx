import Footer from "@/components/Footer";
import Header from "@/components/Header";

const CancellationPolicy = () => {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto p-6 text-gray-700">
        <h1 className="text-3xl font-bold mb-4 text-black">Refund and Returns Policy</h1>
        <p className="text-gray-500 text-sm">Home / Refund and Returns Policy</p>

        <h2 className="text-2xl font-semibold mt-6 text-black">Overview</h2>
        <p className="text-gray-500 text-base">
          Our refund and returns policy lasts <strong>30 days</strong>. If 30 days have passed since your purchase, we can’t offer you a full refund or exchange.
        </p>
        <p className="text-gray-500 text-base">
          To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
        </p>
        <p className="text-gray-500 text-base">
          Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers, or magazines cannot be returned.
          We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.
        </p>

        <h3 className="text-xl font-semibold mt-6 text-black">Additional non-returnable items:</h3>
        <ul className="list-disc pl-6 mt-2 text-gray-500 text-base">
          <li>Gift cards</li>
          <li>Downloadable software products</li>
          <li>Some health and personal care items</li>
        </ul>

        <p className="text-gray-500 text-base">To complete your return, we require a receipt or proof of purchase.</p>
        <p className="mt-4">Please do not send your purchase back to the manufacturer.</p>

        <h3 className="text-xl font-semibold mt-6 text-black">Partial Refunds</h3>
        <p className="text-gray-500 text-base">There are certain situations where only partial refunds are granted:</p>
        <ul className="list-disc pl-6 mt-2 text-gray-500 text-base">
          <li>Books with obvious signs of use</li>
          <li>CDs, DVDs, software, or records that have been opened</li>
          <li>Any item not in its original condition, is damaged, or missing parts</li>
          <li>Any item that is returned more than 30 days after delivery</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 text-black">Refunds</h2>
        <p className="text-gray-500 text-base">Once your return is received and inspected, we will notify you about the approval or rejection of your refund.</p>
        <p className="text-gray-500 text-base">If approved, the refund will be processed to your original payment method within a few days.</p>

        <h3 className="text-xl font-semibold mt-6 text-black">Late or Missing Refunds</h3>
        <p className="text-gray-500 text-base">If you haven’t received a refund yet, check your bank account again.</p>
        <p className="text-gray-500 text-base">Then contact your credit card company, as it may take some time before the refund is processed.</p>
        <p className="text-gray-500 text-base">If you’ve done all of this and still haven’t received your refund, contact us at <strong>info@ithemes.xyz</strong>.</p>

        <h3 className="text-xl font-semibold mt-6 text-black">Sale Items</h3>
        <p className="text-gray-500 text-base">Only regular-priced items may be refunded. Sale items cannot be refunded.</p>

        <h2 className="text-2xl font-semibold mt-6 text-black">Exchanges</h2>
        <p className="text-gray-500 text-base">
          We only replace items if they are defective or damaged. If you need an exchange, email us at <strong>info@ithemes.xyz</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-black">Gifts</h2>
        <p className="text-gray-500 text-base">
          If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit once the return is processed.
        </p>
        <p className="text-gray-500 text-base">
          If the item wasn’t marked as a gift, we will issue a refund to the original purchaser.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-black">Shipping Returns</h2>
        <p className="text-gray-500 text-base">To return your product, mail it to our returns address.</p>
        <p className="text-gray-500 text-base">Shipping costs are non-refundable, and you will be responsible for return shipping.</p>
        <p className="text-gray-500 text-base">For expensive items, consider using a trackable shipping service or purchasing shipping insurance.</p>

        <h2 className="text-2xl font-semibold mt-6 text-black">Need Help?</h2>
        <p className="text-gray-500 text-base">Contact us at <strong>info@ithemes.xyz</strong> for questions related to refunds and returns.</p>
      </div>
      <Footer />
    </>
  );
};

export default CancellationPolicy;
