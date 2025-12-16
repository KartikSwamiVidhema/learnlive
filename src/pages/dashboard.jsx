import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FileText,
  Settings,
  User,
  ListOrdered,
  SquareUserRound,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MetaTags from "@/components/metaTags";
import metadata from "../components/common/metadata.json";
import OrderContent from "../components/common/OrderContent";
import DownloadReport from "../components/common/DownloadReport";
import ProfileForm from "../components/common/ProfileForm";
import ProductContent from "../components/common/ProductContent";
import Footer from "@/components/Footer";

function Sidebar({ setActiveTab, activeTab }) {
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userdata");
    if (storedUserData) {
      try {
        const userdata = JSON.parse(storedUserData);
        if (userdata?.role) setRole(userdata.role);
      } catch (error) {
        console.error("Error parsing userdata:", error);
      }
    }
  }, []);

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    ...(role !== "USER"
      ? [{ id: "product", label: "Products", icon: FileText }]
      : []),
    ...(role !== "USER"
      ? [{ id: "plans", label: "Orders", icon: ListOrdered }]
      : []),
    ...(role !== "VENDOR"
      ? [{ id: "download", label: "Downloads", icon: Download }]
      : []),
    ...(role !== "USER"
      ? [{ id: "settings", label: "Plans", icon: SquareUserRound }]
      : []),
  ];

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[black] text-white rounded-2xl shadow-2xl p-5 w-[20%] md:w-[15%] min-h-[85vh] flex flex-col justify-between"
    >
      <div>
        <h2 className="text-2xl font-bold mb-6 tracking-wide text-center">
          Dashboard
        </h2>

        <nav className="flex flex-col space-y-3">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <motion.div
              whileHover={{ scale: 1.05, x: 5 }}
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition ${activeTab === id
                ? "bg-white text-indigo-700 shadow-md"
                : "hover:bg-indigo-500/40"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:inline">{label}</span>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
}

export default function Dashboard({ userdata, categorydata }) {
  const [activeTab, setActiveTab] = useState("profile");
  const seo = metadata.home;

  const renderContent = () => {
    switch (activeTab) {
      case "product":
        return <ProductContent categorydata={categorydata.data} />;
      case "plans":
        return <OrderContent />;
      case "download":
        return <DownloadReport />;
      case "settings":
        return (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center h-full"
          >
            <Card className="w-full max-w-lg p-8 text-center bg-white shadow-2xl rounded-2xl border border-gray-100">
              <h1 className="text-3xl font-bold mb-3 text-indigo-700">
                🎉 Congratulations!
              </h1>
              <p className="text-gray-600 mb-2">You’re currently on the Free Plan.</p>
              <p className="text-gray-500 mb-6">
                Upgrade to unlock premium features and enjoy exclusive benefits!
              </p>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-transform">
                Upgrade Plan
              </Button>
            </Card>
          </motion.div>
        );
      default:
        return <ProfileForm />;
    }
  };

  return (
    <>
      <MetaTags
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      {/* 🔥 Darker Gradient Background */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-blue-300 to-pink-300 flex flex-col">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            <Card className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-6 min-h-[80vh] border border-gray-100">
              <CardContent>
                <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const categoryData = await fetch(`${apiBaseUrl}/categories`);
    const categorydata = await categoryData.json();
    return { props: { categorydata } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { categorydata: [] } };
  }
}
