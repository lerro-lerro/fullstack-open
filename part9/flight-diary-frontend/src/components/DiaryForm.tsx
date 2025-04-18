import { FormEvent, useState } from 'react';
import { Weather, Visibility, NewDiaryEntry } from '../types';

interface Props {
  onSubmit: (entry: NewDiaryEntry) => void;
}

const DiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ date, visibility, weather, comment });
    setComment('');
  };

  const radioGroup = <T extends string>(
    group: Record<string, T>,
    value: T,
    setter: (v: T) => void,
    name: string
  ) =>
    Object.values(group).map(v => (
      <label key={v}>
        <input
          type="radio"
          name={name}
          value={v}
          checked={v === value}
          onChange={() => setter(v)}
        />
        {v}
      </label>
    ));

  return (
    <form onSubmit={submit}>
      <div>
        date:{' '}
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </div>

      <div>visibility: {radioGroup(Visibility, visibility, setVisibility, 'visibility')}</div>
      <div>weather:   {radioGroup(Weather, weather, setWeather, 'weather')}</div>

      <div>
        comment:{' '}
        <input value={comment} onChange={e => setComment(e.target.value)} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default DiaryForm;
