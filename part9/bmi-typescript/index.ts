import express from 'express';
import { calculateBMI } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'
const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  try {
    const bmi = calculateBMI(height, weight)
    return res.json({ weight, height, bmi })
  } catch (error) {
    let errorMessage = ''
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(500).json({ error: errorMessage })
  }
});

app.post('/exercises', (req, res) => {
  try {
    const { daily_exercises, target } = req.body
    if (daily_exercises === undefined || target === undefined) throw new Error('Parameters missing')
    if (isNaN(target)) throw new Error('Target must be a number')
    if (daily_exercises.some((n: number) => isNaN(n))) throw new Error('Daily exercises hours must be a number')
    const result = calculateExercises(daily_exercises, target)
    return res.json(result)
  } catch (error) {
    let errorMessage = ''
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(500).json({ error: errorMessage })
  }
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});