import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { BaseMovieProps } from "../types/interfaces";
import Typography from "@mui/material/Typography";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MovieCard from "../components/movieCard";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";


const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds, setFavourites } = useContext(MoviesContext);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(movieIds);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setFavourites(reordered);
  };

  return (
    <>
      <Typography variant="h4" sx={{ mt: 2, mb: 2, textAlign: "center" }}>
        Favourite Movies (Drag to Reorder)
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="favourites-droppable" direction="horizontal">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(provided: any) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: "flex", flexWrap: "wrap", gap: 24, padding: 24 }}
            >
              {movieIds.map((id, index) => {
                const movie = allFavourites.find((m) => m.id === id);
                if (!movie) return null;
                return (
                  <Draggable key={movie.id} draggableId={movie.id.toString()} index={index}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(provided: any, snapshot: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.7 : 1,
                          margin: "0 12px 24px 0",
                        }}
                      >
                        <MovieCard
                          movie={movie}
                          action={(m) => (
                            <>
                              <RemoveFromFavourites {...m} />
                              <WriteReview {...m} />
                            </>
                          )}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default FavouriteMoviesPage;