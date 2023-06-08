import { useEffect } from "react";

interface GeolocationProps {
  onCoordinates: (latitude: number, longitude: number) => void;
}

export default function Geolocation({ onCoordinates }: GeolocationProps) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      onCoordinates(latitude, longitude); // Pass the coordinates to the parent component
    });
  }, [onCoordinates]);

  return null;
}
