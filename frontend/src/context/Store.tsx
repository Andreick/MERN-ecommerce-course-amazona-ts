import axios from 'axios';
import { createContext, ReactNode, useReducer } from 'react';
import { toast } from 'react-toastify';
import Cart from '../interfaces/Cart';
import CartItem from '../interfaces/CartItem';
import Product from '../interfaces/Product';
import User from '../interfaces/User';
import getError from '../utils/ErrorUtils';

type State = { cart: Cart; user: User | null };

type Action =
  | {
      type: 'CART_ADD_OR_UPDATE_ITEM' | 'CART_REMOVE_ITEM';
      payload: CartItem;
    }
  | { type: 'USER_SIGNIN'; payload: User }
  | { type: 'USER_SIGNOUT' };

type Context = {
  state: State;
  addOrUpdateCartItemHandler: (
    product: Product,
    quantity: number
  ) => Promise<void>;
  removeCartItemHandler: (item: CartItem) => void;
  signInHandler: (
    email: string,
    password: string,
    callback: () => void
  ) => Promise<void>;
  signOutHandler: () => void;
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
    case 'USER_SIGNIN': {
      return { ...state, user: action.payload };
    }
    case 'USER_SIGNOUT': {
      return { ...state, user: null, cart: { cartItems: [] } };
    }
  }
};

const getLocalCartItems = (): CartItem[] =>
  JSON.parse(localStorage.getItem('cartItems') ?? '[]');

const setLocalCartItems = (items: CartItem[]) =>
  localStorage.setItem('cartItems', JSON.stringify(items));

const getLocalUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const initialState: State = {
  cart: { cartItems: getLocalCartItems() },
  user: getLocalUser(),
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addOrUpdateCartItemHandler = async (
    product: Product,
    quantity: number
  ) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error('Sorry. Product is out of stock');
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

  const signInHandler = async (
    email: string,
    password: string,
    callback: () => void
  ) => {
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      dispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('user', JSON.stringify(data));
      callback();
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const signOutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('user');
  };

  const value = {
    state,
    addOrUpdateCartItemHandler,
    removeCartItemHandler,
    signInHandler,
    signOutHandler,
  };

  return <Store.Provider value={value}>{children}</Store.Provider>;
}

export default Store;
