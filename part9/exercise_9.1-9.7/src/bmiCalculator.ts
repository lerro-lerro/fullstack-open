export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal (healthy weight)';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

const parseArguments = (args: string[]): { height: number; weight: number } => {
  if (args.length !== 4) {
    throw new Error('Exactly two arguments required: height(cm) weight(kg)');
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values were not numbers!');
  }

  return { height, weight };
};

if (process.argv[1] && process.argv[1].endsWith('bmiCalculator.ts')) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let message = 'Something went wrong.';
    if (error instanceof Error) {
      message += ' ' + error.message;
    }
    console.error(message);
  }
}