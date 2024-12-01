import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Smartphone, 
  Cloud, 
  BarChart, 
  Droplets,
  Sprout,
  TrendingUp
} from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'Smart Farming App',
    description: 'Access farm insights and controls right from your smartphone'
  },
  {
    icon: Cloud,
    title: 'Weather Integration',
    description: 'Real-time weather updates and forecasting for better planning'
  },
  {
    icon: BarChart,
    title: 'Yield Analytics',
    description: 'Track and optimize your crop yields with AI-powered insights'
  },
  {
    icon: Droplets,
    title: 'Water Management',
    description: 'Smart irrigation control and water usage optimization'
  },
  {
    icon: Sprout,
    title: 'Crop Health',
    description: 'Early detection of crop diseases and nutrient deficiencies'
  },
  {
    icon: TrendingUp,
    title: 'Market Connect',
    description: 'Direct access to better market prices and buyers'
  }
];

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="features" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Transform Your Farming
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            DharaLink brings modern technology to traditional farming practices,
            helping you achieve better yields with less effort
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;