import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProductComponent from '../components/Product';
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
    reducer,
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
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error...</div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <ProductComponent product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
