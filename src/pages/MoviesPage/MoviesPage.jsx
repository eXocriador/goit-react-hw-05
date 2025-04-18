import React, { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false); // Додаємо стан для перевірки пошуку

  const handleSearch = async (event) => {
    event.preventDefault();

    if (query.trim() === "") {
      setError("Please enter a search term.");
      return;
    }

    setIsLoading(true);
    setError("");
    setIsSearched(true); // Встановлюємо, що пошук виконано

    const apiKey = "3e69c55c42c8091004bf2a91be7b915b";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;

      if (results.length === 0) {
        setError("No movies found.");
      }

      setMovies(results);
    } catch (err) {
      console.error("Error fetching searched movies:", err);
      setError("Could not fetch movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.moviesPage}>
      <form className={css.searchForm} onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
      {error && <p className={css.error}>{error}</p>}
      {isSearched && !isLoading && movies.length === 0 && !error && (
        <p className={css.error}>No movies found.</p>
      )}
      <MovieList movies={movies} isLoading={isLoading} />
    </div>
  );
};

export default MoviesPage;
