
import React, {Fragment} from 'react';
import {Button, Grid, Input} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SubHeader from "../elements/SubHeader";
import style from './style.scss'

const CategoriesGrid = ({ categories, push, handleAddNewCategory, addNewCategory, newCategory}) => {
  if (!categories.length) {
    return 'No categories yet...';
  }

  return (
    <Fragment>
    <SubHeader header="Categories" />
      <div className={style.padding}>
        <Input
          type="text"
          name="add-new-category"
          placeholder="Add new category"
          value={newCategory}
          onChange={handleAddNewCategory}
        />
        <Button onClick={addNewCategory} content="Add new category"/>
      </div>
      <Grid stackable columns={3}>
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
