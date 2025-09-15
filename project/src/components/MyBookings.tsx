import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Bus, 
  Calendar, 
  Clock, 
  IndianRupee, 
  MapPin,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User } from '../App';

interface MyBookingsProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const MyBookings: React.FC<MyBookingsProps> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);

  if (!user) return null;

  const filteredBookings = user.bookings.filter(booking => {
    if (selectedTab === 'upcoming') return booking.status === 'confirmed';
    if (selectedTab === 'completed') return booking.status === 'completed';
    if (selectedTab === 'cancelled') return booking.status === 'cancelled';
    return false;
  });

  const handleCancelBooking = (bookingId: string) => {
    const booking = user.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const refundAmount = Math.floor(booking.fare * 0.6); // 60% refund
    
    const updatedBookings = user.bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    );

    setUser({
      ...user,
      bookings: updatedBookings,
      totalSpent: user.totalSpent - refundAmount
    });

    setShowCancelModal(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      case 'completed': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
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
          <h1 className="text-xl font-bold text-[#132A13]">My Bookings</h1>
          <div className="w-8 h-8"></div>
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <div className="flex bg-white rounded-2xl p-2 shadow-lg mb-6">
          {[
            { key: 'upcoming', label: 'Upcoming', count: user.bookings.filter(b => b.status === 'confirmed').length },
            { key: 'completed', label: 'Completed', count: user.bookings.filter(b => b.status === 'completed').length },
            { key: 'cancelled', label: 'Cancelled', count: user.bookings.filter(b => b.status === 'cancelled').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                selectedTab === tab.key
                  ? 'bg-[#90A955] text-white'
                  : 'text-[#31572C] hover:bg-[#ECF39E]'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <Bus className="w-16 h-16 text-[#4F772D] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#132A13] mb-2">
                No {selectedTab} bookings
              </h3>
              <p className="text-[#31572C] mb-4">
                {selectedTab === 'upcoming' 
                  ? "You don't have any upcoming trips. Book your next journey!"
                  : `No ${selectedTab} bookings found.`
                }
              </p>
              {selectedTab === 'upcoming' && (
                <button
                  onClick={() => navigate('/book-bus')}
                  className="bg-[#90A955] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#4F772D] transition-colors"
                >
                  Book Now
                </button>
              )}
            </motion.div>
          ) : (
            filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      booking.busType === 'government' 
                        ? 'bg-blue-100' 
                        : 'bg-purple-100'
                    }`}>
                      <Bus className={`w-6 h-6 ${
                        booking.busType === 'government' 
                          ? 'text-blue-600' 
                          : 'text-purple-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#132A13]">Bus {booking.busNumber}</h4>
                      <p className="text-sm text-[#31572C] capitalize">
                        {booking.busType} Bus
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="text-sm font-medium capitalize">{booking.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#4F772D]" />
                    <div>
                      <p className="text-sm text-[#31572C]">Route</p>
                      <p className="font-medium text-[#132A13]">{booking.from} → {booking.to}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="w-4 h-4 text-[#4F772D]" />
                    <div>
                      <p className="text-sm text-[#31572C]">Fare</p>
                      <p className="font-medium text-[#132A13]">₹{booking.fare}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#4F772D]" />
                    <div>
                      <p className="text-sm text-[#31572C]">Date</p>
                      <p className="font-medium text-[#132A13]">{booking.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#4F772D]" />
                    <div>
                      <p className="text-sm text-[#31572C]">Time</p>
                      <p className="font-medium text-[#132A13]">{booking.time}</p>
                    </div>
                  </div>
                </div>

                {booking.seatNumber && (
                  <div className="bg-[#ECF39E] rounded-xl p-3 mb-4">
                    <p className="text-sm text-[#31572C]">Seat Number</p>
                    <p className="font-bold text-[#132A13] text-lg">{booking.seatNumber}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#31572C]">
                    Booked on {booking.bookingDate}
                  </p>
                  {booking.status === 'confirmed' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/track-bus`)}
                        className="bg-[#90A955] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#4F772D] transition-colors"
                      >
                        Track Bus
                      </button>
                      <button
                        onClick={() => setShowCancelModal(booking.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-[#132A13] mb-2">Cancel Booking?</h3>
              <p className="text-[#31572C] text-sm">
                You will receive 60% refund of the ticket price. This action cannot be undone.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(null)}
                className="flex-1 bg-gray-100 text-[#132A13] py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancelBooking(showCancelModal)}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                Cancel Ticket
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;