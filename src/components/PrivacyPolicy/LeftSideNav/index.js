import React, {useRef} from 'react';
import {Box, Show, Text} from '@chakra-ui/react';
import styles from './Leftsidenav.module.css';
import Link from 'next/link';

export const PrivacyPolicyLeftSideNav = ({
  intro,
  values,
  retention,
  yourRights,
  contactingUs,
  machineLearning,
  protectingYourInfo,
  whyWeProcessYourInfo,
  scrollToSection,
}) => {
  return (
    <Box overflowY="visible">
      <Show breakpoint="(max-width: 768px)">
        <div className={styles.leftsidenav}>
          <ul>
            <li onClick={() => scrollToSection(intro)}>Introduction</li>
            <li onClick={() => scrollToSection(values)}>Our Values</li>
            <li onClick={() => scrollToSection(whyWeProcessYourInfo)}>
              Why we process your information
            </li>
            <li onClick={() => scrollToSection(yourRights)}>Your rights over your information</li>
            <li onClick={() => scrollToSection(retention)}>Retention of your information</li>
            <li onClick={() => scrollToSection(machineLearning)}>Our use of machine learning</li>
            <li onClick={() => scrollToSection(protectingYourInfo)}>
              Protection of your information
            </li>
            <li onClick={() => scrollToSection(contactingUs)}>Contacting us</li>
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
            Privacy policy
          </Text>
          <ul>
            <li onClick={() => scrollToSection(intro)}>Introduction</li>
            <li onClick={() => scrollToSection(values)}>Our Values</li>
            <li onClick={() => scrollToSection(whyWeProcessYourInfo)}>
              Why we process your information
            </li>
            <li onClick={() => scrollToSection(yourRights)}>Your rights over your information</li>
            <li onClick={() => scrollToSection(retention)}>Retention of your information</li>
            <li onClick={() => scrollToSection(machineLearning)}>Our use of machine learning</li>
            <li onClick={() => scrollToSection(protectingYourInfo)}>
              Protection of your information
            </li>
            <li onClick={() => scrollToSection(contactingUs)}>Contacting us</li>
          </ul>
        </div>
      </Show>
    </Box>
  );
};

export default PrivacyPolicyLeftSideNav;
