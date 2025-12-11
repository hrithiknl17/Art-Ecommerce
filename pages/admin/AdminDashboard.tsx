
import React, { useState } from 'react';
import { Button } from '../../components/ui/Elements';
import { useNavigation } from '../../contexts/NavigationContext';
import { useAuth } from '../../contexts/AuthContext';
import { AdminSidebar, AdminOverview, AdminProducts, AdminOrders, AdminCustomers } from '../../components/admin/AdminComponents';

const AdminDashboard = () => {
  const [adminView, setAdminView] = useState('overview');
  const { setView } = useNavigation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <AdminSidebar view={adminView} setView={setAdminView} />

      <div className="flex-1 md:ml-64">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900 capitalize">{adminView}</h1>
            <div className="flex items-center gap-4">
               <span className="text-sm text-gray-500">Admin User</span>
               <Button variant="outline" onClick={() => setView('home')} className="py-2 px-4 text-sm">View Site</Button>
            </div>
          </div>
        </header>

        <main className="p-8">
          {adminView === 'overview' && <AdminOverview />}
          {adminView === 'products' && <AdminProducts />}
          {adminView === 'orders' && <AdminOrders />}
          {adminView === 'customers' && <AdminCustomers />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
