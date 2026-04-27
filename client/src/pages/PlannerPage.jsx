import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItineraryForm from '../components/ItineraryForm';
import ItineraryDisplay from '../components/ItineraryDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { MapPin, Sparkles } from 'lucide-react';

const PlannerPage = () => {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);
  const [saved, setSaved]         = useState(false);
  const [searchParams]            = useSearchParams();
  const { token }                 = useAuth();

  const preFilledDestination = searchParams.get('destination') || '';

  const handlePlanTrip = async (formData) => {
    setLoading(true);
    setError(null);
    setSaved(false);
    try {
      const dest = encodeURIComponent(formData.destination);
      const [planRes, eventsRes, transportRes] = await Promise.all([
        fetch('/api/plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }),
        fetch(`/api/events?destination=${dest}`),
        fetch(`/api/transport?destination=${dest}`),
      ]);

      if (!planRes.ok) {
        const err = await planRes.json();
        throw new Error(err.error || 'Failed to generate itinerary.');
      }

      const [planData, eventsData, transportData] = await Promise.all([
        planRes.json(), eventsRes.json(), transportRes.json(),
      ]);

      setItinerary({ ...planData, events: eventsData.events || [], transport: transportData.transport || [] });
    } catch (err) {
      setError(err.message || 'Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!itinerary || !token) return;
    try {
      const res = await fetch('/api/plans/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(itinerary),
      });
      if (res.ok) setSaved(true);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Page header */}
      <div className="bg-dark-3 border-b border-dark-border pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-gold text-xs font-bold tracking-widest uppercase mb-3">
            <MapPin className="w-3.5 h-3.5" /> Trip Planner
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Plan Your Adventure</h1>
          <p className="text-zinc-500">Fill in your details and get a complete itinerary with events & transport</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Two-column layout on large screens */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* LEFT — Form (sticky) */}
          <div className="w-full lg:w-[400px] lg:sticky lg:top-24 flex-shrink-0">
            <ItineraryForm
              onSubmit={handlePlanTrip}
              loading={loading}
              preFilledDestination={preFilledDestination}
            />

            {error && (
              <div className="mt-4 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                <span className="text-base flex-shrink-0 mt-0.5">⚠️</span>
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* RIGHT — Results */}
          <div className="flex-1 min-w-0">
            {loading && (
              <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner message="Crafting your perfect itinerary..." />
              </div>
            )}

            {!loading && !itinerary && (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-20 h-20 rounded-2xl bg-dark-3 border border-dark-border flex items-center justify-center mb-5">
                  <Sparkles className="w-8 h-8 text-gold/40" />
                </div>
                <h3 className="text-lg font-bold text-zinc-400 mb-2">Your itinerary will appear here</h3>
                <p className="text-zinc-600 text-sm max-w-xs">Fill in the form and click Generate to create your personalised travel plan</p>
              </div>
            )}

            {!loading && itinerary && (
              <ItineraryDisplay itinerary={itinerary} onSave={handleSave} saved={saved} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;
