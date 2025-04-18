import patients from "../../data/patients";
import { v4 as uuid } from "uuid";

import { Patient, NonSensitivePatient } from "../types/patient";
import { Entry, EntryWithoutId } from "../types/entry";
import { NewPatient } from "../types/patient";

const getNonSensitive = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const getById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (patient && !patient.entries) {
    patient.entries = [];
  }
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    ...patient,
    id: uuid(),
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry: Entry = {
    ...entry,
    id: uuid(),
  };

  if (!patient.entries) {
    patient.entries = [];
  }

  (patient.entries as Entry[]).push(newEntry);
  return newEntry;
};

const removeEntry = (patientId: string, entryId: string): void => {
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  if (!patient.entries || !Array.isArray(patient.entries)) {
    throw new Error("Patient entries not found or invalid");
  }

  const entries = patient.entries as Entry[];
  const entryIndex = entries.findIndex((e) => e.id === entryId);

  if (entryIndex === -1) {
    throw new Error("Entry not found");
  }

  entries.splice(entryIndex, 1);
};

export default {
  getNonSensitive,
  getById,
  addPatient,
  addEntry,
  removeEntry,
};
