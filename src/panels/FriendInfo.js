import React, {useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import { Panel, PanelHeader, PanelHeaderBack, Cell, Avatar, FormItem, Textarea, Button, Div} from '@vkontakte/vkui';

const FriendInfo = ({ id, go, friendId}) => {

  const [note, setNote] = useState('');

  const FriendsSlice = useSelector((state) => state.FriendsSlice.data)
  const selectedFriend = FriendsSlice.find(friend => friend.id == friendId);

  const getFriedInfo = () => {
    return bridge.send("VKWebAppStorageGet", {'keys': [String(friendId)]});
	}

  const setFriedInfo = () => {
    return bridge.send("VKWebAppStorageSet", {'key': String(friendId), "value": String(note)});
	}

  const onTextChange = (e) => {
    setNote(e.target.value)
	};


  useEffect(() => {
		getFriedInfo().then(
      data =>  setNote(data.keys[0].value)
		)

    console.log(note);
    
	}, []);

	return(
	<Panel id={id}>
    <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>
      Friend Info
    </PanelHeader>
    {selectedFriend ? 
        <>
        <Cell
              before={selectedFriend.photo_100 ? <Avatar src={selectedFriend.photo_100}/> : null}
            >
                {`${selectedFriend.first_name} ${selectedFriend.last_name}`}
        </Cell>
        <FormItem top="Note">
          <Textarea placeholder="Some info about" value={note} onChange={onTextChange}/>
        </FormItem>
        <Div>
        <Button onClick={setFriedInfo}>Save</Button>
        </Div>
        </>
        :
      null
    }

	</Panel>)
};

FriendInfo.propTypes = {
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

export default FriendInfo;
