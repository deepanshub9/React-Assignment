import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Pagination from "@mui/material/Pagination";

const titleFiltering = { name: "title", value: "", condition: titleFilter };
const genreFiltering = { name: "genre", value: "0", condition: genreFilter };

const HomePage: React.FC = () => {
  const [page, setPage] = React.useState(1);

  // Pass page to query key and getMovies
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["discover", page],
    () => getMovies(page)
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value };
    const updatedFilterSet = type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />;
        }}
      />
     <MovieFilterUI
  onFilterValuesChange={changeFilterValues}
  titleFilter={filterValues[0].value}
  genreFilter={filterValues[1].value}
  sortOrder="desc"
  filterType="movies"
/>
      <Pagination
        count={data ? data.total_pages : 1}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </>
  );
};

export default HomePage;