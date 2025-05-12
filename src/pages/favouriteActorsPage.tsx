import React from "react";
import { useFavourites } from "../contexts/FavouritesContext";
import ActorListPageTemplate from "../components/templateActorListPage";

const FavouriteActorsPage: React.FC = () => {
  const { actors } = useFavourites();
  return <ActorListPageTemplate actors={actors} action={() => null} />;
};

export default FavouriteActorsPage;