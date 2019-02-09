
import React from 'react';
import { Grid} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import style from './style.scss';

const RulesGrid = ({ rules, category, push }) => {
  if (!rules.length) {
    return 'No rules yet...';
  }

  return (
    <Grid stackable centered columns={3} className={style.wrapper}>
      {rules.map(rule => (
        <Grid.Column
          key={rule.name}
          className={style.rule}
          onClick={() => push(`/category/${category}/rule/${rule.name}`)}
        >
          {rule.name}
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default RulesGrid;

PropTypes.defaultProps = {
  rules: [],
};

PropTypes.propTypes = {
  category: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  rules: PropTypes.string.isRequired,
};
