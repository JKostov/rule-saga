import axios from "./index";

export function addNewCategory(category) {
  return axios.post(`/company/${category}`);
}
