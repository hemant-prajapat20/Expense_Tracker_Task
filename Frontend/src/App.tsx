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
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md hover:scale-105 hover:rotate-3 transition-transform cursor-pointer">
              <svg className="w-5.5 h-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
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
