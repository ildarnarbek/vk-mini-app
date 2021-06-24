import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { FriendsContainerReducers } from '../containers/index';

const store = configureStore({
  reducer: combineReducers({
    ...FriendsContainerReducers,
  }),
});

export default store;
