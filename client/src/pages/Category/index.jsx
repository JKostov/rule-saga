
import React, {Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import { Segment, SubHeader } from '../../components/elements';
import RulesList from '../../components/RulesList';
import { getRulesByCategory } from './../../thunks/rule';
import {Button, Input} from "semantic-ui-react";
import style from './style.scss';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
    };

    this.filterByTags = this.filterByTags.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
  }

  componentDidMount() {
    const { location: { state: { category } }, getRulesByCategoryAction } = this.props;
    if (!category) {
      return null;
    }

    console.log('mount');
    getRulesByCategoryAction(category);
  }

  filterByTags() {
    const { location: { state: { category } }, getRulesByCategoryAction } = this.props;
    const { tags } = this.state;

    getRulesByCategoryAction(category, tags);
  }

  handleTagsChange(e) {
    this.setState({
      tags: e.target.value
        .split(',')
        .map(tag => tag.trim())
    })
  }

  render() {
    const { rules, history: { push }, location: { pathname }, user } = this.props;
    const { tags } = this.state;
    if (!rules) {
      return null;
    }

    const items = pathname.split('/');
    const category = items[items.length - 1];

    return (
      <Segment>
        <SubHeader header="Rules" />
        <Input
          type="text"
          name="Tags"
          placeholder="Tags"
          value={tags}
          onChange={this.handleTagsChange}
        />
        <Button onClick={this.filterByTags} content="Filter by tags"/>
        {user === null && <Button className={style.floatRight} content="Add new rule" /> }
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
