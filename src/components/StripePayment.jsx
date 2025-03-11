import { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { X } from "lucide-react";

const StripePayment = ({ amount,email,userId,sellerid }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (!amount) {
        setError("Invalid payment amount.");
        return;
      }

      try {
        const res = await fetch(`${apiBaseUrl}/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, email }),
        });

        if (!res.ok) {
          throw new Error("Failed to create payment intent");
        }

        const { clientSecret } = await res.json();
        setClientSecret(clientSecret);
      } catch (err) {
        console.error("Error fetching clientSecret:", err);
        setError("Error initializing payment.");
      }
    };

    fetchPaymentIntent();
  }, [amount]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });
  
      if (error) {
        setError(error.message);
      } else if (paymentIntent?.status === "succeeded") {
        setSuccess(true);
        setIsOpen(false);
        
        // Save order details to backend
        await saveOrderDetails(paymentIntent);
  
        if (router) router.push("/thankyoupage");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong!");
    }
  
    setLoading(false);
  };
  
  // Function to save order details to backend
  const saveOrderDetails = async (paymentIntent) => {
    const orderData = {
      order_id: Math.floor(100000 + Math.random() * 900000), // Generate random order ID
      transaction_id: paymentIntent.id,
      customer: userId, // Assuming userId is stored in localStorage
      sellerid: sellerid, 
      items: JSON.parse(localStorage.getItem("cart")).map((item) => ({
        item_id: item._id,
        item_quantity: item.quantity,
        item_price: item.salePrice,
      })),
      payment_method: "Card",
      tax: 0.0,
      discount: 0.0,
      sub_total: amount,
      grand_total: amount,
      order_status: "succeeded",
      payment_status: "Paid",
      order_note: "",
      // billing_address: {
      //   street: "123 Main St",
      //   city: "New York",
      //   zip: "10001",
      // },
    };
  
    try {
      const res = await fetch(`${apiBaseUrl}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
  
      const data = await res.json();
      if (data.success) {
        console.log("Order saved successfully:", data);
        localStorage.removeItem("cart"); // Clear cart after successful order
      } else {
        console.error("Failed to save order:", data.message);
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };
  

  return (
    <>
      {/* Button to Open Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-300 text-white w-full px-5 py-2 rounded-lg hover:bg-purple-500 transition duration-300"
      >
        Pay Now
      </button>

      {/* Payment Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold text-center mb-4">Enter Card Details</h2>

            <form onSubmit={handleSubmit}>
              <div className="border p-3 rounded-md">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": { color: "#aab7c4" },
                      },
                      invalid: { color: "#9e2146" },
                    },
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={!stripe || loading || !clientSecret}
                className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                {loading ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
              </button>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {success && <p className="text-green-500 text-sm mt-2">Payment Successful!</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StripePayment;