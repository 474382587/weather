import { OPEN_WEATHER_MAP_BASE_URL } from "../constant";

export interface Forecast {
  weather: {
    main: string;
    icon: string;
    id: number;
    description: string;
  }[];
  temp: {
    day: number;
  };
}
export interface WeatherResponseDTO {
  list: Forecast[];
}

const API_KEY = import.meta.env.VITE_API_KEY;


export const fetchRealTimeWeather = async (city: string) => {
  try {
    const res = await fetch(
      `${OPEN_WEATHER_MAP_BASE_URL}?q=${city}&appid=${API_KEY}`,
    );
    const data: WeatherResponseDTO = await res.json();

    const { list } = data;

    return list;
  } catch (error) {
    console.warn("There's an error");
  }
};