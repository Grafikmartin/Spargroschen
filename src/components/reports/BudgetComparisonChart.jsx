// src/components/reports/BudgetComparisonChart.jsx
import { useAppContext } from '../../context/AppContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js Komponenten registrieren
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BudgetComparisonChart = () => {
  const { transactions, budgets } = useAppContext();
  
  // Ausgaben nach Kategorie gruppieren
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});
  
  // Budget-Daten vorbereiten
  const budgetsByCategory = budgets.reduce((acc, budget) => {
    acc[budget.category] = budget.amount;
    return acc;
  }, {});
  
  // Alle Kategorien sammeln (Budget + Ausgaben)
  const allCategories = [...new Set([
    ...Object.keys(budgetsByCategory),
    ...Object.keys(expensesByCategory)
  ])];
  
  const chartData = {
    labels: allCategories,
    datasets: [
      {
        label: 'Budget',
        data: allCategories.map(category => budgetsByCategory[category] || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Tatsächliche Ausgaben',
        data: allCategories.map(category => expensesByCategory[category] || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Budget vs. Tatsächliche Ausgaben',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div className="chart-container">
      <h2>Budget vs. Ausgaben</h2>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BudgetComparisonChart;
