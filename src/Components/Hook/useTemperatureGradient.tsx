import { useMemo } from 'react';

interface TemperatureGradientProps {
  maxTemp: number;
  minTemp: number;
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
 for (let i = 0; i < temperatureColors.length - 1; i++) {
 if (temp >= temperatureColors[i].temp && temp < temperatureColors[i + 1].temp) {
 const rgb = temperatureColors[i].color;
 const rgba = rgb.replace('rgb', 'rgba').replace(')', ', 0.3)');
 return rgba;
 }
 }
 const rgb = temperatureColors[temperatureColors.length - 1].color;
 const rgba = rgb.replace('rgb', 'rgba').replace(')', ', 0.3)');
 return rgba;
}

 export default function useTemperatureGradient({
  maxTemp,
  minTemp,
 }: TemperatureGradientProps) {
  const gradient = useMemo(() => {
  if (maxTemp === -Infinity || minTemp === Infinity) {
  return '';
  }
 
  const maxColor = getColorForTemperature(maxTemp);
  const minColor = getColorForTemperature(minTemp);
  const midTemp = (maxTemp + minTemp) / 2;
  const midColor = getColorForTemperature(midTemp);
  return `linear-gradient(to bottom, ${maxColor}, ${midColor}, ${minColor})`;
  }, [maxTemp, minTemp]);  
 
  return gradient;
 }