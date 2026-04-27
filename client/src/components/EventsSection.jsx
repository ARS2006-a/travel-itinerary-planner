import React from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';

const CAT_COLORS = {
  Cultural:   'bg-purple-500/15 text-purple-400 border-purple-500/20',
  Festival:   'bg-orange-500/15 text-orange-400 border-orange-500/20',
  Food:       'bg-green-500/15  text-green-400  border-green-500/20',
  Music:      'bg-blue-500/15   text-blue-400   border-blue-500/20',
  Religious:  'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  Nature:     'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  Sports:     'bg-red-500/15    text-red-400    border-red-500/20',
  Technology: 'bg-cyan-500/15   text-cyan-400   border-cyan-500/20',
  Arts:       'bg-pink-500/15   text-pink-400   border-pink-500/20',
  Film:       'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
  History:    'bg-amber-500/15  text-amber-400  border-amber-500/20',
  Literature: 'bg-teal-500/15   text-teal-400   border-teal-500/20',
  Shopping:   'bg-rose-500/15   text-rose-400   border-rose-500/20',
  National:   'bg-blue-500/15   text-blue-400   border-blue-500/20',
  Fashion:    'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/20',
  Art:        'bg-violet-500/15 text-violet-400 border-violet-500/20',
  Theatre:    'bg-lime-500/15   text-lime-400   border-lime-500/20',
};

const catCls = (cat) => CAT_COLORS[cat] || 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20';

const EventsSection = ({ events = [], destination = '' }) => {
  if (!events.length) return (
    <div className="text-center py-12 text-zinc-600">
      <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
      <p className="text-sm">No events found for this destination.</p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Calendar className="w-4 h-4 text-gold" />
        <h3 className="font-bold text-white">Local Events in {destination}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {events.map((event, i) => (
          <div
            key={i}
            className="group bg-dark-4 rounded-xl border border-dark-border hover:border-dark-7 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 overflow-hidden"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-bold text-white text-sm leading-tight">{event.name}</h4>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0 ${catCls(event.category)}`}>
                  {event.category}
                </span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed mb-3">{event.description}</p>
              <div className="flex flex-wrap gap-3 text-xs text-zinc-600">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-purple-400/60" /> {event.date}</span>
                {event.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-pink-400/60" /> {event.location}</span>}
                <span className="flex items-center gap-1"><Ticket className="w-3 h-3 text-green-400/60" /> {event.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
