import { createContext, ReactNode, useReducer } from 'react';
import Cart from '../interfaces/Cart';
import CartItem from '../interfaces/CartItem';

type State = { cart: Cart };

type Action = { type: 'CART_ADD_ITEM'; payload: CartItem };

const initialState: State = { cart: { cartItems: [] } };

const Store = createContext<{ state: State; dispatch: React.Dispatch<Action> }>(
  { state: initialState, dispatch: () => {} }
);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const cartItems = state.cart.cartItems;
      const existItemIndex = cartItems.findIndex(
        (item) => item._id === newItem._id
      );
      let newCartItems: typeof cartItems;
      if (existItemIndex === -1) {
        newCartItems = [...cartItems, newItem];
      } else {
        newCartItems = Array.from(cartItems);
        newCartItems[existItemIndex] = newItem;
      }
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}

export default Store;
