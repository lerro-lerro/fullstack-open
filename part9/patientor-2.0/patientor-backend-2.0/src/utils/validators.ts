import { z } from 'zod';
import { Gender, NewPatient } from '../types/types';

export const newPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(1),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1)
});

export type NewPatientRequest = z.infer<typeof newPatientSchema>;

export const parseNewPatient = (obj: unknown): NewPatient => {
  return newPatientSchema.parse(obj);
};

export const isString = (text: unknown): text is string =>
  typeof text === "string" || text instanceof String;

export const isDate = (date: string): boolean => Boolean(Date.parse(date));