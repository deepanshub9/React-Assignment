import React, { useState } from "react";
import TemplateTvSeriesListPage from "../components/templateTvSeriesListPage";
import TVSeriesCard from "../components/TVSeriesCard";
import { useQuery } from "react-query";
import { getPopularTVSeries } from "../api/tmdb-api";
import { BaseTvSeriesProps } from "../types/interfaces";
import MovieFilterUI from "../components/movieFilterUI";
import Pagination from "@mui/material/Pagination";

const TVSeriesPage: React.FC = () => {
  const [page, setPage] = useState(1);

  // Add type for react-query if possible, e.g. useQuery<{ results: BaseTvSeriesProps[], total_pages: number }, Error>
  const { data: tvSeries, isLoading, isError } = useQuery(
    ["popularTVSeries", page],
    () => getPopularTVSeries(page)
  );

  const [filterValues, setFilterValues] = useState({
    title: "",
    genre: "",
    sortOrder: "desc",
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [filterType]: value }));
  };

  let filteredSeries = tvSeries?.results || [];
  if (filteredSeries.length > 0) {
    filteredSeries = filteredSeries
      .filter((series: BaseTvSeriesProps) =>
        filterValues.genre ? series.genre_ids.includes(Number(filterValues.genre)) : true
      )
      .filter((series: BaseTvSeriesProps) =>
        filterValues.title ? series.name.toLowerCase().includes(filterValues.title.toLowerCase()) : true
      )
     .sort((a: BaseTvSeriesProps, b: BaseTvSeriesProps) =>
  filterValues.sortOrder === "asc"
    ? a.popularity - b.popularity
    : b.popularity - a.popularity
)
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching TV series.</p>;

  return (
    <>
      <TemplateTvSeriesListPage
        seriesList={filteredSeries}
        action={(series) => <TVSeriesCard series={series} />}
      />
     <MovieFilterUI
  onFilterValuesChange={handleFilterChange}
  titleFilter={filterValues.title}
  genreFilter={filterValues.genre}
  sortOrder={filterValues.sortOrder}
  filterType="tvSeries"
/>
      <Pagination
        count={tvSeries ? tvSeries.total_pages : 1}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </>
  );
};

export default TVSeriesPage;