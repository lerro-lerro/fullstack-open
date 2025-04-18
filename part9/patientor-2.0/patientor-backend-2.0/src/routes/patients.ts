import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils/toNewPatient";
import { toNewEntry } from "../utils/toNewEntry";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitive());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getById(req.params.id);
  return patient
    ? res.json(patient)
    : res.status(404).send({ error: "Not found" });
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    res.json(patientService.addPatient(newPatient));
  } catch (e: unknown) {
    res.status(400).send({ error: (e as Error).message });
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    res.json(patientService.addEntry(req.params.id, newEntry));
  } catch (e: unknown) {
    res.status(400).send({ error: (e as Error).message });
  }
});

router.delete("/:id/entries/:entryId", (req, res) => {
  try {
    patientService.removeEntry(req.params.id, req.params.entryId);
    res.status(204).end();
  } catch (e: unknown) {
    const error = e as Error;
    res.status(404).send({ error: error.message });
  }
});

export default router;
