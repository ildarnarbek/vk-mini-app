import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Header, Group, Div, FormItem, SliderSwitch, FormLayoutGroup, Input, IconButton} from '@vkontakte/vkui';
import { Icon24ArrowDownOutline, Icon24ArrowUpOutline } from '@vkontakte/icons';
import { useActions } from './FriendsSlice';

import FriendsList from './FriendsList'

import './Filter.css';

const Filter = () => {
	const {getToken} = useActions();
  const { getFiltredFriends } = useActions();


  const FriendSlice = useSelector((state) => state.FriendsSlice.data);
  const FilterSlice = useSelector((state) => state.FriendsSlice.filtredFriends);


	const [sortingBy, setSortingBy] = useState('');
  const [sortingType, setSortingType] = useState(true);

  const onTextChange = (e) => {
    let selectedFriends = FriendSlice.filter( function(friend) {
      return (friend.first_name.includes(e.target.value)  || friend.last_name.includes(e.target.value));
    });
    getFiltredFriends(selectedFriends)
	};


  const sorting = (type) => {
      let sortedFriends = FilterSlice.slice().sort(function compare( a, b ) {
      if (sortingType) {
        if ( a[type] < b[type]  ){
          return -1;
        }
        if ( a[type]  > b[type]  ){
          return 1;
        }
        return 0;
      } else {
        if ( a[type] > b[type] ){
          return -1;
        }
        if ( a[type] < b[type] ){
          return 1;
        }
        return 0;
      }
    })

    return sortedFriends
  }

	const onByChange = (e) => {
		setSortingBy(e)
    getFiltredFriends(sorting(sortingBy))
	}

  const onTypeChange = (e) => {
    setSortingType(sortingType => !sortingType)
    getFiltredFriends(sorting(sortingBy))
  }

  useEffect(() => {
    getToken();
  }, []);

return (
		<Group header={<Header mode="secondary">Friends list</Header>}>
			{FriendSlice.length>0? 
			<Div>
      			<FormLayoutGroup mode="horizontal">
            <FormItem top="Sort by">
              <SliderSwitch 
                onSwitch={onByChange}
                options={[
                  {
                    name: 'First name',
                    value: 'first_name',
                  },
                  {
                    name: 'Last name',
                    value: 'last_name',
                  },
                ]}
              />
              
            </FormItem>
            <div className = "wrapper" >
                {sortingBy !== '' ?
                <IconButton className="icon" onClick={onTypeChange} children={sortingType?<Icon24ArrowDownOutline />:<Icon24ArrowUpOutline />}/>:
                null
              }
            </div>
            <FormItem top="Filter"> 
            <Input name="search" onChange={onTextChange}/>
            </FormItem>
            </FormLayoutGroup>
        <FriendsList friends={FilterSlice} />
        </Div>
			 : null}
		</Group>
		)
	};

export default Filter;
