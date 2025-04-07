import React from "react";
import PropTypes from "prop-types";
import css from "./MovieReviews.module.css";

const MovieReviews = ({ reviews }) => {
  return (
    <div className={css.reviews}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className={css.reviewCard}>
            <h4 className={css.author}>{review.author}</h4>
            <p className={css.content}>{review.content}</p>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

MovieReviews.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default MovieReviews;
