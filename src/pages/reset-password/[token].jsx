import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("Invalid or expired token.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      const res = await axios.post(`${apiBaseUrl}/reset-password/${token}`, {
        password,
      });
      // setMessage(res.data.message);
      toast.success("Password Reset Successfully");

      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      // setMessage(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong");

    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[60vh] bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
              <Label
                htmlFor="password"
                className="block mb-2 font-medium text-gray-700"
              >
                New Password
              </Label>
              <div className="flex items-center  w-full ">
                <Lock className="ml-3 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="py-2 px-3 flex-1  border-none "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-3 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <div>
              <Label
                htmlFor="confirm-password"
                className="block mb-2 font-medium text-gray-700"
              >
                Confirm Password
              </Label>
              {/* <div className="flex items-center  w-full ">
               */}
               <div className="flex items-center w-full 
                ${confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-gray-300'}"
              >
                <Lock className="ml-3 text-gray-400" />
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="py-2 px-3 flex-1  border-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="mr-3 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {/* Validation Messages */}
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
              )}
              {confirmPassword && password === confirmPassword && (
                <p className="text-green-600 text-sm mt-1">Passwords match</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
          {message && (
            <p className="text-center text-sm text-gray-600 mt-3">{message}</p>
          )}
        </div>
      </div>
    
      <ToastContainer autoClose={3000} />
      <Footer />
    </>
  );
};

export default ResetPassword;
