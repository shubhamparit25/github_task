import { takeLatest, call, put } from 'redux-saga/effects';
import {
  searchRepositoriesSuccess,
  searchRepositoriesFailure,
} from '../actions/repositoryActions';
import { fetchRepositories } from '../../api/githubApi';
import { SEARCH_REPOSITORIES } from '../actions/actionTypes';

// Saga for searching repositories
function* searchRepositoriesSaga({ query, page, perPage }) {
  try {
    const data = yield call(fetchRepositories, query, page, perPage);
    const repositories = data.items;
    const totalCount = data.total_count; // Get total count from the API response
    yield put(searchRepositoriesSuccess(repositories, totalCount)); // Dispatch success action with fetched repositories
  } catch (error) {
    yield put(searchRepositoriesFailure(error.message)); // Dispatch failure action with error message
  }
}

// Watch for the search repositories action
export function* watchSearchRepositories() {
  yield takeLatest(SEARCH_REPOSITORIES, searchRepositoriesSaga); // Listen for search repositories actions
}
