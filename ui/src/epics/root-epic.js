import { combineEpics } from 'redux-observable';
import fetchResultsEpic from './fetch-results-epic';

const rootEpic = combineEpics(
  fetchResultsEpic
);

export default rootEpic;
