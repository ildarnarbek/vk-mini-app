import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Avatar} from '@vkontakte/vkui';

const FriendsList = ({friends, go}) => {
return (
		<>
			{friends ? 
			friends.map((friend, i) => {
				return (
					<div key={i}>
						<Cell  onClick={go} data-to="friend" data-id={friend.id}
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
	go: PropTypes.func.isRequired,
	friends: PropTypes.arrayOf(PropTypes.shape({
		photo_100: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
	}),
	)
};

export default FriendsList;
