import React, { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { GenreData } from "../../types/interfaces";
import { getGenres, getTvGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";

const styles = {
  root: { maxWidth: 345 },
  formControl: { margin: 1, minWidth: 220, backgroundColor: "rgb(255, 255, 255)" },
};

interface FilterMoviesCardProps {
  onUserInput: (filterType: string, value: string) => void;
  titleFilter: string;
  genreFilter: string;
  sortOrder: string;
  filterType: "movies" | "tvSeries"; // Added filterType prop
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({
  titleFilter,
  genreFilter,
  sortOrder,
  onUserInput,
  filterType,
}) => {
  const { data, isLoading, isError, error } = useQuery<GenreData, Error>(
    filterType === "movies" ? "genres" : "tvGenres",
    filterType === "movies" ? getGenres : getTvGenres
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const genres = data?.genres || [];
  if (genres.length > 0 && genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUserInput("title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    onUserInput("genre", e.target.value);
  };

  const handleSortOrderChange = (e: SelectChangeEvent) => {
    onUserInput("sortOrder", e.target.value);
  };

  return (
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          Filter & Sort
        </Typography>
        <TextField
          sx={styles.formControl}
          id="title-filter"
          label="Search by Title"
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
        <FormControl sx={styles.formControl}>
          <InputLabel id="sort-order-label">Sort By</InputLabel>
          <Select labelId="sort-order-label" id="sort-order-select" value={sortOrder} onChange={handleSortOrderChange}>
            <MenuItem value="asc">Popularity Ascending</MenuItem>
            <MenuItem value="desc">Popularity Descending</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default FilterMoviesCard;