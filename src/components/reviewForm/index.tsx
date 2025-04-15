import React, { useContext, useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import { BaseMovieProps, Review } from "../../types/interfaces";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import styles from "./styles";
import ratings from "./ratingCategories";

const ReviewForm: React.FC<BaseMovieProps> = (movie) => {
  const defaultValues = {
    author: "",
    content: "",
    agree: false,
    rating: 3,
    movieId: movie.id,
  };

  const { control, formState: { errors }, handleSubmit, reset } = useForm<Review>({ defaultValues });

  const navigate = useNavigate();
  const context = useContext(MoviesContext);
  const [rating, setRating] = useState(3);
  const [open, setOpen] = useState(false);

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const onSubmit: SubmitHandler<Review> = (review) => {
    review.movieId = movie.id;
    review.rating = rating;
    context.addReview(movie, review);
    setOpen(true);
  };

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/movies/favourites");
  };

  return (
    <Box
      sx={{
        ...styles.root,
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Write a Review
      </Typography>
      <form style={{ ...styles.form, marginTop: 2 }} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ marginBottom: 3 }}>
          <Controller
            name="author"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                variant="outlined"
                required
                label="Author's Name"
                autoFocus
              />
            )}
          />
          {errors.author && (
            <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
              {errors.author.message}
            </Typography>
          )}
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <Controller
            name="content"
            control={control}
            rules={{
              required: "Review cannot be empty.",
              minLength: { value: 10, message: "Review is too short" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                variant="outlined"
                required
                label="Review Text"
                multiline
                minRows={5}
              />
            )}
          />
          {errors.content && (
            <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
              {errors.content.message}
            </Typography>
          )}
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                variant="outlined"
                label="Rating"
                value={rating}
                onChange={handleRatingChange}
              >
                {ratings.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => reset({ author: "", content: "" })}
          >
            Reset
          </Button>
        </Box>
      </form>

      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <Alert severity="success" variant="filled" onClose={handleSnackClose}>
          <Typography variant="h6">Thank you for submitting a review</Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReviewForm;