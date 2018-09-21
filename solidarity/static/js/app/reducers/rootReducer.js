import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';

export const app = (state = {}) => {
  return state;
};

export default combineReducers({
  i18n: i18nReducer,
  app: app
});