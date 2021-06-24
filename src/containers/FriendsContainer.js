import React from 'react';

import Filter from '../components/Filter';

const FriendsContainer = (props) => {
  const {friends} = props
  return <Filter friends = {friends}/>;
};

export default FriendsContainer;
