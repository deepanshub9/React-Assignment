import React, { createContext, useContext, useState } from "react";

export type FavouritesType = {
  actors: any[];
  tvSeries: any[];
  addActor: (actor: any) => void;
  addTVSeries: (series: any) => void;
};

const FavouritesContext = createContext<FavouritesType | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [actors, setActors] = useState<any[]>([]);
  const [tvSeries, setTVSeries] = useState<any[]>([]);

  const addActor = (actor: any) => setActors((prev) => [...prev, actor]);
  const addTVSeries = (series: any) => setTVSeries((prev) => [...prev, series]);

  return (
    <FavouritesContext.Provider value={{ actors, tvSeries, addActor, addTVSeries }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext)!;