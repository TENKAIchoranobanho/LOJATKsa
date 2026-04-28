import React from 'react';
import { useCart } from '../utils/useCart';
import { useStock } from '../utils/useStock';

/**
 * Componente de card de produto
 * Exibe informações do produto e botão de adicionar ao carrinho
 */
export const ProductCard = ({ product, onEdit, onDelete, isAdmin = false }) => {
  const { addToCart } = useCart();
  const { getStatus } = useStock();
  
  const status = getStatus(product.stock);
  const isAvailable = product.stock > 0;

  const handleAddToCart = () => {
    if (isAvailable) {
      addToCart(product, 1);
      alert('Produto adicionado ao carrinho!');
    }
  };

  return (
    <div className="card overflow-hidden flex flex-col h-full">
      {/* Imagem */}
      <div className="relative overflow-hidden bg-gray-100 h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${
          status === 'Disponível' ? 'bg-green-100 text-green-800' :
          status === 'Baixo estoque' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Detalhes */}
        <div className="text-xs text-gray-500 space-y-1 mb-3 flex-grow">
          <p><strong>Material:</strong> {product.material}</p>
          <p><strong>Tamanho:</strong> {product.size}</p>
          <p><strong>Estoque:</strong> {product.stock} unidades</p>
        </div>

        {/* Preço */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-primary-600">
            R$ {product.price.toFixed(2)}
          </p>
        </div>

        {/* Botões */}
        <div className="flex gap-2 mt-auto">
          {isAdmin ? (
            <>
              <button
                onClick={() => onEdit(product)}
                className="flex-1 px-3 py-2 bg-secondary-600 text-white rounded hover:bg-secondary-700 transition text-sm font-semibold"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm font-semibold"
              >
                Excluir
              </button>
            </>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className={`w-full px-4 py-2 rounded font-semibold transition ${
                isAvailable
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAvailable ? 'Adicionar ao Carrinho' : 'Indisponível'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
