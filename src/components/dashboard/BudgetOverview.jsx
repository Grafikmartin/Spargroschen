import { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

function BudgetOverview({ budgets, transactions }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const months = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };
  
  // Filtere Transaktionen für den ausgewählten Monat
  const filteredTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear && t.type === 'expense';
  });
  
  // Berechne Ausgaben pro Kategorie
  const expensesByCategory = {};
  filteredTransactions.forEach(t => {
    if (!expensesByCategory[t.category]) {
      expensesByCategory[t.category] = 0;
    }
    expensesByCategory[t.category] += t.amount;
  });
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Budget-Übersicht</h2>
        <div className="flex space-x-2">
          <select 
            className="input py-1 px-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <select 
            className="input py-1 px-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {[...Array(5)].map((_, i) => {
              const year = new Date().getFullYear() - 2 + i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {budgets.map(budget => {
          const spent = expensesByCategory[budget.category] || 0;
          const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
          const isOverBudget = percentage > 100;
          
          return (
            <div key={budget.id} className="space-y-1">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <span>{budget.category}</span>
                  {isOverBudget && (
                    <FiAlertCircle className="ml-2 text-red-500" title="Budget überschritten" />
                  )}
                </div>
                <div>
                  <span className={isOverBudget ? 'text-red-600' : ''}>
                    {formatCurrency(spent)} / {formatCurrency(budget.amount)}
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${isOverBudget ? 'bg-red-600' : 'bg-primary-600'}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetOverview;
