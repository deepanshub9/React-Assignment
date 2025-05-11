import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps, Review } from "../../types/interfaces";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import styles from "./styles";

const ReviewForm: React.FC<BaseMovieProps> = (movie) => {
  const defaultValues = {
    author: "",
    content: "",
    agree: false,
    rating: 3,
    movieId: movie.id,
  };

  const { control, formState: { errors }, handleSubmit, reset } = useForm<Review>({ defaultValues });

  const context = useContext(MoviesContext);
  const [rating, setRating] = useState(3);
  const [open, setOpen] = useState(false);


  const handleSnackClose = () => {
    setOpen(false);
    reset({ author: "", content: "" });
  };

  const onSubmit: SubmitHandler<Review> = (review) => {
    review.movieId = movie.id;
    review.rating = rating;
    context.addReview(movie, review);

    // --- Save to localStorage ---
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    localStorage.setItem("reviews", JSON.stringify([...reviews, review]));
    // ----------------------------

    setOpen(true);
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
    rules={{
      required: "Rating is required",
      min: { value: 1, message: "Minimum rating is 1" },
      max: { value: 5, message: "Maximum rating is 5" },
    }}
    render={({ field }) => (
      <TextField
        {...field}
        type="number"
        fullWidth
        variant="outlined"
        label="Rating (1-5)"
        inputProps={{ min: 1, max: 5 }}
        value={rating}
        onChange={(e) => {
          const value = Number(e.target.value);
          setRating(value);
          field.onChange(value);
        }}
        required
      />
    )}
  />
  {errors.rating && (
    <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
      {errors.rating.message}
    </Typography>
  )}
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