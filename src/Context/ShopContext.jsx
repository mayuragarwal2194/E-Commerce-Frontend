import React, { createContext, useState, useEffect } from 'react';
import { getAllProducts } from '../services/api';

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setAllProducts(products);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  const getDefaultCart = (products) => {
    let cart = {};
    products.forEach(product => {
      cart[product.id] = 0;
    });
    return cart;
  };

  useEffect(() => {
    if (allProducts.length > 0) {
      setCartItems(getDefaultCart(allProducts));
    }
  }, [allProducts]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      }
    });
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId];
      return newCart;
    });
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, num) => total + num, 0);
  };

  const contextValue = {
    allProducts,
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getTotalCartItems
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;