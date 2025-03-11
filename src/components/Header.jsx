import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('userdata');
    if (userData) {
      setIsAuthenticated(true);
      const parsedUserData = JSON.parse(userData);
      setUserRole(parsedUserData.role); 
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/product-category/all?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userdata"); // Remove user data
    localStorage.setItem("logoutSuccess", "true"); // ✅ Store success flag
    setIsAuthenticated(false); // Update state
    setUserRole(""); // Reset role
    router.push("/login"); // Redirect to login page
};


  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="bg-primary py-2 overflow-hidden relative">
        <div className="whitespace-nowrap animate-marquee text-white font-semibold text-sm">
          🚀 Limited Offer! Get 50% Off on All Products | 🌟 New Arrivals Now Available | 🎉 Free Shipping on Orders Above $50
        </div>
      </div>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold">
            <img className='max-w-40 h-[45px] object-contain' src="https://res.cloudinary.com/drsh5gjtv/image/upload/v1741677507/logo_vae3xb.png" alt="logo" />
          </Link>
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-56"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Button type="submit" className="sr-only">Search</Button>
          </form>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Button variant="ghost" asChild><Link href="/product-category/all">Explore</Link></Button></li>
            {/* Conditionally render "Start Selling" button only if user is not authenticated */}
            {!isAuthenticated && (
              <li><Button variant="secondary" asChild><Link href="/pricing">Start Selling</Link></Button></li>
            )}
            {isAuthenticated && (
              <>
                {/* Show Dashboard button for authenticated users */}
                <li><Button asChild><Link href="/dashboard">Dashboard</Link></Button></li>
                <li><Button variant="outline" onClick={handleLogout}>Logout</Button></li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li><Button variant="outline" asChild><Link href="/login">Log in</Link></Button></li>
                <li><Button asChild><Link href="/register">Join for free</Link></Button></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;