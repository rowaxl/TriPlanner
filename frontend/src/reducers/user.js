import { USER_DETAIL } from '../actions/types';

export default (state = { userId: '', name: '', role: 1 }, action) => {
  switch (action.type) {
    case USER_DETAIL:
      return action.payload;
    default:
      return state;
  }
};