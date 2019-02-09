
import React, {Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import { Segment, SubHeader } from '../../components/elements';
import RulesList from '../../components/RulesList';
import { getRulesByCategory } from './../../thunks/rule';
import {Button} from "semantic-ui-react";
import style from './style.scss';

class Category extends Component {
  componentDidMount() {
    const { location: { state: { category } }, getRulesByCategoryAction } = this.props;
    if (!category) {
      return null;
    }
    getRulesByCategoryAction(category);
  }

  render() {
    const { rules, history: { push }, location: { pathname }, user } = this.props;
    if (!rules) {
      return null;
    }

    const items = pathname.split('/');
    const category = items[items.length - 1];

    return (
      <Segment>
        <SubHeader header="Rules" />
        {user || <Button className={style.floatRight} content="Add new rule" /> }
        <RulesList push={push} rules={rules} category={category} />
      </Segment>
    );
  }
}

Category.defaultProps = {
  user: null,
};

Category.propTypes = {
  getRulesByCategoryAction: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getRulesByCategoryAction: getRulesByCategory,
  },
  dispatch,
);

const mapStateToProps = ({ rule, auth }) => ({
  rules: rule.get('rulesByCategory'),
  user: auth.get('user'),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
