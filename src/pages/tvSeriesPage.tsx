import React, { useState } from "react";
import TemplateTvSeriesListPage from "../components/templateTvSeriesListPage";
import TVSeriesCard from "../components/TVSeriesCard";
import { useQuery } from "react-query";
import { getPopularTVSeries } from "../api/tmdb-api";
import { BaseTvSeriesProps } from "../types/interfaces";
import MovieFilterUI from "../components/movieFilterUI";

const TVSeriesPage: React.FC = () => {
  const { data: tvSeries, isLoading, isError } = useQuery(["popularTVSeries"], getPopularTVSeries);

  const [filterValues, setFilterValues] = useState({
    title: "",
    genre: "",
    sortOrder: "desc",
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [filterType]: value }));
  };

  const filteredSeries = tvSeries?.results
    .filter((series: BaseTvSeriesProps) =>
      filterValues.genre ? series.genre_ids.includes(Number(filterValues.genre)) : true
    )
    .filter((series: BaseTvSeriesProps) =>
      filterValues.title ? series.name.toLowerCase().includes(filterValues.title.toLowerCase()) : true
    )
    .sort((a, b) =>
      filterValues.sortOrder === "asc" ? a.popularity - b.popularity : b.popularity - a.popularity
    );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching TV series.</p>;

  return (
    <>
      <TemplateTvSeriesListPage
        seriesList={filteredSeries || []}
        action={(series) => <TVSeriesCard series={series} />}
      />
      <MovieFilterUI
        onFilterValuesChange={handleFilterChange}
        titleFilter={filterValues.title}
        genreFilter={filterValues.genre}
        sortOrder={filterValues.sortOrder}
        filterType="tvSeries" // Pass filterType as "tvSeries"
      />
    </>
  );
};

export default TVSeriesPage;