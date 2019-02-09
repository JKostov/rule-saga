import axios from  '.';

export function addRule(payload) {
  const data = new FormData();
  payload.data.files.forEach(file => {
      data.append('images', file, file.name);
  });

  delete payload.data.files;
  data.append('data', JSON.stringify(payload));

  return axios.post('/rule', data);
}

export function getRulesByCategory(category, tags) {
  if (!tags) {
    return axios.get(`/rule/${category}`)
  }

  return axios.get(`/rule/${category}?tags[]=${tags}`);
}
