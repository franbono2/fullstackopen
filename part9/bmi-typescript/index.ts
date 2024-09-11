import express from 'express';
import { calculateBMI } from './bmiCalculator'
const app = express();

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
    res.status(500).json({ error: errorMessage })
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});