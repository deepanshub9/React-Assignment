import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Review, MovieDetailsProps } from "../../types/interfaces";
import { getReviewsForMovie } from "../../util";

const styles = { table: { minWidth: 550 } };

const MovieReviews: React.FC<MovieDetailsProps> = (movie) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    setReviews(getReviewsForMovie(movie.id));
  }, [movie.id]);

  return (
    <TableContainer component={Paper}>
      <Table sx={styles.table} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No reviews yet. Be the first to write one!
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.author}</TableCell>
                <TableCell>{r.content.slice(0, 400)}...</TableCell>
                <TableCell>
                  <Link to={`/reviews/${r.id}`} state={{ review: r, movie }}>
                    Full Review
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieReviews;