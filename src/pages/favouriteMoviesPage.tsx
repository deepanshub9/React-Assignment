import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query"; 
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { BaseMovieProps } from "../types/interfaces";

import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds } = useContext(MoviesContext);

  
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", movieId],
      queryFn: async (): Promise<BaseMovieProps> => {
        const movie = await getMovie(movieId.toString());
        return movie as BaseMovieProps;
      },
    }))
  );

 
  const isLoading = favouriteMovieQueries.some((query) => query.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries
    .map((q) => q.data)
    .filter((m): m is BaseMovieProps => !!m); 

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={allFavourites} 
        action={(movie: BaseMovieProps) => (
          <>
            <RemoveFromFavourites {...movie} />
            <WriteReview {...movie}/>
          </>
        )}
      />
    </>
  );
};

export default FavouriteMoviesPage;
