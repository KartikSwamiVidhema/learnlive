import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/users/register`, {
        username,
        email,
        password,
        role,
      });
      console.log(response,"777777");
      

      if (response.status === 201 || response.status === 200) {
        console.log("Register successfully:", response.data);
        router.push("/login");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
   
      <main className="flex-grow bg-gray-100 flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Create your account
            </CardTitle>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Full name</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="John Doe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
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
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={role === "USER"}
                      onChange={() => setRole(role === "USER" ? "" : "USER")}
                    />
                    <span className="text-sm mr-4">User</span>

                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={role === "VENDOR"}
                      onChange={() =>
                        setRole(role === "VENDOR" ? "" : "VENDOR")
                      }
                    />
                    <span className="text-sm">Vendor</span>
                  </label>
                </div>

                <Button type="submit" className="w-full">
                  Create account
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
