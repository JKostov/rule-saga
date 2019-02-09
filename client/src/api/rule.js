import axios from  '.';

export function addRule(payload) {
  const data = new FormData();
  data.append('images', payload.data.files);

  delete payload.data.files;
  data.append('data', JSON.stringify(payload));

  return axios.post('/rule', data);
}
