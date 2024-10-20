import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const updatedCartAdd = [...state.cartItems, { ...action.payload, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartAdd));
      return { ...state, cartItems: updatedCartAdd };

    case 'REMOVE_FROM_CART':
      const updatedCartRemove = state.cartItems.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartRemove));
      return { ...state, cartItems: updatedCartRemove };

    case 'INCREMENT_QUANTITY':
      const updatedCartInc = state.cartItems.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCartInc));
      return { ...state, cartItems: updatedCartInc };

    case 'DECREMENT_QUANTITY':
      const updatedCartDec = state.cartItems.map(item =>
        item.id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCartDec));
      return { ...state, cartItems: updatedCartDec };

    default:
      return state;
  }
}

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => {
  return React.useContext(CartContext);
};
