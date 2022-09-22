import { IWilder, IWilderInput } from '../types/IWilder';
import API from './APIClient';

export async function getWilders(): Promise<IWilder[]> {
  const { data } = await API.get('/wilders');
  return data;
}

export async function createWilder(wilderProps: IWilderInput) {
  return API.post('/wilders', wilderProps);
}

export async function deleteWilder(wilderId: number) {
  return API.delete(`/wilders/${wilderId}`);
}
