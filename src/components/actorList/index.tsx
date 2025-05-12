import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BaseActorProps } from "../../types/interfaces";
import { useFavourites } from "../../contexts/FavouritesContext";

const styles = {
  card: { width: "100%", maxWidth: 220, minWidth: 0, margin: "auto" },
  media: { width: "100%", height: 0, paddingTop: "150%" }, // 2:3 aspect ratio
  content: { textAlign: "center" },
};

const ActorList: React.FC<{ actors: BaseActorProps[]; action?: (actor: BaseActorProps) => React.ReactNode }> = ({ actors, action }) => {
  const { addActor, actors: favouriteActors } = useFavourites();

  const isFavourite = (actor: BaseActorProps) =>
    favouriteActors.some((a) => a.id === actor.id);

  return (
    <Grid container spacing={3} justifyContent="center">
      {actors.map((actor) => (
        <Grid item key={actor.id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card sx={styles.card}>
            <CardMedia
              sx={styles.media}
              image={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              title={actor.name}
            />
            <CardContent sx={styles.content}>
              <Typography variant="h6" noWrap>
                {actor.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Popularity: {actor.popularity.toFixed(1)}
              </Typography>
              <Button
                variant={isFavourite(actor) ? "contained" : "outlined"}
                color="primary"
                size="small"
                disabled={isFavourite(actor)}
                onClick={() => addActor(actor)}
                sx={{ mt: 1, mb: 1, width: "100%" }}
              >
                {isFavourite(actor) ? "Added to Favourites" : "Add to Favourites"}
              </Button>
              {action && action(actor)}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActorList;