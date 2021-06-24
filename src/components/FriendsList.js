import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Header, Group, Cell, Div, Avatar, FormItem, SliderSwitch, FormLayoutGroup, Input} from '@vkontakte/vkui';

import { useActions } from './FriendsSlice';

const FriendsList = (props) => {
	const {friends} = props

return (
		<>
			{friends ? 
			friends.map((friend, i) => {
				return (
					<div key={i}>
						<Cell
						before={friend.photo_100 ? <Avatar src={friend.photo_100}/> : null}
					>
						{`${friend.first_name} ${friend.last_name}`}
					</Cell>
					</div>
				);
				})
			 : null}
		</>
		)
	};

FriendsList.propTypes = {
	fetchedFriends: PropTypes.arrayOf(PropTypes.shape({
		photo_100: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
	}),)
};

export default FriendsList;
