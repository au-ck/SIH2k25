import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User } from '../App';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface TrackBusProps {
  user: User | null;
}

interface BusLocation {
  id: string;
  number: string;
  lat: number;
  lng: number;
  speed: number;
  nextStop: string;
  eta: string;
  occupancy: string;
  route: string; // Added route property for filtering
}

// custom 🚌 bus icon
const busIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const mockRoutes = {
  'University Campus': { lat: 17.5143, lng: 80.3807 },
  'City Center': { lat: 17.6580, lng: 83.2104 },
  'Tech Park': { lat: 12.9716, lng: 77.5946 },
  'Residential Area': { lat: 19.0760, lng: 72.8777 }
};

const TrackBus: React.FC<TrackBusProps> = ({ user }) => {
  const navigate = useNavigate();
  const [selectedBus, setSelectedBus] = useState<BusLocation | null>(null);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [buses, setBuses] = useState<BusLocation[]>([]);
  const [filteredBuses, setFilteredBuses] = useState<BusLocation[]>([]);

  // 1. **Simulate Initial Bus Data**
  // This is your mock "backend" data. You can expand this array with more routes.
  useEffect(() => {
    setBuses([
      {
        id: '1', number: 'MH12AB1234', lat: 19.0760, lng: 72.8777,
        speed: 45, nextStop: 'Residential Area Stop', eta: '5 mins', occupancy: 'Medium', route: 'Campus-to-Residential'
      },
      {
        id: '2', number: 'KA01CD5678', lat: 12.9716, lng: 77.5946,
        speed: 35, nextStop: 'Tech Park Gate 2', eta: '8 mins', occupancy: 'High', route: 'TechPark-to-CityCenter'
      },
      {
        id: '3', number: 'TS07EF9012', lat: 17.5143, lng: 80.3807,
        speed: 50, nextStop: 'University Main Gate', eta: '3 mins', occupancy: 'Low', route: 'Campus-to-CityCenter'
      }
    ]);
  }, []);

  // 2. **Simulate Real-Time Movement**
  useEffect(() => {
    const simulateMovement = () => {
      setBuses(prevBuses =>
        prevBuses.map(bus => ({
          ...bus,
          lat: bus.lat + (Math.random() - 0.5) * 0.001, // Small random change to lat
          lng: bus.lng + (Math.random() - 0.5) * 0.001, // Small random change to lng
          // ETA logic could be more complex but for a university project, simple is fine
          eta: `${Math.max(1, parseInt(bus.eta) - 1)} mins` 
        }))
      );
    };

    const interval = setInterval(simulateMovement, 5000);
    return () => clearInterval(interval);
  }, []);

  // 3. **Implement Search & Filtering**
  const handleSearchBus = () => {
    let route = '';
    // A simplified way to determine the route based on the search inputs
    if (fromLocation.includes('Campus') && toLocation.includes('Residential')) {
      route = 'Campus-to-Residential';
    } else if (fromLocation.includes('Tech') && toLocation.includes('City')) {
      route = 'TechPark-to-CityCenter';
    } else if (fromLocation.includes('Campus') && toLocation.includes('City')) {
      route = 'Campus-to-CityCenter';
    }
    
    const matchedBuses = buses.filter(bus => bus.route === route);
    setFilteredBuses(matchedBuses);
    setSelectedBus(matchedBuses.length > 0 ? matchedBuses[0] : null);
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
          <h1 className="text-xl font-bold text-[#132A13]">Track Bus</h1>
          <div className="w-8 h-8"></div>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <h3 className="text-lg font-bold text-[#132A13] mb-4">Enter Your Route</h3>
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F772D] w-5 h-5" />
              <input
                type="text"
                value={fromLocation}
                onChange={(e) => {
                  setFromLocation(e.target.value);
                  setSelectedBus(null); 
                }}
                placeholder="From location (e.g., Campus)"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#90A955] focus:outline-none"
              />
            </div>
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F772D] w-5 h-5" />
              <input
                type="text"
                value={toLocation}
                onChange={(e) => {
                  setToLocation(e.target.value);
                  setSelectedBus(null);
                }}
                placeholder="To location (e.g., City Center)"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#90A955] focus:outline-none"
              />
            </div>
            <button
              onClick={handleSearchBus}
              disabled={!fromLocation || !toLocation}
              className="w-full bg-[#90A955] text-white py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4F772D] transition-colors"
            >
              Find & Track Bus
            </button>
          </div>
        </motion.div>

        {/* 🌍 Map Section (show only after search) */}
        {selectedBus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 h-96"
          >
            <MapContainer
              center={[selectedBus.lat, selectedBus.lng]}
              zoom={13}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              />

              {filteredBuses.map((bus) => (
                <Marker
                  key={bus.id}
                  position={[bus.lat, bus.lng]}
                  icon={busIcon}
                  eventHandlers={{
                    click: () => setSelectedBus(bus),
                  }}
                >
                  <Popup>
                    <strong>Bus {bus.number}</strong> <br />
                    Speed: {bus.speed} km/h <br />
                    Next Stop: {bus.nextStop} <br />
                    ETA: {bus.eta}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>
        )}

        {/* Selected Bus Info */}
        {selectedBus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#132A13]">
                Bus {selectedBus.number}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-[#31572C] font-medium">Live</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Navigation className="w-5 h-5 text-[#4F772D]" />
                <div>
                  <p className="text-sm text-[#31572C]">Speed</p>
                  <p className="font-bold text-[#132A13]">{selectedBus.speed} km/h</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#4F772D]" />
                <div>
                  <p className="text-sm text-[#31572C]">ETA</p>
                  <p className="font-bold text-[#132A13]">{selectedBus.eta}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#4F772D]" />
                <div>
                  <p className="text-sm text-[#31572C]">Next Stop</p>
                  <p className="font-bold text-[#132A13]">{selectedBus.nextStop}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-[#4F772D]" />
                <div>
                  <p className="text-sm text-[#31572C]">Occupancy</p>
                  <p className="font-bold text-[#132A13]">{selectedBus.occupancy}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-[#ECF39E] rounded-xl">
              <p className="text-sm text-[#31572C] text-center">
                🚌 Your bus is approaching! Get ready to board.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrackBus;