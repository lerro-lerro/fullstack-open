import { Patient, Diagnosis } from "../types";

export interface State {
  patients: { [id: string]: Patient };
  diagnoses: { [code: string]: Diagnosis };
}

export const initialState: State = {
  patients: {},
  diagnoses: {},
};

export type Action =
  | { type: "SET_PATIENT_LIST"; payload: Patient[] }
  | { type: "ADD_PATIENT"; payload: Patient }
  | { type: "UPDATE_PATIENT"; payload: Patient }
  | { type: "SET_DIAGNOSES_LIST"; payload: Diagnosis[] };
