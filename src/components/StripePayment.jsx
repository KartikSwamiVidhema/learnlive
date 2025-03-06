import { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const StripePayment = ({ amount, form }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [createOrderData, setCreateOrderData] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [cartdata, setcartdata] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [customerId, setcustomerId] = useState("");

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const billing_address = {
    city: form.city,
    country: form.country,
    pinCode: form.pinCode,
    state: form.state,
    streetAddress: form.streetAddress,
    email: form.email,
    ...(customerId ? {} : { firstname: form.firstName, lastname: form.lastName }),
    phone: form.phone,
  };
  useEffect(() => {
    const userData = localStorage.getItem("userdata");
    const cartdata = localStorage.getItem("cart");

    if (cartdata) {
      try {
        const parsedCart = JSON.parse(cartdata);

        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          const cartdata = parsedCart[0];
          setcartdata(cartdata);
        }
      } catch (error) {
        console.error("Error parsing cartdata:", error);
      }
    }

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);

        setcustomerId(parsedData._id);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch PaymentIntent when component mounts
    const fetchPaymentIntent = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, email: "customer@example.com" }),
        });

        if (!res.ok) throw new Error("Failed to create payment intent");

        const { paymentIntent } = await res.json();
        setCreateOrderData(paymentIntent);

        setClientSecret(paymentIntent.client_secret);
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
      // Confirm payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: elements.getElement(CardElement) },
        }
      );

      setOrderStatus(paymentIntent?.status);
      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setSuccess(true);
        setIsOpen(false);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong!");
    }

    setLoading(false);
  };

  const SubmitOrder = async () => {
    try {
      await axios.post(`${apiBaseUrl}/order`, {
        order_id: Date.now(), // Unique order ID
        transaction_id: createOrderData.id,
        payment_method: createOrderData.payment_method_types[0],
        sub_total: createOrderData.amount,
        // grand_total: (createOrderData.amount + tax - discount).toFixed(2),
        order_status: orderStatus || "Pending",
        payment_status: "Paid",
        customer: customerId,
        billing_address,
        items: [
          {
            item_id: cartdata._id,
            item_quantity: cartdata.quantity,
          },
        ],
      });
      toast.success("Review submitted successfully!");
      router.push("/thankyoupage");
    } catch (error) {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <>
      {/* Button to Open Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-300 text-white px-5 py-2 rounded-lg hover:bg-purple-400 transition duration-300 w-full"
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

            <h2 className="text-lg font-semibold text-center mb-4">
              Enter Card Details
            </h2>

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
                onClick={SubmitOrder}
              >
                {loading
                  ? "Processing..."
                  : `Pay $${(amount / 100).toFixed(2)}`}
              </button>
            <ToastContainer />


              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {success && (
                <p className="text-green-500 text-sm mt-2">
                  Payment Successful!
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StripePayment;
