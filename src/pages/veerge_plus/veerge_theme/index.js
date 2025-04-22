import {Box, Grid, GridItem, Show} from '@chakra-ui/react';
import React, {useRef} from 'react';
import VeergePlusHeader from '../../../components/VeergePlus/Header';
import VeergeThemeMainContent from './MainContent';
import VeergePlusRightSideNav from '../../../components/VeergePlus/RightSideNav';

const TermsConditions = () => {
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
      <VeergePlusHeader headerText="Veerge Theme" />

      <Show breakpoint="(min-width: 769px)">
        <Grid pt="100px" templateColumns="minmax(337px, 20%) 1fr minmax(150px, 20%)" gap={'100px'}>
          {/* Left Sidebar */}
          <Box />
          {/* Main content */}
          <Box pt="100px">
            <VeergeThemeMainContent />
          </Box>
          {/* Main content end*/}
          <VeergePlusRightSideNav currentPage={'Veerge theme'} />
        </Grid>
      </Show>
    </Box>
  );
};

export default TermsConditions;
