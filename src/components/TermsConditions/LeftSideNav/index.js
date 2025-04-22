import React, {useRef} from 'react';
import {Box, Show, Text} from '@chakra-ui/react';
import styles from './Leftsidenav.module.css';

export const TermsConditionsLeftSideNav = ({
  veergeRights,
  accountTerms,
  accountActivation,
  termination,
  scrollToSection,
  yourResponsibilities,
  feesAndTaxes,
  confidentiality,
  limitationOfLiability,
  intellectualProperty,
  betaServices,
  feedback,
  privacyPolicy,
  modifications,
  generalConditions,
}) => {
  return (
    <Box overflowY="visible">
      <Show breakpoint="(max-width: 768px)">
        <div className={styles.leftsidenav}>
          <ul>
            <li onClick={() => scrollToSection(accountTerms)}>Account Terms</li>
            <li onClick={() => scrollToSection(accountActivation)}>Account Activation</li>
            <li onClick={() => scrollToSection(veergeRights)}>Veerge Rights</li>
            <li onClick={() => scrollToSection(yourResponsibilities)}>Your Responsibilities</li>
            <li onClick={() => scrollToSection(feesAndTaxes)}>Payment of Fees and Taxes</li>
            <li onClick={() => scrollToSection(confidentiality)}>Confidentiality</li>
            <li onClick={() => scrollToSection(limitationOfLiability)}>
              Limitation of Liability and Indemnification
            </li>
            <li onClick={() => scrollToSection(intellectualProperty)}>
              Intellectual Property and Your Materials
            </li>
            <li onClick={() => scrollToSection(betaServices)}>Beta Services</li>
            <li onClick={() => scrollToSection(feedback)}>Feedback and Reviews</li>
            <li onClick={() => scrollToSection(privacyPolicy)}>Privacy Policy</li>
            <li onClick={() => scrollToSection(termination)}>Term and Termination</li>
            <li onClick={() => scrollToSection(modifications)}>Modifications</li>
            <li onClick={() => scrollToSection(generalConditions)}>General Conditions</li>
          </ul>
        </div>
      </Show>
      <Show breakpoint="(min-width: 769px)">
        <div className={styles.leftsidenav}>
          <Text
            pl="40px"
            color="#000"
            fontSize="24px"
            fontFamily="Euclid Circular B"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="normal"
            letterSpacing="3.12px"
          >
            Terms of Service
          </Text>
          <ul>
            <li onClick={() => scrollToSection(accountTerms)}>Account Terms</li>
            <li onClick={() => scrollToSection(veergeRights)}>Veerge Rights</li>
            <li onClick={() => scrollToSection(betaServices)}>Beta Services</li>

            <li onClick={() => scrollToSection(privacyPolicy)}>Privacy Policy</li>

            <li onClick={() => scrollToSection(termination)}>Termination</li>
            <li onClick={() => scrollToSection(modifications)}>Modifications</li>
            <li onClick={() => scrollToSection(confidentiality)}>Confidentiality</li>
            <li onClick={() => scrollToSection(accountActivation)}>Account Activation</li>
            <li onClick={() => scrollToSection(yourResponsibilities)}>Your Responsibilities</li>
            <li onClick={() => scrollToSection(generalConditions)}>General Conditions</li>
            <li onClick={() => scrollToSection(feedback)}>Feedback and Reviews</li>

            <li onClick={() => scrollToSection(feesAndTaxes)}>Payment of Fees and Taxes</li>
            <li onClick={() => scrollToSection(intellectualProperty)}>
              Intellectual Property and Your Materials
            </li>
            <li onClick={() => scrollToSection(limitationOfLiability)}>
              Limitation of Liability and Indemnification
            </li>
          </ul>
        </div>
      </Show>
    </Box>
  );
};

export default TermsConditionsLeftSideNav;
