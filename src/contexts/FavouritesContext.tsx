import React, { createContext, useContext, useState } from "react";
import { BaseActorProps, BaseTvSeriesProps } from "../types/interfaces";

export type FavouritesType = {
  actors: BaseActorProps[];
  tvSeries: BaseTvSeriesProps[];
  addActor: (actor: BaseActorProps) => void;
  addTVSeries: (series: BaseTvSeriesProps) => void;
};

const FavouritesContext = createContext<FavouritesType | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [actors, setActors] = useState<BaseActorProps[]>([]);
  const [tvSeries, setTVSeries] = useState<BaseTvSeriesProps[]>([]);

  const addActor = (actor: BaseActorProps) =>
    setActors((prev) => (prev.some((a) => a.id === actor.id) ? prev : [...prev, actor]));
  const addTVSeries = (series: BaseTvSeriesProps) =>
    setTVSeries((prev) => (prev.some((s) => s.id === series.id) ? prev : [...prev, series]));

  return (
    <FavouritesContext.Provider value={{ actors, tvSeries, addActor, addTVSeries }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext)!;