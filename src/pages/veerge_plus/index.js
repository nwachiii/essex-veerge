import {Box, Grid, Show} from '@chakra-ui/react';
import React, {useRef} from 'react';
import VeergePlusHeader from '../../components/VeergePlus/Header';
import VeergePlusRightSideNav from '../../components/VeergePlus/RightSideNav';
import VeergePlusMainContent from './VeergePlusMainContent';
import VeergePlusLeftSideNav from '../../components/VeergePlus/LeftSideNav';

const VeergePlus = () => {
  const launchWithEase = useRef(null);
  const PMRMMFNS = useRef(null);
  const performanceOptimization = useRef(null);
  const securityWithInsights = useRef(null);
  const committedToSupport = useRef(null);
  const Channels = useRef(null);
  const pricingBreakdown = useRef(null);
  const gettingStarted = useRef(null);

  const scrollToSection = elementRef => {
    window?.scrollTo({
      top: elementRef?.current?.offsetTop - 180,
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
      <VeergePlusHeader headerText="Veerge plus" />

      <Show breakpoint="(min-width: 769px)">
        <Grid pt="100px" templateColumns="minmax(237px, 20%) 1fr minmax(150px, 20%)" gap={'100px'}>
          {/* Left Sidebar */}
          <VeergePlusLeftSideNav
            scrollToSection={scrollToSection}
            launchWithEase={launchWithEase}
            PMRMMFNS={PMRMMFNS}
            performanceOptimization={performanceOptimization}
            securityWithInsights={securityWithInsights}
            committedToSupport={committedToSupport}
            Channels={Channels}
            pricingBreakdown={pricingBreakdown}
            gettingStarted={gettingStarted}
          />
          {/* Main content */}
          <Box pt="100px">
            <VeergePlusMainContent
              launchWithEase={launchWithEase}
              PMRMMFNS={PMRMMFNS}
              performanceOptimization={performanceOptimization}
              securityWithInsights={securityWithInsights}
              committedToSupport={committedToSupport}
              Channels={Channels}
              pricingBreakdown={pricingBreakdown}
              gettingStarted={gettingStarted}
            />
          </Box>
          {/* Main content end*/}
          <VeergePlusRightSideNav currentPage={'Veerge plus'} />
        </Grid>
      </Show>
    </Box>
  );
};

export default VeergePlus;
