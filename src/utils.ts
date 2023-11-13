import { DAY_MAPPING, KELVIN_CONSTANT } from "./constant";

export const convertToCelsius = (tempInKelvin: number) => {
  return (tempInKelvin - KELVIN_CONSTANT).toFixed(0);
};

export const getDayOfTheWeek = (offset: number) => {
  const today = new Date().getDay();
  return DAY_MAPPING[(today + offset) % 7]; // 7 days in a week
};