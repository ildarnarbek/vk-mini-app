import bridge from '@vkontakte/vk-bridge';

import store from '../store';

export default {
  getCurrentUser() {
    return bridge.send('VKWebAppGetUserInfo')
  },

  getAccessToken() {
    return bridge.send("VKWebAppGetAuthToken", {"app_id": 7882655, "scope": "friends,status"});
  },

  getAllFriends(token){
    return bridge.send("VKWebAppCallAPIMethod", {"method": "friends.get", "params": {"fields": "photo_100","v":"5.131", "access_token":token }})
	},

};
