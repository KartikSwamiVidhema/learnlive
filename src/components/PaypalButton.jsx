import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const PayPalButton = ({ amount }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Create order on server
  const createOrder = async () => {
    // const apiBaseUrl = NEXT_PUBLIC_API_BASE_URL;
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/create-order`, {
        amount,
      });
      return response.data.id; // Return PayPal Order ID
    } catch (err) {
      setError("Order creation failed");
      console.error(err);
    }
  };

  // Capture order on server
  const onApprove = async (data) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/capture-order`, {
        orderID: data.orderID,
      });
      setSuccess(true);
    } catch (err) {
      setError("Payment capture failed");
      console.error(err);
    }
  };

  return (
    <div className="z-0" >
      {success ? (
        <h2>Payment Successful! 🎉</h2>
      ) : (
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(err) => setError("Payment failed")}
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PayPalButton;
