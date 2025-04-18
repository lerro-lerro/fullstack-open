import { useEffect, useState } from 'react';
import { NonSensitiveDiaryEntry, NewDiaryEntry } from './types';
import * as diaryService from './services/diaryService';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then(setDiaries).catch(e => {
      console.error(e);
      setError('Failed to load diaries');
    });
  }, []);

  const addDiary = async (entry: NewDiaryEntry) => {
    try {
      const saved = await diaryService.create(entry);
      setDiaries(d => d.concat(saved));
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data) {
        setError(String(err.response.data));
      } else {
        setError('Unknown error');
      }
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <>
      <Notification message={error} />
      <DiaryForm onSubmit={addDiary} />
      <DiaryList diaries={diaries} />
    </>
  );
};

export default App;
