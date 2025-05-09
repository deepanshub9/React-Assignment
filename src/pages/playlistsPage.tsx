import React, { useState } from "react";
import { usePlaylists } from "../contexts/playlistsContext";
import { useQuery } from "react-query";
import { getPopularMovies } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";

const themes = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

const PlaylistsPage: React.FC = () => {
  const { playlists, addPlaylist, removePlaylist } = usePlaylists();
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [selectedMovies, setSelectedMovies] = useState<BaseMovieProps[]>([]);

  // Fetch movies to select for playlist
  const { data: moviesData } = useQuery("popularMovies", getPopularMovies);

  const handleMovieToggle = (movie: BaseMovieProps) => {
    setSelectedMovies((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !theme || selectedMovies.length === 0) return;
    addPlaylist({ title, theme, movies: selectedMovies });
    setTitle("");
    setTheme("");
    setSelectedMovies([]);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "40px auto" }}>
      <Paper sx={{ padding: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create a Playlist
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Playlist Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          >
            {themes.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Select Movies
          </Typography>
          <List dense sx={{ maxHeight: 200, overflow: "auto", mb: 2 }}>
            {moviesData?.results.map((movie: BaseMovieProps) => (
              <ListItem
                key={movie.id}
                button
                onClick={() => handleMovieToggle(movie)}
                selected={selectedMovies.some((m) => m.id === movie.id)}
              >
                <Checkbox
                  checked={selectedMovies.some((m) => m.id === movie.id)}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={movie.title} />
              </ListItem>
            ))}
          </List>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Playlist
          </Button>
        </form>
      </Paper>

      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          My Playlists
        </Typography>
        <List>
          {playlists.map((playlist) => (
            <ListItem key={playlist.id} alignItems="flex-start" divider>
              <ListItemText
                primary={
                  <RouterLink
                    to={`/playlists/${playlist.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {playlist.title} ({playlist.theme})
                  </RouterLink>
                }
                secondary={
                  <>
                    <Typography variant="body2">
                      Movies: {playlist.movies.map((m) => m.title).join(", ")}
                    </Typography>
                  </>
                }
              />
              <IconButton onClick={() => removePlaylist(playlist.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default PlaylistsPage;