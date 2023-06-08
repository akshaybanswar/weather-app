import { Typography, } from '@mui/material';
import useTemperatureGradient from '../Components/Hook/useTemperatureGradient';

type HeaderProps = {
  gradient: ReturnType<typeof useTemperatureGradient>;
};

export const Header = ({ gradient }: HeaderProps) => {
  return (
    <header>
      <Typography variant="h5">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: gradient ? 'black' : 'grey',
            textShadow: '1px 1px 2px rgba(50, 50, 50, 0.5)'
          }}
        >
          <h1>Weather Information</h1></div></Typography>
    </header>
  );
};


export default Header;
