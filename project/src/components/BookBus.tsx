import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Clock,
  ArrowLeft,
  Bus,
  Users,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User } from "../App";

// MUI imports
import {
  Autocomplete,
  TextField,
  Button,
  Chip,
  CircularProgress,
  Rating,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface BookBusProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface BusOption {
  id: string;
  number: string;
  type: "government" | "private";
  operator: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fare: number;
  availableSeats: number;
  totalSeats: number;
  amenities: string[];
  rating: number;
  stops: string[];
}

const cities = ["Mumbai", "Pune", "Hyderabad", "Bengaluru", "Delhi", "Chennai"];

const BookBus: React.FC<BookBusProps> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [travelDate, setTravelDate] = useState<Date | null>(null);
  const [buses, setBuses] = useState<BusOption[]>([]);
  const [loading, setLoading] = useState(false);

  const searchBuses = async () => {
    if (!fromLocation || !toLocation || !travelDate) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // simulate API
    setBuses([
      {
        id: "GOV001",
        number: "MH12AB1234",
        type: "government",
        operator: "MSRTC",
        from: fromLocation,
        to: toLocation,
        departureTime: "08:30 AM",
        arrivalTime: "10:15 AM",
        duration: "1h 45m",
        fare: 45,
        availableSeats: 28,
        totalSeats: 40,
        amenities: ["AC", "WiFi", "Charging Port"],
        rating: 4.2,
        stops: ["Central Station", "Mall Junction", "Tech Park"],
      },
      {
        id: "PVT001",
        number: "KA05MN7890",
        type: "private",
        operator: "RedBus Express",
        from: fromLocation,
        to: toLocation,
        departureTime: "09:00 AM",
        arrivalTime: "10:30 AM",
        duration: "1h 30m",
        fare: 85,
        availableSeats: 15,
        totalSeats: 35,
        amenities: ["AC", "WiFi", "Snacks"],
        rating: 4.7,
        stops: ["Central Station", "Business District", "Tech Park"],
      },
    ]);
    setLoading(false);
  };

  const handleBookBus = (bus: BusOption) => {
    const newBooking = {
      id: `BK${Date.now()}`,
      busType: bus.type,
      busNumber: bus.number,
      from: bus.from,
      to: bus.to,
      date: travelDate?.toISOString().split("T")[0],
      time: bus.departureTime,
      fare: bus.fare,
      status: "confirmed" as const,
      seatNumber: `A${Math.floor(Math.random() * 40) + 1}`,
      bookingDate: new Date().toISOString().split("T")[0],
    };

    if (user) {
      setUser({
        ...user,
        bookings: [...user.bookings, newBooking],
        totalSpent: user.totalSpent + bus.fare,
      });
    }

    navigate(`/payment/${newBooking.id}`);
  };

  return (
    <div className="min-h-screen bg-[#ECF39E]">
      {/* Header */}
      <div className="bg-white shadow-lg px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-[#132A13] hover:text-[#4F772D]"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-xl font-bold text-[#132A13]">Book Bus</h1>
          <div className="w-8 h-8"></div>
        </div>
      </div>

      <div className="p-6">
        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <h3 className="text-lg font-bold text-[#132A13] mb-4">
            Plan Your Journey
          </h3>
          <div className="space-y-4">
            <Autocomplete
              options={cities}
              value={fromLocation}
              onChange={(_, val) => setFromLocation(val || "")}
              renderInput={(params) => (
                <TextField {...params} label="From" variant="outlined" />
              )}
            />
            <Autocomplete
              options={cities}
              value={toLocation}
              onChange={(_, val) => setToLocation(val || "")}
              renderInput={(params) => (
                <TextField {...params} label="To" variant="outlined" />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Travel Date"
                value={travelDate}
                onChange={(newDate) => setTravelDate(newDate)}
                minDate={new Date()}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              color="success"
              onClick={searchBuses}
              disabled={loading || !fromLocation || !toLocation || !travelDate}
              fullWidth
              startIcon={
                loading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : undefined
              }
            >
              {loading ? "Searching..." : "Search Buses"}
            </Button>
          </div>
        </motion.div>

        {/* Bus Results */}
        {buses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {buses.map((bus) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-[#132A13]">
                      {bus.operator}
                    </h4>
                    <p className="text-sm text-gray-600">Bus {bus.number}</p>
                    <Rating
                      name="bus-rating"
                      value={bus.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-700">
                      ₹{bus.fare}
                    </p>
                    <p className="text-sm text-gray-600">per seat</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span>
                    <Clock className="inline-block w-4 h-4 mr-1" />
                    {bus.departureTime} → {bus.arrivalTime}
                  </span>
                  <span className="text-gray-500">{bus.duration}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <Users className="w-4 h-4 text-green-600 mr-1" />
                  <span>
                    {bus.availableSeats}/{bus.totalSeats} seats available
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {bus.amenities.map((a) => (
                    <Chip key={a} label={a} color="success" variant="outlined" />
                  ))}
                </div>

                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleBookBus(bus)}
                  disabled={bus.availableSeats === 0}
                  fullWidth
                >
                  {bus.availableSeats === 0 ? "Sold Out" : "Book Now"}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookBus;
