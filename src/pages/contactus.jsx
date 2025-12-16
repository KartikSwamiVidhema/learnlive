import Footer from "@/components/Footer";
import { Mail, User, MessageSquare, Send, Building } from "lucide-react";
import MetaTags from "@/components/metaTags";
import metadata from "../components/common/metadata.json";
import { useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const seo = metadata.contactus;

  // form state matching API fields
  const [form, setForm] = useState({
    full_name: "",
    email_add: "",
    countryCode: "+91",
    phone_num: "",
    company: "",
    interest: "",
    message: "",
    page: typeof window !== "undefined" ? window.location.href : "",
  });

  const [status, setStatus] = useState("idle");

  // API endpoint (actual URL)
  const contactApi = "https://api.vidhema.com/users/vidhema-inquiry-form";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.phone_num || form.phone_num.trim().length < 6) {
      alert("Please provide a valid phone number.");
      return;
    }

    setStatus("sending");
    try {
      // create payload based on API structure
      const payload = {
        ...form,
        form_type: "submitFormIthmemesContactForm",
      };

      const res = await axios.post(contactApi, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      });

      setStatus("success");
      alert(res?.data?.message || "Message sent successfully!");
      console.log("✅ API Response:", res.data);

      // reset form
      setForm({
        full_name: "",
        email_add: "",
        countryCode: "+91",
        phone_num: "",
        company: "",
        interest: "",
        message: "",
        page: typeof window !== "undefined" ? window.location.href : "",
      });
    } catch (err) {
      setStatus("error");
      const serverMessage =
        err?.response?.data?.message || err?.response?.data || err.message;
      console.error("❌ Contact submit error:", err?.response || err);
      alert("Failed to send message: " + serverMessage);
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
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <p className="text-medium text-black-800">
          <a className="hover:underline" href="/">Home/</a>
          <span className="text-gray-400 font-sm">Contact Us</span>
        </p>
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-gray-600 text-center mb-6">
          We would love to hear from you! Please fill out the form below.
        </p>



        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center">
              <User className="mr-2" /> Full Name
            </label>
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center">
              <Mail className="mr-2" /> Email
            </label>
            <input
              name="email_add"
              value={form.email_add}
              onChange={handleChange}
              type="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone + Country Code */}
          <div className="flex gap-2">
            <div className="w-1/4">
              <label className="block text-gray-700 font-medium mb-2">
                Code
              </label>
              <input
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="+91"
              />
            </div>
            <div className="w-3/4">
              <label className="block text-gray-700 font-medium mb-2">
                Phone
              </label>
              <input
                name="phone_num"
                value={form.phone_num}
                onChange={handleChange}
                type="tel"
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center">
              <Building className="mr-2" /> Company
            </label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your company name"
            />
          </div>

          {/* Interest */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Interest (optional)
            </label>
            <input
              name="interest"
              value={form.interest}
              onChange={handleChange}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your area of interest"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center">
              <MessageSquare className="mr-2" /> Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              placeholder="Enter your message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
          >
            <Send className="mr-2" />
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
