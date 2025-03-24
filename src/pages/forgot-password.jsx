

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import axios from 'axios';

const ForgotPassword = () =>{
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("test");
    
    try {
      const res = await axios.post(`${apiBaseUrl}/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Forgot Password</h2>
        <p className="text-gray-600 text-center mb-6">Enter your email to receive a password reset link.</p>
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <Button type="submit" className="w-full">Send Reset Link</Button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}
export default ForgotPassword;
