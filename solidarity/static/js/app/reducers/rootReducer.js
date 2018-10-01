import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';

import * as actions from '../actions/actions';

export const app = (state = {}, action) => {
  switch (action.type) {
  case actions.OPEN_PAGE:
    return { openedPage: action.id };
  default:
    return state;
  }
};

export default combineReducers({
  i18n: i18nReducer,
  app: app
});