import React from "react";
import Grid from "@mui/material/Grid";
import Header from "../headerMovieList";
import { BaseTvSeriesProps } from "../../types/interfaces";

const styles = { root: { backgroundColor: "#bfbfbf", padding: "0px 20px 20px 20px" } };

interface TVSeriesListPageTemplateProps {
  seriesList: BaseTvSeriesProps[];
  action: (series: BaseTvSeriesProps) => React.ReactNode;
}

const TemplateTvSeriesListPage: React.FC<TVSeriesListPageTemplateProps> = ({ seriesList, action }) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title="Popular TV Series" />
      </Grid>
      <Grid item container spacing={5}>
        {seriesList.map((series) => (
          <Grid item key={series.id} xs={12} sm={6} md={4} lg={2}> {/* ✅ Updated to allow 6 cards per row */}
            {action(series)}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default TemplateTvSeriesListPage;