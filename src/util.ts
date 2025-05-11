import truncate from "lodash/truncate";
import { Review } from "./types/interfaces";

export const excerpt = (string: string) => {
  return truncate(string, {
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
};

export function getReviewsForMovie(movieId: number): Review[] {
  const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  return reviews.filter((r: Review) => r.movieId === movieId);
}
