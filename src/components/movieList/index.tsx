import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "../movieCard";
import { BaseMovieListProps } from "../../types/interfaces";

const MovieList: React.FC<BaseMovieListProps> = ({ movies, action }) => {
  return (
    <>
      {movies.map((m) => (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <MovieCard key={m.id} movie={m} action={action} />
        </Grid>
      ))}
    </>
  );
};

export default MovieList;