import jsonData from "./data.json";

export type MovieType = "TVSeries" | "Movie";
export type Movie = {
  title: string;
  type: MovieType;
  date: string;
  directors: string;
  score: string;
  imageUrl: string;
  description: string;
  duration: string;
  genres: string[];
};

export const data = jsonData as Movie[];
