import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, IconButton, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface CastMember {
  name: string;
  role: string;
  description: string;
}

interface FantasyMovie {
  title: string;
  overview: string;
  genres: string;
  releaseDate: string;
  runtime: string;
  productionCompanies: string;
  cast: CastMember[];
  poster?: string; // base64 or URL
}

const FantasyMoviePage: React.FC = () => {
  const [fantasyMovie, setFantasyMovie] = useState<FantasyMovie>({
    title: "",
    overview: "",
    genres: "",
    releaseDate: "",
    runtime: "",
    productionCompanies: "",
    cast: [],
    poster: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [posterPreview, setPosterPreview] = useState<string | undefined>();

  // Handle cast
  const handleAddCast = () => {
    setFantasyMovie((prev) => ({
      ...prev,
      cast: [...prev.cast, { name: "", role: "", description: "" }],
    }));
  };

  const handleCastChange = (idx: number, field: keyof CastMember, value: string) => {
    const updatedCast = fantasyMovie.cast.map((member, i) =>
      i === idx ? { ...member, [field]: value } : member
    );
    setFantasyMovie((prev) => ({ ...prev, cast: updatedCast }));
  };

  const handleRemoveCast = (idx: number) => {
    setFantasyMovie((prev) => ({
      ...prev,
      cast: prev.cast.filter((_, i) => i !== idx),
    }));
  };

  // Handle poster upload
  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFantasyMovie((prev) => ({ ...prev, poster: reader.result as string }));
        setPosterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle overview (rich text)
  const handleOverviewChange = (value: string) => {
    setFantasyMovie((prev) => ({ ...prev, overview: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFantasyMovie({ ...fantasyMovie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("fantasyMovie", JSON.stringify(fantasyMovie));
    setSubmitted(true);
  };

  return (
    <Box sx={{ maxWidth: 700, margin: "40px auto" }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create Your Fantasy Movie
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={fantasyMovie.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Overview (Rich Text)
          </Typography>
          <ReactQuill
            value={fantasyMovie.overview}
            onChange={handleOverviewChange}
            style={{ marginBottom: 16, background: "#fff" }}
          />
          <TextField
            label="Genres (comma separated)"
            name="genres"
            value={fantasyMovie.genres}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Release Date"
            name="releaseDate"
            type="date"
            value={fantasyMovie.releaseDate}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Runtime (minutes)"
            name="runtime"
            value={fantasyMovie.runtime}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Production Companies"
            name="productionCompanies"
            value={fantasyMovie.productionCompanies}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          {/* Poster Upload */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Upload Poster
          </Typography>
          <input type="file" accept="image/*" onChange={handlePosterChange} />
          {posterPreview && (
            <Box sx={{ mt: 2 }}>
              <Avatar src={posterPreview} variant="rounded" sx={{ width: 120, height: 180 }} />
            </Box>
          )}

          {/* Cast Section */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            Cast
          </Typography>
          {fantasyMovie.cast.map((member, idx) => (
            <Box key={idx} sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
              <TextField
                label="Name"
                value={member.name}
                onChange={(e) => handleCastChange(idx, "name", e.target.value)}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Role"
                value={member.role}
                onChange={(e) => handleCastChange(idx, "role", e.target.value)}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Description"
                value={member.description}
                onChange={(e) => handleCastChange(idx, "description", e.target.value)}
                sx={{ flex: 2 }}
              />
              <IconButton onClick={() => handleRemoveCast(idx)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button variant="outlined" onClick={handleAddCast} sx={{ mb: 2 }}>
            Add Cast Member
          </Button>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Fantasy Movie
          </Button>
        </form>
        {submitted && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            Fantasy movie saved! Go to "My Fantasy Movie" to view it.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default FantasyMoviePage;