import axios from 'axios';
import { FlightDiary, NewFlightDiary } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllFlightDiaries = async () => {
  const response = await axios.get<FlightDiary[]>(baseUrl);
  return response.data;
}

export const createFlightDiary = async (object: NewFlightDiary) => {
  try {
    const response = await axios.post<FlightDiary>(baseUrl, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status)
      console.error(error.response);
      throw new Error(error.response?.data)
    }
  }
}