import { takeLatest, call, put } from 'redux-saga/effects';
import {
  searchRepositoriesSuccess,
  searchRepositoriesFailure,
} from '../actions/repositoryActions';
import { searchRepositories } from '../../api/repository';
import { SEARCH_REPOSITORIES } from '../actions/actionTypes';

// Saga for searching repositories
function* searchRepositoriesSaga({ query, page, perPage }) {
  try {
    const data = yield call(searchRepositories, query, page, perPage);
    const repositories = data.items;
    const totalCount = data.total_count;
    yield put(searchRepositoriesSuccess(repositories, totalCount));
  } catch (error) {
    yield put(searchRepositoriesFailure(error.message));
  }
}

// Watch for the search repositories action
export function* watchSearchRepositories() {
  yield takeLatest(SEARCH_REPOSITORIES, searchRepositoriesSaga);
}
