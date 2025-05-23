import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const styles = {
  gridListRoot: { display: "flex", flexWrap: "wrap", justifyContent: "space-around" },
  gridListTile: { width: 450, height: "auto" },
};

interface TemplateMoviePageProps {
  movie: MovieDetailsProps;
  children?: React.ReactNode;
}

const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({ movie, children }) => {
  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["images", movie.id],
    () => getMovieImages(movie.id)
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <MovieHeader {...movie} />
      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={12} sm={4}>
          <ImageList cols={2}> {/* ✅ Display only 2 posters */}
            {data && data.map((image) => (
              <ImageListItem key={image.file_path} sx={styles.gridListTile}>
                <img src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} alt="Movie Image" />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={12} sm={8}>{children}</Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
