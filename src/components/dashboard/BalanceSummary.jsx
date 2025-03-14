import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

function BalanceSummary({ balance, income, expenses }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Kontostand</h2>
      
      <div className="text-3xl font-bold mb-6">
        {formatCurrency(balance)}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <FiArrowUp className="text-green-600" />
            </div>
            <span>Einnahmen</span>
          </div>
          <span className="font-medium text-green-600">{formatCurrency(income)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <FiArrowDown className="text-red-600" />
            </div>
            <span>Ausgaben</span>
          </div>
          <span className="font-medium text-red-600">{formatCurrency(expenses)}</span>
        </div>
      </div>
    </div>
  );
}

export default BalanceSummary;
