import axios from 'axios';
import { createContext, ReactNode, useReducer } from 'react';
import Cart from '../interfaces/Cart';
import CartItem from '../interfaces/CartItem';
import Product from '../interfaces/Product';

type State = { cart: Cart };

type Action = {
  type: 'CART_ADD_OR_UPDATE_ITEM' | 'CART_REMOVE_ITEM';
  payload: CartItem;
};

type Context = {
  state: State;
  addOrUpdateCartItemHandler: (
    product: Product,
    quantity: number
  ) => Promise<void>;
  removeCartItemHandler: (item: CartItem) => void;
};

const Store = createContext<Context>(undefined!);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CART_ADD_OR_UPDATE_ITEM': {
      const cartItems = state.cart.cartItems;
      const existItemIndex = cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      let newCartItems: typeof cartItems;
      if (existItemIndex === -1) {
        newCartItems = [...cartItems, action.payload];
      } else {
        newCartItems = Array.from(cartItems);
        newCartItems[existItemIndex] = action.payload;
      }
      setLocalCartItems(newCartItems);
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const newCartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      setLocalCartItems(newCartItems);
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
    }
  }
};

const getLocalCartItems = () => {
  const item = localStorage.getItem('cartItems');
  return item ? item : '[]';
};

const setLocalCartItems = (items: CartItem[]) =>
  localStorage.setItem('cartItems', JSON.stringify(items));

const initialState: State = {
  cart: { cartItems: JSON.parse(getLocalCartItems()) },
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addOrUpdateCartItemHandler = async (
    product: Product,
    quantity: number
  ) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_OR_UPDATE_ITEM',
      payload: { ...product, quantity },
    });
  };

  const removeCartItemHandler = (item: CartItem) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const value = { state, addOrUpdateCartItemHandler, removeCartItemHandler };

  return <Store.Provider value={value}>{children}</Store.Provider>;
}

export default Store;
