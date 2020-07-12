import { UPDATE_AUTH } from './types';

export const updateAuth = token => {
  localStorage.setItem('accesstoken', token);

  return {
    type: UPDATE_AUTH,
    payload: token
  }
}