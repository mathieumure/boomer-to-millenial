import jsonData from "./data.json";

export type Movie = {
  title: string;
  type: "TVSeries" | "Movie";
  date: string;
  directors: string;
  score: string;
  imageUrl: string;
  description: string;
  duration: string;
  genres: string[];
};

export const data = jsonData as Movie[];
