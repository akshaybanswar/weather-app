import React, { useState, useRef } from 'react';
import { Grid, Typography, Card, Box } from '@mui/material';
import { Forecast } from '../Assets/WeatherData';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import AirIcon from '@mui/icons-material/Air';
import {
  Brightness7TwoTone as UVIcon,
  WbTwilightTwoTone as SunsetIcon,
} from '@mui/icons-material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import HourlyChart from './HourlyChart';
import { formatDate } from './formatDate';


interface WeatherForecastProps {
  forecastData: Forecast[];
  isCelsius: boolean;
  selectedData: string;
  setSelectedData: (value: string) => void;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  forecastData,
  isCelsius,
  selectedData,
  setSelectedData,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!forecastData || forecastData.length === 0) {
    return null;
  }

  if (!Array.isArray(forecastData)) {
    return null;
  }

  const cardStyle = (date: string) => {
    const isSelected = selectedDate === date;
    return {
      margin: '10px',
      color: 'black',
      flex: '0 0 auto',
      opacity: isSelected ? '100%' : '80%',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      zIndex: isSelected ? 1 : 0,
      alignSelf: 'flex-start',
      width: isSelected ? '60vw' : '200px',
      height: isSelected ? 'auto' : '200px',
      padding: '1rem',
      borderRadius: '1rem',
      backgroundColor: 'antiquewhite',
      border: '1px solid white',
      borderShadow: '1px 1px 2px rgba(50, 50, 50, 0.5)',
      textShadow: '0.5px 0.5px 0.5px rgba(50, 50, 50, 0.5)'
    };
  };

  function getColorForTemperature(temp: number): string {
    if (temp <= -10) {
      return 'rgb(0, 0, 255)'; // Blue
    } else if (temp <= 0) {
      return 'rgb(0, 128, 255)'; // Light blue
    } else if (temp <= 5) {
      return 'rgb(0, 255, 255)'; // Cyan
    } else if (temp <= 10) {
      return 'rgb(0, 255, 128)'; // Greenish cyan
    } else if (temp <= 15) {
      return 'rgb(0, 255, 0)'; // Green
    } else if (temp <= 20) {
      return 'rgb(128, 255, 0)'; // Yellowish green
    } else if (temp <= 25) {
      return 'rgb(255, 255, 0)'; // Yellow
    } else if (temp <= 30) {
      return 'rgb(255, 128, 0)'; // Orange
    } else if (temp <= 35) {
      return 'rgb(255, 0, 0)'; // Red
    } else if (temp <= 40) {
      return 'rgb(255, 0, 128)'; // Pinkish red
    } else if (temp <= 45) {
      return 'rgb(255, 0, 255)'; // Magenta
    } else {
      return 'rgb(128, 0, 255)'; // Purple
    }
  }
  
  function getTemperatureGradient(minTemp: number, maxTemp: number) {
    const maxColor = getColorForTemperature(maxTemp);
    const minColor = getColorForTemperature(minTemp);
  
    return `linear-gradient(to left, ${maxColor}, ${minColor})`;
  }
  

  return (
    <Box sx={{ overflowX: 'auto', maxWidth: '75vw', margin: '0 auto' }}>
      <Grid
        ref={containerRef}
        container
        direction="row"
        sx={{ overflowX: 'scroll', scrollbarWidth: 'none' }}
        wrap='nowrap'
        className="horizontal-scrollbar"
      >
        {forecastData.slice(0, 10).map((forecastItem) => {
          const gradient = getTemperatureGradient(
            forecastItem.day.mintemp_c,
            forecastItem.day.maxtemp_c
          );
          return (
            <Grid item key={forecastItem.date_epoch}>
              <Card
                sx={{
                  ...cardStyle(forecastItem.date),
                  // background: gradient,
                }}
                data-date={forecastItem.date}
                onClick={(event) => {
                  setSelectedDate(
                    selectedDate === forecastItem.date ? null : forecastItem.date
                  );
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="h5" sx={{ paddingTop: '1rem', paddingBottom: '1rem'}}>{formatDate(forecastItem.date)}
                  </Typography>
                  <Typography variant='body1'>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {forecastItem.day.condition.text}
                      <img
                        src={forecastItem.day.condition.icon}
                        alt={forecastItem.day.condition.text}
                        style={{ height: '2rem' }}
                      />
                    </div>
                  </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1" sx={{ paddingTop: '1rem'}}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ThermostatIcon />
                        <span>
                          {isCelsius ? forecastItem.day.mintemp_c : forecastItem.day.mintemp_f}
                          °{isCelsius ? 'C' : 'F'}
                        </span>
                        <div
                          style={{
                            background:
                              gradient,
                            height: '0.5rem',
                            width: '4rem',
                            margin: '0 0.5rem',
                            borderRadius: '1rem',
                          }}
                        />
                        <span>
                          {isCelsius ? forecastItem.day.maxtemp_c : forecastItem.day.maxtemp_f}
                          °{isCelsius ? 'C' : 'F'}
                        </span>
                      </div>
                    </Typography>

                    {selectedDate === forecastItem.date && (
                      <>
                        <Typography variant="body1">
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <InvertColorsIcon />
                            Chance of Rain: {forecastItem.day.daily_chance_of_rain}%
                          </div>
                        </Typography>
                        <Typography variant="body1">
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <AirIcon />
                            Max Wind: {forecastItem.day.maxwind_kph} kp/h
                          </div>
                        </Typography>
                        <Typography variant="body1">
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <UVIcon />
                            UV Index: {forecastItem.day.uv}
                          </div>
                        </Typography>
                        <Typography variant="body1">
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <WbSunnyIcon />
                            Sunrise: {forecastItem.astro.sunrise}
                          </div>
                        </Typography>
                        <Typography variant="body1">
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <SunsetIcon />
                            Sunset: {forecastItem.astro.sunset}
                          </div>
                        </Typography>

                        <HourlyChart
                          hourlyData={forecastItem.hour}
                          selectedData={selectedData}
                          setSelectedData={setSelectedData}
                          isCelsius={isCelsius}
                        />
                      </>
                    )}

                  </Box>

              </Card>
            </Grid>
          );
        })}

      </Grid>
      <Box sx={{ height: '30vh' }} />
    </Box >
  );
};

export default WeatherForecast;

