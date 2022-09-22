import API from './APIClient';

export async function getWilders() {
  const { data } = await API.get('/wilders');
  return data;
}

export async function createWilder(wilderProps) {
  return API.post('/wilders', wilderProps);
}

export async function deleteWilder(wilderId) {
  return API.delete(`/wilders/${wilderId}`);
}
