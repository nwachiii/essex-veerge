import {Box, Grid, GridItem, Show} from '@chakra-ui/react';
import React, {useRef} from 'react';
import TermsConditionsHeader from '../../components/TermsConditions/Header';
import TermsConditionsLeftSideNav from '../../components/TermsConditions/LeftSideNav';
import TermsConditionsRightSideNav from '../../components/TermsConditions/RightSideNav';
import TermsConditionsMainContent from './MainContent';

const TermsConditions = () => {
  const termination = useRef(null);
  const veergeRights = useRef(null);
  const accountTerms = useRef(null);
  const accountActivation = useRef(null);
  const yourResponsibilities = useRef(null);
  const feesAndTaxes = useRef(null);
  const confidentiality = useRef(null);
  const limitationOfLiability = useRef(null);
  const intellectualProperty = useRef(null);
  const betaServices = useRef(null);
  const feedback = useRef(null);
  const privacyPolicy = useRef(null);
  const modifications = useRef(null);
  const generalConditions = useRef(null);

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
      <TermsConditionsHeader
        termination={termination}
        scrollToSection={scrollToSection}
        veergeRights={veergeRights}
        accountTerms={accountTerms}
        accountActivation={accountActivation}
        yourResponsibilities={yourResponsibilities}
        feesAndTaxes={feesAndTaxes}
        confidentiality={confidentiality}
        limitationOfLiability={limitationOfLiability}
        intellectualProperty={intellectualProperty}
        betaServices={betaServices}
        feedback={feedback}
        privacyPolicy={privacyPolicy}
        modifications={modifications}
        generalConditions={generalConditions}
      />

      <Show breakpoint="(min-width: 769px)">
        <Grid pt="100px" templateColumns="minmax(337px, 20%) 1fr minmax(150px, 20%)" gap={'100px'}>
          {/* Left Sidebar */}
          <TermsConditionsLeftSideNav
            termination={termination}
            scrollToSection={scrollToSection}
            veergeRights={veergeRights}
            accountTerms={accountTerms}
            accountActivation={accountActivation}
            yourResponsibilities={yourResponsibilities}
            feesAndTaxes={feesAndTaxes}
            confidentiality={confidentiality}
            limitationOfLiability={limitationOfLiability}
            intellectualProperty={intellectualProperty}
            betaServices={betaServices}
            feedback={feedback}
            privacyPolicy={privacyPolicy}
            modifications={modifications}
            generalConditions={generalConditions}
          />

          {/* Main content */}
          <Box pt="100px">
            <TermsConditionsMainContent
              termination={termination}
              veergeRights={veergeRights}
              accountTerms={accountTerms}
              accountActivation={accountActivation}
              yourResponsibilities={yourResponsibilities}
              feesAndTaxes={feesAndTaxes}
              confidentiality={confidentiality}
              limitationOfLiability={limitationOfLiability}
              intellectualProperty={intellectualProperty}
              betaServices={betaServices}
              feedback={feedback}
              privacyPolicy={privacyPolicy}
              modifications={modifications}
              generalConditions={generalConditions}
            />
          </Box>
          {/* Main content end*/}
          <TermsConditionsRightSideNav />
        </Grid>
      </Show>
    </Box>
  );
};

export default TermsConditions;
