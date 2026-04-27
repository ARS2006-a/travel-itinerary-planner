import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import EventsSection from '../components/EventsSection';
import LoadingSpinner from '../components/LoadingSpinner';

const QUICK = ['Paris', 'Tokyo', 'Bali', 'London', 'New York', 'Goa', 'Kerala', 'Bangalore', 'Mangalore', 'Mysore'];

const EventsPage = () => {
  const [destination, setDestination] = useState('');
  const [events, setEvents]           = useState([]);
  const [searched, setSearched]       = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  const fetchEvents = async (dest) => {
    if (!dest.trim()) return;
    setLoading(true); setError('');
    try {
      const res  = await fetch(`/api/events?destination=${encodeURIComponent(dest)}`);
      const data = await res.json();
      setEvents(data.events || []);
      setSearched(dest);
    } catch { setError('Failed to fetch events. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleSubmit = (e) => { e.preventDefault(); fetchEvents(destination); };

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <div className="bg-dark-3 border-b border-dark-border pt-20 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-gold text-xs font-bold tracking-widest uppercase mb-3">
            <Calendar className="w-3.5 h-3.5" /> Local Events
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Discover Events</h1>
          <p className="text-zinc-500 text-sm">Find cultural festivals, Yakshagana shows, and local events at your destination</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Search */}
        <form onSubmit={handleSubmit} className="bg-dark-3 rounded-2xl border border-dark-border p-6 mb-8">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination (e.g., Mangalore, Paris, Bali)"
                className="w-full pl-10 pr-4 py-3 bg-dark-5 border border-dark-7 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gold hover:bg-gold-dark text-dark font-bold rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-60 text-sm"
            >
              Search
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs text-zinc-600 self-center">Quick:</span>
            {QUICK.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => { setDestination(d); fetchEvents(d); }}
                className="px-3 py-1 text-xs font-medium bg-dark-5 border border-dark-7 hover:border-gold/40 hover:text-gold text-zinc-500 rounded-full transition-all"
              >
                {d}
              </button>
            ))}
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm mb-6">⚠️ {error}</div>
        )}

        {loading && <LoadingSpinner message="Fetching events..." />}

        {!loading && events.length > 0 && <EventsSection events={events} destination={searched} />}

        {!loading && searched && events.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🎭</div>
            <h3 className="text-lg font-bold text-zinc-400 mb-2">No events found</h3>
            <p className="text-zinc-600 text-sm">Try a different destination.</p>
          </div>
        )}

        {!searched && !loading && (
          <div className="text-center py-20 text-zinc-700">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-sm">Search a destination to discover local events</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
