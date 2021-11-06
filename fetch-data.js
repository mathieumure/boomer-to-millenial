import fetch from "node-fetch";
import path from "path";
import { writeFile } from "fs/promises";
import download from "download";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.IMDB_API_KEY;
const POSTERS_LOCAL_URL = "/images";
const POSTERS_FOLDER = `${path.resolve()}/public${POSTERS_LOCAL_URL}`;

const ids = {
  squidGame: "tt10919420",
  queensGambit: "tt10048342",
  peakyBlinders: "tt2442560",
  sherlock: "tt1475582",
  dune: "tt1160419",
  eternels: "tt9032400",
  mourirPeutAttendre: "tt2382320",
  armyOfThieves: "tt13024674",
  redNotice: "tt7991608",
  spiderMan: "tt10872600",
  interstellar: "tt0816692",
  armyOfTheDead: "tt0993840",
  premierContact: "tt2543164",
  avengers: "tt4154796",
  dunkerque: "tt5013056",
};

const data = await Promise.all(
  Object.values(ids).map((id) =>
    fetch(`https://imdb-api.com/fr/API/Title/${API_KEY}/${id}/Posters`)
      .then((response) => response.json())
      .then(toModel)
      .then(downloadPoster)
  )
);

writeFile(`${path.resolve()}/src/data.json`, JSON.stringify(data));

function toModel(movieDto) {
  return {
    title: movieDto.title,
    type: movieDto.type,
    date: movieDto.releaseDate,
    directors: movieDto.directors,
    score: movieDto.imDbRating,
    imageUrl: (movieDto.posters.posters[0] || {}).link,
    description: movieDto.plotLocal,
    duration: movieDto.runtimeStr,
    genres: movieDto.genreList.map((genre) => genre.value),
  };
}

/**
 * Download the poster of the movie and use it instead of the remote file (allow offline usage)
 */
function downloadPoster(movie) {
  const posterUrl = movie.imageUrl;

  if (!posterUrl) {
    console.warn("/!\\ No poster for movie", movie.title);
    return movie;
  }

  return download(posterUrl, POSTERS_FOLDER).then(() => {
    console.log(`Successfully downloaded poster for movie ${movie.title}`);
    return {
      ...movie,
      imageUrl: `${POSTERS_LOCAL_URL}/${movie.imageUrl.split("/").slice(-1)}`,
    };
  });
}
