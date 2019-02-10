
import React, {Component } from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Segment } from "../../components/elements";
import Rule from '../../components/Rule';
import { getRule } from "../../thunks/rule";

class RulePage extends Component {
  componentDidMount() {
    const { location: { pathname }, getRuleAction } = this.props;
    const pathStrings = pathname.split('/');
    const ruleId = pathStrings[pathStrings.length - 1];

    getRuleAction(ruleId);
  }
  render() {
    const { rule } = this.props;
    if (!rule ) {
      return null;
    }

    const { location: { pathname }, history: { push } } = this.props;
    const pathStrings = pathname.split('/');
    const category = pathStrings[pathStrings.length - 3];

    return (
      <Segment>
        <Rule push={push} category={category} rule={rule}>rule</Rule>
      </Segment>
    );
  }
}

RulePage.defaultProps = {
  rule: null,
};

RulePage.propTypes = {
  rule: PropTypes.shape({}),
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
      getRuleAction: getRule,
  },
  dispatch,
);

const mapStateToProps = ({ rule }) => ({
    rule: rule.get('rule'),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RulePage));
