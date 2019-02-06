
import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import CategoriesGrid from "../../components/CategoriesGrid";

class DashboardUser extends Component {
  render() {
    const { company: { categories } } = this.props;

    return (
      <Fragment>
        <CategoriesGrid categories={categories} />
      </Fragment>
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

export default connect(mapStateToProps, null)(DashboardUser);
