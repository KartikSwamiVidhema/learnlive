import { useState, useEffect } from "react";
import { Home, FileText, Settings, User, ListOrdered, SquareUserRound } from "lucide-react"; // Import User icon for profile
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/router";
import { X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { Download } from "lucide-react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import MetaTags from "@/components/metaTags";
import metadata from "../components/common/metadata.json"
import OrderContent from "../components/common/OrderContent";
import DownloadReport from "../components/common/DownloadReport";
import ProfileForm from "../components/common/ProfileForm";

import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
function Sidebar({ setActiveTab }) {
  const [role, setRole] = useState(""); // Capitalized 'setRole' for consistency

  useEffect(() => {
    const storedUserData = localStorage.getItem("userdata");
  
    if (storedUserData) {
      try {
        const userdata = JSON.parse(storedUserData);
        if (userdata?.role) {
          setRole(userdata.role);
        }
      } catch (error) {
        console.error("Error parsing userdata from localStorage:", error);
      }
    }
  }, []);
  return (
    <div className="bg-primary text-white p-4 md:w-[15%] w-[20%] sm:block rounded-lg">
      <h2 className="text-xl font-bold mb-6 md:block hidden">Dashboard</h2>
      <nav className="flex flex-col space-y-4">
        <Button variant="ghost" className="flex items-center justify-start space-x-2" onClick={() => setActiveTab("profile")}>
          <User className="w-6 h-6 md:w-5 md:h-5" />
          <span className="md:block hidden">Profile</span>
        </Button>
        {role !== "USER" && (
  <Button variant="ghost" className="flex items-center justify-start space-x-2" onClick={() => setActiveTab("product")}>
     <FileText className="w-6 h-6 md:w-5 md:h-5" />
    <span className="md:block hidden">Product</span>
  </Button>
)}
 {role !== "USER" && (
        <Button variant="ghost" className="flex items-center justify-start space-x-2" onClick={() => setActiveTab("plans")}>
          <ListOrdered className="w-6 h-6 md:w-5 md:h-5"/>
          <span className="md:block hidden">Orders</span>
        </Button>
 )}
 {role !== "VENDOR" && (
        <Button variant="ghost" className="flex items-center justify-start space-x-2" onClick={() => setActiveTab("download")}>
          <Download className="w-6 h-6 md:w-5 md:h-5"/>
          <span className="md:block hidden">Download</span>
        </Button>
 )}
 {role !== "USER" && (
        <Button variant="ghost" className="flex items-center justify-start space-x-2" onClick={() => setActiveTab("settings")}>
          <SquareUserRound className="w-6 h-6 md:w-5 md:h-5" />
          <span className="md:block hidden">Plans</span>
        </Button>
        )}
      </nav>
    </div>
  );
}



export default function Dashboard({ userdata, categorydata }) {
  const [activeTab, setActiveTab] = useState("profile");
  const seo = metadata.home;
  const renderContent = () => {
    switch (activeTab) {
      case "product":
        return <ProductContent categorydata={categorydata.data} />;
      case "settings":
        return (
          <div className="flex-grow bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-700 mb-3">
                  Congratulations!
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  You are currently on the Free Plan.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Upgrade to unlock premium features and enjoy exclusive benefits!
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <button className="bg-black text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300 ease-in-out">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>

        );
      case "plans":
        return <OrderContent />;

        case "download":
          return (
         <DownloadReport/>
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
      <div className="container flex py-4 px-3">
        <Sidebar setActiveTab={setActiveTab}  />
        <div className="md:w-[85%] w-[80%] md:px-6 ">
          <Card className="rounded-0">
            <CardContent>{renderContent()}</CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


  try {
    const initialTab = "all";

    const categoryData = await fetch(`${apiBaseUrl}/categories`);
    const categorydata = await categoryData.json();
    return {
      props: { categorydata },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { productdata: [] } };
  }
}