import React, { useState, useEffect } from 'react';
import {Switch, FormControlLabel, Box, } from '@mui/material';
import Header from './Assets/Header';
import Geolocation from './Components/GeoLocation';
import { getCurrentWeather, getForecastWeather, fetchCurrentWeatherDataLatLon, fetchForecastWeatherDataLatLon } from './Components/WeatherAPI';
import { Hour, Forecast, CurrentWeatherData } from './Assets/WeatherData';
import WeatherForecast from './Components/WeatherForecast';
import SearchBar from './Components/SearchBar';
import CurrentWeather from './Components/CurrentWeather';
import ForecastButtons from './Components/ForecastButtons';
import HourlyChart from './Components/HourlyChart';
import useTemperatureGradient from './Components/Hook/useTemperatureGradient';
import Alert from '@mui/material/Alert';
import './App.css'

export function App() {
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeatherData | null>(null);
  const [forecastWeatherData, setForecastWeatherData] = useState<CurrentWeatherData | null>(null);
  const [forecastData, setForecastData] = useState<Forecast[] | null>(null);
  const [hourlyData, setHourlyData] = useState<Hour[]>([]);
  const [dailyData, setDailyData] = useState<Forecast[]>([]);
  const [query, setQuery] = useState('');
  const [isDailyClicked, setIsDailyClicked] = useState(false);
  const [isHourlyClicked, setIsHourlyClicked] = useState(false);
  const [selectedData, setSelectedData] = useState('temp_c');
  const [isCelsius, setIsCelsius] = useState(true);
  const [maxTemp, setMaxTemp] = useState(-Infinity);
  const [minTemp, setMinTemp] = useState(Infinity);
  const gradient = useTemperatureGradient({ maxTemp, minTemp });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [temp_c_for_Button, setTemp_c_for_Button] = useState<number>(0);

  useEffect(() => {
    if (forecastData && forecastData.length > 0) {
      const firsForecast = forecastData[0];
    const temp_c_for_Button = firsForecast.day.avgtemp_c;
    if (temp_c_for_Button !== undefined) {
      setTemp_c_for_Button(temp_c_for_Button);
    }
  }
  }, [forecastData]);


  useEffect(() => {
    if (forecastData && forecastData.length > 0) {
      const firstForecast = forecastData[0];
      setMaxTemp(firstForecast.day.maxtemp_c);
      console.log(firstForecast.day.maxtemp_c);
      setMinTemp(firstForecast.day.mintemp_c);
    }
  }, [forecastData]);

  const handleSearch = async () => {
    if (!query) {
      setErrorMessage('You have not entered a location. Please enter a valid location!');
      setCurrentWeatherData(null);
      setForecastWeatherData(null);
      return;
    }

    try {
      const weatherData: CurrentWeatherData = await getCurrentWeather(query);
      if (!weatherData.location || (weatherData.location.name.toLowerCase() !== query.toLowerCase() && weatherData.location.country.toLowerCase() !== query.toLowerCase())) {
        setErrorMessage('You have not entered a valid location. Please enter a valid location!');
        setCurrentWeatherData(null);
        setForecastWeatherData(null);
        return;
      }

      setCurrentWeatherData(weatherData);
      setForecastWeatherData(await getForecastWeather(query));
      setIsDailyClicked(false); // Reset the state
      setForecastData(await getForecastWeather(query));

      // Reset the error message state
      setErrorMessage(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setErrorMessage('You have not entered a valid location. Please enter a valid location!');
    }
  };

  const handleCoordinates = async (latitude: number, longitude: number) => {
    setShouldFetchData(true);
    setLat(latitude);
    setLong(longitude);
    try {
      const weatherData: CurrentWeatherData = await fetchCurrentWeatherDataLatLon(latitude, longitude);
      setCurrentWeatherData(weatherData);
      const forecastData: CurrentWeatherData = await getForecastWeather(`${latitude},${longitude}`);
      setForecastWeatherData(forecastData);
    } catch (error) {
      console.error('Error fetching weather data by coordinates:', error);
      setErrorMessage('Error in fetching weather data from API by coordinates. Please refresh or try again later!');
    }
  };

  const handleForecastSearch = async () => {
    try {
      let forecastWeatherData: Forecast[];

      if (query) {
        forecastWeatherData = await getForecastWeather(query);
      } else if (lat && long) {
        forecastWeatherData = await fetchForecastWeatherDataLatLon(lat, long);
      } else {
        return;
      }

      setForecastData(forecastWeatherData); // Use setForecastData instead of setDailyData
    } catch (error) {
      // console.error('Error fetching forecast data:', error);
      setErrorMessage('Error in fetching forecast data from API. Please refresh or try again later!');
    }
  };

  useEffect(() => {
    if (!shouldFetchData) {
      return;
    }
    if (lat !== 0 && long !== 0) {
      const fetchWeatherDataByCoordinates = async () => {
        try {
          const weatherData: CurrentWeatherData = await fetchCurrentWeatherDataLatLon(lat, long);
          // console.log('weatherData:', weatherData);
          setCurrentWeatherData(weatherData);
          const forecastData: CurrentWeatherData = await fetchForecastWeatherDataLatLon(lat, long);
          // console.log('forecastData:', forecastData);
          setForecastWeatherData(forecastData);
        } catch (error) {
          // console.error('Error fetching weather data by coordinates:', error);
          setErrorMessage('Error in fetching weather data from API. Please refresh or try again later!');
        }
      };
      fetchWeatherDataByCoordinates();
    }
  }, [lat, long]);

  useEffect(() => {
    const handleForecastSearch = async () => {
      try {
        let forecastWeatherData: Forecast[];
        if (query) {
          forecastWeatherData = await getForecastWeather(query);
        } else if (lat && long) {
          forecastWeatherData = await getForecastWeather(`${lat},${long}`); // Use getForecastWeather with lat and long
        } else {
          return;
        }
        setDailyData(forecastWeatherData);
      } catch (error) {
        // console.error('Error fetching Daily data:', error);
        // setErrorMessage('Error in fetching Daily data from API. Please refresh or try again later!');
      }
    };
    if (isDailyClicked) {
      handleForecastSearch();
    }
  }, [isDailyClicked, query, lat, long]);


  useEffect(() => {
    const handleHourlySearch = async () => {
      try {
        let weatherData: CurrentWeatherData;

        if (query) {
          weatherData = await getCurrentWeather(query);
        } else if (lat && long) {
          weatherData = await fetchCurrentWeatherDataLatLon(lat, long);
        } else {
          return;
        }

        if (weatherData.forecast && weatherData.forecast.forecastday && weatherData.forecast.forecastday[0]) {
          setHourlyData(weatherData.forecast.forecastday[0].hour);
        } else {
          // Handle the case when forecast data is missing or doesn't have the expected structure
          // console.error('Invalid forecast data:', weatherData);
          // setErrorMessage('Error in fetching data from API. Please refresh or try again later!');
        }
      }
      catch (error) {
        // console.error('Error fetching hourly data:', error);
        // setErrorMessage('Error in fetching hourly data from API. Please refresh or try again later!');
      }
    };
    if (isHourlyClicked) {
      handleHourlySearch();
    }
  }, [isHourlyClicked, query, lat, long]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDailyClick = () => {
    setIsDailyClicked(!isDailyClicked);
    setIsHourlyClicked(false); // Reset the state
    handleForecastSearch(); // Trigger the search for forecast data
  };

  const handleHourlyClick = () => {
    setIsHourlyClicked(!isHourlyClicked);
    setIsDailyClicked(false); // Reset the state
  };

  useEffect(() => {
    if (forecastWeatherData && forecastWeatherData.forecast && forecastWeatherData.forecast.forecastday) {
      const firstForecast = forecastWeatherData.forecast.forecastday[0];
      setMaxTemp(firstForecast.day.maxtemp_c);
      setMinTemp(firstForecast.day.mintemp_c);
    }
  }, [forecastWeatherData]);

  return (
    <Box className="App" style={{background: gradient}}>
      <Box sx={{ textAlign: 'center' }}>
        {/* <Header /> */}
        <Header gradient={gradient} />
        <Geolocation onCoordinates={handleCoordinates} />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <SearchBar
            query={query}
            handleSearch={handleSearch}
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
            className="SearchBar"
          />
          <FormControlLabel
            control={
              <Switch
                color="default"
                checked={isCelsius}
                onChange={(e) => {
                  setIsCelsius(e.target.checked);
                  const celsiusDataTypes = ['temp_c', 'feelslike_c', 'dewpoint_c', 'heatindex_c', 'windchill_c'];
                  const fahrenheitDataTypes = ['temp_f', 'feelslike_f', 'dewpoint_f', 'heatindex_f', 'windchill_f'];
                  let index = celsiusDataTypes.indexOf(selectedData);
                  if (index !== -1) {
                    setSelectedData(e.target.checked ? celsiusDataTypes[index] : fahrenheitDataTypes[index]);
                  } else {
                    index = fahrenheitDataTypes.indexOf(selectedData);
                    if (index !== -1) {
                      setSelectedData(e.target.checked ? celsiusDataTypes[index] : fahrenheitDataTypes[index]);
                    }
                  }
                }}
              />
            }
            label={isCelsius ? '°C' : '°F'}
          />
        </Box>
        {errorMessage && (
          <Alert severity="error" onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        )}
        {!errorMessage && currentWeatherData && (
          <div>
            <CurrentWeather
              currentWeatherData={currentWeatherData}
              isCelsius={isCelsius}
            />
              <ForecastButtons
                handleDailyClick={handleDailyClick}
                handleHourlyClick={handleHourlyClick}
                isDailyClicked={isDailyClicked}
                isHourlyClicked={isHourlyClicked}
                temp_for_button={temp_c_for_Button}
              />
            {isHourlyClicked && (
              <div>
                <HourlyChart hourlyData={hourlyData} selectedData={selectedData} setSelectedData={setSelectedData} isCelsius={isCelsius} />
              </div>
            )}
            {forecastData && isDailyClicked && (
              <WeatherForecast forecastData={dailyData} selectedData={selectedData} setSelectedData={setSelectedData} isCelsius={isCelsius} />
            )}
          </div>
        )}
      </Box>
    </Box>
  );
}

export default App;
