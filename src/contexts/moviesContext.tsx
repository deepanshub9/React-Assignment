import React, { useState } from "react"; 
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  setFavourites: React.Dispatch<React.SetStateAction<number[]>>; // <-- Add this line
  addToFavourites: (movie: BaseMovieProps) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;
  addReview: (movie: BaseMovieProps, review: Review) => void;
  getReview: (movieId: number) => Review | undefined;
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  setFavourites: () => {}, // <-- Add this line
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: () => {},
  getReview: () => undefined,
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [reviews, setReviews] = useState<Record<number, Review>>({}); 

  const addToFavourites = (movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(movie.id)) {
        return [...prevFavourites, movie.id];
      }
      return prevFavourites;
    });
  };

  const removeFromFavourites = (movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie: BaseMovieProps, review: Review) => {
    setReviews((prevReviews: Record<number, Review>) => ({ ...prevReviews, [movie.id]: review })); 
  };

  const getReview = (movieId: number): Review | undefined => {
    return reviews[movieId]; 
  };

  return (
    <MoviesContext.Provider value={{ favourites, setFavourites, addToFavourites, removeFromFavourites, addReview, getReview }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;