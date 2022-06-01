type RatingStarProps = { rating: number; star: number };

export default function RatingStar({ rating, star }: RatingStarProps) {
  return (
    <span>
      <i
        className={
          rating >= star
            ? 'fas fa-star'
            : rating >= star - 0.5
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
        }
      ></i>
    </span>
  );
}
