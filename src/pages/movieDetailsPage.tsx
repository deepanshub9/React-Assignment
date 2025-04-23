import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovie, getSimilarMovies } from "../api/tmdb-api";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { MovieDetailsProps, BaseMovieProps } from "../types/interfaces";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "20px",
    margin: "20px",
  },
  poster: {
    width: "300px",
    borderRadius: "8px",
  },
  details: {
    flex: 1,
  },
  chipSet: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: { margin: 0.5 },
  similarMoviesSection: {
    marginTop: "40px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
  card: {
    maxWidth: 350,
    margin: "auto",
  },
  media: {
    height: 400,
  },
  cardContent: {
    textAlign: "center",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "10px",
  },
};

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();

  // Fetch movie details
  const { data: movie, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    () => getMovie(id || "")
  );

  // Fetch similar movies
  const { data: similarMovies, isLoading: isSimilarLoading } = useQuery<{ results: BaseMovieProps[] }, Error>(
    ["similarMovies", id],
    () => getSimilarMovies(id || "")
  );

  if (isLoading || isSimilarLoading) return <Spinner />;
  if (isError || !movie) return <p>Error fetching movie details.</p>;

  return (
    <>
      <Box sx={styles.container}>
        {/* Poster on the left */}
        <CardMedia
          component="img"
          image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "/placeholder.png"}
          alt={movie.title || "Movie Poster"}
          sx={styles.poster}
        />

        {/* Details on the right */}
        <Box sx={styles.details}>
          <Typography variant="h4" component="h1" gutterBottom>
            {movie.title}
          </Typography>

          <Typography variant="h6" component="p" gutterBottom>
            {movie.overview}
          </Typography>

          <Paper component="ul" sx={styles.chipSet}>
            <li>
              <Chip label="Genres" sx={styles.chipLabel} color="primary" />
            </li>
            {movie.genres?.map((g) => (
              <li key={g.id}>
                <Chip label={g.name} />
              </li>
            ))}
          </Paper>

          <Paper component="ul" sx={styles.chipSet}>
            <Chip label={`Release Date: ${movie.release_date}`} />
            <Chip label={`Popularity: ${movie.popularity.toFixed(1)}`} />
            <Chip label={`Runtime: ${movie.runtime} min`} />
          </Paper>
        </Box>
      </Box>

      {/* Similar Movies Section */}
      <Paper sx={styles.similarMoviesSection}>
        <Typography variant="h5" component="h2" gutterBottom>
          Similar Movies
        </Typography>
        {similarMovies?.results.length ? (
          <Grid container spacing={3}>
            {similarMovies.results.slice(0, 6).map((similarMovie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={similarMovie.id}>
                <Card sx={styles.card}>
                  <CardMedia
                    sx={styles.media}
                    image={
                      similarMovie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`
                        : "/placeholder.png"
                    }
                    title={similarMovie.title}
                  />
                  <CardContent sx={styles.cardContent}>
                    <Typography variant="h6" component="div">
                      {similarMovie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Popularity: {similarMovie.popularity.toFixed(1)}
                    </Typography>
                  </CardContent>
                  <Box sx={styles.buttonContainer}>
                    <Button
                      component={Link}
                      to={`/movies/${similarMovie.id}`}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      More Info
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No similar movies found.</Typography>
        )}
      </Paper>
    </>
  );
};

export default MovieDetailsPage;