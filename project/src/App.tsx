import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import MainOptions from './components/MainOptions';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import TrackBus from './components/TrackBus';
import FindBus from './components/FindBus';
import UserProfile from './components/UserProfile';
import VoiceAssistant from './components/VoiceAssistant';
import Dashboard from './components/Dashboard';
import BookBus from './components/BookBus';
import MyBookings from './components/MyBookings';
import PaymentPage from './components/PaymentPage';

export interface User {
  id: string;
  name: string;
  phone: string;
  photo: string;
  totalTrips: number;
  avgDistance: number;
  totalSpent: number;
  rides: Array<{
    id: string;
    from: string;
    to: string;
    date: string;
    busNumber: string;
    fare: number;
    status: 'completed' | 'cancelled' | 'upcoming';
  }>;
  bookings: Array<{
    id: string;
    busType: 'government' | 'private';
    busNumber: string;
    from: string;
    to: string;
    date: string;
    time: string;
    fare: number;
    status: 'confirmed' | 'cancelled' | 'completed';
    seatNumber?: string;
    bookingDate: string;
  }>;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#ECF39E]">
        <Routes>
          {/* Root Route */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Dashboard user={user} />
              ) : (
                <MainOptions isLoggedIn={isLoggedIn} />
              )
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage onSignup={handleLogin} />} />

          {/* Main Options */}
          <Route path="/main-options" element={<MainOptions isLoggedIn={isLoggedIn} />} />

          {/* Protected Routes */}
          <Route
            path="/track-bus"
            element={isLoggedIn ? <TrackBus user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/find-bus"
            element={isLoggedIn ? <FindBus user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/book-bus"
            element={isLoggedIn ? <BookBus user={user} setUser={setUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-bookings"
            element={isLoggedIn ? <MyBookings user={user} setUser={setUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/payment/:bookingId"
            element={isLoggedIn ? <PaymentPage user={user} setUser={setUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <UserProfile user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
        </Routes>

        {/* Voice Assistant active only if logged in */}
        {isLoggedIn && <VoiceAssistant />}
      </div>
    </Router>
  );
}

export default App;
