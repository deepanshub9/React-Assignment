import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

interface FantasyMovie {
  title: string;
  overview: string;
  genres: string;
  releaseDate: string;
  runtime: string;
  productionCompanies: string;
}

const FantasyMoviePage: React.FC = () => {
  const [fantasyMovie, setFantasyMovie] = useState<FantasyMovie>({
    title: "",
    overview: "",
    genres: "",
    releaseDate: "",
    runtime: "",
    productionCompanies: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFantasyMovie({ ...fantasyMovie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("fantasyMovie", JSON.stringify(fantasyMovie));
    setSubmitted(true);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "40px auto" }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create Your Fantasy Movie
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={fantasyMovie.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Overview"
            name="overview"
            value={fantasyMovie.overview}
            onChange={handleChange}
            fullWidth
            required
            multiline
            minRows={3}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Genres (comma separated)"
            name="genres"
            value={fantasyMovie.genres}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Release Date"
            name="releaseDate"
            type="date"
            value={fantasyMovie.releaseDate}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Runtime (minutes)"
            name="runtime"
            value={fantasyMovie.runtime}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Production Companies"
            name="productionCompanies"
            value={fantasyMovie.productionCompanies}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Fantasy Movie
          </Button>
        </form>
        {submitted && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            Fantasy movie saved! Go to "My Fantasy Movie" to view it.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default FantasyMoviePage;