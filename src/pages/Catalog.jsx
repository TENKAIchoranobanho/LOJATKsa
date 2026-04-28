import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStock } from '../utils/useStock';
import { ProductCard } from '../components/ProductCard';
import { categories, materials } from '../services/mockData';

/**
 * Página de Catálogo de Produtos
 * Exibe produtos com filtros, busca e paginação
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Catálogo de Produtos</h1>
          <p className="text-gray-600">
            {filteredProducts.length} produtos encontrados
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filtros */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20 space-y-6">
              {/* Busca */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Buscar</h3>
                <input
                  type="text"
                  placeholder="Nome do produto..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="input-field"
                />
              </div>

              {/* Categorias */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Categorias</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={selectedCategory === ''}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">Todas</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Materiais */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Materiais</h3>
                <select
                  value={selectedMaterial}
                  onChange={(e) => {
                    setSelectedMaterial(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="input-field"
                >
                  <option value="">Todos os materiais</option>
                  {materials.map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preço */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Preço</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">
                      De: R$ {priceRange[0].toFixed(2)}
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
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Até: R$ {priceRange[1].toFixed(2)}
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
                      className="w-full"
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
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-semibold"
              >
                Limpar Filtros
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
                  <div className="flex justify-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded ${
                          currentPage === page
                            ? 'bg-primary-600 text-white'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Próxima
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-2xl text-gray-500">😔</p>
                <p className="text-xl text-gray-600 mt-4">Nenhum produto encontrado</p>
                <p className="text-gray-500 mt-2">Tente ajustar seus filtros</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
