import { useState } from 'react';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { SummaryPanel } from './components/SummaryPanel';

function App() {
  // We use this trigger to force child components to refresh their data 
  // when an expense is added, edited, or deleted.
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleDataChanged = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Mini Expense Tracker</h1>
          </div>
          <div className="text-sm font-medium text-slate-500">
            Powered by React & SQLite
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Row: Form & Summary Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          <section>
            <ExpenseForm onExpenseAdded={handleDataChanged} />
          </section>

          <section>
            <SummaryPanel refreshTrigger={refreshTrigger} />
          </section>

        </div>

        {/* Bottom Row: The Data Table */}
        <div className="grid grid-cols-1">
          <section>
            <ExpenseList 
              refreshTrigger={refreshTrigger} 
              onExpenseDeletedOrUpdated={handleDataChanged} 
            />
          </section>
        </div>

      </main>

    </div>
  );
}

export default App;
