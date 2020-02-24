import React from "react";
import { useParams } from "react-router-dom";

export function MovieDetails(props) {
  const { movieId } = useParams();
  return <div>Movie id: {movieId}</div>;
}
