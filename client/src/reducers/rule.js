
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { GET_RULES_BY_CATEGORY_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const getRulesByCategory = createAction(GET_RULES_BY_CATEGORY_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  rulesByCategory: [],
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {
    [GET_RULES_BY_CATEGORY_ACTION](state, { payload }) {
      return state.set('rulesByCategory', payload);
    },
  },
  INITIAL_STATE,
);
