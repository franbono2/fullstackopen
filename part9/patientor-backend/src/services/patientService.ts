import patientData from '../../data/patients'
import { NonSensitivePatient, Patient, NewPatientEntry } from '../types'
import { v1 as uuid } from 'uuid'

const patients: Patient[] = patientData

const getEntries = () => {
  return patients;
};

const addEntry = (entry: NewPatientEntry): Patient => {
  const id = uuid()
  const newPatient = {
    id: id,
    ...entry
  }
  patients.push(newPatient)
  return newPatient
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

