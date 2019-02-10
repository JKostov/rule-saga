
import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import CategoriesGrid from "../../components/CategoriesGrid";
import UsersList from "../../components/UsersList";
import UserInvitation from "../../components/UserInvitation";
import { Segment } from "../../components/elements";
import {addNewCategory} from "../../thunks/category";
import SubHeader from "../../components/elements/SubHeader";

class DashboardCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCategory: '',
    };

    this.handleAddNewCategory = this.handleAddNewCategory.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);
  }

  handleAddNewCategory(e) {
    this.setState({ newCategory: e.target.value })
  }

  addNewCategory() {
    const { addNewCategoryAction } = this.props;
    const { newCategory } = this.state;
    if (newCategory.trim() !== '') {
      addNewCategoryAction(newCategory.trim());
      this.setState({ newCategory: '' });
    }
  }

  render() {
    const { company, history: { push } } = this.props;
    const { newCategory } = this.state;
    if (!company) {
      return null;
    }

    const { _id, categories, users } = company;

    return (
      <Fragment>
        <Segment>
          <CategoriesGrid
            addNewCategory={this.addNewCategory}
            handleAddNewCategory={this.handleAddNewCategory}
            newCategory={newCategory}
            push={push}
            categories={categories}
          />
        </Segment>
        <Segment>
          <SubHeader header="Employees"/>
          <UserInvitation companyId={_id} />
          <UsersList users={users} />
        </Segment>
      </Fragment>
    );
  }
}

DashboardCompany.defaultProps = {
  company: null,
};

DashboardCompany.propTypes = {
  addNewCategoryAction: PropTypes.func.isRequired,
  company: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ auth }) => ({
  company: auth.get('company'),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addNewCategoryAction: addNewCategory,
  },
  dispatch,
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardCompany));
