import {Box} from '@chakra-ui/react';
import React from 'react';

const SearchIcon = ({baseColor = '#52525b', ...rest}) => {
  return (
    <Box
      boxSize="36px"
      border="0.5px solid #52525b"
      p="8px"
      role="button"
      borderRadius="8px"
      {...rest}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.66665 14.0007C11.1644 14.0007 14 11.1651 14 7.66732C14 4.16951 11.1644 1.33398 7.66665 1.33398C4.16884 1.33398 1.33331 4.16951 1.33331 7.66732C1.33331 11.1651 4.16884 14.0007 7.66665 14.0007Z"
          stroke={baseColor}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.6666 14.6673L13.3333 13.334"
          stroke={baseColor}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Box>
  );
};

export default SearchIcon;
