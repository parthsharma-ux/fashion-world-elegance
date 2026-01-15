import React from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const AdminDashboard: React.FC = () => {
  const { products, orders } = useStore();

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-500' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingCart, color: 'bg-green-500' },
    { label: 'Revenue', value: `₹${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`, icon: TrendingUp, color: 'bg-primary' },
    { label: 'Pending Orders', value: orders.filter(o => o.status === 'pending').length, icon: Users, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl border p-6"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-xl border p-6">
        <h2 className="font-semibold text-lg mb-4">Recent Orders</h2>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{order.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No orders yet</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
