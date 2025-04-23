import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getTvSeriesDetails } from "../api/tmdb-api";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import NavigationIcon from "@mui/icons-material/Navigation";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "20px",
    margin: "20px",
  },
  poster: {
    width: "300px",
    borderRadius: "8px",
  },
  details: {
    flex: 1,
  },
  chipSet: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: { margin: 0.5 },
  fab: { position: "fixed", top: 50, right: 2 },
};

const TvSeriesDetailPage: React.FC = () => {
  const { id } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: tvSeries, isLoading, isError } = useQuery(["tvSeriesDetails", id], () =>
    getTvSeriesDetails(id || "")
  );

  console.log("TV Series ID:", id); // Debugging log
  console.log("TV Series Details:", tvSeries); // Debugging log

  if (isLoading) return <Spinner />;
  if (isError || !tvSeries) return <p>Error fetching TV series details.</p>;

  return (
    <>
      <Box sx={styles.container}>
        {/* Poster on the left */}
        <CardMedia
          component="img"
          image={tvSeries.poster_path ? `https://image.tmdb.org/t/p/w500/${tvSeries.poster_path}` : "/placeholder.png"}
          alt={tvSeries.name || "TV Series Poster"}
          sx={styles.poster}
        />

        {/* Details on the right */}
        <Box sx={styles.details}>
          <Typography variant="h4" component="h1" gutterBottom>
            {tvSeries.name}
          </Typography>

          <Typography variant="h6" component="p" gutterBottom>
            {tvSeries.overview}
          </Typography>

          <Paper component="ul" sx={styles.chipSet}>
            <li>
              <Chip label="Genres" sx={styles.chipLabel} color="primary" />
            </li>
            {tvSeries.genres?.map((g: { id: number; name: string }) => (
              <li key={g.id}>
                <Chip label={g.name} />
              </li>
            ))}
          </Paper>

          <Paper component="ul" sx={styles.chipSet}>
            <Chip label={`First Air Date: ${tvSeries.first_air_date}`} />
            <Chip label={`Popularity: ${tvSeries.popularity.toFixed(1)}`} />
          </Paper>
        </Box>
      </Box>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        More Info
      </Fab>

      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Typography variant="h5" component="h2" sx={{ padding: 2 }}>
          Additional Information
        </Typography>
        <Typography variant="body1" sx={{ padding: 2 }}>
          {/* Add more details or related TV series here */}
          This is where you can add more information about the TV series.
        </Typography>
      </Drawer>
    </>
  );
};

export default TvSeriesDetailPage;