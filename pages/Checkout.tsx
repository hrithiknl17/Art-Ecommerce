
import React, { useState } from 'react';
import { ChevronRight, CreditCard } from 'lucide-react';
import { Button, Input, SectionHeading } from '../components/ui/Elements';
import { useNavigation } from '../contexts/NavigationContext';
import { useData, formatRupee } from '../contexts/DataContext';

const Checkout = () => {
  const { setView } = useNavigation();
  const { getCartTotal, placeOrder } = useData();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleChange = (e: any) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleFinalSubmit = () => {
    placeOrder(formData);
    setTimeout(() => setView('home'), 2000);
  };
     
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={() => setView('cart')} className="text-sm font-medium text-gray-500 hover:text-black flex items-center">
            <ChevronRight className="rotate-180 mr-1" size={14} /> Return to Cart
          </button>
        </div>
        
        <SectionHeading title="Checkout" />
        
        <div className="space-y-6">
          {/* Section 1: Contact */}
          <section className={`border rounded-2xl p-6 transition-all ${step === 1 ? 'border-black shadow-md' : 'border-gray-200 opacity-60'}`}>
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 transition-colors ${step >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>1</div>
              Contact Information
            </h2>
            {step === 1 && (
               <div className="pl-11 space-y-4 animate-fade-in">
                 <Input name="email" label="Email Address" placeholder="you@example.com" required value={formData.email} onChange={handleChange} />
                 <div className="pt-4">
                    <Button onClick={() => setStep(2)} disabled={!formData.email}>Continue to Shipping</Button>
                 </div>
               </div>
            )}
          </section>

          {/* Section 2: Shipping */}
          <section className={`border rounded-2xl p-6 transition-all ${step === 2 ? 'border-black shadow-md' : 'border-gray-200 opacity-60'}`}>
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 transition-colors ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>2</div>
              Shipping Details
            </h2>
            {step === 2 && (
               <div className="pl-11 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                 <div className="md:col-span-2">
                   <Input name="name" label="Full Name" placeholder="John Doe" required value={formData.name} onChange={handleChange} />
                 </div>
                 <div className="md:col-span-2">
                   <Input name="address" label="Address" placeholder="123 Main St" required value={formData.address} onChange={handleChange} />
                 </div>
                 <Input name="city" label="City" placeholder="New York" required value={formData.city} onChange={handleChange} />
                 <Input name="zip" label="Postal Code" placeholder="10001" required value={formData.zip} onChange={handleChange} />
                 <div className="md:col-span-2 pt-4 flex gap-4">
                    <Button onClick={() => setStep(3)} disabled={!formData.name || !formData.address}>Continue to Payment</Button>
                    <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                 </div>
               </div>
            )}
          </section>

          {/* Section 3: Payment */}
          <section className={`border rounded-2xl p-6 transition-all ${step === 3 ? 'border-black shadow-md' : 'border-gray-200 opacity-60'}`}>
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 transition-colors ${step >= 3 ? 'bg-black text-white' : 'bg-gray-200'}`}>3</div>
              Payment
            </h2>
            {step === 3 && (
               <div className="pl-11 animate-fade-in">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
                  <div className="flex items-center mb-6">
                     <div className="bg-white p-2 rounded border border-gray-200 mr-3">
                       <CreditCard className="text-black" size={24} />
                     </div>
                     <span className="font-bold">Credit Card</span>
                  </div>
                  <div className="space-y-4">
                    <Input placeholder="Card Number" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="MM/YY" />
                      <Input placeholder="CVC" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                   <Button className="w-full text-lg py-4" onClick={handleFinalSubmit}>
                     Pay {formatRupee(getCartTotal())}
                   </Button>
                </div>
                <Button variant="ghost" onClick={() => setStep(2)} className="mt-2">Back</Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
