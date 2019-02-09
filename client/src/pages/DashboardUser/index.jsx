
import React, {Component } from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import CategoriesGrid from "../../components/CategoriesGrid";
import { Segment } from "../../components/elements";

class DashboardUser extends Component {
  render() {
    const { company: { categories }, history: { push } } = this.props;

    return (
      <Segment>
        <CategoriesGrid categories={categories} push={push} />
      </Segment>
    );
  }
}

DashboardUser.propTypes = {
  company: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ auth }) => ({
  user: auth.get('user'),
  company: auth.get('company'),
});

export default withRouter(connect(mapStateToProps, null)(DashboardUser));
