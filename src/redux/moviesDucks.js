const initialState = {
  favoriteMovies: []
};

const ADD_MOVIE = "ADD_MOVIE";
const REMOVE_MOVIE = "REMOVE_MOVIE";

export function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MOVIE: {
      const { id, title } = action.payload;
      return {
        ...state,
        favoriteMovies: [...state.favoriteMovies, { id, title }]
      };
    }
    case REMOVE_MOVIE: {
      const { id } = action.payload;
      const { favoriteMovies } = state;
      return {
        ...state,
        favoriteMovies: favoriteMovies.filter(({ id: movieId }) => id !== movieId)
      };
    }
    default:
      return state;
  }
}

export function addMovie({ id, title }) {
  return {
    type: ADD_MOVIE,
    payload: { id, title }
  };
}

export function removeMovie({ id }) {
  return {
    type: REMOVE_MOVIE,
    payload: { id }
  };
}
