import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ExpenseChartProps {
  data: { category: string; total: number }[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#64748B'];

export function ExpenseChart({ data }: ExpenseChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-400">
        <svg className="w-12 h-12 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        <p>No data to display yet.</p>
      </div>
    );
  }

  const handlePieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(null);
  };

  const handlePieClick = (_: unknown, index: number) => {
    // Toggle active index on click (perfect for mobile touch)
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="h-72 w-full relative">
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="total"
            nameKey="category"
            onMouseEnter={handlePieEnter}
            onMouseLeave={handlePieLeave}
            onClick={handlePieClick}
          >
            {data.map((_entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                style={{
                  outline: 'none',
                  cursor: 'pointer',
                  opacity: activeIndex === null || activeIndex === index ? 1 : 0.6,
                  transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                  transformOrigin: '50% 50%',
                  transition: 'opacity 0.2s ease, transform 0.2s ease'
                }}
              />
            ))}
          </Pie>
          {/* Hide the default tooltip box to prevent overlap with the center text */}
          <Tooltip content={<></>} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label Overlay */}
      {activeIndex !== null && data[activeIndex] && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ top: '-18px' }}>
          <div className="text-center animate-fade-in">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {data[activeIndex].category}
            </p>
            <p className="text-lg font-bold text-slate-800">
              ₹{data[activeIndex].total.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
