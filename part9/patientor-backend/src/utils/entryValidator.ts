import { Diagnose, Discharge, EntryWithoutId, Gender, HealthCheckRating, NewPatientEntry, SickLeave } from "../types";

const noMissingData = (object: object) => {
  return (
    'name' in object
    && 'dateOfBirth' in object
    && 'ssn' in object
    && 'gender' in object
    && 'occupation' in object
    && 'entries' in object
  )
}

const noMissingHospitalData = (object: object) => {
  return (
    'description' in object
    && 'date' in object
    && 'specialist' in object
    && 'type' in object
    && 'discharge' in object
  )
}


const toNewHospitalEntry = (object: object) => {
  if (noMissingHospitalData(object)) {
    let newEntry: EntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      discharge: parseDischarge(object.discharge),
      type: "Hospital"
    }
    if ('diagnosisCodes' in object) {
      newEntry = {
        ...newEntry,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
      }
    }
    return newEntry
  }
  throw new Error('Incorrect data: some Hospital fields are missing')
}

const noMissingOccupationalHealthcareData = (object: object) => {
  return (
    'description' in object
    && 'date' in object
    && 'specialist' in object
    && 'type' in object
    && 'employerName' in object
  )
}

const toNewOccupationalHealthcareEntry = (object: object) => {
  if (noMissingOccupationalHealthcareData(object)){
    let newEntry: EntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      employerName: parseEmployerName(object.employerName),
      type: "OccupationalHealthcare"
    }
    if ('sickLeave' in object) {
      newEntry = {
        ...newEntry,
        sickLeave: parseSickLeave(object.sickLeave)
      }
    }
    if ('diagnosisCodes' in object) {
      newEntry = {
        ...newEntry,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
      }
    }
    return newEntry
  }
  throw new Error('Incorrect data: some OccupationalHealthcare fields are missing')
}

const noMissingHealthCheckData = (object: object) => {
  return (
    'description' in object
    && 'date' in object
    && 'specialist' in object
    && 'type' in object
    && 'healthCheckRating' in object
  )
}

const toNewHealthCheckEntry = (object: object) => {
  if (noMissingHealthCheckData(object)) {
    let newEntry: EntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      type: "HealthCheck"
    }
    if ('diagnosisCodes' in object) {
      newEntry = {
        ...newEntry,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
      }
    }
    return newEntry
  }
  throw new Error('Incorrect data: some HealthCheck fields are missing')
}

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error("Incorrect or missing data");
  }
  if ('type' in object){
    switch (object.type) {
      case "Hospital":
        return toNewHospitalEntry(object); 
      case "OccupationalHealthcare":
        return toNewOccupationalHealthcareEntry(object);
      case "HealthCheck":
        return toNewHealthCheckEntry(object)
    }
  }
  throw new Error('Incorrect data: some fields are missing')
}

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error("Incorrect or missing data");
  }
  if (noMissingData(object)) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    }
    return newEntry
  }
  throw new Error('Incorrect data: some fields are missing')
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number';
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
}

const isHealthCheckRating = (healthCheckRating: number): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
}


const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect name");
  }
  return name
}

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("Incorrect employerName");
  }
  return employerName
}

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect description");
  }
  return description
}

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect specialist");
  }
  return specialist
}

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error("Incorrect criteria");
  }
  return criteria
}

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect ssn");
  }
  return ssn
}

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect occupation");
  }
  return occupation
}

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date");
  }
  return date
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)){
    throw new Error("Incorrect gender");
  }
  return gender
}

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)){
    throw new Error("Incorrect healthCheckRating");
  }
  return healthCheckRating
}

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object"){
    throw new Error("Incorrect discharge");
  }
  if (noMissingDischargeData(discharge)){
    const newDischarge: Discharge = {
      criteria: parseCriteria(discharge.criteria),
      date: parseDate(discharge.date)
    }
    return newDischarge
  }
  throw new Error('Incorrect discharge')
}

const noMissingDischargeData = (object: object) => {
  return (
    'criteria' in object
    && 'date' in object
  )
}

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object"){
    throw new Error("Incorrect sickLeave");
  }
  if (noMissingSickLeaveData(sickLeave)){
    const newSickLeave: SickLeave = {
      startDate: parseDate(sickLeave.startDate),
      endDate: parseDate(sickLeave.endDate)
    }
    return newSickLeave
  }
  throw new Error('Incorrect sickLeave')
}

const noMissingSickLeaveData = (object: object) => {
  return (
    'startDate' in object
    && 'endDate' in object
  )
}

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose['code']> =>  {
  if (!diagnosisCodes) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose['code']>;
  }

  return diagnosisCodes as Array<Diagnose['code']>;
};

