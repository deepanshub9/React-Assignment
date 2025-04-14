import React, { useState, useEffect } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../types/interfaces";

const styles = {
  gridListRoot: { display: "flex", flexWrap: "wrap", justifyContent: "space-around" },
  gridListTile: { width: 450, height: "100vh" },
};

interface TemplateMoviePageProps {
  movie: MovieDetailsProps;
  children: React.ReactElement;
}

const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({ movie, children }) => {
  const [images, setImages] = useState<MovieImage[]>([]);

  useEffect(() => {
    getMovieImages(movie.id).then((images) => {
      setImages(images);
    });
  }, []);

  return (
    <>
      <MovieHeader {...movie} />
      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={3}>
          <ImageList cols={1}>
            {images.map((image) => (
              <ImageListItem key={image.file_path} sx={styles.gridListTile}>
                <img src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} alt="Movie Image" />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={9}>{children}</Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
