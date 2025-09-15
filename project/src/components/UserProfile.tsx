import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Clock, LogOut, Edit, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User as UserType } from '../App';

interface UserProfileProps {
  user: UserType | null;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#ECF39E]">
      {/* Header */}
      <div className="bg-white shadow-lg px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-[#132A13] hover:text-[#4F772D]"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-xl font-bold text-[#132A13]">Profile</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Edit className="w-5 h-5 text-[#4F772D]" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={user.photo}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#90A955]"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#132A13]">{user.name}</h2>
              <div className="flex items-center text-[#31572C] mt-1">
                <Phone className="w-4 h-4 mr-2" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center text-[#31572C] mt-2">
                <User className="w-4 h-4 mr-2" />
                <span>Regular Commuter</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#4F772D]">{user.rides.length}</p>
              <p className="text-sm text-[#31572C]">Total Rides</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#4F772D]">4.8</p>
              <p className="text-sm text-[#31572C]">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#4F772D]">12</p>
              <p className="text-sm text-[#31572C]">This Month</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#31572C]">Favorite Route</p>
                <p className="font-bold text-[#132A13]">Central → Tech Park</p>
              </div>
              <MapPin className="w-8 h-8 text-[#4F772D]" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#31572C]">Avg Journey</p>
                <p className="font-bold text-[#132A13]">42 minutes</p>
              </div>
              <Clock className="w-8 h-8 text-[#4F772D]" />
            </div>
          </div>
        </motion.div>

        {/* Recent Rides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <h3 className="text-lg font-bold text-[#132A13] mb-4">Recent Rides</h3>
          <div className="space-y-4">
            {user.rides.map((ride) => (
              <div
                key={ride.id}
                className="flex items-center justify-between p-4 bg-[#ECF39E] rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#90A955] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🚌</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#132A13]">
                      {ride.from} → {ride.to}
                    </p>
                    <p className="text-sm text-[#31572C]">
                      Bus {ride.busNumber} • {ride.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#31572C]">₹25</p>
                  <p className="text-xs text-[#4F772D]">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <h3 className="text-lg font-bold text-[#132A13] mb-4">Achievements</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-[#ECF39E] rounded-xl">
              <div className="text-3xl mb-2">🏆</div>
              <p className="font-bold text-[#132A13]">Regular Rider</p>
              <p className="text-xs text-[#31572C]">10+ rides this month</p>
            </div>
            <div className="text-center p-4 bg-[#ECF39E] rounded-xl">
              <div className="text-3xl mb-2">⭐</div>
              <p className="font-bold text-[#132A13]">Eco Warrior</p>
              <p className="text-xs text-[#31572C]">Saved 50kg CO₂</p>
            </div>
          </div>
        </motion.div>

        {/* Settings & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <button className="w-full bg-white rounded-xl p-4 shadow-lg flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Edit className="w-5 h-5 text-[#4F772D]" />
              <span className="font-medium text-[#132A13]">Edit Profile</span>
            </div>
            <span className="text-[#31572C]">›</span>
          </button>

          <button className="w-full bg-white rounded-xl p-4 shadow-lg flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-[#4F772D]" />
              <span className="font-medium text-[#132A13]">Saved Places</span>
            </div>
            <span className="text-[#31572C]">›</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center justify-center space-x-3 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-600">Logout</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;