// src/store/configureStore.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import repositoryReducer from '../redux/reducer/repositoryReducer'; // Import repository reducer
import {watchSearchRepositories} from './sagas/repositorySagas';

const sagaMiddleware = createSagaMiddleware();

// Combine reducers
const rootReducer = combineReducers({
  repositories: repositoryReducer,  // Repository-related state
});

// Create store with combined reducers
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Run both sagas
sagaMiddleware.run(watchSearchRepositories);

export default store;
