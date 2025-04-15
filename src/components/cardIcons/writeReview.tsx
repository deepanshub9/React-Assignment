import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { BaseMovieProps } from "../../types/interfaces";
import { Link } from "react-router-dom";

const WriteReviewIcon: React.FC<BaseMovieProps> = ({ id }) => { // ✅ Destructure `id`
  console.log("WriteReviewIcon rendered with id:", id); // ✅ Log the ID for debugging
  return (
    <Link to="/reviews/form" state={{ movieId: id }}> {/* ✅ Ensure movie ID is sent */}
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );


  // https://api.themoviedb.org/3/movie/undefined?api_key=cfdcb316d49b4b9caf8878f64105c712
};

export default WriteReviewIcon;
