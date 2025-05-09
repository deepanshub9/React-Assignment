import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePlaylists } from "../contexts/playlistsContext";
import { Box, Typography, Paper, Button, List, ListItem, ListItemText } from "@mui/material";

const PlaylistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playlists } = usePlaylists();
  const navigate = useNavigate();

  const playlist = playlists.find((p) => p.id === id);

  if (!playlist) {
    return (
      <Box sx={{ maxWidth: 600, margin: "40px auto" }}>
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5">Playlist not found.</Typography>
          <Button onClick={() => navigate("/playlists")}>Back to Playlists</Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, margin: "40px auto" }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {playlist.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Theme: {playlist.theme}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Movies in this Playlist:
        </Typography>
        <List>
          {playlist.movies.map((movie) => (
            <ListItem key={movie.id}>
              <ListItemText primary={movie.title} />
            </ListItem>
          ))}
        </List>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/playlists")}>
          Back to Playlists
        </Button>
      </Paper>
    </Box>
  );
};

export default PlaylistDetailPage;