import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import store from './store';
import { useActions } from './components/FriendsSlice';
import { useSelector } from 'react-redux';
import Home from './panels/Home';



const App = () => {
	const [activePanel, setActivePanel] = useState('home');

	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

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
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const userSlice = useSelector((state) => state.FriendsSlice.user);

	return (
		<AdaptivityProvider>
			<AppRoot>
					<View activePanel={activePanel} popout={popout}>
						<Home id='home' fetchedUser={userSlice} go={go} />
					</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
