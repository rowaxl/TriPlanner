import { UPDATE_AUTH } from '../actions/types';

export default (state = '', action) => {
  switch (action.type) {
    case UPDATE_AUTH:
      return action.payload;
    default:
      return state;
  }
}