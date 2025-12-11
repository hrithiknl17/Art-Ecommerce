
import React from 'react';
import { Button, Input } from '../components/ui/Elements';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';

const Signup = () => {
  const { register } = useAuth();
  const { setView } = useNavigation();

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="text-3xl font-bold tracking-tighter mb-8 inline-block cursor-pointer" onClick={() => setView('home')}>Commerce.</span>
        <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
        <p className="mt-2 text-sm text-gray-600">Start your journey with us today.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={(e) => { 
            e.preventDefault(); 
            const email = (e.target as any)[0].value;
            register(email, "New User");
          }}>
            <Input label="Email address" type="email" required placeholder="you@example.com" />
            <Input label="Password" type="password" required placeholder="••••••••" />
            <Input label="Confirm Password" type="password" required placeholder="••••••••" />

            <div>
              <Button type="submit" className="w-full">Register</Button>
            </div>
          </form>

          <div className="mt-6 text-center">
             <button 
               onClick={() => setView('login')}
               className="text-black font-medium hover:underline text-sm"
             >
               Already have an account? Log in
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
