import {Box} from '@chakra-ui/react';
import React from 'react';

const FilterIcon = ({baseColor = '#52525b', ...rest}) => {
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
        width="100%"
        height="100%"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_4072_23165)">
          <path
            d="M1.9574 13.8682H9.4574V15.3682H1.9574V13.8682ZM1.9574 8.61816H16.9574V10.1182H1.9574V8.61816ZM1.9574 3.36816H16.9574V4.86816H1.9574V3.36816ZM13.9574 13.8682V11.6182H15.4574V13.8682H17.7074V15.3682H15.4574V17.6182H13.9574V15.3682H11.7074V13.8682H13.9574Z"
            fill={baseColor}
          />
        </g>
        <defs>
          <clipPath id="clip0_4072_23165">
            <rect width="18" height="18" fill="white" transform="translate(0.457397 0.368164)" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

export default FilterIcon;
