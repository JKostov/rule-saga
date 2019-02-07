
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

const UsersList = ({ users }) => {
  if (users.length === 0) {
    return 'No employees yet...';
  }

  return (
    <Grid stackable centered columns={3}>
      {
        users.map(user => {
          return <Grid.Column>{user.name}</Grid.Column>
        })
      }
    </Grid>
  );
};

export default UsersList;

PropTypes.defaultProps = {
  users: [],
};

PropTypes.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
};
