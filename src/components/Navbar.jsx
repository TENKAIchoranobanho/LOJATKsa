import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
import { useCart } from '../utils/useCart';

/**
 * Componente de navegação principal
 * Exibe logo, menu de navegação, carrinho e perfil do usuário
 */
export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">📦</span>
            </div>
            <span className="font-bold text-xl text-gray-800 hidden sm:inline">
              Loja de Embalagens
            </span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
              Home
            </Link>
            <Link to="/catalogo" className="text-gray-700 hover:text-primary-600 transition">
              Catálogo
            </Link>
            {user && isAdmin && (
              <Link to="/estoque" className="text-gray-700 hover:text-primary-600 transition font-semibold text-primary-600">
                Estoque
              </Link>
            )}
          </div>

          {/* Ações à direita */}
          <div className="flex items-center gap-4">
            {/* Carrinho */}
            {user && !isAdmin && (
              <Link
                to="/carrinho"
                className="relative p-2 text-gray-700 hover:text-primary-600 transition"
              >
                <span className="text-2xl">🛒</span>
                {getTotalItems() > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            )}

            {/* Perfil ou Login */}
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-gray-600 text-xs">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  {!isAdmin && (
                    <Link
                      to="/perfil"
                      className="px-3 py-1 text-sm bg-primary-100 text-primary-600 rounded hover:bg-primary-200 transition"
                    >
                      Perfil
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                  >
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition hidden md:block"
              >
                Entrar
              </Link>
            )}

            {/* Menu Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>

        {/* Menu Mobile Expandido */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/catalogo"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Catálogo
            </Link>
            {user && isAdmin && (
              <Link
                to="/estoque"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded font-semibold text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Estoque
              </Link>
            )}
            {user && !isAdmin && (
              <Link
                to="/carrinho"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Carrinho ({getTotalItems()})
              </Link>
            )}
            {user ? (
              <>
                {!isAdmin && (
                  <Link
                    to="/perfil"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
