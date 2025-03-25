import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "../../context/CartContext";
import { Trash2 } from "lucide-react";
import StripePayment from "@/components/StripePayment";
import { useRouter } from "next/router";

const CheckoutForm = () => {
  const [showStripe, setShowStripe] = useState(false);
  const { cart, updateCart, removeFromCart, clearCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const { subtotal, setSubtotal } = useCart();
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login status
  const router = useRouter();
  console.log(cartItems, "cartcart");

  // Fetch user email & ID from localStorage on mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userdata"));
    if (userData?.email) {
      setUserEmail(userData.email);
      setUserId(userData._id);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        router.push("/login"); // Redirect to login page
      }, 3000);
    }
  }, [isLoggedIn, router]);

  // Update cart items when cart changes
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  // Calculate subtotal
  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.salePrice * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  }, [cartItems, setSubtotal]);

  // Handle placing order and show Stripe payment
  const handlePlaceOrder = () => {
    setShowStripe(true);
  };

  // Save payment details & Create Order
  const savePaymentDetails = async (paymentInfo) => {
    localStorage.setItem("paymentDetails", JSON.stringify(paymentInfo));

    const orderData = {
      transaction_id: paymentInfo.transaction_id,
      customer: userId,
      items: cartItems.map((item) => ({
        item_id: item._id,
        item_quantity: item.quantity,
        item_price: item.salePrice,
      })),
      payment_method: "Card",
      tax: 0.0,
      discount: 0.0,
      sub_total: subtotal,
      grand_total: subtotal,
      order_note: "",
      billing_address: {
        street: "123 Main St",
        city: "New York",
        zip: "10001",
      },
      phone_no: "9876543210",
    };

    try {
      const response = await fetch("/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Order created:", data.data);
        clearCart(); // Clear cart after successful order
      } else {
        console.error("Order creation failed:", data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-bold text-red-600">
          Please log in first to proceed to checkout.
        </h2>
        <p className="text-gray-500 mt-2">Redirecting to login page...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 ">
        <div className="py-10 flex flex-col gap-y-7">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Checkout</h2>
            <div className="overflow-x-auto flex-1 bg-white shadow-md rounded-lg p-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 whitespace-nowrap">Image</th>
                    <th className="p-3 whitespace-nowrap">Product Name</th>
                    <th className="p-3 whitespace-nowrap">Price</th>
                    <th className="p-3 whitespace-nowrap">Quantity</th>
                    <th className="p-3 whitespace-nowrap">Total</th>
                    <th className="p-3 whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="p-3">
                        <img
                          src={item.coverImage}
                          alt={item.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                      </td>
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">${item.salePrice}</td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          className="w-16 border rounded-md p-1 text-center"
                        />
                      </td>
                      <td className="p-3">${item.salePrice * item.quantity}</td>
                      <td className="p-3">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Card >
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>Order notes (optional)</Label>
                <Input placeholder="Notes about your order, e.g. special notes for delivery." />
              </CardContent>
            </Card>
          </div>

          <Card className="z-0">
            <CardHeader>
              <CardTitle>Your order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-b pb-4 mb-4">
                <p>Product Subtotal</p>
                <p className="text-right font-bold">${subtotal}</p>
              </div>
              <p className="text-sm text-gray-500">
                Billing Email: {userEmail}
              </p>
              <Button className="mt-4 " onClick={handlePlaceOrder}>
                Place order
              </Button>
              {showStripe && (
                <StripePayment
                  amount={subtotal}
                  email={userEmail}
                  sellerid={cartItems?.[0]?.vendor?.[0] ?? ""}
                  userId={userId}
                  onSuccess={(paymentInfo) => savePaymentDetails(paymentInfo)}
                  isOpen={showStripe}
                  setIsOpen={setShowStripe}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutForm;