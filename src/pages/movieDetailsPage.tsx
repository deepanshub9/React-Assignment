import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getSimilarMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MovieDetailsProps, BaseMovieProps } from "../types/interfaces";
import MovieList from "../components/movieList";
import Button from "@mui/material/Button"; // ✅ Import Button

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    () => getMovie(id || "")
  );

  const { data: similarMovies, isLoading: isSimilarLoading } = useQuery<{ results: BaseMovieProps[] }, Error>(
    ["similarMovies", id],
    () => getSimilarMovies(id || "")
  );

  if (isLoading || isSimilarLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails {...movie} />
          </PageTemplate>
          <div style={{ marginTop: "20px", padding: "20px" }}>
            <h2>Similar Movies</h2>
            {similarMovies?.results.length ? (
              <MovieList
                movies={similarMovies.results}
                action={() => (
                  <Button variant="outlined" size="small" color="primary">
                    More Info
                  </Button>
                )}
              />
            ) : (
              <p>No similar movies found.</p>
            )}
          </div>
        </>
      ) : (
        <p>Waiting for movie details...</p>
      )}
    </>
  );
};

export default MovieDetailsPage;