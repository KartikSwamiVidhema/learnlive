import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cart, updateCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const { removeFromCart } = useCart();
  const { subtotal, setSubtotal } = useCart();
 

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  // Update Quantity
  const updateQuantity = (_id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item._id === _id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    updateCart(updatedCart);
  };

  const removeItem = (_id) => {
    removeFromCart(_id);
  };

   // Calculate Subtotal and Update Context
   useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    console.log(newSubtotal,"newSubtotal");
    
    setSubtotal(newSubtotal); // Update subtotal in context
  }, [cartItems, setSubtotal]);

  return (
    <>
  
      <div className=" mx-auto p-6 container ">
        <h2 className="text-2xl font-semibold mb-4">Cart</h2>

        <div className="flex flex-col md:flex-row gap-6 ">
          {/* Cart Table */}
          <div className="overflow-x-auto flex-1 bg-white shadow-md rounded-lg p-4 ">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Image</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">
                      <img
                        src={item.coverImage}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    </td>
                    <td className="p-3">
                      <p className="font-medium">{item.name}</p>
                      {item.seller && (
                        <p className="text-sm text-gray-500">
                          Sold By: {item.seller}
                        </p>
                      )}
                    </td>
                    <td className="p-3">${item.price}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(item._id, parseInt(e.target.value))
                        }
                        className="w-16 border rounded-md p-1 text-center"
                      />
                    </td>
                    <td className="p-3">
                      ${(item.price * item.quantity)}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => removeItem(item._id)}
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

          {/* Cart Summary */}
          <div className=" md:w-1/3 bg-white shadow-md rounded-lg p-6 ">
            <h3 className="text-lg font-semibold border-b pb-2">Cart Totals</h3>
            <div className="flex justify-between mt-4">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal}</span>
            </div>
            <div className="flex justify-between mt-2 text-lg font-semibold">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link href="/checkoutform">
              <button className="w-full mt-4 bg-blue-300 text-white py-2 rounded-md hover:bg-black transition">
                Proceed to Checkout →
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
