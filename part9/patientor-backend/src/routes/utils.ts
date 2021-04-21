/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatinent } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing Name: ' + name);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing Date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing Social Security Number: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: any): string => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing Gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing Occupation: ' + occupation);
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatinent = (object: any): NewPatinent => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
};

export default toNewPatinent;
