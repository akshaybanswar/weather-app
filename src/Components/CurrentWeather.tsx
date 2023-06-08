import { CurrentWeatherData } from '../Assets/WeatherData';
import { Typography, Box, Card, CardContent, Divider, } from '@mui/material';
import {
  Thermostat as ThermostatIcon,
  Opacity as OpacityIcon,
  Air as AirIcon,
  ArrowUpward,
  Speed as SpeedIcon,
  Brightness7TwoTone as UVIcon,
} from '@mui/icons-material';

interface CurrentWeatherProps {
  currentWeatherData: CurrentWeatherData;
  isCelsius: boolean;
}

export default function CurrentWeather({
  currentWeatherData,
  isCelsius,
}: CurrentWeatherProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" sx={{ color: '#black', textShadow: '0.5px 0.5px 0.5px rgba(50, 50, 50, 0.5)' }}>
        {currentWeatherData.location.name}, {currentWeatherData.location.region},{' '}
        {currentWeatherData.location.country}
      </Typography>
      <Typography sx={{ color: '#black', textShadow: '0.5px 0.5px 0.5px rgba(50, 50, 50, 0.5)' }}>
        Lat: {currentWeatherData.location.lat}, Lon: {currentWeatherData.location.lon}, Timezone:{' '}
        {currentWeatherData.location.tz_id}
      </Typography>
      <Typography sx={{ height: '5vh' }} />
      <Card
        sx={{
          backgroundColor: 'antiquewhite',
          color: 'black',
          opacity: 0.8,
          boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          borderRadius: '1rem',
          border: '2px solid white',
          paddingTop: '10px',
          paddingBottom: '0px',
          paddingRight: '20px',
          paddingLeft: '20px',
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              
              color: '#black', textShadow: '0.5px 0.5px 0.5px rgba(50, 50, 50, 0.5)'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: '1rem',
                
              color: '#black', textShadow: '0.5px 0.5px 0.5px rgba(50, 50, 50, 0.5)'
              }}
            >
              <Typography variant="h5">
              <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                <img
                    src={currentWeatherData.forecast.forecastday[0].day.condition.icon}
                    alt={currentWeatherData.forecast.forecastday[0].day.condition.text}
                  />
                  </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {currentWeatherData.forecast.forecastday[0].day.condition.text}
                </div>
              </Typography>
            </Box>
            <Divider orientation="vertical"
              flexItem
              sx={{ border: '0.2px solid white' }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',
                paddingLeft: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <ThermostatIcon />
                <Typography>
                  {isCelsius ? currentWeatherData.current.temp_c : currentWeatherData.current.temp_f}
                  °{isCelsius ? 'C' : 'F'}
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <OpacityIcon />
                <Typography>Humidity: {currentWeatherData.current.humidity}%</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <AirIcon />
                <Typography>
                  Wind: {currentWeatherData.current.wind_kph} km/h{' ('}{currentWeatherData.current.wind_dir}
                </Typography>
                <ArrowUpward sx={{ transform: `rotate(${currentWeatherData.current.wind_degree}deg)` }} />{')'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <ThermostatIcon />
                <Typography>
                  Feels Like:{' '}
                  {isCelsius
                    ? currentWeatherData.current.feelslike_c
                    : currentWeatherData.current.feelslike_f}
                  °{isCelsius ? 'C' : 'F'}
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <UVIcon />
                <Typography>UV Index: {currentWeatherData.current.uv}</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <SpeedIcon />
                <Typography>
                  Wind Gust: {currentWeatherData.current.gust_kph} km/h /{' '}
                  {currentWeatherData.current.gust_mph} mph
                </Typography>
              </div>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ height: '5vh' }} />
    </Box>
  );
}

