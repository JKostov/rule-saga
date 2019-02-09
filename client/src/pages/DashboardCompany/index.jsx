
import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import CategoriesGrid from "../../components/CategoriesGrid";
import UsersList from "../../components/UsersList";
import UserInvitation from "../../components/UserInvitation";
import { Segment } from "../../components/elements";

class DashboardCompany extends Component {

  render() {
    const { company, history: { push } } = this.props;
    if (!company) {
      return null;
    }

    const { _id, categories, users } = company;

    return (
      <Fragment>
        <Segment>
          <CategoriesGrid push={push} categories={categories} />
        </Segment>
        <Segment>
          <UserInvitation companyId={_id} />
          <UsersList users={users} />
        </Segment>
      </Fragment>
    );
  }
}

DashboardCompany.propTypes = {
  company: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ auth }) => ({
  company: auth.get('company'),
});

export default withRouter(connect(mapStateToProps, null)(DashboardCompany));
