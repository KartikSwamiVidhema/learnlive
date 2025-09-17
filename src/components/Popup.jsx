"use client";

export default function Popup({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="flex max-w-[800px] max-h-[500px] overflow-hidden rounded-lg shadow-xl">
                {/* Left - Video Section */}
                <div className="w-1/2 bg-blue-700 p-6 flex flex-col justify-center text-white rounded-l-lg">
                    <h2 className="text-lg font-semibold mb-4">
                        Book Free Demo with our Software Expert
                    </h2>
                    <ul className="mb-6 space-y-3 list-none pl-0">
                        <li className="flex items-start">
                            <span className="inline-block mr-3 mt-1 text-green-400">✔</span>
                            <span>Assured Callback from expert within 48 hours</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block mr-3 mt-1 text-green-400">✔</span>
                            <span>Matching with up to 3 best alternatives</span>
                        </li>
                        <li className="flex items-start">

                            <span className="inline-block mr-3 mt-1 text-green-400">✔</span>
                            <span>Complementary Guide to help you choose the right software based on your needs</span>
                        </li>
                    </ul>
                    <p className="mt-auto">Select from 500+ Brands.</p>
                    <div className="flex space-x-3 mt-2">
                        {/* Replace with actual logos */}
                        <span>Adobe</span>
                        <span>Salesforce</span>
                        <span>HP</span>
                        <span>AWS</span>
                        <span>Intel</span>
                        <span>Windows</span>



                        <span>Dell</span>
                    </div>


                </div>

                {/* Right - Form Section */}
                <div className="w-1/2 bg-white p-6 rounded-r-lg overflow-y-auto relative">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
}