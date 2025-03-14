import { NavLink } from 'react-router-dom';
import { FiHome, FiList, FiPieChart, FiTarget, FiBarChart2, FiX } from 'react-icons/fi';

function MobileMenu({ isOpen, onClose }) {
  const navItems = [
    { path: '/', icon: <FiHome />, label: 'Dashboard' },
    { path: '/transactions', icon: <FiList />, label: 'Transaktionen' },
    { path: '/budget', icon: <FiPieChart />, label: 'Budget' },
    { path: '/savings', icon: <FiTarget />, label: 'Sparziele' },
    { path: '/reports', icon: <FiBarChart2 />, label: 'Berichte' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50">
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-primary-600">GeldPlaner</h2>
          <button 
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={onClose}
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-5">
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="mb-1 px-3">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-gray-700 rounded-lg ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'hover:bg-gray-100'
                    }`
                  }
                  onClick={onClose}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
