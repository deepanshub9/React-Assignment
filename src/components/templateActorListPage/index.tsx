import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import ActorList from "../actorList";
import { BaseActorListProps } from "../../types/interfaces";

const styles = { root: { backgroundColor: "#f5f5f5", padding: "0px 20px 20px 20px" } };

const ActorListPageTemplate: React.FC<BaseActorListProps> = ({ actors, action }) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title="Popular Actors" />
      </Grid>
      <Grid item xs={12}>
        <ActorList action={action} actors={actors} />
      </Grid>
    </Grid>
  );
};

export default ActorListPageTemplate;