import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: {
    text: string;
    included: boolean;
  }[];
  isPopular?: boolean;
}

const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(true);
  
  const plans: PricingPlan[] = [
    {
      name: 'Silver',
      price: annual ? '₹ 40,000' : '₹ 40,000',
      description: 'For large organizations with complex needs',
      features: [
        { text: 'Web application Development and Maintaining', included: true },
      ],
    },
    {
      name: 'Gold',
      price: annual ? '₹ 1,20,000' : '₹ 1,20,000',
      description: 'Perfect for small businesses and startups',
      features: [
        { text: 'Web application Development ', included: true },
        { text: 'Mobile Application Development ', included: true },
        { text: 'Maintaining ', included: true },
      ],
    },
    {
      name: 'Diamond',
      price: annual ? '₹ 5,00,000' : '₹ 5,00,000',
      description: 'Ideal for growing businesses and teams',
      features: [
        { text: 'AI and Ml integration ', included: true },
        { text: 'Digital marketing ', included: true },
        { text: 'Business Development ', included: true },
        { text: 'Data Base management ', included: true },
        { text: 'IT support and Troubleshooting ', included: true },
      ],
      isPopular: true,
    },
  ];
  
  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="Pricing Plans"
          title="Choose Your Plan"
          description="Transparent pricing with no hidden fees. Choose the plan that fits your needs."
        />
        
        <div className="flex justify-center mt-10 mb-12">
          <div className="flex items-center p-1 bg-dark-200 rounded-full">
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                annual ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg' : 'text-gray-400'
              }`}
            >
              Annual
              {annual && <span className="ml-2 text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">Save 20%</span>}
            </button>
            {/* <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                !annual ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg' : 'text-gray-400'
              }`}
            >
              Monthly
            </button> */}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass rounded-xl overflow-hidden relative animate-on-scroll ${
                plan.isPopular ? 'border border-primary-500/30' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs px-4 py-1 rounded-bl-lg rounded-tr-xl font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-2 mb-1">{annual ? '/year' : '/month'}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 rounded-lg transition-all duration-300 ${
                    plan.isPopular 
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg hover:shadow-primary-500/20' 
                      : 'bg-dark-200 text-white hover:bg-dark-100'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-20 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl -z-10"></div>
    </section>
  );
};

export default Pricing;