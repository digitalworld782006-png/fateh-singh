import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '08:00', price: 1.0820 },
  { name: '10:00', price: 1.0850 },
  { name: '12:00', price: 1.0845 },
  { name: '14:00', price: 1.0890 },
  { name: '16:00', price: 1.0920 },
  { name: '18:00', price: 1.0910 },
  { name: '20:00', price: 1.0950 },
];

const ChartComponent: React.FC = () => {
  return (
    <div className="w-full h-64 bg-trade-800/50 rounded-lg p-4 border border-trade-700">
      <h4 className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">EUR/USD Live Sentiment</h4>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="name" stroke="#64748b" tick={{fontSize: 12}} />
          <YAxis domain={['auto', 'auto']} stroke="#64748b" tick={{fontSize: 12}} width={40} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
            itemStyle={{ color: '#10b981' }}
          />
          <Area type="monotone" dataKey="price" stroke="#10b981" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;