import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Droplets, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          Transform Your Farm with 
          <span className="text-green-600"> AI-Powered</span> Insights
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          Join thousands of farmers using DharaLink to increase yields, save water, and maximize profits through smart agriculture technology.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
            Join the Waitlist
          </button>
          <button className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
            Learn More
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
            <Sprout className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Farming</h3>
            <p className="text-gray-600">AI-powered insights for optimal crop management</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
            <Droplets className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Water Savings</h3>
            <p className="text-gray-600">Reduce water usage by up to 30% with IoT sensors</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
            <TrendingUp className="w-12 h-12 text-brown-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Better Profits</h3>
            <p className="text-gray-600">Maximize your returns with market insights</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;