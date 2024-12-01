import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '../utils/scroll';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-green-600">DharaLink</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('features')}
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Contact
            </button>
            <button 
              onClick={() => handleNavClick('waitlist-form')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Join Waitlist
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="py-4 space-y-4">
              <button 
                onClick={() => handleNavClick('features')}
                className="block w-full text-left text-gray-600 hover:text-green-600 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => handleNavClick('about')}
                className="block w-full text-left text-gray-600 hover:text-green-600 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="block w-full text-left text-gray-600 hover:text-green-600 transition-colors"
              >
                Contact
              </button>
              <button 
                onClick={() => handleNavClick('WaitlistForm')}
                className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Join Waitlist
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;