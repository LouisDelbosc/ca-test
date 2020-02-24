import { useState, useEffect } from "react";
import { movieFetch } from "../moviefetch";

export function getDate(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [
    year,
    month > 9 ? month : `0${month}`,
    day > 9 ? day : `0${day}`
  ].join("-");
}

export function objectToString(options) {
  return Object.keys(options).reduce(
    (acc, val) => `${acc}&${val}=${options[val]}`,
    ""
  );
}

export function useFetchMovie(options) {
  const [movies, setMovies] = useState([]);
  const withDefaultOptions = {
    "primary_release_date.lte": getDate(),
    ...(options || {})
  };
  useEffect(() => {
    const fetchData = async () => {
      const json = await movieFetch(
        "/discover/movie",
        withDefaultOptions || {}
      );
      setMovies(json.results);
    };
    fetchData();
  }, [objectToString(withDefaultOptions)]);
  return [movies, setMovies];
}
