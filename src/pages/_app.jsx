import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "../../context/CartContext";
import "../../src/index.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MetaTags from "@/components/metaTags";
import metadata from "../components/common/metadata.json"
const queryClient = new QueryClient();
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const App = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const seo = metadata.home;
  useEffect(() => {
    let progressInterval;
    const start = () => {
      setLoading(true);
      setProgress(0);

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 40) {
            return prev + Math.random() * 5; // Faster initial increments
          } else if (prev < 90) {
            // Clear the initial interval and set a faster one after 40%
            clearInterval(progressInterval);
            progressInterval = setInterval(() => {
              setProgress((prev) => {
                if (prev < 90) {
                  return prev + Math.random() * 15; // Very fast increments
                }
                return prev; // Cap at 90%
              });
            }, 200); // Faster updates every 200ms
          }
          return prev; // Stop at 90%
        });
      }, 200);
    };

    const end = () => {
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      clearInterval(progressInterval);
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  return (
    <>
    <MetaTags
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
    <QueryClientProvider client={queryClient}>
      {/* <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}> */}
      <TooltipProvider>
        <Toaster />
        <Header />
        {loading && (
          <div className="fixed w-screen flex justify-center overflow-hidden z-40}
          ">
            <div className="w-full h-[2px] bg-white relative overflow-hidden">
              <div
                className="absolute h-full bg-black transition-all"
                style={{
                  width: `${progress}%`,
                  transition: "width 0.2s ease-out",
                }}
              ></div>
            </div>
          </div>
        )}
        <CartProvider>
          <Elements stripe={stripePromise}>
            <Component {...pageProps} />
          </Elements>
        </CartProvider>

        {/* <Component {...pageProps} /> */}
      </TooltipProvider>
      {/* </PayPalScriptProvider> */}
    </QueryClientProvider>
    </>
  );
};

export default App;
