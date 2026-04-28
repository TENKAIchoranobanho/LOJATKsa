import React, { useState } from 'react';
import { useAuth } from '../utils/useAuth';

/**
 * Página de Perfil - Design Moderno
 * Informações pessoais, endereços e resumo da conta
 */
export const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [newAddress, setNewAddress] = useState({
    street: '',
    number: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    updateUser(formData);
    setIsEditing(false);
    alert('Perfil atualizado com sucesso!');
  };

  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.zipCode) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const addresses = user?.addresses || [];
    updateUser({
      addresses: [...addresses, { id: Date.now(), ...newAddress }],
    });

    setNewAddress({
      street: '',
      number: '',
      city: '',
      state: '',
      zipCode: '',
    });
    setShowAddressForm(false);
    alert('Endereço adicionado com sucesso!');
  };

  const handleDeleteAddress = (addressId) => {
    const addresses = user?.addresses?.filter((addr) => addr.id !== addressId) || [];
    updateUser({ addresses });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white mb-2">
            👤 Meu <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Perfil</span>
          </h1>
          <p className="text-white/70 text-lg">Gerenciar informações pessoais e endereços</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Informações Pessoais */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-8 mb-8 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Informações Pessoais</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold"
                  >
                    ✎ Editar
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold"
                    >
                      ✓ Salvar
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user?.name || '',
                          email: user?.email || '',
                          phone: user?.phone || '',
                        });
                      }}
                      className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold border border-white/20"
                    >
                      ✕ Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/60">Nome</label>
                    <p className="text-lg text-white font-semibold">{user?.name}</p>
                  </div>

                  <div>
                    <label className="text-sm text-white/60">Email</label>
                    <p className="text-lg text-white font-semibold">{user?.email}</p>
                  </div>

                  <div>
                    <label className="text-sm text-white/60">Telefone</label>
                    <p className="text-lg text-white font-semibold">
                      {user?.phone || 'Não informado'}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-white/60">Membro desde</label>
                    <p className="text-lg text-white font-semibold">
                      {new Date(user?.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Endereços */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-8 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Meus Endereços</h2>
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold"
                  >
                    + Adicionar Endereço
                  </button>
                )}
              </div>

              {showAddressForm && (
                <div className="bg-white/5 p-6 rounded-lg mb-6 space-y-4 border border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-white/90 mb-2">
                        Rua
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={newAddress.street}
                        onChange={handleAddressChange}
                        placeholder="Rua Principal"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/90 mb-2">
                        Número
                      </label>
                      <input
                        type="text"
                        name="number"
                        value={newAddress.number}
                        onChange={handleAddressChange}
                        placeholder="123"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/90 mb-2">
                        Cidade
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={newAddress.city}
                        onChange={handleAddressChange}
                        placeholder="São Paulo"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/90 mb-2">
                        Estado
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={newAddress.state}
                        onChange={handleAddressChange}
                        placeholder="SP"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-white/90 mb-2">
                        CEP
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={newAddress.zipCode}
                        onChange={handleAddressChange}
                        placeholder="01234-567"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddAddress}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold"
                    >
                      ✓ Adicionar
                    </button>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold border border-white/20"
                    >
                      ✕ Cancelar
                    </button>
                  </div>
                </div>
              )}

              {user?.addresses && user.addresses.length > 0 ? (
                <div className="space-y-4">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="border border-white/10 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <p className="text-white font-semibold">
                        {address.street}, {address.number}
                      </p>
                      <p className="text-white/70">
                        {address.city}, {address.state} - {address.zipCode}
                      </p>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-red-400 hover:text-red-300 text-sm font-semibold mt-3 transition-colors"
                      >
                        🗑️ Remover
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-center py-8">
                  Nenhum endereço cadastrado
                </p>
              )}
            </div>
          </div>

          {/* Resumo */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-8 sticky top-20 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">📊 Resumo da Conta</h2>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30">
                  <p className="text-sm text-white/70">Pedidos Realizados</p>
                  <p className="text-3xl font-black bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    {user?.orders?.length || 0}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg border border-green-500/30">
                  <p className="text-sm text-white/70">Endereços Cadastrados</p>
                  <p className="text-3xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                    {user?.addresses?.length || 0}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30">
                  <p className="text-sm text-white/70">Status</p>
                  <p className="text-lg font-bold text-purple-300">Cliente Regular</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-white/50 text-center">
                  ID da Conta: {user?.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
