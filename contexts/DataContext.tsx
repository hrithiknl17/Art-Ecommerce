// src/contexts/DataContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, 
  query, where, onSnapshot 
} from 'firebase/firestore';
import { db } from '../src/lib/firebase';
import { useAuth } from './AuthContext';

// Types
export type Product = {
  id: string; // Changed from number to string for Firestore IDs
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
  cart: CartItem[];
  selectedProduct: Product | null;
  toast: { show: boolean; message: string };
  
  // Actions
  setSelectedProduct: (product: Product | null) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  getCartTotal: () => number;
  clearCart: () => void;
  addProduct: (product: any) => Promise<void>;
  updateProduct: (product: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  placeOrder: (details: any) => Promise<void>;
  updateOrderStatus: (id: string, status: string) => Promise<void>;
  showToast: (msg: string) => void;
  hideToast: () => void;
  customers: any[]; // Kept mock for now
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]); // Local cart for now (simplest for phase 1)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Fetch Products Real-time
  useEffect(() => {
    const q = collection(db, 'products');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(prods);
    });
    return unsubscribe;
  }, []);

  // Fetch Orders (If Admin)
  useEffect(() => {
    if (user?.role === 'admin') {
      const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
        const ords = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ords);
      });
      return unsubscribe;
    }
  }, [user]);

  const showToast = (message: string) => setToast({ show: true, message });
  const hideToast = () => setToast({ ...toast, show: false });

  // --- Cart Logic (Local State for Speed) ---
  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showToast(`Acquired ${product.name}`);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const getCartTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const clearCart = () => setCart([]);

  // --- Database Actions ---
  
  const addProduct = async (newProduct: any) => {
    try {
      await addDoc(collection(db, 'products'), {
        ...newProduct,
        rating: 0,
        sales: 0,
        createdAt: new Date()
      });
      showToast("Artifact cataloged");
    } catch (e) {
      console.error(e);
      showToast("Error adding product");
    }
  };

  const updateProduct = async (updatedProduct: any) => {
    try {
      const productRef = doc(db, 'products', updatedProduct.id);
      await updateDoc(productRef, updatedProduct);
      showToast("Artifact updated");
    } catch (e) {
      console.error(e);
      showToast("Error updating");
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      showToast("Artifact removed");
    } catch (e) {
      console.error(e);
      showToast("Error removing");
    }
  };

  const placeOrder = async (details: any) => {
    try {
      const orderData = {
        customer: details.name,
        email: details.email,
        address: details.address,
        date: new Date().toISOString().split('T')[0],
        items: cart,
        total: getCartTotal(),
        status: 'Processing',
        userId: user?.uid || 'guest'
      };
      
      await addDoc(collection(db, 'orders'), orderData);
      
      // Update Stock (Optional: simplified)
      // In production, use a Transaction to ensure stock doesn't go below 0
      cart.forEach(async (item) => {
        if (item.stock > 0) {
           const productRef = doc(db, 'products', item.id);
           await updateDoc(productRef, { 
             stock: item.stock - item.quantity,
             sales: (item.sales || 0) + item.quantity
           });
        }
      });

      clearCart();
      showToast("Commission Placed Successfully!");
    } catch (e) {
      console.error(e);
      showToast("Order Failed");
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
      showToast(`Order updated`);
    } catch (e) {
       showToast("Update failed");
    }
  };

  return (
    <DataContext.Provider value={{
      products, orders, customers: [], cart, selectedProduct, toast,
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