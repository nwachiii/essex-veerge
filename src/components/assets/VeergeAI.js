import React from 'react';
import { Box } from '@chakra-ui/react';

export const VeergeAI = ({ ...rest }) => {
  return (
    <Box {...rest}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="24" fill="#F4EBFF" />
        <path d="M21.4426 14.9344L23.993 21.8267L30.8852 24.3771L23.993 26.9274L21.4426 33.8197L18.8923 26.9274L12 24.3771L18.8923 21.8267L21.4426 14.9344Z" fill="#53389E" />
        <path d="M32.0657 11L33.1283 13.8718L36.0001 14.9344L33.1283 15.9971L32.0657 18.8689L31.003 15.9971L28.1312 14.9344L31.003 13.8718L32.0657 11Z" fill="#53389E" />
        <path d="M32.0657 29.8853L33.1283 32.757L36.0001 33.8197L33.1283 34.8823L32.0657 37.7541L31.003 34.8823L28.1312 33.8197L31.003 32.757L32.0657 29.8853Z" fill="#53389E" />
      </svg>
    </Box>
  );
}

export default VeergeAI