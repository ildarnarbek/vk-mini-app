import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Group, Div, CellButton } from '@vkontakte/vkui';

import FriendsContainer from '../containers/FriendsContainer'
import { useActions } from '../components/FriendsSlice';

const Home = ({ id,fetchedUser }) => {

	const { getFriends } = useActions();

	const FriendsSlice = useSelector((state) => state.FriendsSlice.data);

	return(
	<Panel id={id}>
		<PanelHeader>Friends list</PanelHeader>
		{fetchedUser &&
		<Group>
			<Div>{`Hello ,${fetchedUser.first_name}!!`}</Div>
		</Group>}
		<CellButton onClick={getFriends} >Get friends list</CellButton>
		<FriendsContainer friends = {FriendsSlice} />
	</Panel>)
};

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
