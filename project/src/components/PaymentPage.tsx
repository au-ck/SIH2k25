import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  QrCode,
  CheckCircle,
  IndianRupee,
  Clock,
  MapPin
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { User } from '../App';

interface PaymentPageProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'upi' | 'card'>('qr');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');
  const [upiId, setUpiId] = useState('');
  const [showQR, setShowQR] = useState(false);

  const booking = user?.bookings.find(b => b.id === bookingId);

  useEffect(() => {
    if (!booking) {
      navigate('/my-bookings');
    }
  }, [booking, navigate]);

  if (!booking || !user) return null;

  const handlePayment = async () => {
    setPaymentStatus('processing');
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setPaymentStatus('success');
    
    // Update booking status and user stats
    setTimeout(() => {
      const updatedBookings = user.bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'confirmed' as const } : b
      );
      
      setUser({
        ...user,
        bookings: updatedBookings,
        totalTrips: user.totalTrips + 1
      });
      
      navigate('/my-bookings');
    }, 2000);
  };

  const generateQRData = () => {
    return `upi://pay?pa=namastetransit@paytm&pn=Namaste Transit&am=${booking.fare}&cu=INR&tn=Bus Booking ${booking.id}`;
  };

  const popularUPIApps = [
    { name: 'PhonePe', id: 'phonepe', color: 'bg-purple-600' },
    { name: 'Google Pay', id: 'googlepay', color: 'bg-blue-600' },
    { name: 'Paytm', id: 'paytm', color: 'bg-blue-500' },
    { name: 'BHIM', id: 'bhim', color: 'bg-orange-600' }
  ];

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#ECF39E] flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-sm w-full"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#132A13] mb-4">Payment Successful!</h2>
          <p className="text-[#31572C] mb-6">
            Your booking has been confirmed. You will receive a confirmation message shortly.
          </p>
          <div className="bg-[#ECF39E] rounded-xl p-4 mb-6">
            <p className="text-sm text-[#31572C]">Booking ID</p>
            <p className="font-bold text-[#132A13]">{booking.id}</p>
          </div>
          <button
            onClick={() => navigate('/my-bookings')}
            className="w-full bg-[#90A955] text-white py-3 rounded-xl font-bold hover:bg-[#4F772D] transition-colors"
          >
            View My Bookings
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF39E]">
      {/* Header */}
      <div className="bg-white shadow-lg px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/my-bookings')}
            className="flex items-center text-[#132A13] hover:text-[#4F772D]"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-xl font-bold text-[#132A13]">Payment</h1>
          <div className="w-8 h-8"></div>
        </div>
      </div>

      <div className="p-6">
        {/* Booking Summary */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <h3 className="text-lg font-bold text-[#132A13] mb-4">Booking Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#4F772D]" />
                <span className="text-[#31572C]">Route</span>
              </div>
              <span className="font-medium text-[#132A13]">{booking.from} → {booking.to}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#4F772D]" />
                <span className="text-[#31572C]">Date & Time</span>
              </div>
              <span className="font-medium text-[#132A13]">{booking.date} • {booking.time}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#31572C]">Bus Number</span>
              <span className="font-medium text-[#132A13]">{booking.busNumber}</span>
            </div>
            {booking.seatNumber && (
              <div className="flex items-center justify-between">
                <span className="text-[#31572C]">Seat</span>
                <span className="font-medium text-[#132A13]">{booking.seatNumber}</span>
              </div>
            )}
            <hr className="my-4" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <IndianRupee className="w-5 h-5 text-[#4F772D]" />
                <span className="font-bold text-[#132A13]">Total Amount</span>
              </div>
              <span className="text-2xl font-bold text-[#4F772D]">₹{booking.fare}</span>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <h3 className="text-lg font-bold text-[#132A13] mb-4">Choose Payment Method</h3>
          
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setPaymentMethod('qr')}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'qr' 
                  ? 'border-[#90A955] bg-[#ECF39E]' 
                  : 'border-gray-200 hover:border-[#90A955]'
              }`}
            >
              <QrCode className="w-6 h-6 text-[#4F772D]" />
              <div className="text-left">
                <p className="font-medium text-[#132A13]">QR Code</p>
                <p className="text-sm text-[#31572C]">Scan with any UPI app</p>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('upi')}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'upi' 
                  ? 'border-[#90A955] bg-[#ECF39E]' 
                  : 'border-gray-200 hover:border-[#90A955]'
              }`}
            >
              <Smartphone className="w-6 h-6 text-[#4F772D]" />
              <div className="text-left">
                <p className="font-medium text-[#132A13]">UPI ID</p>
                <p className="text-sm text-[#31572C]">Pay using UPI ID</p>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'card' 
                  ? 'border-[#90A955] bg-[#ECF39E]' 
                  : 'border-gray-200 hover:border-[#90A955]'
              }`}
            >
              <CreditCard className="w-6 h-6 text-[#4F772D]" />
              <div className="text-left">
                <p className="font-medium text-[#132A13]">Debit/Credit Card</p>
                <p className="text-sm text-[#31572C]">Pay with your card</p>
              </div>
            </button>
          </div>

          {/* Payment Method Content */}
          {paymentMethod === 'qr' && (
            <div className="text-center">
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200 inline-block mb-4">
                <QRCode
                  value={generateQRData()}
                  size={200}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
              <p className="text-sm text-[#31572C] mb-4">
                Scan this QR code with any UPI app to pay ₹{booking.fare}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {popularUPIApps.map((app) => (
                  <div key={app.id} className="text-center">
                    <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center mx-auto mb-1`}>
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs text-[#31572C]">{app.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter your UPI ID (e.g., user@paytm)"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#90A955] focus:outline-none mb-4"
              />
              <div className="grid grid-cols-2 gap-2">
                {popularUPIApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setUpiId(`${user.phone}@${app.id}`)}
                    className="flex items-center space-x-2 p-3 border-2 border-gray-200 rounded-xl hover:border-[#90A955] transition-all"
                  >
                    <div className={`w-8 h-8 ${app.color} rounded-lg flex items-center justify-center`}>
                      <Smartphone className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-[#132A13]">{app.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#90A955] focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#90A955] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#90A955] focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Cardholder Name"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#90A955] focus:outline-none"
              />
            </div>
          )}
        </motion.div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={paymentStatus === 'processing' || (paymentMethod === 'upi' && !upiId)}
          className="w-full bg-[#90A955] text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4F772D] transition-colors flex items-center justify-center"
        >
          {paymentStatus === 'processing' ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </>
          ) : (
            <>
              <IndianRupee className="w-5 h-5 mr-2" />
              Pay ₹{booking.fare}
            </>
          )}
        </button>

        {/* Security Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            🔒 Your payment is secured with 256-bit SSL encryption. We never store your payment details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;