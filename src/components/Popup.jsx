"use client";

import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function Popup({ isOpen, onClose, children }) {
    const [formData, setFormData] = useState({
        full_name: "",
        email_add: "",
        countryCode: "+91",
        phone_num: "",
        company: "",
        interest: "",
        message: "",
        page: typeof window !== "undefined" ? window.location.href : "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");

        try {
            const payload = {
                ...formData,
                form_type: "submitFormIthemes", // fixed value as per API
            };

            const response = await axios.post(
                "https://api.vidhema.com/users/vidhema-inquiry-form",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                    },
                }
            );

            setSuccess(response?.data?.message || "Your request has been submitted!");
            setFormData({
                full_name: "",
                email_add: "",
                countryCode: "+91",
                phone_num: "",
                company: "",
                interest: "",
                message: "",
                page: typeof window !== "undefined" ? window.location.href : "",
            });
        } catch (error) {
            console.error("Popup submit error:", error?.response || error);
            const serverMessage =
                error?.response?.data?.message ||
                error?.response?.data ||
                error.message;
            alert("Submission failed: " + serverMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 animate-fadeIn">
            <div className="mt-9 mb-9 flex flex-col md:flex-row max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 scale-100 md:scale-105">
                {/* Left Section */}
                <div className="md:w-1/2 bg-gradient-to-br from-blue-700 via-blue-500 to-indigo-500 text-white p-8 flex flex-col justify-center relative">
                    <h2 className="text-2xl font-bold mb-4 leading-tight">
                        Book a <span className="text-yellow-300">Free Demo</span> with our
                        Software Expert
                    </h2>
                    <ul className="mb-6 space-y-3">
                        <li className="flex items-start">
                            <span className="text-green-300 mr-3 mt-1">✔</span>
                            <span>Guaranteed expert callback within 48 hours</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-300 mr-3 mt-1">✔</span>
                            <span>Get matched with top 3 best software options</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-300 mr-3 mt-1">✔</span>
                            <span>Free personalized guide for your business needs</span>
                        </li>
                    </ul>
                    <p className="text-medium mt-auto opacity-90">
                        Trusted by 500+ leading brands
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4 text-sm opacity-90">
                        <span className="bg-white/10 px-3 py-1 rounded-full">Adobe</span>
                        <span className="bg-white/10 px-3 py-1 rounded-full">Salesforce</span>
                        <span className="bg-white/10 px-3 py-1 rounded-full">HP</span>
                        <span className="bg-white/10 px-3 py-1 rounded-full">AWS</span>
                        <span className="bg-white/10 px-3 py-1 rounded-full">Intel</span>
                        <span className="bg-white/10 px-3 py-1 rounded-full">Windows</span>
                        <span className="bg-white/10 px-3 py-1 rounded-full">Dell</span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="md:w-1/2 bg-white p-8 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-all"
                    >
                        <X size={24} />
                    </button>

                    <h3 className="text-xl font-semibold mb-6 text-gray-800">
                        Fill your details
                    </h3>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="full_name"
                            placeholder="Full Name"
                            value={formData.full_name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />

                        <input
                            type="email"
                            name="email_add"
                            placeholder="Email Address"
                            value={formData.email_add}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />

                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="countryCode"
                                placeholder="+91"
                                value={formData.countryCode}
                                onChange={handleChange}
                                className="w-1/4 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <input
                                type="tel"
                                name="phone_num"
                                placeholder="Phone Number"
                                value={formData.phone_num}
                                onChange={handleChange}
                                className="w-3/4 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />

                        <input
                            type="text"
                            name="interest"
                            placeholder="Your Interest (optional)"
                            value={formData.interest}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="3"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>

                        {success && (
                            <p className="text-green-600 text-center mt-2">{success}</p>
                        )}

                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full text-gray-600 text-sm underline hover:text-blue-600"
                        >
                            Close
                        </button>
                    </form>

                    {children}
                </div>
            </div>

            <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
        </div>
    );
}
