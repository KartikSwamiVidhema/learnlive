import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "../../context/CartContext";
import { Trash2, ShoppingCart, CreditCard } from "lucide-react";
import StripePayment from "@/components/StripePayment";
import { useRouter } from "next/router";
import LazyImage from "@/components/common/LazyImage";

const CheckoutForm = () => {
  const [showStripe, setShowStripe] = useState(false);
  const { cart, updateCart, removeFromCart, clearCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const { subtotal, setSubtotal } = useCart();
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login status
  const router = useRouter();

  const handleQuantityChange = (itemId, value) => {
    const newQuantity = Math.min(Math.max(value, 1), 10); // Clamp between 1 and 10
    const updatedCart = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

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

  const defaultImage = "https://tse1.mm.bing.net/th/id/OIP.mtFzdGV6x4bKHCxjmS7yrQHaF4?pid=Api&P=0&h=180";

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-red-100 animate-bounce">
        <h2 className="text-xl font-bold text-red-600 drop-shadow-lg">
          Please log in first to proceed to checkout.
        </h2>
        <p className="text-gray-500 mt-2">Redirecting to login page...</p>
      </div>
    );
  }

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-200 to-white-100 py-10 px-4 md:px-12 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-200 to-white-100 blur-3xl animate-pulse"></div>
        <div className="relative z-10">

          {/* Main Container - Single Card Layout */}
          <Card className="max-w-5xl max-h-4xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl border-2 border-[#03045E] overflow-hidden">
            <CardContent className="p-8">
              <div className="grid grid-cols-1  gap-4">
                {/* Left Section - Cart Items (Spans 2 columns on xl) */}
                <div className="xl:col-span-1 space-y-4  ">
                  <div className="flex items-center text-center align-middle justify-center space-x-2 mb-4">
                    <ShoppingCart className="text-gray-600" size={24} />
                    <h3 className="text-2xl font-semibold text-gray-700">Your Cart</h3>
                  </div>
                  <div className="flex grid grid-cols-1 gap-4">
                    {cartItems.map((item, index) => (
                      <Card
                        key={item._id}
                        className="bg-gray-100 shadow-lg rounded-xl p-2 hover:shadow-xl transition-all duration-500 border-l-4 border-gray-700 animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {/* FLEX ROW UPDATED HERE */}
                        <CardContent className="flex flex-row items-center justify-between space-x-6">

                          {/* Product Image */}
                          <LazyImage
                            src={item.coverImage || defaultImage}
                            alt={item.name}
                            className="w-24 h-24 rounded-xl object-cover shadow-md hover:scale-105 transition-transform duration-300"
                          />

                          {/* Product Name + Price */}
                          <div className="flex flex-col">
                            <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
                            <p className="text-orange-600 font-bold">${item.salePrice}</p>
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-200 text-gray-800 rounded-full hover:bg-blue-300 transition-colors duration-200 flex items-center justify-center"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 bg-gray-100 rounded-full font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-200 text-gray-800 rounded-full hover:bg-blue-300 transition-colors duration-200 flex items-center justify-center"
                              disabled={item.quantity >= 10}
                            >
                              +
                            </button>
                          </div>

                          {/* Total Price */}
                          <p className="text-lg font-bold text-green-600 whitespace-nowrap">
                            ${item.salePrice * item.quantity}
                          </p>

                          {/* Delete Button */}
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-500 hover:text-red-700 hover:rotate-12 transition-transform duration-200"
                          >
                            <Trash2 size={20} />
                          </button>

                        </CardContent>
                      </Card>
                    ))}
                  </div>


                  {/* Additional Info */}
                  <Card className=" bg-gray-100 shadow-lg rounded-xl border border-gray-700">
                    <CardHeader className="bg-[#bfbdc1] text-black rounded-t-xl">
                      <CardTitle className="text-xl flex items-center space-x-2">
                        <span>Additional Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <Label className="text-gray-700 font-medium">Order notes (optional)</Label>
                      <Input
                        placeholder="Special instructions for delivery"
                        className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Right Section - Order Summary */}
                <div className="space-y-2 ">
                  <Card className="bg-gray-100 rounded-xl border border-gray-700">
                    <CardHeader className="bg-[#bfbdc1] text-black rounded-t-xl">
                      <CardTitle className="text-xl flex items-center space-x-2">
                        <CreditCard size={20} />
                        <span>Your Order</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="text-gray-700">Product Subtotal</span>
                        <span className="font-bold text-orange-600">${subtotal}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="text-gray-700">Shipping</span>
                        <span className="font-bold text-green-600">$0.00</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="text-gray-700">Tax</span>
                        <span className="font-bold text-green-600">$0.00</span>
                      </div>
                      <div className="flex justify-between pt-2 text-lg font-semibold text-gray-800">
                        <span>Grand Total</span>
                        <span className="text-green-600">${subtotal}</span>
                      </div>

                      <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded-lg">
                        Billing Email: {userEmail}
                      </p>

                      <Button
                        className="w-full mt-4 bg-gray-800 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
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
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutForm;