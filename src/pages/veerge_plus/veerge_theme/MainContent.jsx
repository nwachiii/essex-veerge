import {Box, Flex, Stack, Text} from '@chakra-ui/react';
import Link from 'next/link';
import React, {useRef} from 'react';

const VeergeThemeMainContent = ({
  veergeRights,
  accountTerms,
  accountActivation,
  termination,
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
    <Stack fontFamily="Euclid Circular B" pb="86px">
      <Box>
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="32px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="3.84px"
        >
          VEERGE THEME
        </Text>
        <Text
          color="#606060"
          fontSize="14px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
          mt="15px"
        >
          Published: November 1, 2022
        </Text>
      </Box>
      <Stack spacing={'20px'} mt="30px">
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          On Veerge, a theme refers to the overall design and layout of your application. It
          encompasses the appearance and functionality of your application, including the user
          interface, navigation, color scheme, typography, and more. Themes offer the flexibility to
          customize the look and feel of your Veerge application without the need for advanced app
          development or coding skills.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          When developing an application on Veerge, you have the option to choose from both free and
          paid themes. The paid theme is automatically generated based on your existing website
          layout. Veerge leverages embedded tools and frameworks to assist in generating UI
          prototypes and wireframes, but some level of human involvement and customization is
          usually required to ensure it meets your expectations.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
      {`    It's recommended to schedule a meeting with Veerge support to discuss your business needs,
          thoughtful design decisions, user experience considerations, and specific application
          requirements and goals. Automated generation may not accurately capture these nuances
          without human intervention.`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {`Once you've approved a theme, you can preview how it will appear in your application
          before integrating it with APIs. This allows you to experiment, make adjustments, and
          ensure it aligns with your vision.`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
         {` For updating and switching themes, you can modify your theme at any time to take advantage
          of new features, bug fixes, or updates released by Veerge. If you decide to switch to a
          different theme, you can contact Veerge support for assistance. However, it's important to
          note that changing themes may require reconfiguring certain settings and redoing specific
          customizations.`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Please keep in mind that the availability of ongoing updates and support for themes on
          Veerge may vary depending on your subscription tier. Typically, Tier 2 and Tier 3
          subscriptions offer continued updates for themes, including new mobile features and
          support. However, Tier 1 may have limited access to free updates and support.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          In summary, Veerge themes provide a convenient way to create visually appealing and
          functional applications without the need for extensive coding knowledge. They empower you
          to establish a unique and professional user experience for your application.
        </Text>
      </Stack>
    </Stack>
  );
};

export default VeergeThemeMainContent;
