import { CHANGE_AUTH } from './types';

export const updateAuth = ({ id, password }) => {
  // TODO: call signin api and get access-token
  return {
    type: CHANGE_AUTH,
    payload: '' // TODO: set access-token
  }
}