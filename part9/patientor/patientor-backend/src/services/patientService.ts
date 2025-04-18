import { v4 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types/types';

const patients: Patient[] = patientsData;

const getNonSensitive = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitive,
  addPatient
};