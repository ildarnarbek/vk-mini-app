import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import store from './store';
import { useActions } from './components/FriendsSlice';
import { useSelector } from 'react-redux';
import Home from './panels/Home';



const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [fetchedFriends, setFriends] = useState(null);
	const [token, setToken] = useState('');


	const { getUser } = useActions();


	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});


		getUser().then(
			setPopout(null)
		)

		// async function fetchData() {
		// 	const user = await bridge.send('VKWebAppGetUserInfo');
		// 	setUser(user);
		// 	console.log(fetchedUser);

		// }
		// fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const userSlice = useSelector((state) => state.FriendsSlice.user);

	return (
		<AdaptivityProvider>
			<AppRoot>
					<View activePanel={activePanel} popout={popout}>
						<Home id='home' fetchedUser={userSlice} go={go} fetchedFriends = {fetchedFriends}/>
					</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
