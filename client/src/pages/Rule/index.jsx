
import React, {Component } from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { Segment } from "../../components/elements";
import Rule from "../../components/Rule";

class RulePage extends Component {
  render() {
    const { history: { location: { state } } } = this.props;

    return (
      <Segment>
        <Rule rule={state.rule} />
      </Segment>
    );
  }
}

RulePage.defaultProps = {
  user: null,
};

RulePage.propTypes = {
  company: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}),
};


export default withRouter(RulePage);
