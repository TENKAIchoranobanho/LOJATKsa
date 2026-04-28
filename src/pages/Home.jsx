import React from 'react';
import { Link } from 'react-router-dom';
import { useStock } from '../utils/useStock';
import { ProductCard } from '../components/ProductCard';
import { categories } from '../services/mockData';

/**
 * Página inicial da loja
 * Exibe hero section, destaques e categorias
 */
export const Home = () => {
  const { products } = useStock();

  // Pegar os 6 produtos mais vendidos (simulado)
  const highlights = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Embalagens de Qualidade
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Encontre as melhores soluções de embalagem para seu negócio. 
                Desde caixas de papelão até embalagens especializadas.
              </p>
              <Link
                to="/catalogo"
                className="inline-block px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transition text-lg"
              >
                Explorar Catálogo
              </Link>
            </div>
            <div className="text-center">
              <div className="text-9xl">📦</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Nossas Categorias
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/catalogo?categoria=${encodeURIComponent(category)}`}
                className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:shadow-lg transition text-center"
              >
                <div className="text-4xl mb-3">
                  {category === 'Caixas de Papelão' && '📦'}
                  {category === 'Sacolas' && '🛍️'}
                  {category === 'Embalagens Plásticas' && '🎁'}
                  {category === 'Embalagens para Alimentos' && '🍱'}
                  {category === 'Acessórios' && '🔧'}
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques de Produtos */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Produtos em Destaque
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/catalogo"
              className="inline-block px-8 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition"
            >
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Por que escolher a gente?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-3">Qualidade Garantida</h3>
              <p className="text-gray-600">
                Todos os nossos produtos passam por rigoroso controle de qualidade.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-3">Entrega Rápida</h3>
              <p className="text-gray-600">
                Despachamos seus pedidos em até 24 horas úteis.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">Preços Competitivos</h3>
              <p className="text-gray-600">
                Oferecemos os melhores preços do mercado com qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Explore nosso catálogo completo e encontre exatamente o que você precisa.
          </p>
          <Link
            to="/catalogo"
            className="inline-block px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transition text-lg"
          >
            Acessar Catálogo
          </Link>
        </div>
      </section>
    </div>
  );
};
