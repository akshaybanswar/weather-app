import {
  // Cloud as CloudIcon,
  Opacity as HumidityIcon,
  Brightness7TwoTone as UVIcon,
  Visibility as VisibilityIcon,
  // ArrowUpward as WindDirectionIcon,
  Speed as WindSpeedIcon,
  AcUnit as SnowIcon,
  InvertColors as RainIcon,
  Air as AirQualityIcon,
  FilterDrama as CloudCoverageIcon,
  Thermostat as TemperatureIcon,
  // Update as LastUpdatedIcon,
  // LocationOn as LocationIcon,
  // CalendarToday as DateIcon,
  // Brightness5 as SunriseIcon,
  // WbTwilightTwoTone as SunsetIcon,
  // Brightness3 as MoonIcon,
  // WbSunnySharp as WbSunny,
} from '@mui/icons-material';
import { ReactComponent as BarometerIcon } from './Icons/pressure_icon.svg';

const WeatherIcons = {
  // air_quality_co: <AirQualityIcon />,
  // air_quality_no2: <AirQualityIcon />,
  // air_quality_o3: <AirQualityIcon />,
  // air_quality_so2: <AirQualityIcon />,
  // air_quality_pm2_5: <AirQualityIcon />,
  // air_quality_pm10: <AirQualityIcon />,
  // air_quality_us_epa_index: <AirQualityIcon />,
  // air_quality_gb_defra_index: <AirQualityIcon />,   
  // air_quality: <AirQualityIcon />,
  chance_of_rain: <RainIcon />,
  chance_of_snow: <SnowIcon />,
  cloud: <CloudCoverageIcon />,
  // condition: <CloudIcon />,
  dewpoint_c: <TemperatureIcon />,
  dewpoint_f: <TemperatureIcon />,
  feelslike_c: <TemperatureIcon />,
  feelslike_f: <TemperatureIcon />,
  gust_kph: <WindSpeedIcon />,
  gust_mph: <WindSpeedIcon />,
  heatindex_c: <TemperatureIcon />,
  heatindex_f: <TemperatureIcon />,
  humidity: <HumidityIcon />,
  // is_day: <WbSunny />,
  precip_in: <RainIcon />,
  precip_mm: <RainIcon />,
  pressure_in: <BarometerIcon />,
  pressure_mb: <BarometerIcon />,
  temp_c: <TemperatureIcon />,
  temp_f: <TemperatureIcon />,
  // time: <LastUpdatedIcon />,
  // time_epoch: <LastUpdatedIcon />,
  uv: <UVIcon />,
  vis_km: <VisibilityIcon />,
  vis_miles: <VisibilityIcon />,
  will_it_rain: <RainIcon />,
  will_it_snow: <SnowIcon />,
  // wind_degree: <WindDirectionIcon />,
  // wind_dir: <WindDirectionIcon />,
  wind_kph: <WindSpeedIcon />,
  wind_mph: <WindSpeedIcon />,
  windchill_c: <TemperatureIcon />,
  windchill_f: <TemperatureIcon />,
  // location: <LocationIcon />,
  // date: <DateIcon />,
  // sunrise: <SunriseIcon />,
  // sunset: <SunsetIcon />,
  // moonrise: <MoonIcon />,
  // moonset: <MoonIcon />,
  // moon_phase: <MoonIcon />,
  // moon_illumination: <MoonIcon />,
  // is_sun_up: <SunriseIcon />,
  // is_moon_up: <MoonIcon />,
  'air_quality.co': <AirQualityIcon />,
  'air_quality.no2': <AirQualityIcon />,
  'air_quality.o3': <AirQualityIcon />,
  'air_quality.so2': <AirQualityIcon />,
  'air_quality.pm2_5': <AirQualityIcon />,
  'air_quality.pm10': <AirQualityIcon />,
  // 'air_quality.us_epa_index': <AirQualityIcon />,
  // 'air_quality.gb_defra_index': <AirQualityIcon />,
};

export const WeatherLabels = {
  // air_quality_co: 'Air Quality CO',
  // air_quality_no2: 'Air Quality no2',
  // air_quality_o3: 'Air Quality o3',
  // air_quality_so2: 'Air Quality so2',
  // air_quality_pm2_5: 'Air Quality pm2_5',
  // air_quality_pm10: 'Air Quality pm10',
  // air_quality_us_epa_index: 'Air Quality us_epa_index',
  // air_quality_gb_defra_index: 'Air Quality gb_defra_index',        
  chance_of_rain: 'Chance of Rain',
  chance_of_snow: 'Chance of Snow',
  cloud: 'Cloud Coverage',
  // condition: 'Condition',
  dewpoint_c: 'Dew Point (°C)',
  dewpoint_f: 'Dew Point (°F)',
  feelslike_c: 'Feels Like (°C)',
  feelslike_f: 'Feels Like (°F)',
  gust_kph: 'Wind Gust (kph)',
  gust_mph: 'Wind Gust (mph)',
  heatindex_c: 'Heat Index (°C)',
  heatindex_f: 'Heat Index (°F)',
  humidity: 'Humidity',
  // is_day: 'Is Daytime',
  precip_in: 'Precipitation (in)',
  precip_mm: 'Precipitation (mm)',
  pressure_in: 'Pressure (in)',
  pressure_mb: 'Pressure (mb)',
  temp_c: 'Temperature (°C)',
  temp_f: 'Temperature (°F)',
  // time: 'Time',
  // time_epoch: 'Time (Epoch)',
  uv: 'UV Index',
  vis_km: 'Visibility (km)',
  vis_miles: 'Visibility (miles)',
  will_it_rain: 'Will it Rain',
  will_it_snow: 'Will it Snow',
  // wind_degree: 'Wind Direction (Degrees)',
  // wind_dir: 'Wind Direction',
  wind_kph: 'Wind Speed (kph)',
  wind_mph: 'Wind Speed (mph)',
  windchill_c: 'Wind Chill (°C)',
  windchill_f: 'Wind Chill (°F)',
  // location: 'Location',
  // date: 'Date',
  // sunrise: 'Sunrise',
  // sunset: 'Sunset',
  // moonrise: 'Moonrise',
  // moonset: 'Moonset',
  // moon_phase: 'Moon Phase',
  // moon_illumination: 'Moon Illumination',
  // is_sun_up: 'Is Sun Up',
  // is_moon_up: 'Is Moon Up'
  'air_quality.co': 'Air Quality CO',
  'air_quality.no2': 'Air Quality NO2',
  'air_quality.o3': 'Air Quality O3',
  'air_quality.so2': 'Air Quality SO2',
  'air_quality.pm2_5': 'Air Quality PM2.5',
  'air_quality.pm10': 'Air Quality PM10',
  // 'air_quality.us_epa_index': 'US EPA Index',
  // 'air_quality.gb_defra_index': 'GB DEFRA Index',
};

export default WeatherIcons;
