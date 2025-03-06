import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import PayPalButton from "@/components/PaypalButton";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { Trash2 } from "lucide-react";
import StripePayment from "@/components/StripePayment";


const CheckoutForm = ()=> {
  // const { subtotal } = useCart();
  const [showPayPal, setShowPayPal] = useState(false);

  const { cart, updateCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const { removeFromCart } = useCart();
  const { subtotal, setSubtotal } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    email: "",
  });

  
  

  
  

  const handlePlaceOrder = () => {
    setShowPayPal(true);
  };

  //========================>>

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
      (sum, item) => sum + item.salePrice * item.quantity,
      0
    );
    console.log(newSubtotal,"newSubtotal");
    
    setSubtotal(newSubtotal); // Update subtotal in context
  }, [cartItems, setSubtotal]);

  const handleNavigate = () =>{
    router.push(`productdetail/${cartItems[0].slug}`)
  }

  const isFormValid = Object.values(form).every((val) => val.trim() !== "");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  return (
    <>
    <Header/>
    <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold">Checkout</h2>
        {/* <div className="ml-[84%]">
        <Button ><Link href="/cartpage">Visit CartPage</Link></Button>
        </div> */}
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
                    <td className="p-3" onClick={handleNavigate}>
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
                    <td className="p-3">${item.salePrice}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        // onChange={(e) =>
                        //   updateQuantity(item._id, parseInt(e.target.value))
                        // }
                        className="w-16 border rounded-md p-1 text-center"
                      />
                    </td>
                    <td className="p-3">
                      ${(item.salePrice * item.quantity)}
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

   
          <Card>
        <CardHeader><CardTitle>Billing details</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>First name *</Label><Input name="firstName" onChange={handleChange} /></div>
            <div><Label>Last name *</Label><Input name="lastName" onChange={handleChange} /></div>
          </div>
          <div>
            <Label>Country / Region *</Label>
            <Select onValueChange={(val) => setForm({ ...form, country: val })}>
              <SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger>
              <SelectContent><SelectItem value="india">India</SelectItem></SelectContent>
            </Select>
          </div>
          <div>
            <Label>Street address *</Label>
            <Input name="streetAddress" onChange={handleChange} />
          </div>
          <div>
            <Label>Town / City *</Label>
            <Input name="city" onChange={handleChange} />
          </div>
          <div>
            <Label>State *</Label>
            <Select onValueChange={(val) => setForm({ ...form, state: val })}>
              <SelectTrigger><SelectValue placeholder="Select a state" /></SelectTrigger>
              <SelectContent><SelectItem value="rajasthan">Rajasthan</SelectItem></SelectContent>
            </Select>
          </div>
          <div><Label>PIN Code *</Label><Input name="pinCode" onChange={handleChange} /></div>
          <div><Label>Phone *</Label><Input name="phone" onChange={handleChange} /></div>
          <div><Label>Email address *</Label><Input name="email" onChange={handleChange} /></div>
        </CardContent>
      </Card>

        <Card>
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
        
          <Button className="mt-4 w-full"  onClick={handlePlaceOrder}  disabled={!isFormValid}>Go for payment</Button>
          {showPayPal && <StripePayment amount={subtotal} form={form} />}
        </CardContent>
      </Card>
    </div>
    <Footer/>
    </>
  );
}
export default CheckoutForm;