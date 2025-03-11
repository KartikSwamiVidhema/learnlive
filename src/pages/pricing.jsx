import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { CheckIcon } from 'lucide-react';

const PricingTier = ({ name, price, features, recommended }) => (
<div
  className={`relative bg-white p-6 rounded-lg shadow-lg ${
    recommended ? "border-2 border-primary" : ""
  }`}
>
  {/* Recommended Banner */}
  {recommended && (
    <div className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 bg-primary text-white w-4/5 text-center py-1 text-sm font-semibold rounded-md shadow-md">
      Recommended
      {/* Left Triangle */}
      <div className="absolute left-[-10px] top-full w-0 h-0 border-8 border-transparent border-r-primary"></div>
      {/* Right Triangle */}
      <div className="absolute right-[-10px] top-full w-0 h-0 border-8 border-transparent border-l-primary"></div>
    </div>
  )}

  {/* Card Content */}
  <h3 className="text-2xl font-bold mb-4 mt-2">{name}</h3>
  <div className="text-3 font-bold mb-6 ">{price}</div>

  {/* Features List */}
  <ul className="space-y-3 mb-6">
    {features.map((feature, index) => (
      <li key={index} className="flex items-center">
        <CheckIcon className="text-green-500 mr-2" size={20} />
        <span>{feature}</span>
      </li>
    ))}
  </ul>

  {/* Button */}
  <Button className="w-full" asChild>
    <Link href="/register">{recommended ? "Start free trial" : "Get started"}</Link>
  </Button>
</div>

);

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
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
    
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-center text-gray-600 mb-12">Choose the plan that's right for you</p>
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
