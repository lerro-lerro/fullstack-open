import express from 'express';
import { calculateBmi } from './bmiCalculator.js';
import { calculateExercises } from './exerciseCalculator.js';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(heightNum, weightNum);
  return res.json({ weight: weightNum, height: heightNum, bmi });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises: dailyExercises, target } = req.body as {
    daily_exercises: unknown;
    target: unknown;
  };

  if (!dailyExercises || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(dailyExercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const dailyHours = dailyExercises.map((h: unknown) => Number(h));

  if (dailyHours.some(h => isNaN(h))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const result = calculateExercises(dailyHours, Number(target));
    return res.json(result);
  } catch {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});