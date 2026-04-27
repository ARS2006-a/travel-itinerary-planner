import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import SavedTripsPage from './pages/SavedTripsPage';
import AuthPage from './pages/AuthPage';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/"        element={<HomePage />}       />
          <Route path="/planner" element={<PlannerPage />}    />
          <Route path="/saved"   element={<SavedTripsPage />} />
          <Route path="/auth"    element={<AuthPage />}       />
          <Route path="/events"  element={<EventsPage />}     />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
