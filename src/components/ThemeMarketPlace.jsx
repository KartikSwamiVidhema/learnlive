import { Search, Palette, ShieldCheck, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function ThemeMarketplace() {
  const router = useRouter();

  const features = [
    {
      icon: <Search className="w-10 h-10 text-green-900" />,
      title: "Search a theme",
      description:
        "It’s free and easy to search a theme. Simply fill in a title, description.",
    },
    {
      icon: <Palette className="w-10 h-10 text-green-900" />,
      title: "Choose a theme",
      description: "Select any theme you like for your interest.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-900" />,
      title: "Pay safely",
      description:
        "Go through our secure payment gateway and get pay for the product you choose.",
    },
    {
      icon: <Headphones className="w-10 h-10 text-green-900" />,
      title: "We’re here to help",
      description: "Get in contact with us for our 24/7 support.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="md:py-16 py-10 bg-white text-center overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold text-gray-900"
      >
        We're the Biggest Theme Marketplace Across the World
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mt-2 mb-5"
      >
        Most viewed and all-time top-selling services
      </motion.p>

      <motion.div
        className="container px-4 mx-auto text-center mt-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const isContactBox = feature.title === "We’re here to help";

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
                }}
                onClick={() => isContactBox && router.push("/contactus")}
                className={`flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 ${isContactBox ? "cursor-pointer" : ""
                  }`}
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="p-4 bg-green-100 rounded-full"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
