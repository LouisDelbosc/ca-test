import { useState, useEffect } from "react";
import { movieFetch } from "../moviefetch";

const MAX_DIGIT = 9;
const MIN_DIGIT = 0;

const isSingleDigit = number => number <= MAX_DIGIT && number > MIN_DIGIT;

export function getDate(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [
    year,
    isSingleDigit(month) ? `0${month}` : month,
    isSingleDigit(day) ? `0${day}` : day
  ].join("-");
}

export function objectToString(options) {
  return Object.keys(options).reduce((acc, val) => `${acc}&${val}=${options[val]}`, "");
}

export function useFetchMovies(options) {
  const [movies, setMovies] = useState([]);
  const withDefaultOptions = {
    "primary_release_date.lte": getDate(),
    ...(options || {})
  };
  useEffect(() => {
    const fetchData = async () => {
      const json = await movieFetch("/discover/movie", withDefaultOptions || {});
      setMovies(json.results);
    };
    fetchData();
  }, [objectToString(withDefaultOptions)]);
  return [movies, setMovies];
}

export function useFetchMovie(movieId) {
  const [movie, setMovie] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const json = await movieFetch(`/movie/${movieId}`);
      setMovie(json);
    };
    fetchData();
  }, [movieId]);
  return movie;
}
