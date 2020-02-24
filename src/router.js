import React from "react";
import { Welcome } from "./pages/welcome";
import { MovieDetails } from "./pages/movie";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Switch>
          <Route path="/movies/:movieId">
            <MovieDetails />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
