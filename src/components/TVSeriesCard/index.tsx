import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BaseTvSeriesProps } from "../../types/interfaces";

const styles = { card: { maxWidth: 345 }, media: { height: 500 } };

interface TVSeriesCardProps {
  series: BaseTvSeriesProps;
}

const TVSeriesCard: React.FC<TVSeriesCardProps> = ({ series }) => {
  return (
    <Card sx={styles.card}>
      <CardMedia
        sx={styles.media}
        image={series.poster_path ? `https://image.tmdb.org/t/p/w500/${series.poster_path}` : "/placeholder.png"}
        title={series.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {series.name} {/* ✅ Corrected title to `name` */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Popularity: {series.popularity.toFixed(1)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/tv-series/${series.id}`} size="small" color="primary">
          More Info
        </Button>
      </CardActions>
    </Card>
  );
};

export default TVSeriesCard;
