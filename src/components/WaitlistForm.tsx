import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { submitToGoogleSheets } from '../utils/sheets';

const WaitlistForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    state: '',
    district: '',
    farmSize: '',
    crops: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.state) {
      newErrors.state = 'Please enter your state/region';
    }
    
    if (formData.farmSize && isNaN(Number(formData.farmSize))) {
      newErrors.farmSize = 'Please enter a valid number for farm size';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus('error');
      setMessage('Please correct the errors in the form');
      return;
    }

    setStatus('loading');
    setMessage('');
    
    try {
      await submitToGoogleSheets(formData);
      setStatus('success');
      setMessage('Successfully joined the waitlist!');
      setFormData({
        fullName: '',
        email: '',
        state: '',
        district: '',
        farmSize: '',
        crops: ''
      });
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to submit form');
    }
  };

  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Join the Waitlist</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields similar to before but with improved error handling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, fullName: e.target.value }));
                    if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
                    ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
                    ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Region *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, state: e.target.value }));
                    if (errors.state) setErrors(prev => ({ ...prev, state: '' }));
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
                    ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Farm Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Farm Size (in acres)
                </label>
                <input
                  type="text"
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, farmSize: e.target.value }));
                    if (errors.farmSize) setErrors(prev => ({ ...prev, farmSize: '' }));
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
                    ${errors.farmSize ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g., 5.5"
                />
                {errors.farmSize && (
                  <p className="mt-1 text-sm text-red-600">{errors.farmSize}</p>
                )}
              </div>

              {/* Crops */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Crops
                </label>
                <input
                  type="text"
                  name="crops"
                  value={formData.crops}
                  onChange={(e) => setFormData(prev => ({ ...prev, crops: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Rice, Wheat, Cotton"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full md:w-auto px-8 py-3 rounded-lg text-white font-semibold
                  ${status === 'loading' ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}
                  transition-colors`}
              >
                {status === 'loading' ? 'Submitting...' : 'Join Waitlist'}
              </button>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center text-green-600 gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{message}</span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center text-red-600 gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{message}</span>
              </motion.div>
            )}

            {/* Terms and Privacy */}
            <p className="text-xs text-gray-500 text-center mt-4">
              By joining the waitlist, you agree to our Terms of Service and Privacy Policy.
              We'll keep you updated about our launch.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistForm;