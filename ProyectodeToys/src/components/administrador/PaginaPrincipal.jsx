import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, ShoppingBag, ShoppingCart, ClipboardList, CreditCard, Image } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/admin/usuarios', icon: <Users size={20} />, label: 'Usuarios' },
    {path: '/admin/productos', icon: <ShoppingBag size={20} />, label: 'Productos'},
    {path: '/admin/carritos', icon: <ShoppingCart size={20} />, label: 'Carritos'},
    {path: '/admin/pedidos', icon: <ClipboardList size={20} />, label: 'Pedidos'},
    {path: '/admin/compras', icon: <CreditCard size={20} />, label: 'Compras'},

  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;