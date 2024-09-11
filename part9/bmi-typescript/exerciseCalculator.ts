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

const calculateExercises = (exerciseHours: number[], target: number): Result => {
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

const dailyExerciseHours = [3, 0, 2, 4.5, 0, 3, 1]
console.log(calculateExercises(dailyExerciseHours, 2))