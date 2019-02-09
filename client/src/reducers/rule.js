
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { GET_RULES_BY_CATEGORY_ACTION, GET_RULE_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const getRulesByCategory = createAction(GET_RULES_BY_CATEGORY_ACTION);
export const getRule = createAction(GET_RULE_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  rulesByCategory: [],
  rule: null,
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {
    [GET_RULES_BY_CATEGORY_ACTION](state, { payload }) {
      return state.set('rulesByCategory', payload);
    },
    [GET_RULE_ACTION](state, { payload }) {
      return state.set('rule', payload);
    },
  },
  INITIAL_STATE,
);
