import { CHANGE_AUTH } from '../actions/types';

export default (state = '', action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return action.payload;
    default:
      return state;
  }
}