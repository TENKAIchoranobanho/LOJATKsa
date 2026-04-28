import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
import { useCart } from '../utils/useCart';

/**
 * Componente de navegação principal - Design Moderno
 * Navbar com gradiente, menu responsivo e perfil do usuário
 */
export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg hidden sm:inline group-hover:text-purple-300 transition-colors duration-300">
              Loja de Embalagens
            </span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white/80 hover:text-purple-300 transition-colors duration-300 font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/catalogo" className="text-white/80 hover:text-purple-300 transition-colors duration-300 font-medium relative group">
              Catálogo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {user && isAdmin && (
              <Link to="/estoque" className="text-white/80 hover:text-purple-300 transition-colors duration-300 font-medium flex items-center gap-2 relative group">
                <span>⚙️</span>
                Estoque
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
          </div>

          {/* Ações à direita */}
          <div className="flex items-center gap-4">
            
            {/* Carrinho */}
            {user && !isAdmin && (
              <Link to="/carrinho" className="relative group">
                <div className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 border border-white/10 group-hover:border-purple-500/50 transform group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
              </Link>
            )}

            {/* Perfil / Login */}
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold hover:shadow-lg transition-all duration-300 border border-white/20 transform hover:scale-110"
                >
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </button>

                {/* Dropdown Perfil */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 backdrop-blur-xl">
                    <div className="px-4 py-4 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
                      <p className="text-white font-semibold">{user.name}</p>
                      <p className="text-white/60 text-sm">{user.email}</p>
                    </div>
                    {!isAdmin && (
                      <Link
                        to="/perfil"
                        className="block px-4 py-3 text-white/80 hover:text-purple-300 hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <span>👤</span>
                        Meu Perfil
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-white/80 hover:text-red-300 hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
                    >
                      <span>🚪</span>
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium text-sm transform hover:scale-105"
              >
                Entrar
              </Link>
            )}

            {/* Menu Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 border border-white/10"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-white/10 pt-4">
            <Link
              to="/"
              className="block px-4 py-2 text-white/80 hover:text-purple-300 hover:bg-white/5 rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/catalogo"
              className="block px-4 py-2 text-white/80 hover:text-purple-300 hover:bg-white/5 rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Catálogo
            </Link>
            {user && isAdmin && (
              <Link
                to="/estoque"
                className="block px-4 py-2 text-white/80 hover:text-purple-300 hover:bg-white/5 rounded-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                ⚙️ Estoque
              </Link>
            )}
            {user && !isAdmin && (
              <Link
                to="/carrinho"
                className="block px-4 py-2 text-white/80 hover:text-purple-300 hover:bg-white/5 rounded-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                🛒 Carrinho ({getTotalItems()})
              </Link>
            )}
            {user ? (
              <>
                {!isAdmin && (
                  <Link
                    to="/perfil"
                    className="block px-4 py-2 text-white/80 hover:text-purple-300 hover:bg-white/5 rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👤 Perfil
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-white/80 hover:text-red-300 hover:bg-white/5 rounded-lg transition-all duration-300"
                >
                  🚪 Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-center font-medium"
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
