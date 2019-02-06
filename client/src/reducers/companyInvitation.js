
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { GET_COMPANY_INVITATION_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const getCompanyInvitation = createAction(GET_COMPANY_INVITATION_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  companyInvitation: null
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {
    [GET_COMPANY_INVITATION_ACTION](state, { payload }) {
      return state.set('companyInvitation', payload);
    },
  },
  INITIAL_STATE,
);
