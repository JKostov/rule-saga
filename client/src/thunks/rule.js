import { getRulesByCategory as getRulesByCategoryApi, getRule as getRuleApi } from "../api/rule";
import { getRulesByCategory as getRulesByCategoryAction, getRule as getRuleAction } from "../reducers/rule";


export function getRulesByCategory(payload) {
  return dispatch => getRulesByCategoryApi(payload)
    .then((response) => {
      const { data } = response.data;
      dispatch(getRulesByCategoryAction(data));
    });
}

export function getRule(payload) {
    return dispatch => getRuleApi(payload)
        .then((response) => {
            const { data } = response.data;
            dispatch(getRuleAction(data));
        });
}
