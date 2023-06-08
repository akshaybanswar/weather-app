import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WeatherContextData {
  location: string;
  setLocation: (location: string) => void;
}

interface WeatherProviderProps {
    children: ReactNode;
}

const WeatherContext = createContext<WeatherContextData>({} as WeatherContextData);

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [location, setLocation] = useState('');

  console.log('setLocation function:', setLocation);

  return (
    <WeatherContext.Provider value={{ location, setLocation }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
    const context = useContext(WeatherContext);
  
    if (context === undefined) {
      throw new Error('useWeather must be used within a WeatherProvider');
    }
  
    return context;
  };
