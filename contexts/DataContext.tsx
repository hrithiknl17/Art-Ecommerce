
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, MOCK_CUSTOMERS } from '../data/mock';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  sales: number;
};

type CartItem = Product & { quantity: number };

type DataContextType = {
  products: Product[];
  orders: any[];
  customers: any[];
  cart: CartItem[];
  selectedProduct: Product | null;
  toast: { show: boolean; message: string };
  
  // Actions
  setSelectedProduct: (product: Product | null) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  getCartTotal: () => number;
  clearCart: () => void;
  addProduct: (product: any) => void;
  updateProduct: (product: any) => void;
  deleteProduct: (id: number) => void;
  placeOrder: (details: any) => void;
  updateOrderStatus: (id: string, status: string) => void;
  showToast: (msg: string) => void;
  hideToast: () => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children?: ReactNode }) => {
  const [products, setProducts] = useState(() => {
    // Basic cache busting strategy: Check if "v1_data" exists. If not, clear old and load new.
    const isV1 = localStorage.getItem('data_version') === '1.1';
    if (!isV1) {
        localStorage.removeItem('products');
        localStorage.setItem('data_version', '1.1');
        return INITIAL_PRODUCTS;
    }

    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [customers] = useState(MOCK_CUSTOMERS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => { localStorage.setItem('products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);

  const showToast = (message: string) => setToast({ show: true, message });
  const hideToast = () => setToast({ ...toast, show: false });

  const addToCart = (product: Product) => {
    const existing = cart.find((item: CartItem) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item: CartItem) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showToast(`Acquired ${product.name}`);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item: CartItem) => item.id !== productId));
  };

  const getCartTotal = () => cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
  const clearCart = () => setCart([]);

  // Admin Actions
  const addProduct = (newProduct: any) => {
    const productWithId = { ...newProduct, id: Date.now(), rating: 0, sales: 0 };
    setProducts([productWithId, ...products]);
    showToast("Artifact cataloged");
  };

  const updateProduct = (updatedProduct: any) => {
    setProducts(products.map((p: Product) => p.id === updatedProduct.id ? updatedProduct : p));
    showToast("Artifact updated");
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p: Product) => p.id !== id));
    showToast("Artifact removed");
  };

  const placeOrder = (details: any) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: details.name,
      date: new Date().toISOString().split('T')[0],
      items: cart.reduce((acc: number, item: CartItem) => acc + item.quantity, 0),
      total: getCartTotal(),
      status: 'Processing'
    };
    setOrders([newOrder, ...orders]);
    
    // Update inventory
    const updatedProducts = products.map((p: Product) => {
      const cartItem = cart.find((c: CartItem) => c.id === p.id);
      if (cartItem) {
        return { ...p, sales: (p.sales || 0) + cartItem.quantity, stock: Math.max(0, p.stock - cartItem.quantity) };
      }
      return p;
    });
    setProducts(updatedProducts);
    clearCart();
    showToast("Commission Placed Successfully!");
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((o: any) => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order ${orderId} status updated`);
  };

  return (
    <DataContext.Provider value={{
      products, orders, customers, cart, selectedProduct, toast,
      setSelectedProduct, addToCart, removeFromCart, getCartTotal, clearCart,
      addProduct, updateProduct, deleteProduct, placeOrder, updateOrderStatus,
      showToast, hideToast
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};

export const formatRupee = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
