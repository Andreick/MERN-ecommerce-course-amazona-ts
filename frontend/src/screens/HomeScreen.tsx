import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import logger from 'use-reducer-logger';
import Product from '../interfaces/Product';

const initialState = {
  products: Array<Product>(),
  loading: false,
  error: '',
};

type FetchProductsAction =
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_FAIL'; payload: string };

const reducer = (state: typeof initialState, action: FetchProductsAction) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
  }
};

export default function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(
    logger(reducer),
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        if (err instanceof Error) {
          dispatch({ type: 'FETCH_FAIL', payload: err.message });
        } else {
          console.error(err);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error...</div>
        ) : (
          products.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/products/${product.slug}`}>
                <img src={product.image} alt={product.name}></img>
              </Link>
              <div className="product-info">
                <Link to={`/products/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
