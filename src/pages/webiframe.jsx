import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const IframeWebViewer = () => {
  const [visible, setVisible] = useState(true);
  const [weburl, setWeburl] = useState("");
  const [slug, setslug]= useState("");
  const router = useRouter();
  const { url: productid } = router.query; // Extracting `url` instead of `productid`


  useEffect(() => {
    if (!productid) return; // Prevent API call if productid is not available

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/product?filter={"_id":"${encodeURIComponent(productid)}"}`
        );
        console.log(response.data.data[0].slug,"responseee");
        setslug(response.data.data[0].slug)

        if (response.data.data.length > 0) {
          setWeburl(response.data.data[0].webUrl);
        } else {
          console.error("No product found for the given ID");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productid]); // Dependency corrected

  if (!visible) return null; // Return null when modal is closed

  const handleNavigate =()=>{
    router.push(`/productdetail/${slug}`)
  }

  return (
    <>
   
     <div className="container">
     <div className="flex justify-end">
      <Button className=" mt-2 ml-auto my-[30px]" onClick={handleNavigate}>Buy Now</Button>
      </div>
     </div>
      <div className="flex justify-center items-center mb-4 container">
        <div className="relative flex justify-center  w-full h-[700px] border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">


          {/* Iframe */}
          <iframe
            src={weburl}
            className="w-full h-full border-none"
            allowFullScreen
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IframeWebViewer;
