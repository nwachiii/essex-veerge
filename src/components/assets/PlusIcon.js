import React from 'react';

export const PlusIcon = ({fillcolor = '#4545FE'}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Frame" clip-path="url(#clip0_24670_56631)">
        <path id="Vector" d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill={fillcolor} />
      </g>
      <defs>
        <clipPath id="clip0_24670_56631">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
