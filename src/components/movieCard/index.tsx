import React, { useContext } from "react";
import { Link } from "react-router-dom"; 
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import img from "../../images/film-poster-placeholder.png";
import { BaseMovieProps } from "../../types/interfaces";
import { MoviesContext } from "../../contexts/moviesContext"; 
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const styles = { card: { maxWidth: 345 }, media: { height: 500 }, avatar: { backgroundColor: "rgb(255, 0, 0)" } };

interface MovieCardProps {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode; 
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, action }) => { 
  const { favourites } = useContext(MoviesContext);
  const isFavourite = favourites.includes(movie.id);
  <MovieCard>
  <PlaylistAddIcon color="primary" fontSize="large" /> {/* ✅ Add the icon */}
</MovieCard>

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={isFavourite ? <Avatar sx={styles.avatar}><FavoriteIcon /></Avatar> : null}
        title={<Typography variant="h5" component="p">{movie.title}</Typography>}
      />
      <CardMedia sx={styles.media} image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img} />
      <CardContent>
        <Typography variant="subtitle1">
          <strong>Release Date:</strong> {movie.release_date ?? "Not Available"}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Rating:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}  {/* Dynamically assign correct action */}
        <Button component={Link} to={`/movies/${movie.id}`} variant="outlined" size="medium" color="primary">
          More Info ...
        </Button>
      </CardActions>
      
    </Card>
  );
};

export default MovieCard;
