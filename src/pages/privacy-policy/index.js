import {Box, Grid, GridItem, Show} from '@chakra-ui/react';
import React, {useRef} from 'react';
import PrivacyPolicyHeader from '../../components/PrivacyPolicy/Header';
import PrivacyPolicyLeftSideNav from '../../components/PrivacyPolicy/LeftSideNav';
import PrivacyPolicyRightSideNav from '../../components/PrivacyPolicy/RightSideNav';
import PrivacyPolicyMainContent from './MainContent';

const PrivacyPolicy = () => {
  const intro = useRef();
  const values = useRef();
  const retention = useRef();
  const yourRights = useRef();
  const contactingUs = useRef();
  const machineLearning = useRef();
  const protectingYourInfo = useRef();
  const whyWeProcessYourInfo = useRef();

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
      <PrivacyPolicyHeader
        intro={intro}
        values={values}
        retention={retention}
        yourRights={yourRights}
        contactingUs={contactingUs}
        machineLearning={machineLearning}
        protectingYourInfo={protectingYourInfo}
        whyWeProcessYourInfo={whyWeProcessYourInfo}
        scrollToSection={scrollToSection}
      />
      <Show breakpoint="(min-width: 769px)">
        <Grid pt="100px" templateColumns="minmax(337px, 20%) 1fr minmax(150px, 20%)" gap={'100px'}>
          <PrivacyPolicyLeftSideNav
            intro={intro}
            values={values}
            retention={retention}
            yourRights={yourRights}
            contactingUs={contactingUs}
            machineLearning={machineLearning}
            protectingYourInfo={protectingYourInfo}
            whyWeProcessYourInfo={whyWeProcessYourInfo}
            scrollToSection={scrollToSection}
          />
          {/* Main content */}
          <Box pt="100px">
            <PrivacyPolicyMainContent
              intro={intro}
              values={values}
              retention={retention}
              yourRights={yourRights}
              contactingUs={contactingUs}
              machineLearning={machineLearning}
              protectingYourInfo={protectingYourInfo}
              whyWeProcessYourInfo={whyWeProcessYourInfo}
            />
          </Box>
          {/* Main content end*/}
          <PrivacyPolicyRightSideNav />
        </Grid>
      </Show>
    </Box>
  );
};

export default PrivacyPolicy;
