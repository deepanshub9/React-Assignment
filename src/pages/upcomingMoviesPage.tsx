import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);

  useEffect(() => {
    getUpcomingMovies().then((data) => {
      setMovies(data.results); // ✅ Extract `results` from API response
    });
  }, []);

  return <PageTemplate title="Upcoming Movies" movies={movies} action={(movie) => <span>{movie.title}</span>} />;
};

export default UpcomingMoviesPage;
