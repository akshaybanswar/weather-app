import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

interface ForecastButtonsProps {
  handleDailyClick: () => void;
  handleHourlyClick: () => void;
  isDailyClicked: boolean;
  isHourlyClicked: boolean;
  temp_for_button: number;
}

const temperatureColors = [
  { temp: -10, color: 'rgb(0, 0, 255)' }, // Blue
  { temp: 0, color: 'rgb(0, 128, 255)' }, // Light blue
  { temp: 5, color: 'rgb(0, 255, 255)' }, // Cyan
  { temp: 10, color: 'rgb(0, 255, 128)' }, // Greenish cyan
  { temp: 15, color: 'rgb(0, 255, 0)' }, // Green
  { temp: 20, color: 'rgb(128, 255, 0)' }, // Yellowish green
  { temp: 25, color: 'rgb(255, 255, 0)' }, // Yellow
  { temp: 30, color: 'rgb(255, 128, 0)' }, // Orange
  { temp: 35, color: 'rgb(255, 0, 0)' }, // Red
  { temp: 40, color: 'rgb(255, 0, 128)' }, // Pinkish red
  { temp: 45, color: 'rgb(255, 0, 255)' }, // Magenta
];

function getColorForTemperature(temp: number) {
  for (let i = 0; i < temperatureColors.length; i++) {
    if (temp < temperatureColors[i].temp) {
      return temperatureColors[i].color;
    }
  }
  return temperatureColors[temperatureColors.length - 1].color;
}

export const ForecastButtons: React.FC<ForecastButtonsProps> = ({
    handleDailyClick,
    handleHourlyClick,
    isDailyClicked,
    isHourlyClicked,
    temp_for_button,
}) => {
    const buttonColor = getColorForTemperature(temp_for_button);

    return (
        <ButtonGroup variant="outlined" aria-label="weather forecast">
            <Button
                variant={isDailyClicked ? 'contained' : 'outlined'}
                style={{ backgroundColor : isDailyClicked ? buttonColor : "transparent", borderColor : "gray" , color : isDailyClicked ? "black" : "gray"}}
                onClick={handleDailyClick}
            >
                Daily
            </Button>
            <Button
                variant={isHourlyClicked ? 'contained' : 'outlined'}
                style={{ backgroundColor : isHourlyClicked ? buttonColor : "transparent", borderColor : "gray" , color : isHourlyClicked ? "black" : "gray"}}
                onClick={handleHourlyClick}
            >
                Hourly
            </Button>
        </ButtonGroup>
    );
};

export default ForecastButtons;

