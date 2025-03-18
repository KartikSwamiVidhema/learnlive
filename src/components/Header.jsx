import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRef } from "react";
const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleClose = () => setOpen(false);

  const checkAuthStatus = () => {
    const userData = localStorage.getItem("userdata");
    if (userData) {
      setIsAuthenticated(true);
      const parsedUserData = JSON.parse(userData);
      setUserRole(parsedUserData.role);
    } else {
      setIsAuthenticated(false);
      setUserRole("");
    }
  };

  useEffect(() => {
    checkAuthStatus();

    // Listen to route changes to update authentication status
    const handleRouteChange = () => {
      checkAuthStatus();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchQuery.trim()) {
        try {
          const response = await axios.get(
            `${apiBaseUrl}/product?filter=${encodeURIComponent(
              JSON.stringify({ name: searchQuery })
            )}`
          );
          setProducts(response.data || []); // Assuming response contains an array of products
          console.log(response.data,"rrrr");
          if(response.data){setShowDropdown(true);}
           // Show dropdown when data is available
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      } else {
        setProducts([]);
        setShowDropdown(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

 


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const matchedProduct = products.data.find(
        (product) => product.slug
      );
      if (matchedProduct && matchedProduct.slug) {
        router.push(`/productdetail/${matchedProduct.slug}`);
      } else {
        router.push(
          `/product-category/all?search=${encodeURIComponent(searchQuery.trim())}`
        );
      }
      setShowDropdown(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    localStorage.setItem("logoutSuccess", "true");
    setIsAuthenticated(false);
    setUserRole("");
    router.push("/login");
  };
  
  const handleSelectProduct = (slug) => {
    router.push(`/productdetail/${slug}`);
    setShowDropdown(false);
  };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

   

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20 w-full">
    {/* Marquee Banner */}
    <div className="bg-primary py-2 text-center text-white font-semibold text-sm overflow-hidden">
      <div className="whitespace-nowrap animate-marquee">
        🚀 Limited Offer! Get 50% Off on All Products | 🌟 New Arrivals Now Available | 🎉 Free Shipping on Orders Above $50
      </div>
    </div>
  
    {/* Header Content */}
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      {/* Left Section (Logo + Search Bar) */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-2xl font-bold">
          <img
            className="max-w-40 h-[45px] object-contain"
            src="https://res.cloudinary.com/drsh5gjtv/image/upload/v1741677507/logo_vae3xb.png"
            alt="logo"
          />
        </Link>
        {/* Search Bar (Hidden below 991px) */}
        <form onSubmit={handleSearch} className="relative hidden lg:block" ref={dropdownRef}>
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 w-56"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
       
          />
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Button type="submit" className="sr-only">
            Search
          </Button>
        </form>
        {/* Dropdown List */}
      {showDropdown && products.length > 0 && (
        <ul className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-300 shadow-lg rounded-md max-h-60 overflow-y-auto z-10">
          {products.map((product) => (
            <li
              key={product._id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectProduct(product.slug)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
      </div>
  
      {/* Mobile Menu Toggle (Visible below 991px) */}
      <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <div className="flex flex-col space-y-4">
            <Link href="/product-category/all" className="text-lg font-medium" onClick={handleClose}>
              Explore
            </Link>
            {!isAuthenticated && (
              <Link href="/pricing" className="text-lg font-medium" onClick={handleClose}>
                Start Selling
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-lg font-medium" onClick={handleClose}>
                  Dashboard
                </Link>
                <Button variant="outline" onClick={() => { handleLogout(); handleClose(); }} className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-lg font-medium" onClick={handleClose}>
                  Log in
                </Link>
                <Link href="/register" className="text-lg font-medium" onClick={handleClose}>
                  Join for free
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  
      {/* Desktop Navigation (Hidden below 991px) */}
      <nav className="hidden lg:flex space-x-4">
        <ul className="flex space-x-4">
          <li>
            <Button variant="ghost" asChild>
              <Link href="/product-category/all">Explore</Link>
            </Button>
          </li>
          {!isAuthenticated && (
            <li>
              <Button variant="secondary" asChild>
                <Link href="/pricing">Start Selling</Link>
              </Button>
            </li>
          )}
          {isAuthenticated && (
            <>
              <li>
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </li>
              <li>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <Button variant="outline" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
              </li>
              <li>
                <Button asChild>
                  <Link href="/register">Join for free</Link>
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  </header>
  
  );
};

export default Header;
