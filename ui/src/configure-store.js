import { createStore, applyMiddleware, compose } from "redux";

import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './domain/root-reducer';
import rootEpic from './epics/root-epic';

// Replace redux compose with redux-devtools compose if it exists
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch(e) {
    console.log(e)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return {}
    return JSON.parse(serializedState)
  } catch(e) {
    console.log(e)
    return {}
  }
}

const configureStore = () => {
  const persistedState = loadFromLocalStorage()
  const middleware = createEpicMiddleware()

  const store = createStore(rootReducer,
    persistedState,
    composeEnhancers(
      applyMiddleware(middleware)
    )
  );

  middleware.run(rootEpic);

  store.subscribe(() => saveToLocalStorage(store.getState()))
  return store;
};

export default configureStore;
