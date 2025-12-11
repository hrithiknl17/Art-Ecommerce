
import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

// --- Button (Modernist/Vogue Style) ---
export const Button = ({ children, variant = 'primary', className = '', onClick, ...props }: { 
  children?: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'; 
  className?: string; 
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  
  const baseStyle = "inline-flex items-center justify-center px-10 py-4 text-sm uppercase tracking-[0.2em] font-bold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#1A1A1A] text-white hover:bg-[#C5A059] hover:text-[#1A1A1A]",
    secondary: "bg-white text-[#1A1A1A] border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white",
    outline: "bg-transparent text-[#1A1A1A] border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white",
    ghost: "bg-transparent text-[#555] hover:text-[#1A1A1A]",
    danger: "bg-red-900 text-white hover:bg-red-800",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Input (Clean/Minimal) ---
export const Input = ({ label, type = "text", placeholder, required, ...props }: { 
  label?: string; 
  type?: string; 
  placeholder?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="mb-6 w-full">
    {label && (
      <label className="block text-xs font-bold uppercase tracking-widest text-[#555] mb-2">
        {label} {required && <span className="text-red-700">*</span>}
      </label>
    )}
    <input
      type={type}
      required={required}
      className="w-full px-4 py-3 bg-white border border-[#DDD] focus:border-[#1A1A1A] outline-none text-[#1A1A1A] placeholder-gray-400 transition-all duration-300 font-sans"
      placeholder={placeholder}
      {...props}
    />
  </div>
);

// --- Section Heading (Vogue Style) ---
export const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-16 text-center">
    <h2 className="text-5xl md:text-7xl font-vogue font-normal text-[#1A1A1A] mb-6 tracking-tight leading-none">
      {title}
    </h2>
    {subtitle && (
      <div className="flex justify-center">
        <p className="text-[#555] text-sm uppercase tracking-[0.15em] font-sans max-w-xl border-t border-black pt-4">
          {subtitle}
        </p>
      </div>
    )}
  </div>
);

// --- Toast (Minimalist) ---
export const Toast = ({ message, show, onClose }: { message: string; show: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[60] animate-fade-in-up">
      <div className="bg-[#1A1A1A] text-white px-8 py-4 shadow-2xl flex items-center gap-4 min-w-[300px] justify-center">
        <CheckCircle size={18} className="text-[#C5A059]" />
        <span className="font-sans text-sm font-bold uppercase tracking-wider">{message}</span>
      </div>
    </div>
  );
};

// --- Modal (Clean) ---
export const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children?: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white border border-[#1A1A1A] w-full max-w-lg p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:text-red-700 transition-colors">
          <X size={24} />
        </button>
        <h3 className="text-3xl font-vogue mb-8 text-center">{title}</h3>
        {children}
      </div>
    </div>
  );
};