import {Box} from '@chakra-ui/react';
import React from 'react';

export const CloseIcon = ({baseColor = 'white', ...rest}) => {
  return (
    <Box {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
      >
        <g clip-path="url(#clip0_21240_60818)">
          <path
            d="M8.3503 7.59563L11.5153 4.43066L12.4194 5.33476L9.2544 8.49972L12.4194 11.6647L11.5153 12.5688L8.3503 9.40381L5.18534 12.5688L4.28125 11.6647L7.44621 8.49972L4.28125 5.33476L5.18534 4.43066L8.3503 7.59563Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_21240_60818">
            <rect
              width="15.3453"
              height="15.3453"
              fill={baseColor}
              transform="translate(0.675781 0.827148)"
            />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};
