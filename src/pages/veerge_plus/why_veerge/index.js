import {Box, Grid, GridItem, Show} from '@chakra-ui/react';
import React, {useRef} from 'react';

import VeergePlusHeader from '../../../components/VeergePlus/Header';
import WhyVeergeMainContent from './MainContent';
import VeergePlusRightSideNav from '../../../components/VeergePlus/RightSideNav';
import WhyVeergeLeftSideBar from '../../../components/VeergePlus/LeftSideNav/WhyVeergeLeftSideBar';

const TermsConditions = () => {
  const ourCulture = useRef(null);
  const ourMission = useRef(null);
  const ourValues = useRef(null);
  const whyVeerge = useRef(null);

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
      <VeergePlusHeader headerText="Why Veerge Instead of Building" />

      <Show breakpoint="(min-width: 769px)">
        <Grid pt="100px" templateColumns="minmax(337px, 20%) 1fr minmax(150px, 20%)" gap={'100px'}>
          {/* Left Sidebar */}
          <WhyVeergeLeftSideBar
            scrollToSection={scrollToSection}
            ourValues={ourValues}
            ourCulture={ourCulture}
            whyVeerge={whyVeerge}
            ourMission={ourMission}
          />
          {/* Main content */}
          <Box pt="100px">
            <WhyVeergeMainContent
              ourValues={ourValues}
              ourCulture={ourCulture}
              whyVeerge={whyVeerge}
              ourMission={ourMission}
            />
          </Box>
          {/* Main content end*/}
          <VeergePlusRightSideNav
            addPageInfo={{
              pageTitle: 'A Letter from our CEO',
              pageUrl: '/veerge_plus/letter_from_ceo',
            }}
            currentPage={'Why veerge instead of building'}
          />
        </Grid>
      </Show>
    </Box>
  );
};

export default TermsConditions;
