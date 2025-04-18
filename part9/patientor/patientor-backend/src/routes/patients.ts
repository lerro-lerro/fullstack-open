import { Router, Request, Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient, Patient } from '../types/types';
import { newPatientSchema } from '../utils/validators';
import { ZodError } from 'zod';

const router = Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitive());
});

router.post('/', (req: Request, res: Response<Patient>) => {
  try {
    const parsed = newPatientSchema.parse(req.body);
    const added = patientService.addPatient(parsed);
    res.json(added);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      res.status(400).json({ error: 'unknown error' });
    }
  }
});

router.delete('/:id/entries/:entryId', (req, res) => {
  try {
    const updated = patientService.removeEntry(
      req.params.id,
      req.params.entryId
    );
    res.json(updated);
  } catch (e: unknown) {
    res.status(400).send({ error: (e as Error).message });
  }
});
export default router;