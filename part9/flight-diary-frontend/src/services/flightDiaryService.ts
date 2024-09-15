import axios from 'axios';
import { FlightDiary } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllFlightDiaries = async () => {
  const response = await axios.get<FlightDiary[]>(baseUrl);
  return response.data;
}

// export const createNote = (object: NewNote) => {
//   return axios
//     .post<Note>(baseUrl, object)
//     .then(response => response.data)
// }