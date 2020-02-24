import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFetchMovies } from "../hooks/useFetchMovie";
import { MovieLink } from "../components/movieLink";

const NO_FILTER = "none";

export function Welcome(props) {
  const [filter, setFilter] = useState(NO_FILTER);
  const options =
    filter !== NO_FILTER
      ? {
          sort_by: `primary_release_date.${filter}`
        }
      : {};
  const [movies, _setMovies] = useFetchMovies(options);
  const { favoriteMovies } = useSelector(state => state.movies);
  return (
    <div>
      <h1>Bienvenue</h1>
      <h3>Films Favoris</h3>
      {favoriteMovies.length !== 0 ? (
        <ul>
          {favoriteMovies.map(movie => (
            <li key={movie.id}>
              <MovieLink id={movie.id}>{movie.title}</MovieLink>
            </li>
          ))}
        </ul>
      ) : (
        <div>Pas de films favoris</div>
      )}
      <h3>Films</h3>
      <label htmlFor="selectId">
        Filtres
        <select id="selectId" onChange={event => setFilter(event.target.value)}>
          <option value={NO_FILTER}>None</option>
          <option value="desc">Derniere sorties</option>
          <option value="asc">Premiere sorties</option>
        </select>
      </label>
      <ul>
        {movies &&
          movies.map(movie =>
            movie ? (
              <li key={movie.id}>
                <MovieLink id={movie.id}>{movie.title}</MovieLink>
              </li>
            ) : null
          )}
      </ul>
    </div>
  );
}
