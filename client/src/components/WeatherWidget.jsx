import React from 'react';
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

const getConfig = (condition = '') => {
  const c = condition.toLowerCase();
  if (c.includes('rain') || c.includes('storm'))
    return { icon: <CloudRain className="w-5 h-5" />, color: 'text-blue-400',  bg: 'bg-blue-500/10',  border: 'border-blue-500/20'  };
  if (c.includes('cloud') || c.includes('overcast'))
    return { icon: <Cloud className="w-5 h-5" />,     color: 'text-zinc-400',  bg: 'bg-zinc-500/10',  border: 'border-zinc-500/20'  };
  if (c.includes('wind'))
    return { icon: <Wind className="w-5 h-5" />,      color: 'text-teal-400',  bg: 'bg-teal-500/10',  border: 'border-teal-500/20'  };
  return   { icon: <Sun className="w-5 h-5" />,       color: 'text-gold',      bg: 'bg-gold/10',      border: 'border-gold/20'      };
};

const WeatherWidget = ({ weather }) => {
  if (!weather || weather === 'Loading...') return null;
  const { icon, color, bg, border } = getConfig(weather);
  return (
    <div className={`flex items-center gap-4 ${bg} border ${border} rounded-xl px-5 py-3.5`}>
      <div className={`${color} flex-shrink-0`}>{icon}</div>
      <div>
        <p className={`text-xs font-bold ${color} uppercase tracking-wider mb-0.5`}>Weather Forecast</p>
        <p className="text-sm text-zinc-300">{weather}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
