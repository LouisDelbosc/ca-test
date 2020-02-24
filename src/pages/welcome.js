import React, { useState } from "react";
import { useFetchMovie } from "../hooks/useFetchMovie";
import { MovieLink } from "../components/movieLink";

export function Welcome(props) {
  const [filter, setFilter] = useState(null);
  const options = filter
    ? {
        sort_by: `primary_release_date.${filter}`
      }
    : {};
  const [movies, _setMovies] = useFetchMovie(options);
  return (
    <div>
      <h1>Welcome</h1>
      <h3>Latest movies</h3>
      <label htmlFor="selectId">
        Filtres
        <select id="selectId" onChange={event => setFilter(event.target.value)}>
          <option value="none">None</option>
          <option value="desc">Derniere sorties</option>
          <option value="asc">Premiere sorties</option>
        </select>
      </label>
      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <MovieLink id={movie.id}>{movie.title}</MovieLink>
            </li>
          ))}
      </ul>
    </div>
  );
}
