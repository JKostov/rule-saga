
import React, {Component } from 'react';
import queryString from 'query-string';
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
      tags: '',
    };

    this.filterByTags = this.filterByTags.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
  }

  componentDidMount() {
    const { location: { pathname, search }, getRulesByCategoryAction } = this.props;
    const pathStrings = pathname.split('/');
    const query = queryString.parse(search);
    const category = pathStrings[pathStrings.length - 2];
    if (!category) {
      return null;
    }
    const payload = {
      category,
    };

    if (query['tags[]']) {
      payload.tags = query['tags[]'];
    }
    getRulesByCategoryAction(payload);
  }

  filterByTags() {
    const { location: { pathname }, history: { push } } = this.props;
    const { tags } = this.state;
    const pathStrings = pathname.split('/');
    const category = pathStrings[pathStrings.length - 2];

    push(`/category/${category}/rules?tags[]=${tags}`);
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
    const category = items[items.length - 2];

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
        {user === null && <Button onClick={() => push(`/category/${category}/rule/new`)} className={style.floatRight} content="Add new rule" /> }
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
