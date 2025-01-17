import {
  SEARCH_REPOSITORIES,
  SEARCH_REPOSITORIES_FAILURE,
  SEARCH_REPOSITORIES_SUCCESS,
  TOGGLE_FAVORITE,
} from '../actions/actionTypes';

const initialState = {
  repositories: [],
  favorites: [], // Stores favorite repositories
  loading: false,
  error: null,
  page: 1,
  perPage: 10,
  totalCount: 0,
};

const repositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REPOSITORIES:
      return { ...state, loading: true, error: null };

    case SEARCH_REPOSITORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        repositories: state.page === 1
          ? action.repositories
          : [...state.repositories, ...action.repositories],
        totalCount: action.totalCount,
        page: state.page + 1,
      };

    case SEARCH_REPOSITORIES_FAILURE:
      return { ...state, loading: false, error: action.error };

    case TOGGLE_FAVORITE:
      const repoId = action.repo.id; // Assuming each repo has a unique 'id'
      const isAlreadyFavorite = state.favorites.some((repo) => repo.id === repoId);
      const updatedFavorites = isAlreadyFavorite
        ? state.favorites.filter((repo) => repo.id !== repoId)
        : [...state.favorites, action.repo];

      return { ...state, favorites: updatedFavorites };

    default:
      return state;
  }
};

export default repositoryReducer;
