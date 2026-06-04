import { useState, useEffect, useCallback } from 'react';
import { Expense } from '../types';
import { deleteExpense, fetchExpenses, updateExpense } from '../utils/api';

interface ExpenseListProps {
  refreshTrigger: number; // A number that increments to tell this component to refetch
  onExpenseDeletedOrUpdated: () => void;
}

const CATEGORIES = ['All', 'Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

export function ExpenseList({ refreshTrigger, onExpenseDeletedOrUpdated }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering state
  const [filterCategory, setFilterCategory] = useState('All');
  
  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Expense>>({});

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchExpenses({ 
        category: filterCategory === 'All' ? undefined : filterCategory 
      });
      setExpenses(data);
    } catch (error) {
      console.error("Failed to load expenses:", error);
    } finally {
      setLoading(false);
    }
  }, [filterCategory]);

  // Reload when the parent says so, or when filters change
  useEffect(() => {
    loadExpenses();
  }, [refreshTrigger, loadExpenses]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
        onExpenseDeletedOrUpdated();
        loadExpenses();
      } catch (error) {
        console.error("Failed to delete", error);
        alert("Failed to delete expense.");
      }
    }
  };

  const startEditing = (expense: Expense) => {
    setEditingId(expense.id);
    setEditForm({ ...expense });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    
    // Validation
    const amount = Number(editForm.amount);
    if (isNaN(amount) || amount <= 0) {
      alert("Amount must be a positive number.");
      return;
    }
    const selectedDate = new Date(editForm.date || '');
    const today = new Date();
    today.setHours(0,0,0,0);
    if (selectedDate > today) {
      alert("Date cannot be in the future.");
      return;
    }

    try {
      await updateExpense(editingId, editForm);
      setEditingId(null);
      onExpenseDeletedOrUpdated();
      loadExpenses();
    } catch (error) {
      console.error("Failed to update", error);
      alert("Failed to update expense.");
    }
  };

  const exportCSV = () => {
    if (expenses.length === 0) {
      alert("No data to export.");
      return;
    }
    const headers = ['ID', 'Date', 'Category', 'Amount', 'Note'];
    const csvRows = [headers.join(',')];
    
    expenses.forEach(exp => {
      const row = [
        exp.id,
        exp.date,
        exp.category,
        exp.amount,
        `"${exp.note || ''}"` // Wrap note in quotes to handle commas inside the note
      ];
      csvRows.push(row.join(','));
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      
      {/* Header and Filters */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-800">Recent Expenses</h2>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={exportCSV}
            className="text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>

          <div className="flex items-center gap-2">
          <label className="text-sm text-slate-500 font-medium">Filter:</label>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Note</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading expenses...</td>
              </tr>
            ) : expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">No expenses found for this category.</td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* DATE */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === expense.id ? (
                      <input 
                        type="date" 
                        value={editForm.date} 
                        max={new Date().toISOString().split('T')[0]}
                        onChange={e => setEditForm({...editForm, date: e.target.value})}
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      expense.date
                    )}
                  </td>
                  
                  {/* CATEGORY */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === expense.id ? (
                      <select 
                        value={editForm.category}
                        onChange={e => setEditForm({...editForm, category: e.target.value})}
                        className="w-full border rounded px-2 py-1 text-sm"
                      >
                        {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {expense.category}
                      </span>
                    )}
                  </td>

                  {/* NOTE */}
                  <td className="px-6 py-4">
                    {editingId === expense.id ? (
                      <input 
                        type="text" 
                        value={editForm.note || ''} 
                        onChange={e => setEditForm({...editForm, note: e.target.value})}
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      <span className="text-slate-500 truncate max-w-[200px] block">
                        {expense.note || '-'}
                      </span>
                    )}
                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 py-4 text-right font-medium text-slate-900 whitespace-nowrap">
                    {editingId === expense.id ? (
                      <input 
                        type="number" 
                        value={editForm.amount} 
                        onChange={e => setEditForm({...editForm, amount: Number(e.target.value)})}
                        className="w-24 border rounded px-2 py-1 text-sm text-right"
                      />
                    ) : (
                      `$${expense.amount.toFixed(2)}`
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {editingId === expense.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={saveEdit} className="text-green-600 hover:text-green-800 font-medium">Save</button>
                        <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-slate-600 font-medium">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => startEditing(expense)} className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(expense.id)} className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
