import { createContext, ReactNode, useReducer } from 'react';
import Cart from '../interfaces/Cart';
import Product from '../interfaces/Product';

type State = { cart: Cart };

type Action = { type: 'CART_ADD_ITEM'; payload: Product };

const initialState: State = { cart: { cartItems: [] } };

const Store = createContext<{ state: State; dispatch: React.Dispatch<Action> }>(
  { state: initialState, dispatch: () => {} }
);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}

export default Store;
