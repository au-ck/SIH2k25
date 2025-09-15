import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, User, Phone, Star, ArrowLeft, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User as UserType } from '../App';

interface FindBusProps {
  user: UserType | null;
}
interface Driver {
  name: string;
  rating: number;
  photo: string;
  phone: string;
  id: string;
}
interface BusRoute {
  id: string;
  number: string;
  timing: string;
  stops: string[];
  driver: Driver;
  conductor: Driver;
  fare: number;
  estimatedTime: string;
  nextArrival: string;
}
const FindBus: React.FC<FindBusProps> = ({ user }) => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [buses, setBuses] = useState<BusRoute[]>([]);
  const [selectedBus, setSelectedBus] = useState<BusRoute | null>(null);
  const [loading, setLoading] = useState(false);
  const searchBuses = async () => {
    if (!fromLocation || !toLocation) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setBuses([
      {
        id: '1',
        number: 'MH12AB1234',
        timing: '6:00 AM - 11:00 PM',
        stops: ['Central Station', 'Mall Junction', 'Tech Park', 'Airport'],
        fare: 25,
        estimatedTime: '45 mins',
        nextArrival: '8 mins',
        driver: {
          name: 'Rajesh Kumar',
          rating: 4.8,
          photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?w=150&h=150&fit=crop',
          phone: '+91 98765 43210',
          id: 'DRV001'
        },
        conductor: {
          name: 'Amit Singh',
          rating: 4.6,
          photo: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?w=150&h=150&fit=crop',
          phone: '+91 98765 43211',
          id: 'CON001'
        }
      },
      {
        id: '2',
        number: 'MH14CD5678',
        timing: '5:30 AM - 11:30 PM',
        stops: ['Central Station', 'City Center', 'Business District', 'Tech Park'],
        fare: 30,
        estimatedTime: '52 mins',
        nextArrival: '15 mins',
        driver: {
          name: 'Suresh Patel',
          rating: 4.7,
          photo: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?w=150&h=150&fit=crop',
          phone: '+91 98765 43212',
          id: 'DRV002'
        },
        conductor: {
          name: 'Ravi Sharma',
          rating: 4.5,
          photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=150&h=150&fit=crop',
          phone: '+91 98765 43213',
          id: 'CON002'
        }
      }
    ]);
    setLoading(false);
  };
  const handleTrackBus = (bus: BusRoute) => {
    setSelectedBus(bus);
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
          <h1 className="text-xl font-bold text-[#132A13]">Find Bus</h1>
          <div className="w-8 h-8"></div>
        </div>
      </div>
      <div className="p-6">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <h3 className="text-lg font-bold text-[#132A13] mb-4">Search Routes</h3>
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F772D] w-5 h-5" />
              <input
                type="text"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="From location"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#90A955] focus:outline-none"
              />
            </div>
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F772D] w-5 h-5" />
              <input
                type="text"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                placeholder="To location"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#90A955] focus:outline-none"
              />
            </div>
            <button
              onClick={searchBuses}
              disabled={!fromLocation || !toLocation || loading}
              className="w-full bg-[#90A955] text-white py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4F772D] transition-colors flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                'Search Buses'
              )}
            </button>
          </div>
        </motion.div>
        {/* Bus Results */}
        {buses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 mb-6"
          >
            <h3 className="text-lg font-bold text-[#132A13]">Available Buses</h3>
            {buses.map((bus, index) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-[#132A13]">Bus {bus.number}</h4>
                    <p className="text-[#31572C]">{bus.timing}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#4F772D]">₹{bus.fare}</p>
                    <p className="text-sm text-[#31572C]">{bus.estimatedTime}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-[#31572C] mb-2">Route:</p>
                  <div className="flex flex-wrap gap-2">
                    {bus.stops.map((stop, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#ECF39E] text-[#132A13] rounded-full text-sm"
                      >
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={bus.driver.photo}
                      alt={bus.driver.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-[#132A13]">{bus.driver.name}</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-[#31572C] ml-1">{bus.driver.rating}</span>
                        <span className="text-xs text-[#31572C] ml-2">Driver</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img
                      src={bus.conductor.photo}
                      alt={bus.conductor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-[#132A13]">{bus.conductor.name}</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-[#31572C] ml-1">{bus.conductor.rating}</span>
                        <span className="text-xs text-[#31572C] ml-2">Conductor</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-[#4F772D]" />
                    <span className="text-[#132A13] font-medium">
                      Next arrival: {bus.nextArrival}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTrackBus(bus)}
                    className="bg-[#90A955] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#4F772D] transition-colors"
                  >
                    Track Bus
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        {/* Selected Bus Details */}
        {selectedBus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold text-[#132A13] mb-4">
              Tracking Bus {selectedBus.number}
            </h3>
            <div className="bg-[#ECF39E] rounded-xl p-4 mb-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#90A955] rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">🚌</span>
                  </div>
                  <p className="text-sm text-[#132A13] font-medium">Live Tracking Active</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#4F772D]">{selectedBus.nextArrival}</p>
                  <p className="text-sm text-[#31572C]">ETA</p>
                </div>
              </div>
            </div>
            {/* Driver Contact Info Section START */}
            <div className="mt-6 mb-4 bg-[#ecf39e] rounded-xl p-5 flex items-center shadow">
              <img
                src={selectedBus.driver.photo}
                alt={selectedBus.driver.name}
                className="w-20 h-20 rounded-full object-cover mr-5 border-4 border-white shadow"
              />
              <div>
                <p className="text-lg font-bold text-[#132A13] mb-1">{selectedBus.driver.name}</p>
                <div className="flex items-center mb-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="ml-1 text-[#31572C]">{selectedBus.driver.rating}</span>
                  <span className="ml-2 text-xs text-[#31572C]">Driver</span>
                </div>
                <p className="text-[#31572C] font-medium mb-1">Phone: <span className="text-[#4F772D]">{selectedBus.driver.phone}</span></p>
                <p className="text-xs text-[#31572C]">Driver ID: {selectedBus.driver.id}</p>
              </div>
            </div>
            {/* Driver Contact Info Section END */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#31572C]">Contact Driver:</span>
                <button className="flex items-center space-x-2 text-[#4F772D]">
                  <Phone className="w-4 h-4" />
                  <span>{selectedBus.driver.phone}</span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#31572C]">Contact Conductor:</span>
                <button className="flex items-center space-x-2 text-[#4F772D]">
                  <Phone className="w-4 h-4" />
                  <span>{selectedBus.conductor.phone}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default FindBus;