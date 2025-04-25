import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=3e69c55c42c8091004bf2a91be7b915b`
        );
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) return <p>Error: {error}</p>;
  if (!reviews.length) return <p>No reviews available.</p>;

  return (
    <ul className={css.reviewList}>
      {reviews.map((review) => (
        <li key={review.id} className={css.reviewItem}>
          <h4>Author: {review.author}</h4>
          <p dangerouslySetInnerHTML={{ __html: review.content }}></p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
