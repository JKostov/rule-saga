
import React, {Component } from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Segment } from "../../components/elements";
import Rule from '../../components/Rule';
import { getRule } from "../../thunks/rule";

class RulePage extends Component {

    constructor(props) {
        super(props);

        this.state = { loading: true };
    }

    componentDidMount() {
        const { location: { pathname, search }, getRuleAction } = this.props;
        const pathStrings = pathname.split('/');
        const ruleId = pathStrings[pathStrings.length - 1];
        console.log(ruleId);

        getRuleAction(ruleId);
    }
  render() {
      console.log('rule page');
    const { rule, history: { push } } = this.props;

    return (
      <Segment>
        <Rule rule={rule}>rule</Rule>
      </Segment>
    );
  }
}

RulePage.propTypes = {
    rule: PropTypes.shape({}).isRequired,
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
