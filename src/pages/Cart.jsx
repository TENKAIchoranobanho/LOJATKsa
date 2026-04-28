import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../utils/useCart';

/**
 * Página do Carrinho de Compras
 * Exibe itens do carrinho, permite editar quantidades e finalizar compra
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Carrinho de Compras</h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Itens do Carrinho */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 p-6 flex gap-6 hover:bg-gray-50 transition"
                  >
                    {/* Imagem */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Detalhes */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {item.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Material:</strong> {item.material}
                      </p>
                    </div>

                    {/* Preço e Quantidade */}
                    <div className="text-right flex flex-col justify-between">
                      <div>
                        <p className="text-2xl font-bold text-primary-600">
                          R$ {item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Controles de Quantidade */}
                      <div className="flex items-center gap-2 justify-end mt-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 bg-gray-100 rounded min-w-[50px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Remover */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-semibold mt-3"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ações */}
              <div className="mt-6 flex gap-4">
                <Link
                  to="/catalogo"
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold text-center"
                >
                  Continuar Comprando
                </Link>
                <button
                  onClick={clearCart}
                  className="flex-1 px-6 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-semibold"
                >
                  Limpar Carrinho
                </button>
              </div>
            </div>

            {/* Resumo */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumo do Pedido</h2>

                {/* Detalhes */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>R$ {getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Frete:</span>
                    <span className="text-green-600 font-semibold">Grátis</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Desconto:</span>
                    <span>-R$ 0,00</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total:</span>
                    <span className="text-3xl font-bold text-primary-600">
                      R$ {getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Botão Checkout */}
                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary py-3 text-lg mb-3"
                >
                  Finalizar Compra
                </button>

                {/* Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-800">
                  <p className="font-semibold mb-2">💡 Informação:</p>
                  <p>Este é um exemplo de demonstração. Nenhuma compra real será processada.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-5xl mb-4">🛒</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-8">
              Explore nosso catálogo e adicione produtos ao seu carrinho.
            </p>
            <Link
              to="/catalogo"
              className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Ir para o Catálogo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
