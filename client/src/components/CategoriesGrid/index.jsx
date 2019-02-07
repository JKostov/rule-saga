
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

const CategoriesGrid = ({ categories }) => {
  if (!categories.length) {
    return 'No categories yet...';
  }

  return (
    <Grid stackable centered columns={3}>
      {categories.map(category => (
        <Grid.Column>{category}</Grid.Column>
      ))}
    </Grid>
  );
};

export default CategoriesGrid;

PropTypes.defaultProps = {
  categories: [],
};

PropTypes.propTypes = {
  categories: PropTypes.string.isRequired,
};
