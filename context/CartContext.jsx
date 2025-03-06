import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // Load cart from local storage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Calculate subtotal whenever cart updates
  useEffect(() => {
    const newSubtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  }, [cart]);

  // Function to add product to cart (only one item at a time)
  const addToCart = (product) => {
    const newCart = [{ ...product, quantity: 1 }]; // Replace with new item
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Function to remove product from cart
  const removeFromCart = (_id) => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        setSubtotal,
        addToCart,
        removeFromCart,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
