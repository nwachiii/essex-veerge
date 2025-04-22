import {Box, Grid, GridItem, Show} from '@chakra-ui/react';
import React, {useRef} from 'react';
import VeergePlusHeader from '../../../components/VeergePlus/Header';
import VeergePlusRightSideNav from '../../../components/VeergePlus/RightSideNav';
import LetterFromCEOMainContent from './MainContent';

export const LetterFromCEO = () => {
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
      <VeergePlusHeader headerText="A Letter from our CEO" />

      <Show breakpoint="(min-width: 769px)">
        <Grid pt="100px" templateColumns="minmax(337px, 20%) 1fr minmax(150px, 20%)" gap={'100px'}>
          {/* Left Sidebar */}
          <Box />
          {/* Main content */}
          <Box pt="100px">
            <LetterFromCEOMainContent />
          </Box>
          {/* Main content end*/}
          <VeergePlusRightSideNav currentPage={'A Letter from our CEO'} />
        </Grid>
      </Show>
    </Box>
  );
};

export default LetterFromCEO;
