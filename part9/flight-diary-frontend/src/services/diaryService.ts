import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return data;
};

export const create = async (entry: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(baseUrl, entry);
  return data;
};
