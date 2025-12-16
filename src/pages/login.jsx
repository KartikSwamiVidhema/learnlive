import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaTags from "@/components/metaTags";
import metadata from "../components/common/metadata.json"

const Login = () => {
  useEffect(() => {
    if (localStorage.getItem("logoutSuccess") === "true") {
      toast.success("Logout successful! ✅"); // ✅ Show success message
      localStorage.removeItem("logoutSuccess"); // ✅ Remove to prevent repeated toasts
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(`${apiBaseUrl}/users/login`, {
        email,
        password
      });

      const data = response.data;


      if (response.status === 200) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userdata", JSON.stringify(data.data.user)); // Convert user object to string
        localStorage.setItem("loginSuccess", "true");

        // ✅ Check if the user is a vendor
        if (data.data.user.role === "VENDOR") {
          router.push("/dashboard"); // Redirect vendor to dashboard
        } else {
          router.push("/product-category/all"); // Redirect non-vendor users to explore
        }
      } else {
        toast.error("Invalid email or password!");
      }
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      toast.error(error.response?.data?.message || "An error occurred during login");
    }
  };
  const seo = metadata.home;

  return (
    <>
      <MetaTags
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      <div className="min-h-screen flex flex-col">
        <ToastContainer autoClose={3000} />

        <div className="min-h-screen flex flex-col">

          <main className="flex-grow bg-gray-100 flex items-center justify-center py-12">

            <Card className="w-full max-w-md mx-auto  ">

              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Log in to your account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Remember me</span>
                      </label>
                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Button type="submit" className="w-full">Log in</Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?
                  <Link href="/register" className="text-blue-600 hover:underline"> Sign up</Link>
                </p>
              </CardFooter>
            </Card>

          </main>
          <Footer />
        </div>


      </div>
    </>
  );
};

export default Login;