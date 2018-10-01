import { OPEN_PAGE } from './actions';

export const openPage = (id) => {
  return {
    action: OPEN_PAGE,
    id: id
  };
};