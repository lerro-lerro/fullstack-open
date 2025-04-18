import { EntryWithoutId, HealthCheckRating } from "../types/entry";
import { isString, isDate } from "./validators";

export const toNewEntry = (obj: unknown): EntryWithoutId => {
  if (!obj || typeof obj !== "object" || !("type" in obj)) throw new Error("Incorrect or missing data");

  const base = {
    description: parseString(obj, "description"),
    date: parseDate(obj, "date"),
    specialist: parseString(obj, "specialist"),
    diagnosisCodes: "diagnosisCodes" in obj ? (obj.diagnosisCodes as string[]) : undefined,
  } as const;

  switch (obj.type) {
    case "HealthCheck":
      return {
        ...base,
        type: "HealthCheck",
        healthCheckRating: parseRating(obj.healthCheckRating),
      };
    case "Hospital":
      return {
        ...base,
        type: "Hospital",
        discharge: {
          date: parseDate(obj.discharge, "date"),
          criteria: parseString(obj.discharge, "criteria"),
        },
      };
    case "OccupationalHealthcare":
      return {
        ...base,
        type: "OccupationalHealthcare",
        employerName: parseString(obj, "employerName"),
        sickLeave: obj.sickLeave
          ? {
              startDate: parseDate(obj.sickLeave, "startDate"),
              endDate: parseDate(obj.sickLeave, "endDate"),
            }
          : undefined,
      };
    default:
      throw new Error(`Unknown entry type: ${obj.type as string}`);
  }
};

const parseString = (o: unknown, key: string): string => {
  if (!o || typeof o !== "object" || !(key in o) || !isString(o[key as keyof typeof o]))
    throw new Error(`Missing or invalid ${key}`);
  return o[key as keyof typeof o] as string;
};

const parseDate = (o: unknown, key: string): string => {
  const date = parseString(o, key);
  if (!isDate(date)) throw new Error(`Invalid date ${date}`);
  return date;
};

const parseRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || rating === null || !Object.values(HealthCheckRating).includes(rating as number))
    throw new Error("Invalid health check rating");
  return rating as HealthCheckRating;
};