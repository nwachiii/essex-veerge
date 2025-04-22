import {Box} from '@chakra-ui/react';
import React from 'react';

const DropDownIcon = ({...rest}) => {
  return (
    <Box width="12px" height="6px" {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 12 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 6L0 0H12L6 6Z" fill="#919191" />
      </svg>
    </Box>
  );
};

export default DropDownIcon;
