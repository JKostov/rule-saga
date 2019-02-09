import { getRulesByCategory as getRulesByCategoryApi } from "../api/rule";
import { getRulesByCategory as getRulesByCategoryAction } from "../reducers/rule";


export function getRulesByCategory(payload) {
  return dispatch => getRulesByCategoryApi(payload)
    .then((response) => {
      const { data } = response.data;
      dispatch(getRulesByCategoryAction(data));
    });
}
