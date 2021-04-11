import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const { height: heightParam, weight: weightParam } = _req.query;

  if(!heightParam) res.status(500).send({ error: 'Missing height param'});
  if(isNaN(Number(heightParam))) res.status(500).send({ error: 'Invalid height value, it must be a number'});

  if(!weightParam) res.status(500).send({ error: 'Missing weight param'});
  if(isNaN(Number(weightParam))) res.status(500).send({ error: 'Invalid weight value, it must be a number'});

  const height = Number(heightParam);
  const weight = Number(weightParam);

  res.send({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}! -> http://localhost:${PORT}`);
});