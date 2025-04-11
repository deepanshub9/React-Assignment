import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieHeader from "../components/headerMovie";
import MovieDetails from "../components/movieDetails";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { MovieDetailsProps, MovieImage } from "../types/interfaces";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsProps | null>(null);
  const [images, setImages] = useState<MovieImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Error fetching movie details:", err))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`)
      .then((res) => res.json())
      .then((json) => json.posters || [])
      .then((imageData) => setImages(imageData))
      .catch((err) => console.error("Error fetching movie images:", err));
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!movie) return <h2>Movie not found</h2>;

  return (
    <>
      <MovieHeader {...movie} />
      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={3}>
          <ImageList cols={1}>
            {images.length > 0 ? (
              images.map((image) => (
                <ImageListItem key={image.file_path}>
                  <img src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} alt="Movie Poster" />
                </ImageListItem>
              ))
            ) : (
              <ImageListItem>
                <img src="/images/default-poster.png" alt="No poster available" />
              </ImageListItem>
            )}
          </ImageList>
        </Grid>
        <Grid item xs={9}>
          <MovieDetails {...movie} />
        </Grid>
      </Grid>
    </>
  );
};

export default MovieDetailsPage;
