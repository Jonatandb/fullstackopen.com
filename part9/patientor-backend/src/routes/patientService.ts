import patientsData from '../data/patients';
import { NonSensitivePatinent, IPatient, NewPatinent } from './types';
import {v1 as uuid} from 'uuid';

const getpatients = (): Array<NonSensitivePatinent> => {
  return patientsData.map(({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    })
  );
};

const addPatient = (patient: NewPatinent): IPatient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getpatients,
  addPatient
};