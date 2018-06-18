import React from 'react';

import Tables from '../Tables/Table'

const getRigthOrder = (data) => {
  return data.sort((a, b) =>
    b.points - a.points).map(ele => [ele.user, ele.points])
}

export default ({users}) => {
  return (
    <Tables values={getRigthOrder(users)} />
  )
}
