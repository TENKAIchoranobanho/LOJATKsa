import React, { useState } from 'react';
import { useAuth } from '../utils/useAuth';

/**
 * Página de Perfil do Usuário
 * Exibe informações do usuário, endereços e histórico de pedidos
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Meu Perfil</h1>
          <p className="text-gray-600">Gerenciar informações pessoais e endereços</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações Pessoais */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Informações Pessoais</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
                  >
                    Editar
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      className="input-field"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition font-semibold"
                    >
                      Salvar
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
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-semibold"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Nome</label>
                    <p className="text-lg text-gray-800 font-semibold">{user?.name}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="text-lg text-gray-800 font-semibold">{user?.email}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Telefone</label>
                    <p className="text-lg text-gray-800 font-semibold">
                      {user?.phone || 'Não informado'}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Membro desde</label>
                    <p className="text-lg text-gray-800 font-semibold">
                      {new Date(user?.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Endereços */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Meus Endereços</h2>
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
                  >
                    + Adicionar Endereço
                  </button>
                )}
              </div>

              {showAddressForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Rua
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={newAddress.street}
                        onChange={handleAddressChange}
                        placeholder="Rua Principal"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Número
                      </label>
                      <input
                        type="text"
                        name="number"
                        value={newAddress.number}
                        onChange={handleAddressChange}
                        placeholder="123"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cidade
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={newAddress.city}
                        onChange={handleAddressChange}
                        placeholder="São Paulo"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Estado
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={newAddress.state}
                        onChange={handleAddressChange}
                        placeholder="SP"
                        className="input-field"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CEP
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={newAddress.zipCode}
                        onChange={handleAddressChange}
                        placeholder="01234-567"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddAddress}
                      className="flex-1 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition font-semibold"
                    >
                      Adicionar
                    </button>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-semibold"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {user?.addresses && user.addresses.length > 0 ? (
                <div className="space-y-4">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-800 font-semibold">
                        {address.street}, {address.number}
                      </p>
                      <p className="text-gray-600">
                        {address.city}, {address.state} - {address.zipCode}
                      </p>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-semibold mt-3"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">
                  Nenhum endereço cadastrado
                </p>
              )}
            </div>
          </div>

          {/* Resumo */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8 sticky top-20">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Resumo da Conta</h2>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Pedidos Realizados</p>
                  <p className="text-3xl font-bold text-primary-600">
                    {user?.orders?.length || 0}
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Endereços Cadastrados</p>
                  <p className="text-3xl font-bold text-green-600">
                    {user?.addresses?.length || 0}
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-lg font-bold text-purple-600">Cliente Regular</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
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
