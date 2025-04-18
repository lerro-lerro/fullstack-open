import { Router, Response } from 'express';
import diagnosisService from '../services/diagnosisService';
import { Diagnosis } from '../types/types';

const router = Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnosisService.getAll());
});

export default router;