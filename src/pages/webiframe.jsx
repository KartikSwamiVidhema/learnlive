import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/router";
import axios from "axios";

const IframeWebViewer = () => {
  const [visible, setVisible] = useState(true);
  const [weburl, setWeburl] = useState("");
  const router = useRouter();
  const { url: productid } = router.query; // Extracting `url` instead of `productid`

  console.log(productid, "uuuuuuuuuuuuuuuuuuu"); // Should log the correct product ID now

  useEffect(() => {
    if (!productid) return; // Prevent API call if productid is not available

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/product?filter={"_id":"${encodeURIComponent(productid)}"}`
        );
        
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

  return (
    <div className="relative flex justify-center items-center w-[1000px] h-[800px] border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
        onClick={() => setVisible(false)}
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>

      {/* Iframe */}
      <iframe
        src={weburl}
        className="w-full h-full border-none"
        allowFullScreen
      />
    </div>
  );
};

export default IframeWebViewer;
