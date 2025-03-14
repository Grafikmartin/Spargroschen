import { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

// Erstelle den Context
const AppContext = createContext();

// Provider-Komponente
export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : initialData.transactions;
  });
  
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : initialData.budgets;
  });
  
  const [savingsGoals, setSavingsGoals] = useState(() => {
    const saved = localStorage.getItem('savingsGoals');
    return saved ? JSON.parse(saved) : initialData.savingsGoals;
  });

  // Speichern in localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('savingsGoals', JSON.stringify(savingsGoals));
  }, [savingsGoals]);

  // CRUD Funktionen für Transaktionen
  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...updatedTransaction, id } : t
    ));
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // CRUD Funktionen für Budgets
  const addBudget = (budget) => {
    setBudgets([...budgets, { ...budget, id: Date.now() }]);
  };

  const updateBudget = (id, updatedBudget) => {
    setBudgets(budgets.map(b => 
      b.id === id ? { ...updatedBudget, id } : b
    ));
  };

  const deleteBudget = (id) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  // CRUD Funktionen für Sparziele
  const addSavingsGoal = (goal) => {
    setSavingsGoals([...savingsGoals, { ...goal, id: Date.now() }]);
  };

  const updateSavingsGoal = (id, updatedGoal) => {
    setSavingsGoals(savingsGoals.map(g => 
      g.id === id ? { ...updatedGoal, id } : g
    ));
  };

  const deleteSavingsGoal = (id) => {
    setSavingsGoals(savingsGoals.filter(g => g.id !== id));
  };

  const value = {
    transactions,
    budgets,
    savingsGoals,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addBudget,
    updateBudget,
    deleteBudget,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom Hook für einfachen Zugriff auf den Context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
