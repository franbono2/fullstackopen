import diagnoseData from "../../data/diagnoses";
import { Diagnose } from "../types";

const diagnoses: Diagnose[] = diagnoseData

const getEntries = () => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};