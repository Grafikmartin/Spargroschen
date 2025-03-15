// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Initialisiere States mit localStorage oder initialData
  const [transactions, setTransactions] = useState(() => {
    try {
      const savedTransactions = localStorage.getItem('transactions');
      return savedTransactions ? JSON.parse(savedTransactions) : initialData.transactions;
    } catch (error) {
      console.error('Error loading transactions from localStorage:', error);
      return initialData.transactions;
    }
  });

  const [budgets, setBudgets] = useState(() => {
    try {
      const savedBudgets = localStorage.getItem('budgets');
      return savedBudgets ? JSON.parse(savedBudgets) : initialData.budgets;
    } catch (error) {
      console.error('Error loading budgets from localStorage:', error);
      return initialData.budgets;
    }
  });

  const [savingsGoals, setSavingsGoals] = useState(() => {
    try {
      const savedSavingsGoals = localStorage.getItem('savingsGoals');
      return savedSavingsGoals ? JSON.parse(savedSavingsGoals) : initialData.savingsGoals;
    } catch (error) {
      console.error('Error loading savingsGoals from localStorage:', error);
      return initialData.savingsGoals;
    }
  });

  const [balance, setBalance] = useState(0);

  // Speichere Änderungen in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions to localStorage:', error);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem('budgets', JSON.stringify(budgets));
    } catch (error) {
      console.error('Error saving budgets to localStorage:', error);
    }
  }, [budgets]);

  useEffect(() => {
    try {
      localStorage.setItem('savingsGoals', JSON.stringify(savingsGoals));
    } catch (error) {
      console.error('Error saving savingsGoals to localStorage:', error);
    }
  }, [savingsGoals]);

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
    setTransactions(prevTransactions => [...prevTransactions, { ...newTransaction, id: Date.now().toString() }]);
  };

  // Füge ein neues Budget hinzu
  const addBudget = (newBudget) => {
    setBudgets(prevBudgets => [...prevBudgets, { ...newBudget, id: Date.now().toString() }]);
  };

  // Füge ein neues Sparziel hinzu
  const addSavingsGoal = (newSavingsGoal) => {
    setSavingsGoals(prevGoals => [...prevGoals, { ...newSavingsGoal, id: Date.now().toString() }]);
  };

  // Aktualisiere ein Sparziel
  const updateSavingsGoal = (id, updatedSavingsGoal) => {
    setSavingsGoals(prevGoals => 
      prevGoals.map(goal => goal.id === id ? { ...goal, ...updatedSavingsGoal } : goal)
    );
  };

  // Lösche ein Sparziel
  const deleteSavingsGoal = (id) => {
    setSavingsGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
  };

  // Lösche Funktionen für andere Datentypen
  const deleteTransaction = (id) => {
    setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id));
  };

  const deleteBudget = (id) => {
    setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id));
  };

  return (
    <AppContext.Provider value={{
      transactions,
      budgets,
      savingsGoals,
      balance,
      addTransaction,
      addBudget,
      addSavingsGoal,
      updateSavingsGoal,
      deleteSavingsGoal,
      deleteTransaction,
      deleteBudget
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
