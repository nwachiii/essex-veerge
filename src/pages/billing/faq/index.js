import {Box, Center, Link, Stack, Text} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {CustomAccordion} from 'ui-lib';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const BillingFAQ = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Box w="full" mx="auto" bg="transparent" pb="61.5px" pt="40px" mt="51.5px">
      <Center w="full" maxW="984px" mx="auto">
        <Stack w="100%" align="center">
          <Box w="705px" textAlign={'center'} color="#000">
            <Text fontSize="28px" fontStyle="normal" fontWeight="500">
              {/* Frequently Asked <span style={{color: '#1D6169'}}>Questions</span> */}
              Frequently Asked Questions
            </Text>
            <Text
              color="#475467"
              textAlign="center"
              fontFamily="Euclid Circular B"
              fontSize="20px"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="normal"
            >
              Everything you need to know about the product and billing
            </Text>
          </Box>
          <Stack align="center" w="95%" mt="60px" mx="auto">
            <CustomAccordion
              bg="transparent"
              h="fit-content"
              isCustomIcon
              header={'Which currencies do you support?'}
              // pt={2}
            >
              <Stack spacing={4} px={4} pt={4}>
                <Text
                  color="#475467"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="180"
                  data-aos-easing="ease-in-sine"
                >
                  We only support US dollar.
                </Text>
              </Stack>
            </CustomAccordion>
            <CustomAccordion
              bg="transparent"
              h="fit-content"
              isCustomIcon
              header={'How do I downgrade my subscription?'}
              // pt={2}
            >
              <Stack spacing={4} px={4} pt={4}>
                <Text
                  color="#475467"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="180"
                  data-aos-easing="ease-in-sine"
                >
                  You have to contact sales to downgrade subscription.
                </Text>
              </Stack>
            </CustomAccordion>

            <CustomAccordion
              bg="transparent"
              h="fit-content"
              isCustomIcon
              header={'Which subscription covers the mobile application?'}
              // pt={2}
            >
              <Stack spacing={4} px={4} pt={4}>
                <Text
                  color="#475467"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="180"
                  data-aos-easing="ease-in-sine"
                >
                  The Veerge Plus subscription includes coverage for the mobile application.
                  However, for tailored solutions to meet your specific business needs, please
                  contact our support team for further assistance.
                </Text>
              </Stack>
            </CustomAccordion>
            <CustomAccordion
              bg="transparent"
              h="fit-content"
              isCustomIcon
              header={`What is the difference between the theme fee and the subscription fee?`}
              // pt={2}
            >
              <Stack spacing={4} px={4} pt={4}>
                <Text
                  color="#475467"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="180"
                  data-aos-easing="ease-in-sine"
                >
                  The theme fee is a one-time payment—only incurred when selecting a theme. The sole
                  instances of additional costs arise when upgrading to a different theme or adding
                  extra features. In contrast, the subscription fee covers the monthly cost of
                  maintaining your infrastructure.
                </Text>
              </Stack>
            </CustomAccordion>
            <Text mt="20px">
              Do you have more questions? Kindly{' '}
              <Link
                href="/veerge_menu/support_center"
                style={{color: '#4545FE', cursor: 'pointer'}}
              >
                contact support
              </Link>{' '}
            </Text>
          </Stack>
        </Stack>
      </Center>
    </Box>
  );
};

export default BillingFAQ;
