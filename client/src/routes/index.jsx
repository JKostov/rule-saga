import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import Loadable from 'react-loadable';
import AppLayout from '../components/AppLayout';

const dynamicImport = loader =>
  Loadable({
    loader,
    loading: () => <Loader active inline="centered" />,
  });

const CompanyRoutes = () => (
  <Fragment>
    <Route path="/dashboard-company" component={dynamicImport(() => import('../pages/DashboardCompany'))} />
    <Route path="/category/:category/rules" exact component={dynamicImport(() => import('../pages/Category'))} />
    <Route path="/category/:category/rule/:rule" exact component={dynamicImport(() => import('../pages/Rule'))} />
  </Fragment>
);

const UserRoutes = () => (
  <Fragment>
    <Route path="/category/:category/rule/:rule" exact component={dynamicImport(() => import('../pages/Rule'))} />
    <Route path="/category/:category/rules" exact component={dynamicImport(() => import('../pages/Category'))} />
    <Route path="/dashboard-user" component={dynamicImport(() => import('../pages/DashboardUser'))} />
  </Fragment>
);

const LoggedInList = ({ isUser }) => (
  <Switch>
    <Route exact path="/" render={() => 'Hello world.'} />
    <Route path="/logout" component={dynamicImport(() => import('../components/Logout'))} />
    {isUser ? <UserRoutes /> : <CompanyRoutes/>}
    <Redirect to="/" />
  </Switch>
);

LoggedInList.propTypes = {
  isUser: PropTypes.bool,
};

LoggedInList.defaultProps = {
  isUser: true,
};

const LoggedOutList = () => (
  <Switch>
    <Route exact path="/login-company" component={dynamicImport(() => import('../pages/LoginCompany'))} />
    <Route exact path="/login-user" component={dynamicImport(() => import('../pages/LoginUser'))} />
    <Route exact path="/register-company" component={dynamicImport(() => import('../pages/RegisterCompany'))} />
    <Route path="/auth/company-invitation" component={dynamicImport(() => import('../pages/RegisterUser'))} />
    <Route
      exact
      path="/forgot-password"
      component={dynamicImport(() => import('../pages/ForgotPassword'))}
    />
    <Route
      path="/reset-password/:token"
      component={dynamicImport(() => import('../pages/ResetPassword'))}
    />
    <Redirect to="/login-company" />
  </Switch>
);

const Routes = ({ isLoggedIn, isUser }) => (
  <AppLayout isLoggedIn={isLoggedIn} isUser={isUser}>
    {isLoggedIn ? <LoggedInList isUser={isUser} /> : <LoggedOutList />}
  </AppLayout>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

Routes.defaultProps = {
  isLoggedIn: null,
  isUser: true,
};

const mapStateToProps = ({ auth }) => ({
  isUser: !!auth.get('user'),
  isLoggedIn: !!auth.get('token'),
});

export default withRouter(connect(mapStateToProps)(Routes));
