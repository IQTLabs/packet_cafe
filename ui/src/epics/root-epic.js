import { combineEpics } from 'redux-observable';
import fetchResultsEpic from './fetch-results-epic';
import fetchToolStatusEpic from './fetch-status-epic';

const rootEpic = combineEpics(
  fetchResultsEpic,
  fetchToolStatusEpic
);

export default rootEpic;
