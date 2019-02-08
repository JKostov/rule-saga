import axios from  '.';

export function addRule(payload) {
  const data = new FormData();
  data.append('images', payload.data.files);

  delete payload.data.files;
  data.append('data', payload);

  return axios.post('/rule', data);
}
