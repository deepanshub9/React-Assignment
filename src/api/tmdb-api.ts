import { BaseMovieProps } from "../types/interfaces"; // ✅ Ensure correct import

export const getMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Failed to get movie data. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = () => {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch genres. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = async (id: string | number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  );
  if (!response.ok) throw new Error("Failed to fetch images");

  const json = await response.json();
  return json.posters.slice(0, 1);
};

export const getMovieReviews = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((res) => res.json())
    .then((json) => json.results);
};

export const getUpcomingMovies = async (): Promise<{
  results: BaseMovieProps[];
}> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch upcoming movies. Status: ${response.status}`
    );
  }
  return response.json();
};
export const getPopularMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  );
  if (!response.ok) throw new Error(`Failed to fetch popular movies.`);
  return response.json();
};
export const getPopularActors = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&page=${page}`
  );
  if (!response.ok) throw new Error(`Failed to fetch popular actors.`);
  return response.json();
};
export const getPopularTVSeries = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&page=${page}`
  );
  if (!response.ok) throw new Error(`Failed to fetch popular TV series.`);
  return response.json();
};
export const getTvSeriesDetails = async (id: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US`
  );
  if (!response.ok) throw new Error(`Failed to fetch TV series details.`);
  return response.json();
};
export const getTvGenres = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US`
  );
  if (!response.ok) throw new Error(`Failed to fetch TV genres.`);
  return response.json();
};
export const getSimilarMovies = async (id: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=1`
  );
  if (!response.ok) throw new Error(`Failed to fetch similar movies.`);
  return response.json();
};
export const getSimilarTvSeries = async (id: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=1`
  );
  if (!response.ok) throw new Error(`Failed to fetch similar TV series.`);
  return response.json();
};
