import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducer';
import * as Sentry from '@sentry/react';

// Sentry Redux Enhancer
const sentryReduxEnhancer = Sentry.createReduxEnhancer();

// Middleware setup
const middleware = (getDefaultMiddleware) => {
  const middlewares = [promise, thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  return [...getDefaultMiddleware(), ...middlewares];
};

// Root reducer with CLEAR_STORE action handling
const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STORE') {
    state = undefined;
  }
  return reducer(state, action);
};

// Store configuration
const store = configureStore({
  reducer: rootReducer,
  middleware,
  enhancers: (getDefaultEnhancers) => {
    return getDefaultEnhancers().concat(sentryReduxEnhancer);
  }
});

window.store = store;

export default store;
