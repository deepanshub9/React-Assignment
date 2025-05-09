import React, { createContext, useContext, useState } from "react";
import { BaseMovieProps } from "../types/interfaces";

export interface Playlist {
  id: string;
  title: string;
  theme: string;
  movies: BaseMovieProps[];
}

interface PlaylistsContextType {
  playlists: Playlist[];
  addPlaylist: (playlist: Omit<Playlist, "id">) => void;
  removePlaylist: (id: string) => void;
}

const PlaylistsContext = createContext<PlaylistsContextType | undefined>(undefined);

export const PlaylistsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const addPlaylist = (playlist: Omit<Playlist, "id">) => {
    setPlaylists((prev) => [
      ...prev,
      { ...playlist, id: Date.now().toString() }
    ]);
  };

  const removePlaylist = (id: string) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PlaylistsContext.Provider value={{ playlists, addPlaylist, removePlaylist }}>
      {children}
    </PlaylistsContext.Provider>
  );
};

export const usePlaylists = () => {
  const ctx = useContext(PlaylistsContext);
  if (!ctx) throw new Error("usePlaylists must be used within a PlaylistsProvider");
  return ctx;
};