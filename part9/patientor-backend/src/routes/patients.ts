import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatientEntry } from '../utils/entryValidator';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  try {
    const patient = patientService.getPatientById(id)
    return res.json(patient)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).send(error.message);
    }
    console.error(error)
    return res.status(500).send('Unkown Error')
  }
})

router.post('/', (req, res) => {
  try {   
    const newPatientEntry = toNewPatientEntry(req.body)
    const addedPatient = patientService.addPatientEntry(newPatientEntry)
    res.json(addedPatient)
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

router.post('/:id/entries', (req, res) => {
  try {   
    const { id } = req.params
    const newEntry = toNewEntry(req.body)
    const addedEntry = patientService.addEntry(id, newEntry)
    res.json(addedEntry)
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

export default router;