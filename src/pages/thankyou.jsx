
// import { CheckCircle, Truck, ShoppingCart } from "lucide-react";

// export default function ThankYou() {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">

//       <div className="flex-grow flex items-center justify-center p-6">
//         <div className="flex flex-col md:flex-row bg-white p-10 rounded-2xl shadow-2xl w-full max-w-4xl space-y-6 md:space-y-0 md:space-x-6 transform transition-all duration-300 ease-in-out">
          
//           {/* Left Side - Thank You Message */}
//           <div className="flex flex-col items-center justify-center text-center w-full md:w-1/2 p-8 bg-green-50 rounded-xl shadow-lg">
//             <CheckCircle className="h-20 w-20 text-green-600 mb-4 animate-bounce" />
//             <h1 className="text-3xl font-extrabold text-gray-800">Thank You for Your Order!</h1>
//             <p className="text-lg text-gray-600 mt-2">Your order has been successfully placed.</p>
//             <p className="text-lg text-gray-600">A confirmation email will be sent shortly.</p>
//           </div>

//           {/* Right Side - Order Summary */}
//           <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg border">
//             <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-3 mb-4">
//               <ShoppingCart className="h-6 w-6 text-gray-600" />
//               Order Summary
//             </h2>
//             <div className="space-y-4">
//               <div className="flex justify-between text-gray-700">
//                 <span className="font-medium">Product:</span>
//                 <span>Awesome Gadget</span>
//               </div>
//               <div className="flex justify-between text-gray-700">
//                 <span className="font-medium">Quantity:</span>
//                 <span>2</span>
//               </div>
//               <div className="flex justify-between text-gray-700">
//                 <span className="font-medium">Price:</span>
//                 <span>₹1999</span>
//               </div>
//               <div className="flex justify-between text-gray-900 font-semibold border-t pt-3">
//                 <span>Total:</span>
//                 <span>₹3998</span>
//               </div>
//             </div>
//             <button className="w-full flex items-center justify-center bg-green-600 text-white font-semibold py-3 mt-6 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-lg">
//               <Truck className="h-5 w-5 mr-2" />
//               Track Your Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { CheckCircle, Truck, ShoppingCart } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="flex flex-col md:flex-row bg-white p-12 rounded-3xl shadow-2xl w-full max-w-5xl space-y-8 md:space-y-0 md:space-x-8 transform transition-all duration-300 ease-in-out">
          
          {/* Left Side - Thank You Message */}
          <div className="flex flex-col items-center justify-center text-center w-full md:w-[55%] p-10 bg-green-50 rounded-2xl shadow-lg border border-green-100">
            <CheckCircle className="h-24 w-24 text-green-600 mb-6 animate-bounce" />
            <h1 className="text-4xl font-extrabold text-gray-800">Order Confirmed! 🎉</h1>
            <p className="text-lg text-gray-600 mt-3">Your order has been placed successfully.</p>
            <p className="text-lg text-gray-600">A confirmation email has been sent.</p>
          </div>

          {/* Right Side - Order Summary */}
          <div className="w-full md:w-[45%] bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3 border-b pb-3 mb-4">
              <ShoppingCart className="h-7 w-7 text-gray-600" />
              Order Summary
            </h2>

            {/* Product Details */}
            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
              <img 
                src="https://tse4.mm.bing.net/th?id=OIP.Ba3f2ZiJZYt89BvdvMh50wHaEK&pid=Api&P=0&h=180" 
                alt="Product Image" 
                className="w-20 h-20 object-cover rounded-lg shadow-md" 
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">Awesome Gadget</h3>
                <p className="text-sm text-gray-500">Quantity: <strong>2</strong></p>
              </div>
              <p className="text-lg font-semibold text-gray-900">₹1999</p>
            </div>

            {/* Price Details */}
            <div className="space-y-3 mt-4">
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Subtotal:</span>
                <span>₹3998</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-900 font-semibold border-t pt-4 text-xl">
                <span>Total:</span>
                <span>₹3998</span>
              </div>
            </div>

            {/* Track Order Button */}
            <button className="w-full flex items-center justify-center bg-green-600 text-white font-semibold py-4 mt-6 rounded-xl hover:bg-green-700 transition-all duration-300 ease-in-out shadow-lg text-lg">
              <Truck className="h-6 w-6 mr-2" />
              Track Your Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// import { CheckCircle, Truck, ShoppingCart } from "lucide-react";

// export default function ThankYou() {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <div className="flex-grow flex items-center justify-center p-4">
//         <div className="flex flex-col md:flex-row bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl space-y-6 md:space-y-0 md:space-x-6 transform transition-all duration-300 ease-in-out">
          
//           {/* Left Side - Thank You Message */}
//           <div className="flex flex-col items-center justify-center text-center w-full md:w-[50%] p-6 bg-green-50 rounded-xl shadow-md border border-green-100">
//             <CheckCircle className="h-16 w-16 text-green-600 mb-4 animate-bounce" />
//             <h1 className="text-2xl font-bold text-gray-800">Order Confirmed!</h1>
//             <p className="text-sm text-gray-600 mt-1">Your order has been placed successfully.</p>
//             <p className="text-sm text-gray-600">A confirmation email has been sent.</p>
//           </div>

//           {/* Right Side - Order Summary */}
//           <div className="w-full md:w-[50%] bg-white p-6 rounded-xl shadow-md border border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2 mb-3">
//               <ShoppingCart className="h-5 w-5 text-gray-600" />
//               Order Summary
//             </h2>

//             {/* Product Details */}
//             <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg shadow-sm">
//               <img 
//                 src="https://tse4.mm.bing.net/th?id=OIP.Ba3f2ZiJZYt89BvdvMh50wHaEK&pid=Api&P=0&h=180" 
//                 alt="Product Image" 
//                 className="w-16 h-16 object-cover rounded-md shadow-sm" 
//               />
//               <div className="flex-1">
//                 <h3 className="text-sm font-medium text-gray-800">Awesome Gadget</h3>
//                 <p className="text-xs text-gray-500">Qty: <strong>2</strong></p>
//               </div>
//               <p className="text-sm font-semibold text-gray-900">₹1999</p>
//             </div>

//             {/* Price Details */}
//             <div className="space-y-2 mt-3 text-sm">
//               <div className="flex justify-between text-gray-700">
//                 <span className="font-medium">Subtotal:</span>
//                 <span>₹3998</span>
//               </div>
//               <div className="flex justify-between text-gray-700">
//                 <span className="font-medium">Shipping:</span>
//                 <span>Free</span>
//               </div>
//               <div className="flex justify-between text-gray-900 font-semibold border-t pt-2">
//                 <span>Total:</span>
//                 <span>₹3998</span>
//               </div>
//             </div>

//             {/* Track Order Button */}
//             <button className="w-full flex items-center justify-center bg-green-600 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md text-sm">
//               <Truck className="h-4 w-4 mr-1" />
//               Track Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
