import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStock } from '../utils/useStock';
import { ProductCard } from '../components/ProductCard';
import { categories, materials } from '../services/mockData';

/**
 * Página de Catálogo - Design Moderno
 * Produtos com filtros, busca e paginação
 */
export const Catalog = () => {
  const { products } = useStock();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('categoria') || ''
  );
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesMaterial = !selectedMaterial || product.material === selectedMaterial;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesMaterial && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, selectedMaterial, priceRange]);

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white mb-2">
            Catálogo de <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Produtos</span>
          </h1>
          <p className="text-white/70 text-lg">
            {filteredProducts.length} produtos encontrados
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filtros */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-6 sticky top-20 space-y-6 border border-white/10">
              
              {/* Busca */}
              <div>
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  🔍 Buscar
                </h3>
                <input
                  type="text"
                  placeholder="Nome do produto..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                />
              </div>

              {/* Categorias */}
              <div>
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  📦 Categorias
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={selectedCategory === ''}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-4 h-4 accent-purple-500 cursor-pointer"
                    />
                    <span className="text-white/80 group-hover:text-white transition-colors">Todas</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-4 h-4 accent-purple-500 cursor-pointer"
                      />
                      <span className="text-white/80 group-hover:text-white transition-colors">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Materiais */}
              <div>
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  🎨 Materiais
                </h3>
                <select
                  value={selectedMaterial}
                  onChange={(e) => {
                    setSelectedMaterial(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                >
                  <option value="" className="bg-slate-800">Todos os materiais</option>
                  {materials.map((material) => (
                    <option key={material} value={material} className="bg-slate-800">
                      {material}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preço */}
              <div>
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  💰 Preço
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-white/70">
                      De: <span className="font-bold text-purple-300">R$ {priceRange[0].toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const newMin = Math.min(Number(e.target.value), priceRange[1]);
                        setPriceRange([newMin, priceRange[1]]);
                        setCurrentPage(1);
                      }}
                      className="w-full accent-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-white/70">
                      Até: <span className="font-bold text-blue-300">R$ {priceRange[1].toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const newMax = Math.max(Number(e.target.value), priceRange[0]);
                        setPriceRange([priceRange[0], newMax]);
                        setCurrentPage(1);
                      }}
                      className="w-full accent-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Limpar Filtros */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                  setSelectedMaterial('');
                  setPriceRange([0, 100]);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white rounded-lg hover:from-purple-600/40 hover:to-blue-600/40 transition-all duration-300 font-semibold border border-purple-500/30 hover:border-purple-500/60"
              >
                🔄 Limpar Filtros
              </button>
            </div>
          </div>

          {/* Produtos */}
          <div className="lg:col-span-3">
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Paginação */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-12 flex-wrap">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      ← Anterior
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                            : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      Próxima →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10">
                <p className="text-6xl mb-4">😔</p>
                <p className="text-2xl text-white font-bold mb-2">Nenhum produto encontrado</p>
                <p className="text-white/70">Tente ajustar seus filtros para encontrar o que procura</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
