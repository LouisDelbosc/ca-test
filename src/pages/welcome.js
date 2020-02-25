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
  const handleClick = value => () => setFilter(value);
  return (
    <div className="container">
      <div className="card">
        <h3 className="card-header">Films Favoris</h3>
        <div className="card-body">
          {favoriteMovies.length !== 0 ? (
            <div className="list-group">
              {favoriteMovies.map(movie => (
                <MovieLink key={movie.id} id={movie.id}>
                  {movie.title}
                </MovieLink>
              ))}
            </div>
          ) : (
            <div className="card-text">Selectionner des films en favoris</div>
          )}
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h3>Films</h3>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Trier par
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" onClick={handleClick(NO_FILTER)}>
                  Pertinence
                </a>
                <a class="dropdown-item" href="#" onClick={handleClick("asc")}>
                  Derniere sorties
                </a>
                <a class="dropdown-item" href="#" onClick={handleClick("desc")}>
                  Premiere sorties
                </a>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="card-text list-group list-group-flush">
              {movies &&
                movies.map(movie =>
                  movie ? (
                    <MovieLink key={movie.id} id={movie.id}>
                      {movie.title}
                    </MovieLink>
                  ) : null
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
