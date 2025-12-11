
import React from 'react';
import { useNavigation } from './contexts/NavigationContext';
import { useData } from './contexts/DataContext';
import { Toast } from './components/ui/Elements';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FluidCursor from './components/ui/FluidCursor';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';

const AppContent = () => {
  const { view } = useNavigation();
  const { toast, hideToast } = useData();

  // Views that don't need Navbar/Footer
  const isStandalone = ['admin', 'login', 'register'].includes(view);

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white cursor-none">
      {/* Custom Metallic Fluid Cursor */}
      <FluidCursor />
      
      <Toast show={toast.show} message={toast.message} onClose={hideToast} />

      {!isStandalone && <Navbar />}
      
      <main>
        {view === 'home' && <Home />}
        {view === 'shop' && <Shop />}
        {view === 'product' && <ProductDetail />}
        {view === 'cart' && <Cart />}
        {view === 'checkout' && <Checkout />}
        {view === 'login' && <Login />}
        {view === 'register' && <Signup />}
        {view === 'admin' && <AdminDashboard />}
      </main>

      {!isStandalone && <Footer />}
    </div>
  );
};

export default AppContent;
