
import React, { useState } from 'react';
import { TrendingUp, Package, ShoppingBag, Users, Edit2, Trash2, Plus, Mail, Calendar, MoreHorizontal, Link as LinkIcon, Upload, ImageIcon } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useAuth } from '../../contexts/AuthContext';
import { useData, formatRupee } from '../../contexts/DataContext';
import { Button, Input, Modal } from '../ui/Elements';

// --- Sidebar ---
export const AdminSidebar = ({ view, setView }: { view: string, setView: (v: string) => void }) => {
  const { logout } = useAuth();
  
  return (
    <div className="w-64 bg-black text-white hidden md:flex flex-col fixed h-full z-10">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold tracking-tighter">Commerce.</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button onClick={() => setView('overview')} className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${view === 'overview' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
           <TrendingUp size={18} /> Dashboard
        </button>
        <button onClick={() => setView('orders')} className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${view === 'orders' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
           <Package size={18} /> Orders
        </button>
        <button onClick={() => setView('products')} className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${view === 'products' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
           <ShoppingBag size={18} /> Products
        </button>
         <button onClick={() => setView('customers')} className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${view === 'customers' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
           <Users size={18} /> Customers
        </button>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button onClick={logout} className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-gray-900 rounded-lg transition-colors">
           Logout
        </button>
      </div>
    </div>
  );
};

// --- Overview ---
export const AdminOverview = () => {
  const { products, orders } = useData();
  const revenue = products.reduce((acc: number, p: any) => acc + (p.price * (p.sales || 0)), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-black text-white p-3 rounded-xl"><TrendingUp size={20} /></div>
          <span className="text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
        </div>
        <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{formatRupee(revenue)}</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gray-100 text-black p-3 rounded-xl"><Package size={20} /></div>
          <span className="text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-full">+5.2%</span>
        </div>
        <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gray-100 text-black p-3 rounded-xl"><Users size={20} /></div>
          <span className="text-red-500 text-sm font-bold bg-red-50 px-2 py-1 rounded-full">-1.4%</span>
        </div>
        <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">8,432</p>
      </div>
    </div>
  );
};

// --- Products ---
export const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [imageMode, setImageMode] = useState('url');
  const [previewImage, setPreviewImage] = useState('');

  const handleModalSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {
      id: editingProduct ? editingProduct.id : undefined,
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as string,
      image: imageMode === 'url' ? formData.get('imageUrl') as string : previewImage,
      stock: parseInt(formData.get('stock') as string),
      rating: editingProduct ? editingProduct.rating : 0,
      sales: editingProduct ? editingProduct.sales : 0,
    };

    if (editingProduct) { updateProduct(productData); } else { addProduct(productData); }
    setIsModalOpen(false);
    setEditingProduct(null);
    setPreviewImage('');
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setPreviewImage(reader.result as string); };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setPreviewImage('');
    setImageMode('url');
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setPreviewImage(product.image);
    setImageMode('url');
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
         <h3 className="font-bold text-lg text-gray-900">Product Inventory & Analytics</h3>
         <Button onClick={openAddModal} className="flex items-center gap-2"><Plus size={18} /> Add Product</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sales</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {products.map((product: any) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                   <div className="flex items-center">
                     <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                       <img className="h-full w-full object-cover" src={product.image} alt="" />
                     </div>
                     <div className="ml-4">
                       <div className="text-sm font-medium text-gray-900">{product.name}</div>
                       <div className="text-xs text-gray-500">{product.category}</div>
                     </div>
                   </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatRupee(product.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                   <span className={`px-2 py-1 rounded-md text-xs font-bold ${product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{product.stock}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.sales || 0} units</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{formatRupee((product.sales || 0) * product.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openEditModal(product)} className="text-gray-400 hover:text-black mr-4"><Edit2 size={18} /></button>
                  <button onClick={() => { if (confirm('Delete product?')) deleteProduct(product.id); }} className="text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProduct ? "Edit Product" : "Add New Product"}>
         <form onSubmit={handleModalSubmit} className="space-y-4">
           <Input name="name" label="Product Name" required defaultValue={editingProduct?.name} />
           <div className="grid grid-cols-2 gap-4">
             <Input name="price" label="Price (₹)" type="number" step="1" required defaultValue={editingProduct?.price} />
             <Input name="stock" label="Stock Quantity" type="number" required defaultValue={editingProduct?.stock || 0} />
           </div>
           <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Category *</label>
                <select name="category" required defaultValue={editingProduct?.category || "Electronics"} className="w-full px-4 py-3 bg-gray-100 rounded-lg">
                   {['Electronics', 'Fashion', 'Home', 'Beauty'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
           </div>
           <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Product Image</label>
             <div className="flex gap-2 mb-3">
               <button type="button" onClick={() => setImageMode('url')} className={`flex-1 py-2 rounded-md text-sm font-medium ${imageMode === 'url' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>
                 <LinkIcon size={14} className="inline mr-2" /> URL
               </button>
               <button type="button" onClick={() => setImageMode('upload')} className={`flex-1 py-2 rounded-md text-sm font-medium ${imageMode === 'upload' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>
                 <Upload size={14} className="inline mr-2" /> Upload
               </button>
             </div>
             {imageMode === 'url' ? (
               <Input name="imageUrl" required={!previewImage} defaultValue={editingProduct?.image} placeholder="https://..." onChange={(e) => setPreviewImage(e.target.value)} />
             ) : (
               <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center relative">
                  <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageUpload} required={!previewImage} />
                  <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload</p>
               </div>
             )}
             {previewImage && <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-gray-100"><img src={previewImage} alt="Preview" className="w-full h-full object-contain" /></div>}
           </div>
           <div className="flex gap-3 pt-4">
             <Button type="submit" className="flex-1">{editingProduct ? "Save" : "Create"}</Button>
             <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
           </div>
         </form>
      </Modal>
    </div>
  );
};

// --- Orders ---
export const AdminOrders = () => {
  const { orders, updateOrderStatus } = useData();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
       <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-900">Order Management</h3>
       </div>
       <div className="overflow-x-auto">
         <table className="min-w-full divide-y divide-gray-100">
           <thead className="bg-gray-50">
             <tr>
               <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
               <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
               <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
               <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
               <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
             </tr>
           </thead>
           <tbody className="bg-white divide-y divide-gray-100">
             {orders.map((order: any) => (
               <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{order.id}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatRupee(order.total)}</td>
                 <td className="px-6 py-4 whitespace-nowrap">
                    <select 
                      value={order.status} 
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`text-xs font-bold rounded-full px-3 py-1 border-none focus:ring-0 cursor-pointer ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
    </div>
  );
};

// --- Customers ---
export const AdminCustomers = () => {
  const { customers } = useData();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
         <h3 className="font-bold text-lg text-gray-900">Registered Customers</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Spent</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {customers.map((customer: any) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><div className="flex items-center gap-2"><Calendar size={14} /> {customer.joined}</div></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.orders}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{formatRupee(customer.spent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
