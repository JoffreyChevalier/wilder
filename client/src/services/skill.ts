import { ISkill } from '../types/ISkills';
import API from './APIClient';

export async function getSkills(): Promise<ISkill[]> {
  const { data } = await API.get('/skills');
  return data;
}
