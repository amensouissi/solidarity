import { syncTranslationWithStore, loadTranslations, setLocale } from 'react-redux-i18n';
import { persistStore } from 'redux-persist';

import configureStore from './configureStore';
import middlewares from './middlewares';
import rootReducer from '../reducers/rootReducer';
import { getTranslation } from '../utils/i18n';

export default function createAppStore(initialState) {
  const store = configureStore(initialState, rootReducer, middlewares);
  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer').default; // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }
  syncTranslationWithStore(store);
  store.dispatch(loadTranslations(getTranslation()));
  store.dispatch(setLocale('en'));
  return { store: store, persistor: persistStore(store) };
}