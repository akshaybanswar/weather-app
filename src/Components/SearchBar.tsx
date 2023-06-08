import React, { CSSProperties } from 'react';
import { TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  query: string;
  handleSearch: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  style?: CSSProperties;
}

export default function SearchBar({
  query,
  handleSearch,
  handleInputChange,
  handleKeyDown,
  className,
}: SearchBarProps) {
  return (
    <>
      <TextField
        id="standard-basic"
        label="Enter a location..."
        variant="standard"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={className}
        sx={{ width: '80%', opacity: '0.7', color: '#ffffff', textShadow: '1px 1px 2px rgba(50, 50, 50, 0.5)'}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} color="inherit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Typography sx={{ height: '3vh' }} />
    </>
  );
}
