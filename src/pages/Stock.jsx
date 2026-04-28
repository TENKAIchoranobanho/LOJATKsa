import React, { useState, useMemo } from 'react';
import { useStock } from '../utils/useStock';
import { ProductCard } from '../components/ProductCard';
import { categories } from '../services/mockData';

/**
 * Página de Gerenciamento de Estoque (Admin)
 * Permite adicionar, editar, deletar e gerenciar estoque de produtos
 */
export const Stock = () => {
  const { products, addProduct, updateProduct, deleteProduct, updateStock, searchProducts } = useStock();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showStockForm, setShowStockForm] = useState(null);
  const [stockChange, setStockChange] = useState({ quantity: 0, type: 'entrada' });

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    material: '',
    size: '',
    weight: '',
    image: 'https://via.placeholder.com/300x300?text=Produto',
  });

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    return result;
  }, [products, searchQuery, selectedCategory, searchProducts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      alert('Produto atualizado com sucesso!');
    } else {
      addProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      alert('Produto adicionado com sucesso!');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      price: '',
      stock: '',
      material: '',
      size: '',
      weight: '',
      image: 'https://via.placeholder.com/300x300?text=Produto',
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      deleteProduct(productId);
      alert('Produto deletado com sucesso!');
    }
  };

  const handleStockChange = (productId) => {
    if (stockChange.quantity <= 0) {
      alert('Digite uma quantidade válida');
      return;
    }

    updateStock(productId, stockChange.quantity, stockChange.type);
    alert('Estoque atualizado com sucesso!');
    setShowStockForm(null);
    setStockChange({ quantity: 0, type: 'entrada' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Gerenciamento de Estoque</h1>
            <p className="text-gray-600">
              Total de produtos: {products.length}
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            + Novo Produto
          </button>
        </div>

        {/* Formulário de Produto */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Caixa de Papelão"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Categoria *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descrição do produto"
                    rows="3"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preço (R$) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantidade em Estoque *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Material
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    placeholder="Ex: Papelão Ondulado"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tamanho
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    placeholder="Ex: 20x15x10 cm"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Peso
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Ex: 200g"
                    className="input-field"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL da Imagem
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
                >
                  {editingProduct ? 'Atualizar' : 'Adicionar'} Produto
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Buscar Produto
              </label>
              <input
                type="text"
                placeholder="Nome ou descrição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filtrar por Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                <option value="">Todas as categorias</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ações
              </label>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-semibold"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Tabela de Produtos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Produto
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Preço
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Estoque
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    let status = 'Disponível';
                    let statusColor = 'bg-green-100 text-green-800';

                    if (product.stock === 0) {
                      status = 'Esgotado';
                      statusColor = 'bg-red-100 text-red-800';
                    } else if (product.stock <= 5) {
                      status = 'Baixo estoque';
                      statusColor = 'bg-yellow-100 text-yellow-800';
                    }

                    return (
                      <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <div>
                              <p className="font-semibold text-gray-800">{product.name}</p>
                              <p className="text-xs text-gray-500">{product.material}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{product.category}</td>
                        <td className="px-6 py-4 font-bold text-primary-600">
                          R$ {product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-800">{product.stock}</span>
                          <p className="text-xs text-gray-500">unidades</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => setShowStockForm(product.id)}
                              className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition font-semibold"
                              title="Gerenciar estoque"
                            >
                              📦
                            </button>
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="px-3 py-1 text-xs bg-secondary-100 text-secondary-600 rounded hover:bg-secondary-200 transition font-semibold"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition font-semibold"
                            >
                              Deletar
                            </button>
                          </div>

                          {/* Modal de Gerenciamento de Estoque */}
                          {showStockForm === product.id && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                              <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                  Gerenciar Estoque
                                </h3>
                                <p className="text-gray-600 mb-4">
                                  Produto: <strong>{product.name}</strong>
                                </p>
                                <p className="text-gray-600 mb-6">
                                  Estoque atual: <strong>{product.stock} unidades</strong>
                                </p>

                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                      Tipo
                                    </label>
                                    <select
                                      value={stockChange.type}
                                      onChange={(e) =>
                                        setStockChange({ ...stockChange, type: e.target.value })
                                      }
                                      className="input-field"
                                    >
                                      <option value="entrada">Entrada (Adicionar)</option>
                                      <option value="saida">Saída (Remover)</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                      Quantidade
                                    </label>
                                    <input
                                      type="number"
                                      value={stockChange.quantity}
                                      onChange={(e) =>
                                        setStockChange({
                                          ...stockChange,
                                          quantity: parseInt(e.target.value) || 0,
                                        })
                                      }
                                      placeholder="0"
                                      className="input-field"
                                    />
                                  </div>

                                  <div className="flex gap-3 pt-4">
                                    <button
                                      onClick={() => handleStockChange(product.id)}
                                      className="flex-1 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition font-semibold"
                                    >
                                      Confirmar
                                    </button>
                                    <button
                                      onClick={() => {
                                        setShowStockForm(null);
                                        setStockChange({ quantity: 0, type: 'entrada' });
                                      }}
                                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-semibold"
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-500">😔</p>
              <p className="text-xl text-gray-600 mt-4">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
