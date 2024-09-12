import patientData from '../../data/patients'
import { NonSensitivePatient, Patient } from '../types'

const patients: Patient[] = patientData

const getEntries = () => {
  return patients;
};

const addEntry = () => {
  return null;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};

