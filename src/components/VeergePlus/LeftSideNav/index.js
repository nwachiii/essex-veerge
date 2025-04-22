import React, {useRef} from 'react';
import {Box, Show, Text} from '@chakra-ui/react';
import styles from './Leftsidenav.module.css';

export const VeergePlusLeftSideNav = ({
  launchWithEase,
  PMRMMFNS,
  performanceOptimization,
  scrollToSection,
  securityWithInsights,
  committedToSupport,
  Channels,
  pricingBreakdown,
  gettingStarted,
}) => {
  return (
    <Box overflowY="visible">
      <Show breakpoint="(max-width: 768px)">
        <div className={styles.leftsidenav}>
          <ul>
            <li onClick={() => scrollToSection(PMRMMFNS)}>
              Personalize More, Retain More, Move Fast, Never Stop
            </li>
            <li onClick={() => scrollToSection(performanceOptimization)}>
              Optimized for Performance
            </li>
            <li onClick={() => scrollToSection(launchWithEase)}>Migrate and Launch with Ease</li>
            <li onClick={() => scrollToSection(securityWithInsights)}>
              Built-In Security and Insights
            </li>
            <li onClick={() => scrollToSection(committedToSupport)}>Committed to Support</li>
            <li onClick={() => scrollToSection(Channels)}>Channels</li>
            <li onClick={() => scrollToSection(pricingBreakdown)}>Pricing and Cost Breakdown</li>
            <li onClick={() => scrollToSection(gettingStarted)}>Getting Started with Veerge</li>
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
            Veerge Plus
          </Text>
          <ul>
            <li onClick={() => scrollToSection(PMRMMFNS)}>
              Personalize More, Retain More, Move Fast, Never Stop
            </li>
            <li onClick={() => scrollToSection(launchWithEase)}>Migrate and Launch with Ease</li>

            <li onClick={() => scrollToSection(Channels)}>Channels</li>
            <li onClick={() => scrollToSection(performanceOptimization)}>
              Optimized for Performance
            </li>
            <li onClick={() => scrollToSection(securityWithInsights)}>
              Built-In Security and Insights
            </li>
            <li onClick={() => scrollToSection(pricingBreakdown)}>Pricing and Cost Breakdown</li>
            <li onClick={() => scrollToSection(gettingStarted)}>Getting Started with Veerge</li>

            <li onClick={() => scrollToSection(committedToSupport)}>Committed to Support</li>
          </ul>
        </div>
      </Show>
    </Box>
  );
};

export default VeergePlusLeftSideNav;
