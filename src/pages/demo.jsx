import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
export default function Demo() {
  const router = useRouter();
  const test = router.query;
  const productid = test.id;


  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [weburl, setWeburl] = useState("");
    useEffect(() => {
        console.log('id',id)
        if (!id) return;
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const fetchProduct = async () => {
          try {
            const response = await axios.get(`${apiBaseUrl}/product?filter={"_id":"${productid}"}`)
            console.log('webUrl',response.data.data[0])
            setWeburl(response.data.data[0].webUrl);
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        };
        fetchProduct();
      }, [id]);

  
  return (
    <>
    <Header />
    <div className="container">
      <div className="flex items-center justify-center min-h-screen p-6">
        {/* Content Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Doc App Clone</h1>
          <img
            className="mx-auto mt-4 w-24 h-24 object-contain"
            src="/scanner-placeholder.png"
            alt="Scanner"
          />
          <p className="mt-2 text-gray-600">Scan to View on Your Mobile Device</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a
              className="px-5 py-2 text-gray-800 bg-yellow-400 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition"
              href="#"
              aria-label="Get 40% Off"
            >
              40% OFF
            </a>
            <a
              className="px-5 py-2 text-white bg-green-500 font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
              href="#"
              aria-label="Purchase for $20"
            >
              <strong>$20</strong> Purchase
            </a>
          </div>
        </div>

        {/* iPhone Frame Section */}
        <div className="relative w-[375px] h-[750px] ms-auto">
          <img
            className="absolute w-full"
            src="https://ithemes.xyz/wp-content/uploads/2024/01/Untitled-design-9.png"
            alt="Mobile Frame"
          />
          <iframe
            id="demoframe"
            src={weburl}
            frameBorder="0"
            className="absolute top-[49px] left-[28px] w-[calc(100%-56px)] h-[636px] border-none"
          ></iframe>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
