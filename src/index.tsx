import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; 
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import PopularMoviesPage from "./pages/popularMoviesPage";
import ActorsPage from "./pages/actorsPage";
import TVSeriesPage from "./pages/tvSeriesPage";
import TvSeriesDetailPage from "./pages/tvSeriesDetailPage";
import FantasyMoviePage from "./pages/fantasyMoviePage";
import MyFantasyMovie from "./pages/myFantasyMovie";
import { FavouritesProvider } from "./contexts/FavouritesContext"; // <-- Add this import
import FavouriteTVSeriesPage from "./pages/FavouriteTVseries";
import FavouriteActorsPage from "./pages/favouriteActorsPage";
import { PlaylistsProvider } from "./contexts/playlistsContext";
import PlaylistsPage from "./pages/playlistsPage";
import PlaylistDetailPage from "./pages/playlistDetailPage";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000, 
      refetchOnWindowFocus: false, 
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader /> {/* ✅ NEW Header Component */}
        <MoviesContextProvider>
        <FavouritesProvider> {/* <-- Wrap your routes here */}
         <PlaylistsProvider> {/* <-- Add this line */}
        <Routes>
          <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/reviews/:id" element={<MovieReviewPage />} />
          <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
          <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
          <Route path="/movies/popular" element={<PopularMoviesPage />} />
          <Route path="/fantasy/create" element={<FantasyMoviePage />} />
<Route path="/fantasy" element={<MyFantasyMovie />} />
          <Route path="/actors" element={<ActorsPage />} />
          <Route path="/actors/favourites" element={<FavouriteActorsPage />} /> {/* <-- Add this line */}
          <Route path="/tv-series" element={<TVSeriesPage />} /> {/* ✅ List page */}
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/tv-series/favourites" element={<FavouriteTVSeriesPage />} /> {/* <-- Add this line */}
  <Route path="/tv-series/:id" element={<TvSeriesDetailPage />} /> {/* ✅ Correct Detail page */}
  <Route path="*" element={<Navigate to="/" />} />
        </Routes>
         </PlaylistsProvider> {/* <-- And this line */}
        </FavouritesProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
