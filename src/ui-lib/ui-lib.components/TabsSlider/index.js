import {Box} from '@chakra-ui/react';
import React from 'react';

export const TabsSlider = ({maxLength, tabIndex, handleSliderChange}) => {
  console.log(tabIndex, maxLength);
  return (
    <input
      min="0"
      type="range"
      max={maxLength}
      value={tabIndex}
      className="tabs_slider"
      onChange={handleSliderChange}
    />
  );
};
