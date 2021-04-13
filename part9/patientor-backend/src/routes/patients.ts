import express from 'express';
import patientService from './patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getpatients());
});

export default router;