import express from 'express';
import patientService from './patientService';
import toNewPatinent from './utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getpatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatinent(req.body);
    const newPatientEntry = patientService.addPatient(newPatient);
    res.json(newPatientEntry);
  }
  catch(e) {
    res.status(400).send((e as Error).message );
  }
});

export default router;