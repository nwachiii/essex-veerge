import {Box} from '@chakra-ui/react';
import React from 'react';

export const BackArrowIcon = ({...rest}) => {
  return (
    <Box {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
      >
        <path
          d="M5.84585 12.5078L20.2461 12.5078"
          stroke="#191919"
          stroke-width="1.8"
          stroke-linecap="square"
        />
        <path
          d="M11.2949 6.48225L5.24492 12.5062L11.2949 18.5312"
          stroke="#191919"
          stroke-width="1.8"
          stroke-linecap="square"
        />
      </svg>
    </Box>
  );
};

export default BackArrowIcon;


