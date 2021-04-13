import patientsData from '../data/patients';
import { NonSensitivePatinent } from './types';

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

export default {
  getpatients,
};