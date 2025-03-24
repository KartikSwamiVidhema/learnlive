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
  const [searchValue, setSearchValue] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [searchslug, setSearchSlug] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
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
      try {
        const response = await axios.get(`${apiBaseUrl}/product`);
        const sortedProducts = response.data.data.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
        );

        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts); // Show first 3 categories by default
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredProducts(products); // Show first 3 products when input is empty
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchValue, products]);
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     router.push(
  //       `/product-category/all?search=${encodeURIComponent(searchQuery.trim())}`
  //     );
  //   }
  // };

  const handleInputClick = () => {
    setDropdownVisible(true);
  };
  const handleSelectOption = (product) => {
    setSearchValue(product.name);
    setSearchSlug(product.slug);
    setDropdownVisible(false);
    // router.push(`/productdetail/${product.slug}`);
  };
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleNavigate = (slug) => {
    if (slug) {
      router.push(`/productdetail/${slug}`);
      setSearchValue(""); // ✅ Reset input field
      setSearchSlug(""); // ✅ Reset slug to prevent repeated navigation
    }
  };
  useEffect(() => {
    if (searchslug) {
      handleNavigate(searchslug);
    }
  }, [searchslug]); // ✅ Runs when `searchslug` updates

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
          🚀 Limited Offer! Get 50% Off on All Products | 🌟 New Arrivals Now
          Available | 🎉 Free Shipping on Orders Above $50
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

          <div className="p-6 space-y-2 md:w-[500px]">
            <div className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-[90%] relative">
                <div className="relative dropdown-container">
                  <Input
                    type="text"
                    placeholder="Search for products"
                    className="bg-white text-gray-700 pl-10 w-full"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onClick={handleInputClick}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleNavigate();
                      }
                    }}
                  />
                  <SearchIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  {dropdownVisible && (
                    <div className="absolute left-0 w-full bg-white border border-gray-300 mt-2 rounded-md shadow-md max-h-60 overflow-y-auto">
                      <div className="border-b px-4 py-2">
                        {filteredProducts.length > 0 ? (
                          <ul>
                            {filteredProducts.map((option, index) => (
                              <li
                                key={`product-${option._id || index}`}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-left ml-4"
                                onClick={() => handleSelectOption(option)}
                              >
                                {option.name}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="p-2 text-gray-500 text-left ml-4">
                            No data found
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* <Button
                className="w-full md:w-auto mt-2 md:mt-0 transition duration-200"
                onClick={handleNavigate}
              >
                Search
              </Button> */}
            </div>
          </div>
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
                <Link
                  href="/product-category/all"
                  className="text-lg font-medium"
                  onClick={handleClose}
                >
                  Explore
                </Link>
                {!isAuthenticated && (
                  <Link
                    href="/pricing"
                    className="text-lg font-medium"
                    onClick={handleClose}
                  >
                    Start Selling
                  </Link>
                )}
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-lg font-medium"
                      onClick={handleClose}
                    >
                      Dashboard
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout();
                        handleClose();
                      }}
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-lg font-medium"
                      onClick={handleClose}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      className="text-lg font-medium"
                      onClick={handleClose}
                    >
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
