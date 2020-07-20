import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxPromise from 'redux-promise';
import reducers from './reducers'

export default ({ children, initialState = {} }) => {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const accessToken = localStorage.getItem('access-token');
  const userId = localStorage.getItem('user-id');

  if (accessToken && accessToken.length > 0) {
    Object.assign(initialState, { auth: accessToken, userDetail: { _id: userId } });
  }

  const store = createStore(
    reducers,
    initialState,
    composeEnhancer(
      applyMiddleware(reduxPromise)
    )
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}