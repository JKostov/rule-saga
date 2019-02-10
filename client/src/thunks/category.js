import { addNewCategory as addNewCategoryApi } from "../api/company";
import {loginCompany as loginCompanyAction} from "../reducers/auth";

export function addNewCategory(category) {
  return dispatch => addNewCategoryApi(category)
    .then((response) => {
      const { data } = response.data;
      return {
       token: data.token,
       company: data._doc,
      }
    })
    .then((payload) => {
      dispatch(loginCompanyAction(payload));
      localStorage.setItem('_token', payload.token);
    });
}
