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

const API_KEY = "215022a8c6b45dcd36b354ca06acc261";


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