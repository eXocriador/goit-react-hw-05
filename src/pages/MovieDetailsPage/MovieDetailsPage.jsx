import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const apiKey = "3e69c55c42c8091004bf2a91be7b915b";

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCast();
    fetchMovieReviews();
  }, [movieId]);

  const fetchMovieDetails = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    );
    const data = await response.json();
    setMovie(data);
  };

  const fetchMovieCast = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
    );
    const data = await response.json();
    setCast(data.cast);
  };

  const fetchMovieReviews = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US`
    );
    const data = await response.json();
    setReviews(data.results);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={css.movieDetails}>
      <h1 className={css.movieTitle}>{movie.title}</h1>
      <p className={css.movieOverview}>{movie.overview}</p>
      <MovieCast cast={cast} />
      <MovieReviews reviews={reviews} />
    </div>
  );
};

export default MovieDetailsPage;
