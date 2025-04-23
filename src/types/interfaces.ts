export interface BaseMovieProps {
  title: string;
  budget: number;
  homepage?: string;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  genres: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  genre_ids?: number[];
}

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
}
export interface MovieDetailsProps extends BaseMovieProps {
  genres: { id: number; name: string }[];
}
export interface MovieImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}
export type FilterOption = "title" | "genre";

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  agree: boolean;
  rating: number;
  movieId: number;
}

export interface GenreData {
  genres: { id: string; name: string }[];
}

export interface DiscoverMovies {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}
export interface BaseActorProps {
  name: string;
  id: number;
  popularity: number;
  profile_path?: string;
}

export interface BaseActorListProps {
  actors: BaseActorProps[];
  action: (actor: BaseActorProps) => React.ReactNode;
}
export type BaseTvSeriesProps = {
  id: number;
  name: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  first_air_date: string;
  genre_ids: number[];
};
export type TvGenre = {
  id: number;
  name: string;
};