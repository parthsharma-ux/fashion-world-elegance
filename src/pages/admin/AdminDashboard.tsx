import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, TrendingUp, Users, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Fetch orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      const allOrders = orders || [];
      const revenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);
      const pendingOrders = allOrders.filter(o => o.status === 'pending').length;

      setStats({
        totalProducts: productsCount || 0,
        totalOrders: allOrders.length,
        revenue,
        pendingOrders,
      });

      setRecentOrders(allOrders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-blue-500' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'bg-green-500' },
    { label: 'Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: 'bg-primary' },
    { label: 'Pending Orders', value: stats.pendingOrders, icon: Users, color: 'bg-orange-500' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
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

      <div className="bg-card rounded-xl border p-6">
        <h2 className="font-semibold text-lg mb-4">Recent Orders</h2>
        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{order.order_number}</p>
                  <p className="text-sm text-muted-foreground">{order.customer_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{order.total?.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
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
