import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (producto) => {
    const itemExistente = items.find(item => 
      item.id === producto.id && 
      JSON.stringify(item.personalizacion) === JSON.stringify(producto.personalizacion)
    );
    
    if (itemExistente) {
      setItems(items.map(item =>
        item === itemExistente
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setItems([...items, { ...producto, cantidad: 1 }]);
    }
  };

  const updateQuantity = (id, personalizacion, nuevaCantidad) => {
    setItems(items.map(item =>
      (item.id === id && JSON.stringify(item.personalizacion) === JSON.stringify(personalizacion))
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ));
  };

  const removeItem = (id, personalizacion) => {
    setItems(items.filter(item => 
      !(item.id === id && JSON.stringify(item.personalizacion) === JSON.stringify(personalizacion))
    ));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.cantidad, 0);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      getItemCount,
      getTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}