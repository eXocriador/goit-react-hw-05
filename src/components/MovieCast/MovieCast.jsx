import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=3e69c55c42c8091004bf2a91be7b915b`
        );
        if (!res.ok) throw new Error("Failed to fetch cast");
        const data = await res.json();
        setCast(data.cast);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCast();
  }, [movieId]);

  if (error) return <p>Error: {error}</p>;
  if (!cast.length) return <p>No cast available.</p>;

  return (
    <div className={css.castList}>
      {cast.map((actor) => (
        <div key={actor.id} className={css.actorCard}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png"
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

export default MovieCast;
