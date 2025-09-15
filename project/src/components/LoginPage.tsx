import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Check } from 'lucide-react';
import { User } from '../App';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigate

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ create navigate instance

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
      setStep('otp');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
      setStep('profile');
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData: User = {
        id: '1',
        name: name,
        phone: phone,
        photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?w=150&h=150&fit=crop',
        totalTrips: 15,
        avgDistance: 12.5,
        totalSpent: 450,
        rides: [
          {
            id: '1',
            from: 'Central Station',
            to: 'Tech Park',
            date: '2024-01-15',
            busNumber: 'MH12AB1234',
            fare: 25,
            status: 'completed'
          }
        ],
        bookings: [
          {
            id: 'BK001',
            busType: 'government',
            busNumber: 'MH12AB1234',
            from: 'Central Station',
            to: 'Tech Park',
            date: '2024-01-20',
            time: '09:30 AM',
            fare: 25,
            status: 'confirmed',
            seatNumber: 'A12',
            bookingDate: '2024-01-18'
          }
        ]
      };

      setLoading(false);
      onLogin(userData);       // ✅ set user data
      navigate('/');           // ✅ redirect to Dashboard
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4F772D] to-[#90A955] flex items-center justify-center px-6 py-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-[#90A955] rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-3xl">🙏</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-[#132A13] mb-2">
            Welcome Back
          </h2>
          <p className="text-[#31572C] text-lg">
            {step === 'phone' && 'Enter your mobile number'}
            {step === 'otp' && 'Enter the verification code'}
            {step === 'profile' && 'Complete your profile'}
          </p>
        </div>

        {/* PHONE STEP */}
        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#132A13] mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4F772D] w-5 h-5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#90A955] focus:outline-none text-lg"
                  placeholder="Enter your mobile number"
                  maxLength={10}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || phone.length < 10}
              className="w-full bg-[#90A955] text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4F772D] transition-colors duration-300 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  Send OTP <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* OTP STEP */}
        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#132A13] mb-4 text-center">
                Enter 6-digit code sent to +91 {phone}
              </label>
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center border-2 border-gray-200 rounded-xl focus:border-[#90A955] focus:outline-none text-xl font-bold"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || otp.join('').length < 6}
              className="w-full bg-[#90A955] text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4F772D] transition-colors duration-300 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  Verify OTP <Check className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* PROFILE STEP */}
        {step === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#132A13] mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#90A955] focus:outline-none text-lg"
                placeholder="Enter your full name"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full bg-[#90A955] text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4F772D] transition-colors duration-300 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  Complete Setup <Check className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;
