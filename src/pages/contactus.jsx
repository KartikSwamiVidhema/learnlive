import Footer from "@/components/Footer";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import MetaTags from "@/components/metaTags";
import metadata from "../components/common/metadata.json"

const ContactUs=()=>{
  const seo = metadata.contactus;
  return (
   
    <>
     <MetaTags
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-gray-600 text-center mb-6">We would love to hear from you! Please fill out the form below.</p>
      
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <User className="mr-2" /> Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <Mail className="mr-2" /> Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <MessageSquare className="mr-2" /> Message
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Enter your message"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
        >
          <Send className="mr-2" /> Send Message
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
}
export default ContactUs;