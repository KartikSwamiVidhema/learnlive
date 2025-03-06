import React from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ThankYouPage = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-grey to-indigo-600">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <Card className="shadow-2xl bg-white rounded-2xl p-8 max-w-xl mx-auto">
            <CardContent className="text-center">
              <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                Thank You for Your Purchase!
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Your order has been successfully placed. A download link will be
                sent to your email shortly.
              </p>
              <p className="text-md text-gray-500">
                If you don’t receive the email within 15 minutes, check your
                spam folder or contact our support team.
              </p>
              <Button
                onClick={handleNavigate}
                className="mt-6 px-6 py-3 text-white rounded-lg transition-all"
              >
                Go to Home Page
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;
