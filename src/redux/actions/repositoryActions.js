import {
  SEARCH_REPOSITORIES,
  SEARCH_REPOSITORIES_FAILURE,
  SEARCH_REPOSITORIES_SUCCESS,
} from './actionTypes';

// Action to initiate the search request
export const searchRepositories = (query, page = 1, perPage = 10) => ({
  type: SEARCH_REPOSITORIES,
  query,
  page,
  perPage,
});

// Action for successful repository fetch
export const searchRepositoriesSuccess = (repositories, totalCount) => ({
  type: SEARCH_REPOSITORIES_SUCCESS,
  repositories,
  totalCount,
});

// Action for failed repository fetch
export const searchRepositoriesFailure = (error) => ({
  type: SEARCH_REPOSITORIES_FAILURE,
  error,
});
