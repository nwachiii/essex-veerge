import {Box} from '@chakra-ui/react';
import React from 'react';

const CheckBlackIcon = ({...rest}) => {
  return (
    <Box overflow="hidden" borderRadius="full" w="24px" h="24px" {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect x="0.5" y="0.5" width="23" height="23" rx="7.5" fill="#191919" stroke="#191919" />
        <path
          d="M6 12L10.0016 16L18.0017 8"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

export default CheckBlackIcon;
