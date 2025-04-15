import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage: React.FC = () => {
  const { data: movies, error, isLoading, isError } = useQuery(
    ["upcomingMovies"],
    getUpcomingMovies
  );

  if (isLoading) {
    return <p>Loading upcoming movies...</p>;
  }

  if (isError) {
    return <h1>Error fetching upcoming movies: {error?.message}</h1>;
  }

  return <PageTemplate title="Upcoming Movies" movies={movies?.results || []} />;
};

export default UpcomingMoviesPage;
