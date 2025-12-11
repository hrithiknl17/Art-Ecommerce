
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button, SectionHeading } from '../components/ui/Elements';
import { useNavigation } from '../contexts/NavigationContext';
import { useData, formatRupee } from '../contexts/DataContext';

const Cart = () => {
  const { setView } = useNavigation();
  const { cart, addToCart, removeFromCart, getCartTotal } = useData();

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Shopping Cart" />
        
        {cart.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-sm mb-6">
               <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Your cart is empty</h3>
            <p className="mt-2 text-gray-500 max-w-xs mx-auto">Looks like you haven't added anything to your cart yet.</p>
            <div className="mt-8">
              <Button onClick={() => setView('shop')}>Start Shopping</Button>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            {/* Cart Items */}
            <div className="lg:col-span-7">
              {cart.map((item) => (
                <div key={item.id} className="flex py-6 border-b border-gray-100 last:border-0">
                  <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover bg-gray-100" />
                  <div className="ml-6 flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{formatRupee(item.price * item.quantity)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                         <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200" onClick={() => removeFromCart(item.id)}>-</button>
                         <span className="font-medium w-4 text-center">{item.quantity}</span>
                         <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200" onClick={() => addToCart(item)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-5 mt-10 lg:mt-0">
              <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="flex justify-between mb-4 text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatRupee(getCartTotal())}</span>
                </div>
                <div className="flex justify-between mb-4 text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between mb-4 text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">{formatRupee(getCartTotal())}</span>
                </div>
                <Button className="w-full text-lg py-4" onClick={() => setView('checkout')}>
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
