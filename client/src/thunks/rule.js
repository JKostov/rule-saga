import { getRulesByCategory as getRulesByCategoryApi } from "../api/rule";
import { getRulesByCategory as getRulesByCategoryAction } from "../reducers/rule";


export function getRulesByCategory(category) {
  return dispatch => getRulesByCategoryApi(category)
    .then((response) => {
      const { data } = response.data;
      dispatch(getRulesByCategoryAction(data));
    });
}
