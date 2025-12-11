
import React from 'react';
import { MapPin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-black text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-12">
      <div className="col-span-2 md:col-span-1">
        <h4 className="text-2xl font-bold tracking-tighter mb-6">Commerce.</h4>
        <p className="text-gray-400 text-sm leading-relaxed">
          Rethinking the way you shop online. Minimalist design, maximum efficiency.
        </p>
      </div>
      <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-500">Company</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
          </ul>
      </div>
      <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-500">Support</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
      </div>
      <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-500">Social</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
          </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-sm text-gray-500 flex justify-between items-center">
      <span>&copy; 2025 Commerce Project. All rights reserved.</span>
      <div className="flex gap-4">
          <MapPin size={16} />
          <span>San Francisco, CA</span>
      </div>
    </div>
  </footer>
);

export default Footer;
