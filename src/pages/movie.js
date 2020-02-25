import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchMovie } from "../hooks/useFetchMovie.js";
import { MovieSuggestions } from "../components/movieSuggestions";
import { addMovie, removeMovie } from "../redux/moviesDucks";

function displayProperty(movie, property, prefix = "") {
  return movie[property] ? `${prefix}${movie[property]}` : " - ";
}

function displayListProperty(movie, property, key) {
  const list = movie[property].map(obj => obj[key]).join(", ");
  return list.length === 0 ? " - " : list;
}

function computeMovieData(movie) {
  return [
    {
      title: "Pays",
      value: displayListProperty(movie, "production_countries", "name")
    },
    { title: "Budget", value: displayProperty(movie, "budget", "$") },
    { title: "Revenue", value: displayProperty(movie, "revenue", "$") },
    {
      title: "Note",
      value: `${displayProperty(movie, "vote_average") * 10}/100`
    },
    { title: "Genres", value: displayListProperty(movie, "genres", "name") },
    { title: "Date de sortie", value: displayProperty(movie, "release_date") },
    { title: "Durée", value: displayProperty(movie, "runtime") },
    { title: "Synopsis", value: displayProperty(movie, "overview") }
  ];
}

const divElemStyle = {
  textAlign: "left"
};

export function FavoriteButton({ movie }) {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(({ movies }) => movies.favoriteMovies);
  const isFavorite = Boolean(favoriteMovies.find(favMovie => favMovie.id === movie.id));
  return !isFavorite ? (
    <a href="#" className="badge badge-pill badge-dark" onClick={() => dispatch(addMovie(movie))}>
      Ajouter aux Favoris
    </a>
  ) : (
    <a
      href="#"
      className="badge badge-pill badge-primary"
      onClick={() => dispatch(removeMovie(movie))}
    >
      Favoris
    </a>
  );
}

export function MovieDetails(props) {
  const { movieId } = useParams();
  const movie = useFetchMovie(movieId);
  return (
    <>
      {movie && (
        <>
          <div className="container card">
            <div style={{ alignItems: "center" }} className="card-header row">
              <h5 style={{ marginRight: "0.5rem" }}>{movie && displayProperty(movie, "title")}</h5>
              <h6 className="">
                <FavoriteButton movie={movie} />
              </h6>
            </div>
            <div className="card-body">
              {computeMovieData(movie).map(({ title, value }) => (
                <div className="card-text" key={title}>
                  {title} : {value}
                </div>
              ))}
            </div>
          </div>
          <MovieSuggestions id={movie.id} />
        </>
      )}
    </>
  );
}
