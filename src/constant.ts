export const KELVIN_CONSTANT = 273.15;

export const DAY_MAPPING: {
  [key: number]: string;
} = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tues',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

export const CITIES = [
  {
    label: 'Ottawa',
    value: 'ottawa',
  },
  {
    label: 'Vancouver',
    value: 'vancouver',
  },
  {
    label: 'Tokyo',
    value: 'tokyo',
  },
];

export const OPEN_WEATHER_MAP_BASE_URL =
  'https://api.openweathermap.org/data/2.5/forecast/daily';
