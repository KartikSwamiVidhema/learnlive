import { Search, Palette, ShieldCheck, Headphones } from "lucide-react";

export default function ThemeMarketplace() {
  const features = [
    {
      icon: <Search className="w-10 h-10 text-green-900" />,
      title: "Search a theme",
      description: "It’s free and easy to search a theme. Simply fill in a title, description.",
    },
    {
      icon: <Palette className="w-10 h-10 text-green-900" />,
      title: "Choose a theme",
      description: "Select any theme you like for your interest.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-900" />,
      title: "Pay safely",
      description: "Go through our secure payment gateway and get pay for the product you choose.",
    },
    {
      icon: <Headphones className="w-10 h-10 text-green-900" />,
      title: "We’re here to help",
      description: "Get in contact with us for our 24/7 support.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">We're the Biggest theme marketplace across the world</h2>
        <p className="text-gray-600 mt-2">Most viewed and all-time top-selling services</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="p-4 bg-gray-100 rounded-xl">{feature.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
