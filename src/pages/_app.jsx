import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "../../context/CartContext";
import "../../src/index.css"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const queryClient = new QueryClient();
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const App = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
        {/* <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}> */}
    <TooltipProvider>
      <Toaster />
      <CartProvider>
      <Elements stripe={stripePromise}>
          <Component {...pageProps} />
        </Elements>
    </CartProvider>
    
       {/* <Component {...pageProps} /> */}
    </TooltipProvider>
    {/* </PayPalScriptProvider> */}
  </QueryClientProvider>
);

export default App;
