import {Box, Grid, GridItem, Show} from '@chakra-ui/react';
import React, {useRef} from 'react';
import HowWeProtectYouMainContent from './MainContent';
import VeergePlusHeader from '../../../components/VeergePlus/Header';
import VeergePlusRightSideNav from '../../../components/VeergePlus/RightSideNav';

const HowWeProtectYou = () => {
  const termination = useRef(null);
  const veergeRights = useRef(null);
  const accountTerms = useRef(null);

  const scrollToSection = elementRef => {
    window?.scrollTo({
      top: elementRef?.current?.offsetTop - 150,
      behavior: 'smooth',
    });
  };
  return (
    <Box
      minH="100vh"
      fontFamily={'Euclid Circular B'}
      maxWidth="1440px"
      width="100%"
      margin="0 auto"
      backgroundColor="#fbfcfc"
      height="fit-content"
      position="relative"
    >
      {/* Header */}
      <VeergePlusHeader headerText="How you are protected" />

      <Show breakpoint="(min-width: 769px)">
        <Grid pt="100px" templateColumns="minmax(337px, 20%) 1fr minmax(150px, 20%)" gap={'100px'}>
          {/* Left Sidebar */}
          <Box />

          {/* Main content */}
          <Box pt="100px">
            <HowWeProtectYouMainContent />
          </Box>
          {/* Main content end*/}

          <VeergePlusRightSideNav currentPage={'How you are protected'} />
        </Grid>
      </Show>
    </Box>
  );
};

export default HowWeProtectYou;
