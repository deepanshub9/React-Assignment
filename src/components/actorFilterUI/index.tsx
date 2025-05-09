import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface ActorFilterUIProps {
  onFilterValuesChange: (filters: { name: string; popularity: string }) => void;
  filterValues: { name: string; popularity: string };
}

const ActorFilterUI: React.FC<ActorFilterUIProps> = ({ onFilterValuesChange, filterValues }) => {
  const [localFilters, setLocalFilters] = useState(filterValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...localFilters, [name]: value };
    setLocalFilters(updated);
    onFilterValuesChange(updated);
  };

  const handleReset = () => {
    const resetFilters = { name: "", popularity: "" };
    setLocalFilters(resetFilters);
    onFilterValuesChange(resetFilters);
  };

  return (
     <Card sx={{ minWidth: 220, maxWidth: 300, boxShadow: 3, borderRadius: 2, position: "sticky", top: 32 }}>
     
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filter Actors
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={localFilters.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Min Popularity"
          name="popularity"
          type="number"
          value={localFilters.popularity}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActorFilterUI;