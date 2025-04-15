import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "../movieCard";
import { BaseMovieListProps } from "../../types/interfaces";

const MovieList: React.FC<BaseMovieListProps> = ({ movies, action }) => { 
  console.log("MovieList rendered with movies:", movies); // Debugging log
  return (
    <>
      {movies.map((m) => (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <MovieCard key={m.id} movie={m} action={action} /> {/* Fixed component reference */}
        </Grid>
      ))}
    </>
  );
};

export default MovieList;
