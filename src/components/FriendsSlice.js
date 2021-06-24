import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';


// import PostRepository from '../repositories/PostRepository';
import FriendsRepository from '../repositories/FriendsRepository';
import store from '../store';

const sliceName = 'FriendsSlice';

/* eslint no-param-reassign: 0 */

const slice = createSlice({
  name: sliceName,
  initialState: {
    data: [],
    user: {},
    filtredFriends: [],
    accessToken: '',
    processing: true,
    processingError: null,
  },
  reducers: {
    start(state) {
      state.processingError = null;
      state.processing = true;
    },
    fail(state, { payload }) {
      state.processingError = payload.error;
      state.processing = false;
    },
    loadSuccess(state, { payload }) {
      state.data = payload;
      state.processing = false;
    },
    userReceived(state, { payload }) {
      state.user = payload;
      state.processing = false;
    },
    tokenReceived(state, { payload }) {
      state.accessToken = payload;
      state.processing = false;
    },
    friendsReceived(state, { payload }) {
      state.data = payload;
    },
    friendsFiltred(state, { payload }) {
      state.filtredFriends = payload;
    },
  },
});

/* eslint no-param-reassign: 1 */

const { start, fail, loadSuccess, tokenReceived, friendsReceived,userReceived, friendsFiltred} = slice.actions;

export const useActions = () => {
  const dispatch = useDispatch();

  return {
    // getPosts: () => {
    //   dispatch(start());
    //   return PostRepository.getPosts()
    //     .then((response) => response.json())
    //     .then((data) => data.filter((post) => post.userId === 1))
    //     .then((data) => data.map((post) => ({ ...post, isFavorite: false })))
    //     .then((data) => {
    //       dispatch(loadSuccess(data));
    //     })
    //     .catch((error) => {
    //       dispatch(fail({ error: error.message }));

    //       return Promise.reject(error);
    //     });
    // },
    getUser: () => {
      dispatch(start())
      return FriendsRepository.getCurrentUser()
        .then(data => {
          dispatch(userReceived(data))
        })
    },
    getToken: () => {
      dispatch(start());
      return FriendsRepository.getAccessToken()
        .then(data =>  {
          dispatch(tokenReceived(data.access_token))
        })
    },

    getFriends: () => {
      dispatch(start());
      // console.log(store.getState().FriendsSlice.accessToken);
      
      return FriendsRepository.getAllFriends(store.getState().FriendsSlice.accessToken)
        .then(data => {
          dispatch(friendsReceived(data.response.items))
          dispatch(friendsFiltred(data.response.items))
        }
        )
    },

    getFiltredFriends: (data) => {
      dispatch(friendsFiltred(data))
    }
  };
};

export default slice.reducer;
