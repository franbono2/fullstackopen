interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: Rating,
  ratingDescription: string,
  target: number,
  average: number
}

type Rating = 1 | 2 | 3

interface ExerciseValues {
  target: number,
  values: number[]
}

export const calculateExercises = (exerciseHours: number[], target: number): Result => {
  const periodLength = exerciseHours.length
  const trainingDays = exerciseHours.filter(n => n > 0).length
  const average = exerciseHours.reduce((sum, n) => sum + n, 0) / periodLength
  const success = average >= target
  let rating: Rating = 1
  let ratingDescription = ''
  if (success) {
    rating = 3
    ratingDescription = 'very good, mission completed'
  }
  if (target - average >= 0) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  }
  if (target - average >= 1){
    rating = 1
    ratingDescription = 'very bad we have to improve'
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  const target = Number(args[2])
  const strValues = args.slice(3)
  const values = strValues.map(s => Number(s))
  if (isNaN(target) || values.some(n => isNaN(n))) throw new Error('Provided values have to be numbers')
  return {
    target,
    values
  }
}

try {
  const { target, values } = parseExerciseArguments(process.argv)
  console.log(calculateExercises(values, target))
} catch (error) {
  let errorMessage = ''
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}