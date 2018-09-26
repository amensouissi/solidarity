import 'raf/polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import './helpers/setupTranslations';

Object.defineProperty(document, 'cookie', {
  value: '_LOCALE_=en',
  writable: true
});