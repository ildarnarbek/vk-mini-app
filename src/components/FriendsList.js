import React from 'react';
import PropTypes from 'prop-types';

import { Header, Group, Cell, Div, Avatar} from '@vkontakte/vkui';

const FriendsList = ({ fetchedFriends }) => (
		<Group header={<Header mode="secondary">Friends list</Header>}>
			<Div>
			{fetchedFriends? 
			fetchedFriends.map((friend, i) => {
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
			</Div>
		</Group>
);

FriendsList.propTypes = {
	fetchedFriends: PropTypes.arrayOf(PropTypes.shape({
		photo_100: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
	}),)
};

export default FriendsList;
