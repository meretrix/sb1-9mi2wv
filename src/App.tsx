import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TravelersManagement from './pages/TravelersManagement';
import TravelerDetails from './pages/TravelerDetails';
import TravelPolicy from './pages/TravelPolicy';
import TripsOverview from './pages/TripsOverview';
import TripDetails from './pages/TripDetails';
import BookTravel from './pages/BookTravel';
import MetricDetails from './pages/MetricDetails';
import Vendors from './pages/Vendors';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="trips" element={<TripsOverview />} />
            <Route path="trips/:id" element={<TripDetails />} />
            <Route path="travelers" element={<TravelersManagement />} />
            <Route path="travelers/:id" element={<TravelerDetails />} />
            <Route path="policy" element={<TravelPolicy />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="book" element={<BookTravel />} />
            <Route path="metrics/:metric" element={<MetricDetails />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;