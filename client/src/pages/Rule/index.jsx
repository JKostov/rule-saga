
import React, {Component } from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { Segment } from "../../components/elements";

class RulePage extends Component {
  render() {
    return (
      <Segment>
        <div>rule</div>
      </Segment>
    );
  }
}

RulePage.defaultProps = {
};

RulePage.propTypes = {
};


export default withRouter(RulePage);
