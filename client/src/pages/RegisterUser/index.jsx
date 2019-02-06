
import React, {Component } from 'react';
import queryString from 'query-string'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators } from "redux";
import PropTypes from "prop-types";
import {getCompanyInvitation} from "../../thunks/companyInvitation";
import RegisterUser from '../../components/RegisterUser';

class RegisterUserPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { location: { search }, getCompanyInvitationAction } = this.props;
    const values = queryString.parse(search);
    if (!values.token) {
      throw new Error('Unauthorized');
    }
    getCompanyInvitationAction(values.token);
  }

  render() {
    const { companyInvitation, history: { push } } = this.props;
    if (!companyInvitation) {
      return null;
    }

    return (
      <RegisterUser push={push} companyInvitation={companyInvitation} />
    );
  }
}

RegisterUserPage.defaultProps = {
  companyInvitation: null
};

RegisterUserPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getCompanyInvitationAction: PropTypes.func.isRequired,
  companyInvitation: PropTypes.shape({}),
};

const mapStateToProps = ({ companyInvitation }) => ({
  companyInvitation: companyInvitation.get('companyInvitation'),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCompanyInvitationAction: getCompanyInvitation,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterUserPage)
);
