const apikey = 'b1de2c77d8d24c18a7b182510230106';
// const apikey = process.env.REACT_APP_API_KEY;

export const fetchCurrentWeatherData = async (query: string) => {
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${query}&aqi=yes`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  return data;
};

export const fetchForecastWeatherData = async (query: string) => {
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${query}&days=10&aqi=yes&alerts=no`);
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }

  const data = await response.json();
  return data.forecast.forecastday;
};


export const getCurrentWeather = async (query: string) => {
  try {
    const fetchedData = await fetchCurrentWeatherData(query);
    return fetchedData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export const getForecastWeather = async (query: string) => {
  try {
    const fetchedData = await fetchForecastWeatherData(query);
    return fetchedData;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return null;
  }
};

export const fetchCurrentWeatherDataLatLon = async (latitude: number, longitude: number) => {
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${latitude},${longitude}&aqi=yes`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  return data;
};

export const fetchForecastWeatherDataLatLon = async (latitude: number, longitude: number) => {
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${latitude},${longitude}&days=10&aqi=yes&alerts=no`);
  if (!response.ok) {
    throw new Error('Failed to fetch forecast weather data');
  }

  const data = await response.json();
  return data;
};