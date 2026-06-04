import { useState, useEffect } from 'react';
import { fetchSummary } from '../utils/api';
import { ExpenseSummary } from '../types';
import { ExpenseChart } from './ExpenseChart';

interface SummaryPanelProps {
  refreshTrigger: number;
}

export function SummaryPanel({ refreshTrigger }: SummaryPanelProps) {
  const [summary, setSummary] = useState<ExpenseSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        setLoading(true);
        const data = await fetchSummary();
        setSummary(data);
      } catch (error) {
        console.error("Failed to load summary", error);
      } finally {
        setLoading(false);
      }
    };
    loadSummary();
  }, [refreshTrigger]);

  if (loading || !summary) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-24 bg-slate-200 rounded mb-2"></div>
          <div className="h-8 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">Financial Overview</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm font-medium text-blue-600 mb-1">Total This Month</p>
          <p className="text-3xl font-bold text-slate-900">
            ${summary.totalThisMonth.toFixed(2)}
          </p>
        </div>
        
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <p className="text-sm font-medium text-emerald-600 mb-1">Highest Single Expense</p>
          <p className="text-3xl font-bold text-slate-900">
            ${summary.highestExpense ? summary.highestExpense.amount.toFixed(2) : '0.00'}
          </p>
          {summary.highestExpense && (
            <p className="text-xs text-slate-500 mt-1 truncate">
              {summary.highestExpense.category} - {summary.highestExpense.date}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <h3 className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">Spending Breakdown</h3>
        <div className="flex-1 min-h-[250px]">
           <ExpenseChart data={summary.categoryTotals} />
        </div>
      </div>
    </div>
  );
}
