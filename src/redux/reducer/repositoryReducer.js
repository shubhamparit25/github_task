import {
  SEARCH_REPOSITORIES,
  SEARCH_REPOSITORIES_FAILURE,
  SEARCH_REPOSITORIES_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  repositories: [],
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

    default:
      return state;
  }
};

export default repositoryReducer;
