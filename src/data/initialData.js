export const initialData = {
  transactions: [
    {
      id: 1,
      type: 'income',
      amount: 2500,
      category: 'Gehalt',
      description: 'Monatsgehalt',
      date: '2023-05-01'
    },
    {
      id: 2,
      type: 'expense',
      amount: 800,
      category: 'Miete',
      description: 'Monatsmiete',
      date: '2023-05-03'
    },
    {
      id: 3,
      type: 'expense',
      amount: 120,
      category: 'Lebensmittel',
      description: 'Wocheneinkauf',
      date: '2023-05-05'
    }
  ],
  budgets: [
    {
      id: 1,
      category: 'Miete',
      amount: 800,
      period: 'monthly'
    },
    {
      id: 2,
      category: 'Lebensmittel',
      amount: 400,
      period: 'monthly'
    },
    {
      id: 3,
      category: 'Freizeit',
      amount: 200,
      period: 'monthly'
    }
  ],
  savingsGoals: [
    {
      id: 1,
      name: 'Notgroschen',
      targetAmount: 5000,
      currentAmount: 2000,
      deadline: '2023-12-31'
    },
    {
      id: 2,
      name: 'Urlaub',
      targetAmount: 1500,
      currentAmount: 500,
      deadline: '2023-08-15'
    }
  ]
};

export const categories = {
  income: [
    'Gehalt',
    'Nebeneinkünfte',
    'Geschenke',
    'Zinsen',
    'Sonstiges'
  ],
  expense: [
    'Miete',
    'Lebensmittel',
    'Transport',
    'Versicherungen',
    'Freizeit',
    'Gesundheit',
    'Bildung',
    'Haustiere',    
    'Kleidung',
    'Haushalt',
    'Abonnements',
    'Sonstiges'
  ]
};
