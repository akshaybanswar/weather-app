import { useEffect } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Label } from 'recharts';
import { Hour } from '../Assets/WeatherData';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import WeatherIcons, { WeatherLabels } from '../Assets/WeatherIcons';
import { FormControl } from '@mui/material';

interface HourlyChartProps {
  hourlyData: Hour[];
  selectedData: string;
  setSelectedData: (value: string) => void;
  isCelsius: boolean;
}

export default function HourlyChart({ hourlyData, selectedData, setSelectedData, isCelsius }: HourlyChartProps) {
  useEffect(() => {
    const label = WeatherLabels[selectedData as keyof typeof WeatherLabels] || selectedData;
    if ((label.includes('°C') && !isCelsius) || (label.includes('°F') && isCelsius)) {
      const newKey = Object.keys(WeatherLabels).find((key) => {
        const label = WeatherLabels[key as keyof typeof WeatherLabels] || key;
        return ((label.includes('°C') && isCelsius) || (label.includes('°F') && !isCelsius));
      });
      if (newKey) {
        setSelectedData(newKey);
      }
    }
  }, [isCelsius, selectedData, setSelectedData]);

  const formatTime = (time: string) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataKey = payload[0].dataKey;
      const value = payload[0].value;
      const label = WeatherLabels[dataKey as keyof typeof WeatherLabels] || dataKey;
      return (
        <div style={{ backgroundColor: '#333333', color: '#fff', padding: '5px' }}>
          <div>{`${label}: ${value}`}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '1rem' }}>
      <Box sx={{ alignSelf: 'flex-end', marginRight: '10px', marginBottom: '0px', zIndex: 1 }}>
        <FormControl size="small">
          <Select value={selectedData} onChange={(e) => setSelectedData(e.target.value as string)}>
            {Object.entries(WeatherIcons).map(([key, icon]) => {
              const label = WeatherLabels[key as keyof typeof WeatherLabels] || key;
              if ((label.includes('°C') && !isCelsius) || (label.includes('°F') && isCelsius)) {
                return null;
              }
              return (
                <MenuItem key={key} value={key} onClick={(event) => { event.stopPropagation(); }}>
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                    {icon} {label}
                  </Box>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', background: '#333333', opacity: '0.8', paddingBottom: '0.8rem', paddingTop: '1rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <ResponsiveContainer height={0.5 * window.innerHeight}>
          <AreaChart data={hourlyData} margin={{ top: 30, right: 30, left: 1, bottom: 20 }}>
            <CartesianGrid strokeDasharray="1 3" strokeOpacity={0.7} stroke="#cccccc" />
            <XAxis dataKey="time" tickFormatter={formatTime} stroke="#cccccc" >
            <Label value="Time (per Hour)" position="bottom" offset={0}/>
            </XAxis>
            <YAxis stroke="#cccccc" >
              <Label value={WeatherLabels[selectedData as keyof typeof WeatherLabels] || selectedData} angle={-90} position="center"
      dx={-10}
      dy={10}/>
            </YAxis>
            <Tooltip content={customTooltip} />
            <Area type="monotone" dataKey={selectedData} stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
            <Line type="linear" dataKey={selectedData} stroke="#8884d8" activeDot={{ r: 8 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
