import { useContext } from 'react';
import { StockContext } from '../contexts/StockContext';

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock deve ser usado dentro de um StockProvider');
  }
  return context;
};
