import API from './APIClient';

export async function getSkills() {
  const { data } = await API.get('/skills');
  return data;
}
