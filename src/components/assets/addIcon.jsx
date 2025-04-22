import {Box} from '@chakra-ui/react';
import React from 'react';

const AddIcon = ({baseColor = '#525252', ...rest}) => {
  return (
    <Box boxSize="16px" {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Frame" clip-path="url(#clip0_15782_90620)">
          <path
            id="Vector"
            d="M6.94572 7.36858V3.5791H8.20888V7.36858H11.9984V8.63173H8.20888V12.4212H6.94572V8.63173H3.15625V7.36858H6.94572Z"
            fill={baseColor}
          />
        </g>
        <defs>
          <clipPath id="clip0_15782_90620">
            <rect width="15.1579" height="15.1579" fill="white" transform="translate(0 0.420898)" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

export default AddIcon;
