import React, { MouseEvent } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import img from "../../images/film-poster-placeholder.png";
import { BaseMovieProps } from "../../types/interfaces";

const styles = { card: { maxWidth: 345 }, media: { height: 500 }, avatar: { backgroundColor: "rgb(255, 0, 0)" } };

interface MovieCardProps {
  movie: BaseMovieProps;
  selectFavourite: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, selectFavourite }) => {
  const handleAddToFavourite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    selectFavourite(movie.id);
  };

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          movie.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={<Typography variant="h5" component="p">{movie.title}{" "}</Typography>}
      />
      <CardMedia sx={styles.media} image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img} />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" component="p">
              {movie.overview}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favourites" onClick={handleAddToFavourite}>
          <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
        <Button variant="outlined" size="medium" color="primary">
          More Info ...
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
