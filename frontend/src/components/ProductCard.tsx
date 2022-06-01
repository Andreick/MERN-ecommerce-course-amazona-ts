import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from '../interfaces/Product';
import Rating from './Rating';

type ProductProps = { product: Product };

export default function ProductCard({ product }: ProductProps) {
  return (
    <Card>
      <Link to={`/products/${product.slug}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
        ></img>
      </Link>
      <Card.Body>
        <Link to={`/products/${product.slug}`}>
          <p>{product.name}</p>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        <Button>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}
