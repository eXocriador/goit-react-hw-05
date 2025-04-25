import { useEffect, useRef, useState, Suspense } from "react";
import { useParams, useLocation, NavLink, Outlet } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=3e69c55c42c8091004bf2a91be7b915b&language=en-US`
        );

        if (!res.ok) throw new Error("Failed to fetch movie details");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>Loading...</p>;

  const { title, overview, poster_path, genres, vote_average } = movie;

  return (
    <div className={css.wrapper}>
      <NavLink to={backLinkRef.current} className={css.backBtn}>
        ⬅ Go back
      </NavLink>

      <div className={css.detailsContainer}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
          }
          alt={title}
          className={css.poster}
        />
        <div className={css.info}>
          <h2>{title}</h2>
          <p>User score: {vote_average}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((g) => g.name).join(", ")}</p>
        </div>
      </div>

      <div className={css.links}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <NavLink to="cast" state={{ from: backLinkRef.current }}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={{ from: backLinkRef.current }}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Suspense fallback={<p>Loading subpage...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
