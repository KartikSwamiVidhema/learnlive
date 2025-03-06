import { HomeIcon, DollarSignIcon, UserPlusIcon, LogInIcon, SearchIcon } from "lucide-react";

import Index from "./pages/index.jsx";

import Pricing from "./pages/pricing.jsx";

import Register from "./pages/register.jsx";

import Login from "./pages/login.jsx";

import MarketplaceFilter from "./pages/product-category.jsx";

import ProductDetail from "./pages/productdetail.jsx";

import Seller from "./pages/seller.jsx";

import Dashboard from "./pages/dashboard.jsx";
import ThankYou from "./pages/thankyou.jsx";
import ViewOrderDetails from "./pages/ViewOrderDetails.jsx";
import Demo from "./pages/demo.jsx";
import ProductDemo from "./pages/demoproduct.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Marketplace",
    to: "/marketplace",
    icon: <SearchIcon className="h-4 w-4" />,
    page: <MarketplaceFilter />,
  },
  {
    title: "Pricing",
    to: "/pricing",
    icon: <DollarSignIcon className="h-4 w-4" />,
    page: <Pricing />,
  },
  {
    title: "Register",
    to: "/register",
    icon: <UserPlusIcon className="h-4 w-4" />,
    page: <Register />,
  },
  {
    title: "Login",
    to: "/login",
    icon: <LogInIcon className="h-4 w-4" />,
    page: <Login />,
  }
];

export const additionalRoutes = [
  {
    to: "/product/:id",
    page: <ProductDetail />,
  },
  {
    to: "/seller/:id",
    page: <Seller />,
  },
  {
    title: "Dashboard",
    to: "/Dashboard",
   
    page: <Dashboard />,
  },
  {
    title: "Thankyou",
    to: "/Thankyou",
   
    page: <ThankYou />,
  },
  {
    title: "View",
    to: "/View",
   
    page: <View />,
  },
 
];
