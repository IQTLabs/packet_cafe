import { combineEpics } from 'redux-observable';
import autoFetchResultsEpic from "epics/auto-fetch-results-epic"
import fetchResultsEpic from './fetch-results-epic';
import fetchToolStatusEpic from './fetch-status-epic';
import fetchToolResultsEpic from './fetch-tool-results-epic';
import fetchToolsEpic from './fetch-tools-epic';

const rootEpic = combineEpics(
  autoFetchResultsEpic,
  fetchResultsEpic,
  fetchToolStatusEpic,
  fetchToolResultsEpic,
  fetchToolsEpic,
);

export default rootEpic;
