import {Box, Grid, GridItem, Show} from '@chakra-ui/react';
import React, {useRef} from 'react';
import HowWeProtectYouMainContent, {BasicVsCustomAppGuideContent} from './MainContent';
import VeergePlusHeader from '../../../components/VeergePlus/Header';
import VeergePlusRightSideNav from '../../../components/VeergePlus/RightSideNav';

export const BasicVsCustomAppGuide = () => {
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
      <VeergePlusHeader headerText="Basic & Custom app" />

      <Show breakpoint="(min-width: 769px)">
        <Grid pt="100px" templateColumns="minmax(287px, 20%) 1fr minmax(150px, 20%)" gap={'100px'}>
          {/* Left Sidebar */}
          <Box />

          {/* Main content */}
          <Box pt="100px">
            <BasicVsCustomAppGuideContent />
          </Box>
          {/* Main content end*/}

          <VeergePlusRightSideNav currentPage={'How you are protected'} />
        </Grid>
      </Show>
    </Box>
  );
};

export default BasicVsCustomAppGuide;
