
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { LOGIN_USER_ACTION, LOGIN_COMPANY_ACTION, LOGOUT_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const loginUser = createAction(LOGIN_USER_ACTION);
export const loginCompany = createAction(LOGIN_COMPANY_ACTION);
export const logoutUser = createAction(LOGOUT_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  user: null,
  company: null,
  token: null,
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {
    [LOGOUT_ACTION](state) {
      return state.merge(INITIAL_STATE);
    },

    [LOGIN_USER_ACTION](
      state,
      {
        payload: { token, user, company },
      },
    ) {
      return state
        .set('token', token)
        .set('company', company)
        .set('user', user);
    },
    [LOGIN_COMPANY_ACTION](
      state,
      {
        payload: { token, company },
      },
    ) {
      return state
        .set('token', token)
        .set('company', company);
    },
  },
  INITIAL_STATE,
);
