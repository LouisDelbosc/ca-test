import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { movieFetch } from "../moviefetch";
import { MovieSuggestions } from "../components/movieSuggestions";

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

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "start"
};

const divElemStyle = {
  textAlign: "left"
};

export function MovieDetails(props) {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const json = await movieFetch(`/movie/${movieId}`);
      setMovie(json);
    };
    fetchData();
  }, [movieId]);

  return (
    <div>
      <h1>{movie && displayProperty(movie, "title")}</h1>
      {movie && (
        <>
          <div style={containerStyle}>
            {computeMovieData(movie).map(({title, value}) => (
              <div key={title} style={divElemStyle}>
                {title} : {value}
              </div>
            ))}
          </div>
          <MovieSuggestions id={movie.id} />
        </>
      )}
    </div>
  );
}
