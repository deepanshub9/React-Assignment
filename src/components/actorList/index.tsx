import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BaseActorProps } from "../../types/interfaces";

const styles = {
  card: { maxWidth: 200, margin: "10px auto" },
  media: { height: 300 },
  content: { textAlign: "center" },
};

const ActorList: React.FC<{ actors: BaseActorProps[]; action: (actor: BaseActorProps) => React.ReactNode }> = ({ actors, action }) => {
  const placeholderImage = "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <Grid container spacing={3} justifyContent="center">
      {actors.map((actor) => (
        <Grid item key={actor.id} xs={12} sm={6} md={4} lg={3}>
          <Card sx={styles.card}>
            <CardMedia
              sx={styles.media}
              image={actor.profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : placeholderImage}
              title={actor.name}
            />
            <CardContent sx={styles.content}>
              <Typography variant="h6">{actor.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Popularity: {actor.popularity.toFixed(1)}
              </Typography>
              {action(actor)}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActorList;