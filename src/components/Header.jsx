import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRef } from "react";
import LazyImage from "./common/LazyImage";

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
  const [dropdownOpen, setDropdownOpen] = useState(false); // New state for themes dropdown
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
        setFilteredProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchValue, products]);

  const handleInputClick = () => {
    setDropdownVisible(true);
  };

  const handleSelectOption = (product) => {
    setSearchValue(product.name);
    setSearchSlug(product.slug);
    setDropdownVisible(false);
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
      setSearchValue("");
      setSearchSlug("");
    }
  };

  useEffect(() => {
    if (searchslug) {
      handleNavigate(searchslug);
    }
  }, [searchslug]);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // New handler for themes dropdown selection
  const handleSelectTheme = (id) => {
    router.push(`/themes/${id}`);
    setDropdownOpen(false); // Close dropdown after selection
  };

  let timeout;

  // Product items data for the grid (extracted from existing links for easier management)
  const productItems = [
    { id: "uberr-clone-app", name: "Uberr Clone App" },
    { id: "lyft-clone-app", name: "Lyft Clone App" },
    { id: "food-delivery-app-development", name: "Food Delivery App Development" },
    { id: "super-app-development", name: "Super App Development" },
    { id: "careem-clone-app", name: "Careem Clone App" },
    { id: "talabat-clone-app", name: "Talabat Clone App" },
    { id: "gojek-clone-app", name: "Gojek Clone App" },
    { id: "glovo-clone-app", name: "glovo clone app" },
    { id: "grubhub-clone-app", name: "Grubhub Clone App" },
    { id: "grocery-app-development", name: "Grocery App Development" },
    { id: "bolt-clone-app", name: "Bolt Clone App" },
    { id: "carpooling-clone-app", name: "Carpooling Clone App" },
    { id: "ubereats-clone-app", name: "Ubereats Clone App" },
    { id: "blablacar-clone-app", name: "Blablacar Clone App" },
    { id: "logistics-app-development", name: "Logistics App Development" },
    { id: "handyman-app-like-uber", name: "Handyman App Like Uber" },
    { id: "justeat-clone-app", name: "Justeat Clone App" },
    { id: "taskrabbit-clone-app", name: "Taskrabbit Clone App" },
    { id: "delivery-app-development", name: "Delivery App Development" },
    { id: "indriver-clone-app", name: "inDriver Clone App" },
    { id: "bus-booking-app-development", name: "Bus Booking App Development" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20 w-full">
      {/* Marquee Banner */}
      <div className="bg-primary py-1 text-center text-white font-semibold text-sm overflow-hidden">
        <div className="whitespace-nowrap animate-marquee">
          🚀 Limited Offer! Get 50% Off on All Products | 🌟 New Arrivals Now
          Available | 🎉 Free Shipping on Orders Above $50
        </div>
      </div>

      {/* Header Content */}
      <div className="w-full px-4 flex items-center justify-between">
        {/* Left Section (Logo + Search Bar) */}
        <div className="flex items-left space-x-4">
          <div className="p-3 space-y-2">
            <Link href="/" className="text-2xl font-bold">
              <LazyImage
                className="max-w-40 h-[45px] object-contain"
                src="https://res.cloudinary.com/drsh5gjtv/image/upload/v1741677507/logo_vae3xb.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="p-3 space-y-2 md:w-[500px]">
            <div className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4">
              <div className="hidden md:block w-full md:w-[90%] relative">
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
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500" size={18} />
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
                          <p className="p-2 text-gray-500 text-left ml-4">No data found</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-4">
          <ul className="flex space-x-4">
            {/* Modified Products Dropdown with 3x7 Grid */}
            <li
              className="relative"
              onMouseEnter={() => {
                clearTimeout(timeout);
                setDropdownOpen(true);
              }}
              onMouseLeave={() => {
                timeout = setTimeout(() => setDropdownOpen(false), 150);
              }}
            >
              <button className="dropbtn px-4 py-2 rounded hover:bg-gray-300">
                Products
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-gray-300 rounded-md shadow-md w-[600px] z-50">
                  <div className="grid grid-cols-3 gap-2 p-4">
                    {productItems.map((item) => (
                      <Link
                        key={item.id}
                        href="#"
                        className="block w-full text-center px-3 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelectTheme(item.id);
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

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