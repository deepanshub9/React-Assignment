import React from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";

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
    <Box sx={{ maxWidth: 700, margin: "40px auto" }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Fantasy Movie
        </Typography>
        {movie.poster && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Avatar
              src={movie.poster}
              variant="rounded"
              sx={{ width: 120, height: 180, margin: "0 auto" }}
            />
          </Box>
        )}
        <Typography variant="h6">Title: {movie.title}</Typography>
        <Typography>Overview: <span dangerouslySetInnerHTML={{ __html: movie.overview }} /></Typography>
        <Typography>Genres: {movie.genres}</Typography>
        <Typography>Release Date: {movie.releaseDate}</Typography>
        <Typography>Runtime: {movie.runtime} min</Typography>
        <Typography>Production Companies: {movie.productionCompanies}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Cast:</Typography>
        {movie.cast && movie.cast.length > 0 ? (
          movie.cast.map((member: any, idx: number) => (
            <Typography key={idx} sx={{ ml: 2 }}>
              <strong>{member.name}</strong> as <em>{member.role}</em> - {member.description}
            </Typography>
          ))
        ) : (
          <Typography sx={{ ml: 2 }}>No cast members added.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default MyFantasyMovie;