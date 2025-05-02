import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <header className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 text-white shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Calculadora de Custos - Unidade de Saúde</h1>
            <p className="mt-2 text-lg">Sistema para cálculo e análise de custos em unidades de saúde</p>
            <p className="mt-1 text-sm">Dados atualizados conforme média de mercado 2025</p>
          </div>
          
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-lg font-medium">
              <li>
                <Link 
                  to="/" 
                  className={`hover:text-blue-200 transition ${isActive('/') || isActive('/calculadora') || isActive('/capacitacao') ? 'border-b-2 border-white pb-1' : ''}`}
                >
                  Calculadora
                </Link>
              </li>
              <li>
                <Link 
                  to="/plano-trabalho" 
                  className={`hover:text-blue-200 transition ${isActive('/plano-trabalho') ? 'border-b-2 border-white pb-1' : ''}`}
                >
                  Plano de Trabalho
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
