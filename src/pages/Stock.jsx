import React, { useState, useMemo } from 'react';
import { useStock } from '../utils/useStock';
import { categories } from '../services/mockData';

/**
 * Página de Gerenciamento de Estoque (Admin) - Design Moderno
 * Adicionar, editar, deletar e gerenciar estoque de produtos
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 flex justify-between items-center flex-col sm:flex-row gap-6">
          <div>
            <h1 className="text-5xl font-black text-white mb-2">
              ⚙️ Gerenciamento de <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Estoque</span>
            </h1>
            <p className="text-white/70 text-lg">
              Total de produtos: <span className="font-bold text-purple-300">{products.length}</span>
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            + Novo Produto
          </button>
        </div>

        {/* Formulário de Produto */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-8 mb-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingProduct ? '✎ Editar Produto' : '➕ Adicionar Novo Produto'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Caixa de Papelão"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Categoria *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                  >
                    <option value="" className="bg-slate-800">Selecione uma categoria</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-800">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descrição do produto"
                    rows="3"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Preço (R$) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Quantidade em Estoque *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Material
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    placeholder="Ex: Papelão Ondulado"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Tamanho
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    placeholder="Ex: 20x15x10 cm"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Peso
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Ex: 200g"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    URL da Imagem
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-bold"
                >
                  {editingProduct ? '✓ Atualizar' : '➕ Adicionar'} Produto
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-bold border border-white/20"
                >
                  ✕ Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-6 mb-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                🔍 Buscar Produto
              </label>
              <input
                type="text"
                placeholder="Nome ou descrição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                📦 Filtrar por Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
              >
                <option value="" className="bg-slate-800">Todas as categorias</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-800">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                ⚙️ Ações
              </label>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
                className="w-full px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-bold border border-white/20"
              >
                🔄 Limpar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Tabela de Produtos */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/10">
          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Produto</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Categoria</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Preço</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Estoque</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-white">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    let status = 'Disponível';
                    let statusColor = 'bg-green-500/20 text-green-300 border border-green-500/30';

                    if (product.stock === 0) {
                      status = 'Esgotado';
                      statusColor = 'bg-red-500/20 text-red-300 border border-red-500/30';
                    } else if (product.stock <= 5) {
                      status = 'Baixo estoque';
                      statusColor = 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
                    }

                    return (
                      <tr key={product.id} className="border-b border-white/10 hover:bg-white/10 transition-all duration-300">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover border border-white/10"
                            />
                            <div>
                              <p className="font-bold text-white">{product.name}</p>
                              <p className="text-xs text-white/60">{product.material}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white/80">{product.category}</td>
                        <td className="px-6 py-4 font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          R$ {product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-white">{product.stock}</span>
                          <p className="text-xs text-white/60">unidades</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => setShowStockForm(product.id)}
                              className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/40 transition-all duration-300 font-bold border border-blue-500/30"
                              title="Gerenciar estoque"
                            >
                              📦
                            </button>
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/40 transition-all duration-300 font-bold border border-purple-500/30"
                            >
                              ✎
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="px-3 py-1 text-xs bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/40 transition-all duration-300 font-bold border border-red-500/30"
                            >
                              🗑️
                            </button>
                          </div>

                          {/* Modal de Gerenciamento de Estoque */}
                          {showStockForm === product.id && (
                            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
                              <div className="bg-slate-800 rounded-xl p-6 max-w-sm w-full mx-4 border border-white/10 shadow-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">
                                  📦 Gerenciar Estoque
                                </h3>
                                <p className="text-white/80 mb-2">
                                  Produto: <strong className="text-purple-300">{product.name}</strong>
                                </p>
                                <p className="text-white/80 mb-6">
                                  Estoque atual: <strong className="text-blue-300">{product.stock} unidades</strong>
                                </p>

                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-bold text-white/90 mb-2">
                                      Tipo
                                    </label>
                                    <select
                                      value={stockChange.type}
                                      onChange={(e) =>
                                        setStockChange({ ...stockChange, type: e.target.value })
                                      }
                                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                                    >
                                      <option value="entrada" className="bg-slate-800">➕ Entrada (Adicionar)</option>
                                      <option value="saida" className="bg-slate-800">➖ Saída (Remover)</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-bold text-white/90 mb-2">
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
                                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                                    />
                                  </div>

                                  <div className="flex gap-3 pt-4">
                                    <button
                                      onClick={() => handleStockChange(product.id)}
                                      className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-bold"
                                    >
                                      ✓ Confirmar
                                    </button>
                                    <button
                                      onClick={() => {
                                        setShowStockForm(null);
                                        setStockChange({ quantity: 0, type: 'entrada' });
                                      }}
                                      className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-bold border border-white/20"
                                    >
                                      ✕ Cancelar
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
            <div className="text-center py-16">
              <p className="text-6xl mb-4">😔</p>
              <p className="text-2xl text-white font-bold mb-2">Nenhum produto encontrado</p>
              <p className="text-white/70">Tente ajustar seus filtros</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
