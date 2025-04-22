import React, {useRef} from 'react';
import {Box, Show, Text} from '@chakra-ui/react';
import styles from './Leftsidenav.module.css';

export const WhyVeergeLeftSideBar = ({
  whyVeerge,
  ourMission,
  ourCulture,
  ourValues,
  scrollToSection,
}) => {
  return (
    <Box overflowY="visible">
      <Show breakpoint="(max-width: 768px)">
        <div className={styles.leftsidenav}>
          <ul>
            <li onClick={() => scrollToSection(whyVeerge)}>Why Veerge</li>
            <li onClick={() => scrollToSection(ourMission)}>Our Mission</li>
            <li onClick={() => scrollToSection(ourValues)}>Our Values</li>
            <li onClick={() => scrollToSection(ourCulture)}>Our Culture</li>
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
            Why Veerge instead of building?
          </Text>
          <ul>
            <li style={{fontSize: '14px'}} onClick={() => scrollToSection(whyVeerge)}>
              Why Veerge
            </li>
            <li style={{fontSize: '14px'}} onClick={() => scrollToSection(ourMission)}>
              Our Mission
            </li>
            <li style={{fontSize: '14px'}} onClick={() => scrollToSection(ourValues)}>
              Our Values
            </li>
            <li style={{fontSize: '14px'}} onClick={() => scrollToSection(ourCulture)}>
              Our Culture
            </li>
          </ul>
        </div>
      </Show>
    </Box>
  );
};

export default WhyVeergeLeftSideBar;
