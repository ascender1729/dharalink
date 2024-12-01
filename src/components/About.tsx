import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Mail } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Founder
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading the agricultural revolution through technology and innovation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src="public\assets\PHOTO.jpg" // Path updated to reference public directory
                alt="Pavan Kumar Dubasi"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Pavan Kumar Dubasi
                  </h3>
                  <p className="mt-1 text-lg text-green-600">
                    Founder & CEO
                  </p>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/im-pavankumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:pavan@dharalink.com"
                    className="text-gray-600 hover:text-gray-700 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-600 mb-4">
                  Pavan brings extensive expertise in AI/ML and a deep understanding of agricultural
                  challenges to DharaLink's mission of transforming Indian farming.
                </p>
                <p className="text-gray-600">
                  His vision combines cutting-edge technology with practical farming solutions,
                  making advanced agricultural practices accessible to farmers across India.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;