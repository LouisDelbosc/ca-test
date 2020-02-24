import { createStore, combineReducers } from "redux";
import { moviesReducer as movies } from "./moviesDucks";

const rootReducer = combineReducers({
  movies
});

export default createStore(rootReducer);
