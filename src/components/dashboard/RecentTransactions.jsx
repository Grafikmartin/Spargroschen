import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

function RecentTransactions({ transactions }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd. MMM yyyy', { locale: de });
  };

  if (transactions.length === 0) {
    return <p className="text-gray-500">Keine Transaktionen vorhanden.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="pb-2 text-left font-medium text-gray-500">Datum</th>
            <th className="pb-2 text-left font-medium text-gray-500">Kategorie</th>
            <th className="pb-2 text-left font-medium text-gray-500">Beschreibung</th>
            <th className="pb-2 text-right font-medium text-gray-500">Betrag</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b last:border-0">
              <td className="py-3">{formatDate(transaction.date)}</td>
              <td className="py-3">{transaction.category}</td>
              <td className="py-3">{transaction.description}</td>
              <td className="py-3 text-right">
                <div className="flex items-center justify-end">
                  {transaction.type === 'income' ? (
                    <FiArrowUp className="text-green-600 mr-1" />
                  ) : (
                    <FiArrowDown className="text-red-600 mr-1" />
                  )}
                  <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentTransactions;
