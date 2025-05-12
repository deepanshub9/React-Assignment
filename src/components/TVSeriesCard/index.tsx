import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BaseTvSeriesProps } from "../../types/interfaces";
import { useFavourites } from "../../contexts/FavouritesContext";

// Responsive styles: let card fill grid column, use aspect ratio for image
const styles = {
  card: { width: "100%", maxWidth: 345, minWidth: 0, margin: "auto" },
  media: { width: "100%", height: 0, paddingTop: "150%" }, // 2:3 aspect ratio
};

interface TVSeriesCardProps {
  series: BaseTvSeriesProps;
}

const TVSeriesCard: React.FC<TVSeriesCardProps> = ({ series }) => {
  const { addTVSeries, tvSeries: favouriteSeries } = useFavourites();

  const isFavourite = favouriteSeries.some((s) => s.id === series.id);

  return (
    <Card sx={styles.card}>
      <CardMedia
        sx={styles.media}
        image={series.poster_path ? `https://image.tmdb.org/t/p/w500/${series.poster_path}` : "/placeholder.png"}
        title={series.name}
      />
      <CardContent>
        <Typography variant="h6" component="div" noWrap>
          {series.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Popularity: {series.popularity.toFixed(1)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant={isFavourite ? "contained" : "outlined"}
          color="primary"
          size="small"
          disabled={isFavourite}
          onClick={() => addTVSeries(series)}
        >
          {isFavourite ? "Added to Favourites" : "Add to Favourites"}
        </Button>
        <Button component={Link} to={`/tv-series/${series.id}`} size="small" color="primary">
          More Info
        </Button>
      </CardActions>
    </Card>
  );
};

export default TVSeriesCard;