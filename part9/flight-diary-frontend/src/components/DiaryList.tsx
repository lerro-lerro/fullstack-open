import { NonSensitiveDiaryEntry } from '../types';

export default function DiaryList({ diaries }: { diaries: NonSensitiveDiaryEntry[] }) {
  return (
    <section>
      <h2>Flight diaries</h2>
      {diaries.map(d => (
        <article key={d.id}>
          <h3>{d.date}</h3>
          <p>
            visibility: <strong>{d.visibility}</strong> - weather:{' '}
            <strong>{d.weather}</strong>
          </p>
        </article>
      ))}
    </section>
  );
}
