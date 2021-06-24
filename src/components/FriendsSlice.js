import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import FriendsRepository from '../repositories/FriendsRepository';
import store from '../store';

const sliceName = 'FriendsSlice';

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


const { tokenReceived, friendsReceived,userReceived, friendsFiltred} = slice.actions;

export const useActions = () => {
  const dispatch = useDispatch();

  return {
    getUser: () => {
      return FriendsRepository.getCurrentUser()
        .then(data => {
          dispatch(userReceived(data))
        })
    },
    getToken: () => {
      return FriendsRepository.getAccessToken()
        .then(data =>  {
          dispatch(tokenReceived(data.access_token))
        })
    },

    getFriends: () => {
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
