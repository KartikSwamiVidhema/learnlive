import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { CheckIcon } from 'lucide-react';

const PricingTier = ({ name, price, features, recommended, tier }) => {
  const tierColors = {
    Free: "from-indigo-500 to-indigo-900",
    Standard: "from-indigo-500 to-indigo-900",
    Plus: "from-indigo-500 to-indigo-900",
  };

  const bgGradient = tierColors[tier || name] || "from-gray-500 to-gray-400";

  // Dynamic button class based on tier
  const getButtonClass = () => {
    if (tier === 'Free') return 'w-full bg-indigo-900';
    if (tier === 'Plus') return 'w-full bg-indigo-900';
    return 'w-full bg-indigo-900'; // Default for Standard and others
  };

  return (
    <div className="relative bg-white rounded-xl shadow-xl overflow-hidden flex flex-col justify-between h-[500px]">
      {/* Top Gradient Header */}
      <div className={`bg-gradient-to-br ${bgGradient} px-6 pt-6 pb-10 text-white`}>
        <h3 className="text-2xl font-bold text-center">{name}</h3>
        <div className="text-3xl font-extrabold text-center mt-2">{price}</div>
      </div>

      {/* Recommended Tag */}
      {recommended && (
        <div className="absolute top-2 right-2 bg-[#ffffff] text-black text-xs px-3 py-1 rounded-full shadow-md font-semibold">
          Recommended
        </div>
      )}

      {/* Features List */}
      <div className="px-6 py-8 flex-1">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckIcon className="text-green-500 mr-2" size={20} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-6">
        <Button className={getButtonClass()} asChild>
          <Link href="/register">{recommended ? "Get Started" : "Start Free Trial"}</Link>
        </Button>
      </div>
    </div>
  );
};

const Pricing = () => {
  const pricingTiers = [
    {
      name: 'Free',
      price: '$0/mo',
      features: [
        '5 products',
        'Unlimited sales',
        '5% transaction fee',
        'Basic analytics',
      ],
      tier: 'Free', // Added for explicit matching
    },
    {
      name: 'Standard',
      price: '$29/mo',
      features: [
        'Unlimited products',
        'Unlimited sales',
        '2% transaction fee',
        'Advanced analytics',
        'Priority support',
      ],
      recommended: true,
      tier: 'Standard', // Added for explicit matching
    },
    {
      name: 'Plus',
      price: '$99/mo',
      features: [
        'Unlimited products',
        'Unlimited sales',
        '0.5% transaction fee',
        'Advanced analytics',
        'Priority support',
        'Custom domain',
      ],
      tier: 'Plus', // Added for explicit matching
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Assuming Header is included here if needed */}
      {/* <Header /> */}

      <main className="flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-900 to-blue-900 w-full py-20">
        <div className="max-w-7xl w-full">
          <h1 className="text-4xl font-bold text-center mb-4 text-white">Simple, transparent pricing</h1>
          <p className="text-xl text-center text-gray-200 mb-12">Choose the plan that's right for you</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <PricingTier key={index} {...tier} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;