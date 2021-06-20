import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [fetchedFriends, setFriends] = useState(null);
	const [token, setToken] = useState('');

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();

		async function getToken() {
			const tokenObj = await bridge.send("VKWebAppGetAuthToken", {"app_id": 7882655, "scope": "friends,status"});
			setToken(tokenObj.access_token)
		}
		getToken()
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};


	async function getAllFriends(){
		const users = await bridge.send("VKWebAppCallAPIMethod", {"method": "friends.get", "params": {"fields": "photo_100","v":"5.131", "access_token":token}});;
		setFriends(users.response.items)
		console.log('getting friends')
		await console.log(users.response.items)
	}

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout}>
					<Home id='home' fetchedUser={fetchedUser} go={go} fetchedFriends = {fetchedFriends} token = {token} getFriends={getAllFriends}/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
