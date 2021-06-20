import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Group, Div, CellButton } from '@vkontakte/vkui';

import FriendsList from '../components/FriendsList';

const Home = ({ id,fetchedUser, getFriends, fetchedFriends }) => (
	<Panel id={id}>
		<PanelHeader>Friends list</PanelHeader>
		{fetchedUser &&
		<Group>
			<Div>{`Hello ,${fetchedUser.first_name}!!`}</Div>
		</Group>}
		<CellButton onClick={getFriends} >Get friends list</CellButton>
		<FriendsList fetchedFriends = {fetchedFriends} />
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
