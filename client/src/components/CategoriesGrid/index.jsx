
import React, {Fragment} from 'react';
import { Grid} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SubHeader from "../elements/SubHeader";
import style from './style.scss'

const CategoriesGrid = ({ categories, push }) => {
  if (!categories.length) {
    return 'No categories yet...';
  }

  return (
    <Fragment>
    <SubHeader header="Categories" />
      <Grid stackable centered columns={3}>
      {categories.map(category => (
        <Grid.Column key={category} className={style.rule} onClick={() => push(`/category/${category}/rules`)}
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
};

PropTypes.propTypes = {
  push: PropTypes.func.isRequired,
  categories: PropTypes.string.isRequired,
};
