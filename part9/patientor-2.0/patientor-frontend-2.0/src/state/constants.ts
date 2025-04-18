import { Patient } from "../types/patient";
import { Diagnosis } from "../types/diagnosis";

export interface State {
  patients: { [id: string]: Patient };
  diagnoses: { [code: string]: Diagnosis };
}
