import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const MyFantasyMovie: React.FC = () => {
  const fantasyMovie = localStorage.getItem("fantasyMovie");
  if (!fantasyMovie) {
    return (
      <Box sx={{ maxWidth: 600, margin: "40px auto" }}>
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5">No fantasy movie found. Please create one!</Typography>
        </Paper>
      </Box>
    );
  }
  const movie = JSON.parse(fantasyMovie);

  return (
    <Box sx={{ maxWidth: 600, margin: "40px auto" }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Fantasy Movie
        </Typography>
        <Typography variant="h6">Title: {movie.title}</Typography>
        <Typography>Overview: {movie.overview}</Typography>
        <Typography>Genres: {movie.genres}</Typography>
        <Typography>Release Date: {movie.releaseDate}</Typography>
        <Typography>Runtime: {movie.runtime} min</Typography>
        <Typography>Production Companies: {movie.productionCompanies}</Typography>
      </Paper>
    </Box>
  );
};

export default MyFantasyMovie;