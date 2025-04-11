import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { MovieDetailsProps } from "../../types/interfaces";

const styles = {
  chipSet: { display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", listStyle: "none", padding: 1.5, margin: 0 },
  chipLabel: { margin: 0.5 },
};

const MovieDetails: React.FC<MovieDetailsProps> = (movie) => {
  return (
    <>
      <Typography variant="h5" component="h3">Overview</Typography>
      <Typography variant="h6" component="p">{movie.overview}</Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li><Chip label="Genres" sx={styles.chipLabel} color="primary" /></li>
        {movie.genres.map((g) => (
          <li key={g.name}><Chip label={g.name} /></li>
        ))}
      </Paper>

      <Paper component="ul" sx={styles.chipSet}>
        <li><Chip label="Production Countries" sx={styles.chipLabel} color="primary" /></li>
        {movie.production_countries.map((country) => (
          <li key={country.iso_3166_1}><Chip label={country.name} /></li>
        ))}
      </Paper>
    </>
  );
};

export default MovieDetails;
