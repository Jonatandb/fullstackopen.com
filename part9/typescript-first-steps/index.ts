import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

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

app.post('/exercises', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target: targetParam, daily_exercises: hoursByDayParam } = _req.body ;

  if(!targetParam || !hoursByDayParam || !(hoursByDayParam as Array<string>).length) {
    res.send({
      error: "parameters missing"
    });
    return;
  }

  if(isNaN(Number(targetParam))) {
    res.send({
      error: "malformatted parameters"
    });
    return;
  }

  if((hoursByDayParam as Array<string>).some(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (p: any) => {
        return isNaN(Number(p));
      }
    )
  ) {
    res.send({
      error: "malformatted parameters"
    });
    return;
  }

  res.send(calculateExercises(hoursByDayParam, targetParam));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}! -> http://localhost:${PORT}`);
});