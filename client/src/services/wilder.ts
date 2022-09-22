import { IWilder, IWilderInput } from '../types/IWilder';
import API from './APIClient';

export async function getWilders(): Promise<IWilder[]> {
  const { data } = await API.get('/wilders');
  return data;
}

export async function createWilder(wilderProps: IWilderInput): Promise<IWilder> {
  const { data } = await API.post<IWilder>('/wilders', wilderProps);
  return data
}

export async function deleteWilder(wilderId: number) {
  return API.delete(`/wilders/${wilderId}`);
}

export async function addSkillToWilder(wilderId: number, skillId: number) {
  const { data } = await API.post(`/wilders/${wilderId}/skills`, { skillId });
  return data;
}
