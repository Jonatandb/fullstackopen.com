import diagnoseData from '../data/diagnoses';
import { IDiagnose } from './types';

const getDiagnoses = (): Array<IDiagnose> => { return diagnoseData; };

const addDiagnose = (): null => {  return null; };

export default {
  getDiagnoses,
  addDiagnose
};