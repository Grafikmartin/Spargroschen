// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialData.transactions);
  const [budgets, setBudgets] = useState(initialData.budgets);
  const [savings, setSavings] = useState(initialData.savingsGoals);
  const [balance, setBalance] = useState(0);

  // Berechne den aktuellen Kontostand basierend auf Transaktionen
  useEffect(() => {
    const newBalance = transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
        return total + transaction.amount;
      } else {
        return total - transaction.amount;
      }
    }, 0);
    setBalance(newBalance);
  }, [transactions]);

  // Füge eine neue Transaktion hinzu
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, { ...newTransaction, id: Date.now().toString() }]);
  };

  // Füge ein neues Budget hinzu
  const addBudget = (newBudget) => {
    setBudgets([...budgets, { ...newBudget, id: Date.now().toString() }]);
  };

  // Füge ein neues Sparziel hinzu
  const addSaving = (newSaving) => {
    setSavings([...savings, { ...newSaving, id: Date.now().toString() }]);
  };

  // Aktualisiere ein Sparziel
  const updateSaving = (id, updatedSaving) => {
    setSavings(savings.map(saving => 
      saving.id === id ? { ...saving, ...updatedSaving } : saving
    ));
  };

  return (
    <AppContext.Provider value={{
      transactions,
      budgets,
      savings,
      balance,
      addTransaction,
      addBudget,
      addSaving,
      updateSaving
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
