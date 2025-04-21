import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getPopularMovies } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";

const PopularMoviesPage: React.FC = () => {
  const { data: movies, isLoading, isError } = useQuery(["popularMovies"], getPopularMovies);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching popular movies.</p>;

  return (
    <PageTemplate 
      title="Popular Movies" 
      movies={movies?.results || []} 
      action={(movie: BaseMovieProps) => <span>⭐ {movie.title}</span>} // ✅ Fix: Provide action prop
    />
  );
};

export default PopularMoviesPage;
