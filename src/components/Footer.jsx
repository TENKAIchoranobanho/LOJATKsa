import React from 'react';

/**
 * Componente de rodapé
 * Exibe informações da empresa e links úteis
 */
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Sobre */}
          <div>
            <h3 className="text-white font-bold mb-4">Sobre Nós</h3>
            <p className="text-sm">
              Somos uma loja especializada em embalagens de qualidade para diversos segmentos.
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-white font-bold mb-4">Categorias</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">Caixas de Papelão</a></li>
              <li><a href="#" className="hover:text-white transition">Sacolas</a></li>
              <li><a href="#" className="hover:text-white transition">Embalagens Plásticas</a></li>
              <li><a href="#" className="hover:text-white transition">Para Alimentos</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-bold mb-4">Contato</h3>
            <ul className="text-sm space-y-2">
              <li>📧 contato@lojaembalagens.com.br</li>
              <li>📞 (11) 3000-0000</li>
              <li>📍 São Paulo, SP</li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-white font-bold mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">Facebook</a>
              <a href="#" className="hover:text-white transition">Instagram</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2024 Loja de Embalagens. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
