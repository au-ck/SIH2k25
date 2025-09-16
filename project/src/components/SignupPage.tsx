import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Check } from 'lucide-react';
import { User } from '../App';
import { useNavigate } from 'react-router-dom';

interface SignupPageProps {
  onSignup: (user: User) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup }) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
      setStep('otp');
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join('').length === 6) {
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
        id: Date.now().toString(),
        name,
        phone,
        photo: 'https://via.placeholder.com/150',
        totalTrips: 0,
        avgDistance: 0,
        totalSpent: 0,
        rides: [],
        bookings: []
      };

      setLoading(false);
      onSignup(userData);   // ✅ save new user
      navigate('/');        // ✅ go to Dashboard
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
            <span className="text-3xl">✨</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-[#132A13] mb-2">Sign Up</h2>
          <p className="text-[#31572C] text-lg">
            {step === 'phone' && 'Enter your mobile number'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'profile' && 'Complete your profile'}
          </p>
        </div>

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
                  placeholder="Enter your number"
                  maxLength={10}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || phone.length < 10}
              className="w-full bg-[#90A955] text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 hover:bg-[#4F772D] transition-colors duration-300 flex items-center justify-center"
            >
              {loading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div> : <>Send OTP <ArrowRight className="ml-2 w-5 h-5" /></>}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <label className="block text-sm font-medium text-[#132A13] mb-4 text-center">
              Enter 6-digit OTP sent to +91 {phone}
            </label>
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[index] = e.target.value;
                    setOtp(newOtp);
                  }}
                  className="w-12 h-12 text-center border-2 border-gray-200 rounded-xl focus:border-[#90A955] focus:outline-none text-xl font-bold"
                  maxLength={1}
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={loading || otp.join('').length < 6}
              className="w-full bg-[#90A955] text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 hover:bg-[#4F772D] transition-colors duration-300 flex items-center justify-center"
            >
              {loading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div> : <>Verify OTP <Check className="ml-2 w-5 h-5" /></>}
            </button>
          </form>
        )}

        {step === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#132A13] mb-2">Your Name</label>
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
              className="w-full bg-[#90A955] text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 hover:bg-[#4F772D] transition-colors duration-300 flex items-center justify-center"
            >
              {loading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div> : <>Complete Setup <Check className="ml-2 w-5 h-5" /></>}
            </button>
          </form>
        )}

        <p className="text-center mt-6 text-sm text-[#31572C]">
          Already have an account?{" "}
          <span className="text-[#4F772D] font-semibold cursor-pointer" onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
