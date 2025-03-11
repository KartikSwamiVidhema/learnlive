import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
export default function ProductDemo() {
    // useEffect(() => {
    //     console.log('id',id)
    //     if (!id) return;
    //     const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    //     const fetchProduct = async () => {
    //       try {
    //         const response = await axios.get(`${apiBaseUrl}/product?filter={"_id":"${id}"}`)
    //         console.log('res',response.data)
    //         setProduct(response.data);
    //       } catch (error) {
    //         console.error("Error fetching product:", error);
    //       }
    //     };
    //     fetchProduct();
    //   }, [id]);
  return (
    <>
 
   <div className="container">
     <div className="flex  items-center justify-center min-h-screen  p-6">
      {/ Content Section /}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Doc App Clone</h1>
        <img
          className="mx-auto mt-4 w-24 h-24 object-contain"
          src=""
          alt="Scanner"
        />
        <p className="mt-2 text-gray-600">Scan to View on Your Mobile Device</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a
            className="px-5 py-2 text-gray-800 bg-yellow-400 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition"
            href="#"
          >
            40% OFF
          </a>
          <a
            className="px-5 py-2 text-white bg-green-500 font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
            href="#"
          >
            <strong>$20</strong> Purchase
          </a>
        </div>
      </div>

      {/ iPhone Frame Section /}
      <div className="relative w-[375px] h-[750px] ms-auto">
        <img
          className="absolute w-full"
          src="https://ithemes.xyz/wp-content/uploads/2024/01/Untitled-design-9.png"
          alt="Mobile Image"
        />
        <iframe
          id="demoframe"
          src="https://docapp-e7e3f.firebaseapp.com/swap"
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


export async function getServerSideProps(context) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    try {  
      const initialTab = "all";
      
      // const responseProduct = await axios.get(`${apiBaseUrl}/product?filter={"vendor":"67bd5ccc684c54fa8c4060b3"}`);
      const response = await axios.get(`${apiBaseUrl}/product?filter={"_id":"67c1ad542663cb8b8c8529a5"}`)
      const responsedata = await response.json();
      console.log('response', responsedata);
      return {
        props: { responsedata },
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { props: { responsedata: [] } };
    }
  }
