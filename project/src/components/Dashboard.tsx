import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Search, 
  User, 
  Bus, 
  CreditCard, 
  Calendar,
  TrendingUp,
  Clock,
  IndianRupee,
  Route
} from 'lucide-react';
import { User as UserType } from '../App';

interface DashboardProps {
  user: UserType | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  const quickStats = [
    {
      icon: Bus,
      label: 'Total Trips',
      value: user.totalTrips.toString(),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Route,
      label: 'Avg Distance',
      value: `${user.avgDistance} km`,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: IndianRupee,
      label: 'Total Spent',
      value: `₹${user.totalSpent}`,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Calendar,
      label: 'This Month',
      value: '8 trips',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const quickActions = [
    {
      title: 'Track Bus',
      description: 'Real-time bus location tracking',
      icon: MapPin,
      route: '/track-bus',
      color: 'bg-gradient-to-br from-[#90A955] to-[#4F772D]'
    },
    {
      title: 'Find Bus',
      description: 'Search buses for your route',
      icon: Search,
      route: '/find-bus',
      color: 'bg-gradient-to-br from-[#4F772D] to-[#31572C]'
    },
    {
      title: 'Book Bus',
      description: 'Reserve your seat in advance',
      icon: CreditCard,
      route: '/book-bus',
      color: 'bg-gradient-to-br from-[#31572C] to-[#132A13]'
    },
    {
      title: 'My Bookings',
      description: 'View and manage your bookings',
      icon: Calendar,
      route: '/my-bookings',
      color: 'bg-gradient-to-br from-[#90A955] to-[#31572C]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#ECF39E]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#132A13] to-[#4F772D] px-6 py-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-[#ECF39E] opacity-90">Ready for your next journey?</p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#90A955]"
          >
            <img
              src={user.photo}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-[#ECF39E] text-sm opacity-90">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#132A13] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.route)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-[#132A13] text-left mb-2">{action.title}</h3>
              <p className="text-[#31572C] text-sm text-left">{action.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#132A13]">Recent Activity</h3>
            <TrendingUp className="w-5 h-5 text-[#4F772D]" />
          </div>
          
          <div className="space-y-4">
            {user.bookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-[#ECF39E] rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    booking.busType === 'government' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    <Bus className={`w-5 h-5 ${
                      booking.busType === 'government' ? 'text-blue-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-bold text-[#132A13]">{booking.from} → {booking.to}</p>
                    <p className="text-sm text-[#31572C]">{booking.date} • {booking.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#4F772D]">₹{booking.fare}</p>
                  <p className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {booking.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-[#90A955] to-[#4F772D] rounded-2xl p-6 text-white"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">Pro Tip</h3>
          </div>
          <p className="text-[#ECF39E]">
            Book your tickets in advance to get better seats and avoid last-minute rush. 
            Government buses are more economical for daily commuting!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;