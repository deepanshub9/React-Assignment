import React, { useState, useEffect, ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FilterOption } from "../../types/interfaces"; // Added from lab instructions
import { getGenres } from "../../api/tmdb-api";



const styles = {
  root: { maxWidth: 345 },
  media: { height: 300 },
  formControl: { margin: 1, minWidth: 220, backgroundColor: "rgb(255, 255, 255)" },
};

interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string) => void; // Added to pass filtering input
  titleFilter: string;
  genreFilter: string;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({ titleFilter, genreFilter, onUserInput }) => {
  const [genres, setGenres] = useState([{ id: "0", name: "All" }]); // Fixed initial state

  useEffect(() => {
    getGenres().then((allGenres) => {
      setGenres([{ id: "0", name: "All" }, ...allGenres]);
    });
  }, []);
  
  const handleChange = (type: FilterOption, value: string) => {
    onUserInput(type, value); // Fixed function signature
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange("title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange("genre", e.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" /> Filter the movies.
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            value={titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />
          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select labelId="genre-label" id="genre-select" value={genreFilter} onChange={handleGenreChange}>
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={String(genre.id)}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" /> Sort the movies.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;
