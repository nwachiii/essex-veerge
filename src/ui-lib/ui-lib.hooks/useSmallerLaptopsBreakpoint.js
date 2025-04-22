// hooks/useisSmallerLaptopBreakpoint.js
import {useState, useEffect} from 'react';
import {useTheme} from '@chakra-ui/react';

export const useSmallerLaptopsBreakpoint = () => {
  const [isSmallerLaptop, setisSmallerLaptop] = useState(false);
  const breakpointWidth = 1368;

  useEffect(() => {
    // Function to check screen width
    const checkBreakpoint = () => setisSmallerLaptop(window.innerWidth <= breakpointWidth);

    // Initial check
    checkBreakpoint();

    // Event listener for resize
    window.addEventListener('resize', checkBreakpoint);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, [breakpointWidth]);

  return isSmallerLaptop;
};
