import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import Footer from "@/components/Footer";

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiBaseUrl}/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10"
            />
          </div>
          <Button type="submit" className="w-full">Reset Password</Button>
        </form>
        {message && <p className="text-center text-sm text-gray-600 mt-3">{message}</p>}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ResetPassword;