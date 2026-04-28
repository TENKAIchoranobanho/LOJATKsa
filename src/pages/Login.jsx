import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';

/**
 * Página de Login e Cadastro
 * Permite que usuários façam login ou se registrem
 */
export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validações básicas
    if (!email || !password) {
      setError('Email e senha são obrigatórios');
      return;
    }

    if (!isLogin && !name) {
      setError('Nome é obrigatório para cadastro');
      return;
    }

    // Verificar senha de admin
    if (isAdmin && adminPassword !== 'admin123') {
      setError('Senha de administrador incorreta');
      return;
    }

    try {
      if (isLogin) {
        login(email, password, isAdmin);
      } else {
        register(email, password, name);
      }

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      }

      navigate(isAdmin ? '/estoque' : '/');
    } catch (err) {
      setError('Erro ao processar requisição');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-8 text-white text-center">
            <div className="text-5xl mb-3">📦</div>
            <h1 className="text-3xl font-bold">Loja de Embalagens</h1>
            <p className="text-primary-100 mt-2">
              {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Nome (apenas cadastro) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="Seu nome"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="seu@email.com"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            {/* Modo Admin */}
            {isLogin && (
              <>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="adminMode"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  <label htmlFor="adminMode" className="text-sm text-gray-700">
                    Entrar como Administrador
                  </label>
                </div>

                {/* Senha Admin */}
                {isAdmin && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Senha de Administrador
                    </label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="input-field"
                      placeholder="Senha admin"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Dica: use "admin123"
                    </p>
                  </div>
                )}

                {/* Lembrar-me */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-700">
                    Lembrar-me
                  </label>
                </div>
              </>
            )}

            {/* Botão Submit */}
            <button
              type="submit"
              className="w-full btn-primary py-3 mt-6 text-lg"
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>

            {/* Alternância Login/Cadastro */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setAdminPassword('');
                    setIsAdmin(false);
                  }}
                  className="text-primary-600 font-semibold hover:underline"
                >
                  {isLogin ? 'Cadastre-se' : 'Faça login'}
                </button>
              </p>
            </div>
          </form>

          {/* Dicas */}
          <div className="bg-blue-50 px-6 py-4 border-t border-blue-200">
            <p className="text-xs text-blue-800 font-semibold mb-2">💡 Dicas para testar:</p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Qualquer email/senha funciona para cliente</li>
              <li>• Admin: marque a opção e use "admin123"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
