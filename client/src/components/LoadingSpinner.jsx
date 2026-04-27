import React from 'react';
import { Plane } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-5">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-2 border-dark-7" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
          <Plane className="w-4 h-4 text-gold" />
        </div>
      </div>
    </div>
    <div className="text-center">
      <p className="text-zinc-300 font-medium text-sm">{message}</p>
      <div className="flex items-center justify-center gap-1 mt-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default LoadingSpinner;
