
import React from 'react';
import PropTypes from 'prop-types';

const Rule = ({ rule }) => {
  if (!rule) {
    return null;
  }

  return (
    <div>rule</div>
  );
};

Rule.defaultProps = {
  users: [],
};

Rule.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Rule;
