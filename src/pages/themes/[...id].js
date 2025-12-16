import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Popup from "@/components/Popup";
import { useState } from "react";
import productsData from "../../data/product.json"; // adjust path if needed
import { Elements } from "@stripe/react-stripe-js";
const ThemesPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const mainId = Array.isArray(id) ? id[0] : id;
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const slugToNameMap = {
        "uberr-clone-app": "Uberr Clone App",
        "lyft-clone-app": "Lyft Clone App",
        "food-delivery-app-development": "Food Delivery App Development",
        "super-app-development": "Super App Development",
        "careem-clone-app": "Careem Clone App",
        "talabat-clone-app": "Talabat Clone App",
        "gojek-clone-app": "Gojek Clone App",
        "glovo-clone-app": "Glovo Clone App",
        "grubhub-clone-app": "Grubhub Clone App",
        "grocery-app-development": "Grocery App Development",
        "bolt-clone-app": "Bolt Clone App",
        "carpooling-clone-app": "Carpooling Clone App",
        "ubereats-clone-app": "Ubereats Clone App",
        "blablacar-clone-app": "Blablacar Clone App",
        "logistics-app-development": "Logistics App Development",
        "handyman-app-like-uber": "Handyman App Like Uber",
        "justeat-clone-app": "Justeat Clone App",
        "taskrabbit-clone-app": "Taskrabbit Clone App",
        "delivery-app-development": "Delivery App Development",
        "indriver-clone-app": "inDriver Clone App",
        "bus-booking-app-development": "Bus Booking App Development",
    };

    const productName = slugToNameMap[mainId] || "Page not found";
    const data = productsData[mainId];

    if (!mainId) return <div className="text-center py-20">Loading...</div>;
    const hasData = (section) => {
        if (!section) return false;
        if (typeof section === "object") {
            return Object.values(section).some((value) => {
                if (Array.isArray(value)) return value.length > 0;
                if (typeof value === "string") return value.trim() !== "";
                if (typeof value === "object") return hasData(value);
                return !!value;
            });
        }
        return !!section;
    };


    if (!data) {
        return (
            <>
                <div className="flex flex-col items-center p-6">
                    <img
                        src="https://img.freepik.com/premium-vector/welcome-banner-with-flowers-vector-flat-vector-illustration-isolated-white-background_481273-753.jpg?w=2000"
                        alt="Welcome Banner"
                        className="w-full max-w-lg mb-6"
                    />
                    <h1 className="text-xl font-semibold mb-4 text-center">{productName}</h1>
                    <button
                        onClick={() => router.push("/")}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Go Back
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div>
            {/* ✅ Banner Section */}
            {/* ✅ Banner Section */}
            {data.banner && (
                <section
                    className={`${data?.banner?.css} relative w-full flex flex-col md:flex-row items-center justify-between rounded-2xl shadow-lg overflow-hidden`}
                    style={{ backgroundColor: data.banner.bg }}
                >
                    {/* Left (Text) Section */}
                    <div className="w-full md:w-1/2 h-[500px] flex flex-col justify-center items-start px-8 text-center md:text-left">
                        <div className="max-w-lg mx-auto md:mx-0">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2">
                                {data.banner?.title1}
                            </h1>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                                {data.banner?.title2}
                            </h1>
                            <p className="text-lg text-gray-700 mb-8">
                                {data.banner?.description}
                            </p>

                            <button
                                onClick={() => setIsPopupOpen(true)}
                                className="px-8 py-3 rounded-full transition-all duration-300 font-semibold text-sm md:text-base shadow-md hover:shadow-xl hover:scale-105"
                                style={{
                                    backgroundColor: data.banner?.buttonColor || "#007bff",
                                    color: data.banner?.buttonTextColor || "#ffffff",
                                }}
                            >
                                {data.banner?.buttonText || "Get Free Quote"}
                            </button>

                            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
                        </div>
                    </div>

                    {/* Right (Image) Section */}
                    <div className="w-full md:w-1/2 h-[500px] flex justify-center items-center bg-white/10">
                        <img
                            src={data.banner?.image}
                            alt={`${productName} Banner`}
                            className="h-full object-contain md:object-cover rounded-none"
                        />
                    </div>
                </section>

            )}


            {/* ✅ What Is Section */}
            {hasData(data.whatIs) && (
                <section className="py-10 px-4 bg-white mt-10">
                    <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center gap-8">
                        <img
                            src={data.whatIs?.image}
                            alt={`${productName} What Is`}
                            className="w-full md:w-1/2  object-cover"
                        />
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4">{data.whatIs?.title}</h2>
                            {data.whatIs?.paragraphs?.map((para, i) => (
                                <p key={i} className="text-gray-700 mb-4">
                                    {para}
                                </p>
                            ))}
                            <button
                                onClick={() => setIsPopupOpen(true)}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Get Quote
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* ✅ Profitable Ventures */}
            {data.profitableVentures.title && (
                <section className="py-10 px-4 bg-pink-50">
                    <div className="flex gap-9 max-w-6xl mx-auto">
                        <div className="text-center mb-8 mt-9 clear-left">
                            <h2 className="text-8xl md:text-4xl font-bold text-gray-800 mb-4">
                                {data.profitableVentures.title}
                            </h2>
                            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                                {data.profitableVentures.subtitle}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {data.profitableVentures.grid.map((box, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
                                    <img
                                        src={box.icon}
                                        alt={box.title}
                                        className="w-12 h-12 mx-auto mb-4 text-blue-600"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{box.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10 mt-10">
                {data.benefits?.title}
            </h2>
            {/* ✅ Grid Layout */}
            <div className=" mt-5 mb-5 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {data.benefits?.boxes?.map((box, i) => (
                    <div
                        key={i}
                        className="rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition transform hover:-translate-y-1"
                        style={{
                            backgroundColor: box?.bgColor || "#f9fafb", // ✅ dynamic box color
                        }}
                    >
                        <img
                            src={box.icon}
                            alt={box.title}
                            className="w-20 h-20 mx-auto mb-6 object-contain"
                        />
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                            {box.title}
                        </h3>
                        <p className="text-gray-700 text-base leading-relaxed">
                            {box.description}
                        </p>
                    </div>
                ))}
            </div>



            {/* ✅ Why Choose */}
            {data.whyChoose?.title && (
                <section
                    className="py-20 px-6 text-white relative overflow-hidden"
                    style={{ backgroundColor: data.whyChoose?.sectionBgColor || "#2C2C3A" }}
                >
                    <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">

                        {/* Left: Text Section */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                                {data.whyChoose.title}
                            </h2>
                            {data.whyChoose.paragraphs?.map((p, i) => (
                                <p key={i} className="text-gray-200 text-lg leading-relaxed mb-4">
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* Right: Image Section */}
                        <div className="w-full md:w-1/2 flex justify-center items-center">
                            <div className="relative w-full max-w-xl md:max-w-2xl">
                                <img
                                    src={data.whyChoose.image}
                                    alt="Why Choose"
                                    className="w-full h-[400px] md:h-[500px] object-contain rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105"
                                />
                                {/* Optional glow or highlight */}
                                <div className="absolute inset-0 rounded-2xl bg-white/10 blur-3xl -z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>

            )}

            <section className="bg-green-700 text-white py-16 px-6"> <div className="max-w-6xl mx-auto flex justify-center gap-12 text-center"> {[{ number: "08+", label: "Years of Experience" }, { number: "850+", label: "Trusted Clients" }, { number: "700+", label: "Projects Delivered" }, { number: "100%", label: "Satisfied Customers" },].map((stat, index) => (<div key={index}> <h3 className="text-3xl font-bold mb-2">{stat.number}</h3> <p className="text-green-100 text-sm">{stat.label}</p> </div>))} </div> </section>

            {/* ✅ User Features */}
            {data.userFeatures.title && (
                <section className="bg-white py-16 px-6">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4">{data.userFeatures?.title}</h2>
                            <p className="text-gray-700 mb-6">{data.userFeatures?.description}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {data.userFeatures?.features?.map((f, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-3 rounded-lg shadow"
                                        style={{ backgroundColor: "#FFE5B4" }} // 👈 Light orange color
                                    >
                                        <img src={f.icon} alt={f.title} className="w-8 h-8" />
                                        <p>{f.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src={data.userFeatures?.image}
                                alt="User Features"
                                className="rounded-lg shadow-lg max-w-sm h-auto mx-auto"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* ✅ Driver Features */}
            {data.driverFeatures.title && (
                <section className="bg-white py-16 px-6">
                    <div className="  max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                        <div className="md:w-1/2">
                            <img
                                src={data.driverFeatures?.image}
                                alt="Driver Features"
                                className="rounded-lg shadow-lg max-w-sm h-auto mx-auto"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4">
                                {data.driverFeatures?.title}
                            </h2>
                            <p className="text-gray-700 mb-6">
                                {data.driverFeatures?.description}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {data.driverFeatures?.features?.map((f, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-3 rounded-lg shadow"
                                        style={{ backgroundColor: "#FFE5B4" }} // 👈 Light orange color
                                    >
                                        <img src={f.icon} alt={f.title} className="w-8 h-8" />
                                        <p>{f.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ✅ Admin Features */}
            {data.adminFeatures.title && (
                <section className="bg-white py-16 px-6">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4">
                                {data.adminFeatures?.title}
                            </h2>
                            <p className="text-gray-700 mb-6">
                                {data.adminFeatures?.description}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {data.adminFeatures?.features?.map((f, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-3 rounded-lg shadow"
                                        style={{ backgroundColor: "#FFE5B4" }} // 👈 Light orange color
                                    >
                                        <img src={f.icon} alt={f.title} className="w-8 h-8" />
                                        <p>{f.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src={data.adminFeatures?.image}
                                alt="Admin Features"
                                className="rounded-lg shadow-lg max-w-sm h-auto mx-auto"
                            />
                        </div>
                    </div>
                </section>

            )}
            {data.featuresSection.title && (
                <section
                    className="py-10 px-4"
                    style={{
                        backgroundColor: data.featuresSection?.sectionBgColor || "#f0f0f0", // ✅ dynamic section bg from JSON
                    }}
                >
                    <div className="max-w-6xl mx-auto">

                        {/* Title */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                {data.featuresSection?.title}
                            </h2>
                            <p className="text-gray-600">{data.featuresSection?.description}</p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {data.featuresSection?.features.map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
                                    style={{ backgroundColor: "#FFFfff" }} // ✅ Default yellow cards
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-16 h-16 mx-auto mb-4 object-contain"
                                    />
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">{item.description}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>
            )}

            {/* ✅ Launch App Section with Blurred Background */}
            {data.launchApp.title && (
                <section
                    className="relative py-16 px-6 text-gray-800 overflow-hidden"
                    style={{
                        backgroundImage: `url('${data.launchApp?.backgroundImage}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Blur Overlay */}
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

                    {/* Content */}
                    <div className="items-center justify-center text-center relative max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
                            {data.launchApp?.title}
                        </h2>
                        <p className="text-gray-700 mb-6">{data.launchApp?.description}</p>

                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            {data.launchApp?.buttonText || "Get Quote"}
                        </button>
                    </div>
                </section>
            )}
            <section className="py-12 bg-white">
                <h2 className="text-6xl font-bold text-center text-gray-800 mb-12">
                    Technologies We Considered
                </h2>
                <div className="container mx-auto px-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 max-w-5xl mx-auto gap-3">
                        {[
                            { img: "https://cdn.prod.website-files.com/65b66de3a2664d1645e98af1/65fa86c645ec728e92aaea05_Stripe.webp", alt: "Stripe" },
                            { img: "https://cdn.prod.website-files.com/65b66de3a2664d1645e98af1/65fa86c645ec728e92aae9ff_scrt-p-500.webp", alt: "Secure" },
                            { img: "https://cdn.prod.website-files.com/65b66de3a2664d1645e98af1/65fa86c645ec728e92aae9f9_jqry.webp", alt: "jQuery" },
                            { img: "https://cdn.prod.website-files.com/65b66de3a2664d1645e98af1/65fa86c645ec728e92aae9f3_ang-p-500.webp", alt: "Angular" },
                            { img: "https://cdn.prod.website-files.com/65b66de3a2664d1645e98af1/660d35846dad8f2684240619_Frame%2040366.webp", alt: "Python" },
                            { img: "https://cdn.prod.website-files.com/65b66de3a2664d1645e98af1/660d35857456ceeda51a74bf_Frame%2040367.webp", alt: "Swift" },
                            { img: "https://cdn.prod.website-files.com/65b66de3a2664d1645e98af1/65fa86c645ec728e92aae9f0_git-p-500.webp", alt: "GitHub" },
                            { img: "https://cdn.prod.website-files.com/65b66de3a2664d1645e98af1/65fa86c645ec728e92aae9fc_node-p-500.webp", alt: "Node.js" },
                            { img: "https://cdn.prod.website-files.com/65b66de3a2664d1645e98af1/65fa86c645ec728e92aaea02_java-p-500.webp", alt: "Java" },
                            { img: "https://cdn.prod.website-files.com/65b66de3a2664d1645e98af1/65fa86c645ec728e92aae9f6_boo-p-500.webp", alt: "Bootstrap" },
                        ].map((tech, index) => (
                            <div key={index} className="flex justify-center items-center p-4 hover:scale-105 transition-transform duration-300">
                                <img
                                    src={tech.img}
                                    alt={tech.alt}
                                    className="h-52 w-52 object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {data.faq.title && (
                <section className="py-16 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900">{data.faq.title}</h2>
                        </div>

                        <div className="space-y-4">
                            {data.faq.questions.map((faq, index) => (
                                <details
                                    key={index}
                                    className="border border-gray-200 rounded-lg overflow-hidden"
                                >
                                    <summary className="flex items-center justify-between px-6 py-4 cursor-pointer">
                                        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                                        <span className="text-2xl font-bold text-gray-500 transition-transform duration-200">
                                            +
                                        </span>
                                    </summary>
                                    <p className="px-6 py-4 text-gray-700 leading-relaxed">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ✅ Footer */}
            <Footer />
        </div>
    );
};

export default ThemesPage;
