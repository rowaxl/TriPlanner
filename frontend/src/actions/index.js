import { UPDATE_AUTH, USER_DETAIL } from './types';

export const updateAuth = accessToken => {
  if (accessToken !== null) {
    localStorage.setItem('access-token', accessToken);
  }

  return {
    type: UPDATE_AUTH,
    payload: accessToken
  }
};

export const updateUserDetail = userDetail => {
  if (userDetail !== null) {
    localStorage.setItem('user-id', userDetail._id);
  }

  return {
    type: USER_DETAIL,
    payload: userDetail
  }
};