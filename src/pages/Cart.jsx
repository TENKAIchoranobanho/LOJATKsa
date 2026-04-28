import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../utils/useCart';

/**
 * Página do Carrinho - Design Moderno
 * Itens do carrinho com controles e resumo de pedido
 */
export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    const total = getTotalPrice();
    alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}\n\nEste é um exemplo de demonstração.`);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white mb-2">
            🛒 Carrinho de <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Compras</span>
          </h1>
          <p className="text-white/70 text-lg">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Itens do Carrinho */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/10">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-6 flex gap-6 hover:bg-white/20 transition-all duration-300 ${
                      index !== cartItems.length - 1 ? 'border-b border-white/10' : ''
                    }`}
                  >
                    {/* Imagem */}
                    <div className="w-24 h-24 bg-white/10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Detalhes */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-white mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-white/70 mb-3">
                        {item.description}
                      </p>
                      <p className="text-sm text-white/60">
                        <strong>Material:</strong> {item.material}
                      </p>
                    </div>

                    {/* Preço e Quantidade */}
                    <div className="text-right flex flex-col justify-between">
                      <div>
                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          R$ {item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-white/60">
                          Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Controles de Quantidade */}
                      <div className="flex items-center gap-2 justify-end mt-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 bg-white/10 rounded-lg min-w-[50px] text-center text-white font-semibold border border-white/20">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20"
                        >
                          +
                        </button>
                      </div>

                      {/* Remover */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 text-sm font-semibold mt-3 transition-colors"
                      >
                        🗑️ Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ações */}
              <div className="mt-6 flex gap-4 flex-col sm:flex-row">
                <Link
                  to="/catalogo"
                  className="flex-1 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold text-center border border-white/10 hover:border-purple-500/50"
                >
                  ← Continuar Comprando
                </Link>
                <button
                  onClick={clearCart}
                  className="flex-1 px-6 py-3 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/40 transition-all duration-300 font-semibold border border-red-500/30 hover:border-red-500/60"
                >
                  🗑️ Limpar Carrinho
                </button>
              </div>
            </div>

            {/* Resumo */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-6 sticky top-20 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">📋 Resumo do Pedido</h2>

                {/* Detalhes */}
                <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal:</span>
                    <span className="font-semibold">R$ {getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Frete:</span>
                    <span className="text-green-400 font-semibold">Grátis</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Desconto:</span>
                    <span className="font-semibold">-R$ 0,00</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">Total:</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      R$ {getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Botão Checkout */}
                <button
                  onClick={handleCheckout}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mb-3 text-lg"
                >
                  ✓ Finalizar Compra
                </button>

                {/* Info */}
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 text-xs text-blue-200">
                  <p className="font-semibold mb-2">💡 Informação:</p>
                  <p>Este é um exemplo de demonstração. Nenhuma compra real será processada.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-12 text-center border border-white/10">
            <p className="text-7xl mb-6 animate-bounce">🛒</p>
            <h2 className="text-3xl font-black text-white mb-4">Seu carrinho está vazio</h2>
            <p className="text-white/70 mb-8 text-lg">
              Explore nosso catálogo e adicione produtos ao seu carrinho.
            </p>
            <Link
              to="/catalogo"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ir para o Catálogo →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
