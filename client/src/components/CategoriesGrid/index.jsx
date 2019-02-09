
import React, {Fragment} from 'react';
import {Button, Grid} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SubHeader from "../elements/SubHeader";
import style from './style.scss'

const CategoriesGrid = ({ categories, push, user }) => {
  if (!categories.length) {
    return 'No categories yet...';
  }

  return (
    <Fragment>
    <SubHeader header="Categories" />
      {user || <Button content="Add new rule" /> }
      <Grid stackable centered columns={3}>
      {categories.map(category => (
        <Grid.Column key={category} className={style.rule} onClick={() => push({
          pathname: `/category/${category
            .split(' ')
            .map(word => word.toLowerCase())
            .join('-')}`,
          state: { category }
        })}
        >
          {category}
        </Grid.Column>
      ))}
    </Grid>
    </Fragment>
  );
};

export default CategoriesGrid;

PropTypes.defaultProps = {
  categories: [],
  user: null,
};

PropTypes.propTypes = {
  user: PropTypes.shape({}),
  push: PropTypes.func.isRequired,
  categories: PropTypes.string.isRequired,
};
