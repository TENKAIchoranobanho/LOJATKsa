import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';

/**
 * Página de Login e Cadastro - Design Moderno
 * Interface limpa, profissional e responsiva
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

    if (!email || !password) {
      setError('Email e senha são obrigatórios');
      return;
    }

    if (!isLogin && !name) {
      setError('Nome é obrigatório para cadastro');
      return;
    }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Card Principal */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          
          {/* Header com Gradiente */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 px-8 py-12 text-center relative overflow-hidden">
            {/* Efeito de brilho */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
            
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center shadow-xl border border-white/30 animate-pulse">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-black text-white mb-2 drop-shadow-lg">Loja de Embalagens</h1>
            <p className="text-white/80 text-sm font-medium">
              {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta agora'}
            </p>
          </div>

          {/* Conteúdo */}
          <div className="px-8 py-8">
            
            {/* Abas de Alternância */}
            <div className="flex gap-3 mb-8 bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                  setAdminPassword('');
                  setIsAdmin(false);
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  isLogin
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                  setAdminPassword('');
                  setIsAdmin(false);
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  !isLogin
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Cadastro
              </button>
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl backdrop-blur-sm">
                <p className="text-red-200 text-sm font-medium flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </p>
              </div>
            )}

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Nome (apenas cadastro) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {/* Senha */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {/* Modo Admin */}
              {isLogin && (
                <>
                  <div className="space-y-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl backdrop-blur-sm">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        id="adminMode"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        className="w-5 h-5 rounded cursor-pointer accent-purple-500"
                      />
                      <span className="text-sm font-medium text-white/90">
                        Entrar como Administrador
                      </span>
                    </label>

                    {/* Senha Admin */}
                    {isAdmin && (
                      <div>
                        <label className="block text-sm font-semibold text-white/90 mb-2">
                          Senha de Administrador
                        </label>
                        <input
                          type="password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          placeholder="Senha admin"
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm text-sm"
                        />
                        <p className="text-xs text-white/60 mt-2">💡 Dica: use "admin123"</p>
                      </div>
                    )}
                  </div>

                  {/* Lembrar-me */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-5 h-5 rounded cursor-pointer accent-purple-500"
                    />
                    <span className="text-sm text-white/80">Lembrar-me neste dispositivo</span>
                  </label>
                </>
              )}

              {/* Botão Submit */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-6 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform group-hover:translate-x-full transition-all duration-500"></div>
                <span className="relative">
                  {isLogin ? 'Entrar Agora' : 'Criar Conta'}
                </span>
              </button>

              {/* Alternância Login/Cadastro */}
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-white/70 text-sm">
                  {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError('');
                      setAdminPassword('');
                      setIsAdmin(false);
                    }}
                    className="text-purple-300 font-semibold hover:text-purple-200 transition-colors duration-300"
                  >
                    {isLogin ? 'Cadastre-se' : 'Faça login'}
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Dicas */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-8 py-4 border-t border-white/10 backdrop-blur-sm">
            <p className="text-xs text-white/80 font-semibold mb-2 flex items-center gap-2">
              <span>💡</span>
              Dicas para testar:
            </p>
            <ul className="text-xs text-white/70 space-y-1">
              <li>✓ Qualquer email/senha funciona para cliente</li>
              <li>✓ Admin: marque a opção e use "admin123"</li>
            </ul>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-6 text-white/60 text-xs">
          <p>© 2024 Loja de Embalagens. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};
