import { Gender, NewPatient } from "../types/patient";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseString = (value: unknown, field: string): string => {
  if (!isString(value)) throw new Error(`Incorrect or missing ${field}`);
  return value;
};

const parseDate = (value: unknown): string => {
  if (!isString(value) || !isDate(value))
    throw new Error("Incorrect or missing date");
  return value;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "gender" in object &&
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, "occupation"),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};
