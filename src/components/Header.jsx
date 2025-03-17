import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/product-category/all?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    localStorage.setItem("logoutSuccess", "true");
    setIsAuthenticated(false);
    setUserRole("");
    router.push("/login");
  };

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
        <form onSubmit={handleSearch} className="relative hidden lg:block">
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
