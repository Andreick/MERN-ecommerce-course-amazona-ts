import RatingStar from './RatingStar';

type RatingProps = { rating: number; numReviews: number };

export default function Rating({ rating, numReviews }: RatingProps) {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <RatingStar rating={rating} star={star} />
      ))}
      <span> {numReviews} reviews</span>
    </div>
  );
}
