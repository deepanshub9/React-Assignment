import React from "react";
import { useFavourites } from "../contexts/FavouritesContext";
import TemplateTvSeriesListPage from "../components/templateTvSeriesListPage";
import TVSeriesCard from "../components/TVSeriesCard";

const FavouriteTVSeriesPage: React.FC = () => {
  const { tvSeries } = useFavourites();
  return (
    <TemplateTvSeriesListPage
      seriesList={tvSeries}
      action={(series) => <TVSeriesCard series={series} />}
    />
  );
};

export default FavouriteTVSeriesPage;