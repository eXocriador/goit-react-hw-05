import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiKey = "3e69c55c42c8091004bf2a91be7b915b";
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    axios
      .get(url)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((err) => {
        setError("Error fetching movies");
        console.error(err);
      });
  }, []);

  return (
    <div className="homePage">
      <h1 className="title">Popular Movies</h1>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
