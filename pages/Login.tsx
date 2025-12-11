
import React from 'react';
import { Button, Input } from '../components/ui/Elements';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';

const Login = () => {
  const { login } = useAuth();
  const { setView } = useNavigation();

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="text-3xl font-bold tracking-tighter mb-8 inline-block cursor-pointer" onClick={() => setView('home')}>Commerce.</span>
        <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
        <p className="mt-2 text-sm text-gray-600">Enter your details to access your account.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={(e) => { 
            e.preventDefault(); 
            const email = (e.target as any)[0].value;
            login(email);
          }}>
            <Input label="Email address" type="email" required placeholder="admin@demo.com for admin view" />
            <Input label="Password" type="password" required placeholder="••••••••" />
            
            <div className="flex items-center justify-between text-sm">
               <a href="#" className="font-medium text-black hover:text-gray-700">Forgot your password?</a>
            </div>

            <div>
              <Button type="submit" className="w-full">Sign in</Button>
            </div>
          </form>

          <div className="mt-6 text-center">
             <button 
               onClick={() => setView('register')}
               className="text-black font-medium hover:underline text-sm"
             >
               Don't have an account? Sign up
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
