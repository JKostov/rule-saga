
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

const UsersList = ({ users }) => {
  if (users.length === 0) {
    return 'No employees yet...';
  }

  return (
    <Grid stackable centered columns={1}>
      {
        users.map(user => {
          return <Grid.Column key={user.name}>{user.name} {user.lastname}</Grid.Column>
        })
      }
    </Grid>
  );
};

export default UsersList;
