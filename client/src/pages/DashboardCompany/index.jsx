
import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import CategoriesGrid from "../../components/CategoriesGrid";
import UsersList from "../../components/UsersList";
import UserInvitation from "../../components/UserInvitation";
import { Segment } from "../../components/elements";
import RuleForm from "../../components/RuleForms/RuleForm";

class DashboardCompany extends Component {

  render() {
    const { company } = this.props;
    if (!company) {
      return null;
    }

    const { _id, categories, users } = company;

    return (
      <Fragment>
        <Segment>
          <CategoriesGrid categories={categories} />
        </Segment>
        <Segment>
          <UsersList users={users} />}
          <UserInvitation companyId={_id} />
        </Segment>
        <Segment>
          <RuleForm companyId={_id}/>
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

export default connect(mapStateToProps, null)(DashboardCompany);
