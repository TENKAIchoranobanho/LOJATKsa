import React from 'react';
import { Link } from 'react-router-dom';
import { useStock } from '../utils/useStock';
import { ProductCard } from '../components/ProductCard';
import { categories } from '../services/mockData';

/**
 * Página inicial - Design Moderno
 * Hero section, categorias e destaques com novo design
 */
export const Home = () => {
  const { products } = useStock();
  const highlights = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Embalagens de <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Qualidade</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Encontre as melhores soluções de embalagem para seu negócio. 
                Desde caixas de papelão até embalagens especializadas.
              </p>
              <Link
                to="/catalogo"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
              >
                Explorar Catálogo →
              </Link>
            </div>
            <div className="text-center">
              <div className="text-9xl md:text-[150px] animate-bounce">📦</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-white">
            Nossas <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Categorias</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/catalogo?categoria=${encodeURIComponent(category)}`}
                className="group p-6 bg-white/10 backdrop-blur-xl rounded-xl hover:bg-white/20 transition-all duration-300 text-center border border-white/10 hover:border-purple-500/50 transform hover:scale-105"
              >
                <div className="text-5xl mb-3 transform group-hover:scale-125 transition-transform duration-300">
                  {category === 'Caixas de Papelão' && '📦'}
                  {category === 'Sacolas' && '🛍️'}
                  {category === 'Embalagens Plásticas' && '🎁'}
                  {category === 'Embalagens para Alimentos' && '🍱'}
                  {category === 'Acessórios' && '🔧'}
                </div>
                <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques de Produtos */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-white">
            Produtos em <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Destaque</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/catalogo"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver Todos os Produtos →
            </Link>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-white">
            Por que escolher <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">a gente?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefício 1 */}
            <div className="p-8 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 text-center group">
              <div className="text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-300">✅</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Qualidade Garantida</h3>
              <p className="text-white/70">
                Todos os nossos produtos passam por rigoroso controle de qualidade.
              </p>
            </div>

            {/* Benefício 2 */}
            <div className="p-8 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 text-center group">
              <div className="text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-300">🚚</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Entrega Rápida</h3>
              <p className="text-white/70">
                Despachamos seus pedidos em até 24 horas úteis.
              </p>
            </div>

            {/* Benefício 3 */}
            <div className="p-8 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 text-center group">
              <div className="text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-300">💰</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Preços Competitivos</h3>
              <p className="text-white/70">
                Oferecemos os melhores preços do mercado com qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
            Pronto para começar?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Explore nosso catálogo completo e encontre exatamente o que você precisa para seu negócio.
          </p>
          <Link
            to="/catalogo"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
          >
            Acessar Catálogo Completo →
          </Link>
        </div>
      </section>
    </div>
  );
};
