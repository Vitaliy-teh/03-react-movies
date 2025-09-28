import axios, { type AxiosResponse } from "axios";
import type { MovieResponse } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";

export interface FetchMoviesParams {
  query: string;
  page?: number;
  language?: string;
  include_adult?: boolean;
}

export async function fetchMovies({
  query,
  page = 1,
  language = "en-US",
  include_adult = false,
}: FetchMoviesParams): Promise<MovieResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error("VITE_TMDB_TOKEN is not defined in environment variables");
  }

  const config = {
    params: {
      query,
      page,
      language,
      include_adult,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  };

  const response: AxiosResponse<MovieResponse> = await axios.get(API_URL, config);
  return response.data;
}
