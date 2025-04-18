export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h > 0).length;
  const average = dailyHours.reduce((sum, h) => sum + h, 0) / periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = 'bad';

  const ratio = average / target;

  if (ratio >= 1) {
    rating = 3;
    ratingDescription = 'great';
  } else if (ratio >= 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseArguments = (args: string[]): { dailyHours: number[]; target: number } => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map(a => Number(a));

  if (isNaN(target) || dailyHours.some(h => isNaN(h))) {
    throw new Error('Provided values were not numbers!');
  }

  return { dailyHours, target };
};

if (process.argv[1] && process.argv[1].endsWith('exerciseCalculator.ts')) {
  try {
    const { dailyHours, target } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let message = 'Something went wrong.';
    if (error instanceof Error) {
      message += ' ' + error.message;
    }
    console.error(message);
  }
}