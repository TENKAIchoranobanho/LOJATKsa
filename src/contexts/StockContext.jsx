import React, { createContext, useState, useEffect } from 'react';
import { mockProducts } from '../services/mockData';

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Carregar produtos do localStorage ao montar
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(mockProducts);
      localStorage.setItem('products', JSON.stringify(mockProducts));
    }
  }, []);

  // Salvar produtos no localStorage sempre que mudar
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (productId, updatedData) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, ...updatedData } : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const updateStock = (productId, quantity, type = 'entrada') => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === productId) {
          const newStock = type === 'entrada' ? product.stock + quantity : product.stock - quantity;
          return { ...product, stock: Math.max(0, newStock) };
        }
        return product;
      })
    );
  };

  const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
  };

  const getProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  const searchProducts = (query) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
  };

  const getStatus = (stock) => {
    if (stock === 0) return 'Esgotado';
    if (stock <= 5) return 'Baixo estoque';
    return 'Disponível';
  };

  return (
    <StockContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        getProductById,
        getProductsByCategory,
        searchProducts,
        getStatus,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};
