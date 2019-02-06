
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Header } from '../../components/elements';
import { loginCompany} from '../../thunks/auth';
import Login from '../../components/Login';

const LoginCompanyPage = ({ loginAction, history: { push } }) => (
  <Grid stackable centered columns={2}>
    <Grid.Column>
      <Header header="Login as company" />
      <Segment>
        <Login push={push} route={'/dashboard-company'} login={loginAction} />
      </Segment>
    </Grid.Column>
  </Grid>
);

LoginCompanyPage.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loginAction: loginCompany,
  },
  dispatch,
);

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(LoginCompanyPage),
);
