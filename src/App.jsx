import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { StockProvider } from './contexts/StockContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { Stock } from './pages/Stock';

/**
 * Componente principal da aplicação
 * Define as rotas e provedores de contexto
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <StockProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              
              <main className="flex-grow">
                <Routes>
                  {/* Rotas Públicas */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/catalogo" element={<Catalog />} />

                  {/* Rotas Protegidas - Cliente */}
                  <Route
                    path="/carrinho"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/perfil"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />

                  {/* Rotas Protegidas - Admin */}
                  <Route
                    path="/estoque"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <Stock />
                      </ProtectedRoute>
                    }
                  />

                  {/* Rota 404 */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </StockProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
