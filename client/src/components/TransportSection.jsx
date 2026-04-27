import React, { useState } from 'react';
import { Bus, Train, Car, Bike, Clock, MapPin, DollarSign, CheckCircle2, X } from 'lucide-react';

const TYPE_CFG = {
  Bus:    { icon: Bus,   color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30'   },
  Train:  { icon: Train, color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20',  badge: 'bg-green-500/20 text-green-400 border-green-500/30'  },
  Taxi:   { icon: Car,   color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  Rental: { icon: Bike,  color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
};
const cfg = (t) => TYPE_CFG[t] || TYPE_CFG.Taxi;

const BookingModal = ({ transport, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
    <div className="bg-dark-3 border border-dark-border rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center relative">
      <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-dark-5 text-zinc-500 hover:text-white transition-colors">
        <X className="w-4 h-4" />
      </button>
      <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-7 h-7 text-green-400" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Booking Confirmed!</h3>
      <p className="text-zinc-500 text-sm mb-5">
        <span className="text-zinc-300 font-semibold">{transport.name}</span> has been booked.
      </p>
      <div className="bg-dark-5 border border-dark-border rounded-xl p-4 text-left space-y-2 mb-6">
        {[['Route', transport.route], ['Price', transport.price], ['Ref', `TP${Math.random().toString(36).slice(2,8).toUpperCase()}`]].map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm">
            <span className="text-zinc-500">{k}</span>
            <span className={`font-medium ${k === 'Price' ? 'text-green-400' : k === 'Ref' ? 'font-mono text-gold' : 'text-zinc-300'}`}>{v}</span>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="w-full py-2.5 bg-gold hover:bg-gold-dark text-dark font-bold rounded-xl transition-colors">
        Done
      </button>
    </div>
  </div>
);

const TransportSection = ({ transport = [], destination = '' }) => {
  const [booked, setBooked] = useState(null);
  if (!transport.length) return (
    <div className="text-center py-12 text-zinc-600">
      <Car className="w-10 h-10 mx-auto mb-3 opacity-30" />
      <p className="text-sm">No transport info available.</p>
    </div>
  );

  const grouped = transport.reduce((acc, t) => { (acc[t.type] = acc[t.type] || []).push(t); return acc; }, {});

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Car className="w-4 h-4 text-gold" />
        <h3 className="font-bold text-white">Transport in {destination}</h3>
      </div>
      <div className="space-y-3">
        {Object.entries(grouped).map(([type, items]) => {
          const { icon: Icon, color, bg, border, badge } = cfg(type);
          return (
            <div key={type} className={`rounded-xl ${bg} border ${border} overflow-hidden`}>
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${badge}`}>{type}</span>
              </div>
              <div className="divide-y divide-white/5">
                {items.map((t, i) => (
                  <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-sm">{t.name}</h4>
                      <p className="text-zinc-500 text-xs mt-0.5">{t.details}</p>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-zinc-600">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.route}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t.timing}</span>
                        <span className={`flex items-center gap-1 font-semibold ${color}`}><DollarSign className="w-3 h-3" /> {t.price}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setBooked(t)}
                      className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold border ${badge} hover:opacity-80 transition-all hover:scale-105 active:scale-95`}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {booked && <BookingModal transport={booked} onClose={() => setBooked(null)} />}
    </div>
  );
};

export default TransportSection;
