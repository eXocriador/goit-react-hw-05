import React from "react";
import PropTypes from "prop-types";
import css from "./MovieCast.module.css";

const MovieCast = ({ cast }) => {
  return (
    <div className={css.castList}>
      {cast.map((actor) => (
        <div key={actor.id} className={css.actorCard}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={actor.name}
            className={css.actorImage}
          />
          <h4 className={css.actorName}>{actor.name}</h4>
          <p className={css.characterName}>{actor.character}</p>
        </div>
      ))}
    </div>
  );
};

MovieCast.propTypes = {
  cast: PropTypes.array.isRequired,
};

export default MovieCast;
