import React from 'react';
import {CURRENT_YEAR} from '../Navbar';
import {AbsoluteCenter, Box, Divider, HStack, Image, Link, Stack, Text} from '@chakra-ui/react';
import essexLogo from '/src/images/essex-logo.png';

import {GoogleStore} from 'images/503-error-service-unavailable/google';
import {AppleStore} from 'images/503-error-service-unavailable/apple';

export const LayoutMobileView = () => {
  return (
    <Box bg="#ffffff" h="100svh" maxH="100svh" pb={6}>
      <Stack w="full" bg="#18230F" p={2} mb={6}>
        <Image
          fill
          h="52px"
          alt="Essex-Hoa"
          width={'fit-content'}
          style={{objectFit: `cover`}}
          src={'./public_image/essex-logo-png.png'}
        />
      </Stack>

      {/* </Link> */}
      <Stack justify={'center'} px="31px">
        <AbsoluteCenter w="full" maxW="614px">
          <Stack px="20px" spacing="16px" w="full" align="center" justify="center">
            <Text
              mt="2.986vw"
              color="black"
              textAlign="center"
              fontSize={{base: '18px', md: '22px', lg: '24px'}}
              fontStyle="normal"
              fontWeight="800"
              lineHeight="normal"
              maxW="615px"
              fontFamily="Proxima Nova"
            >
              We apologize, but this application is not yet optimized for mobile devices.
            </Text>
            <Text
              mt={2}
              mx="auto"
              w="full"
              maxW="397.15px"
              color="#525252"
              textAlign="center"
              fontSize={{base: '12px', md: '16px'}}
              fontStyle="normal"
              fontWeight="400"
              fontFamily="Proxima Nova"
              lineHeight="normal"
            >
              New here? Sign up on a desktop or laptop computer to create an account.
            </Text>
            <Stack color="#A6A6A6" py={{base: 4, md: 3}} align="center" justify="center" w="full">
              <HStack w="full" align="center" maxW="614px">
                <Divider borderColor="#737373" />
                <Text fontSize="14px" fontWeight="500" lineHeight="20px" color="#737373">
                  OR
                </Text>
                <Divider borderColor="#737373" />
              </HStack>
            </Stack>
            <Text
              color="#292929"
              textAlign="center"
              fontSize={{base: '18px', md: '22px', lg: '24px'}}
              pb={{base: 2, md: 4}}
              fontFamily="Proxima Nova"
              fontWeight={800}
            >
              Download our Mobile App
            </Text>
            <HStack justify="center" gap="24px" w="full">
              <Link
                href="https://play.google.com/store/apps/details?id=com.matadortrust.veerge"
                target="_blank"
              >
                <GoogleStore
                  width={{base: '120px', md: '193px'}}
                  role="img"
                  baseColor="#000000"
                  baseBorderColor="#a3a3a3"
                  alt="google play button"
                />
              </Link>
              <Link href="https://apps.apple.com/ng/app/veerge/id6467629468" target="_blank">
                <AppleStore
                  width={{base: '120px', md: '250px'}}
                  role="img"
                  baseColor="#000000"
                  baseBorderColor="#a3a3a3"
                  alt="apple store button"
                />
              </Link>
            </HStack>
          </Stack>
        </AbsoluteCenter>
      </Stack>
      <Text
        color="#424242"
        fontSize="12px"
        fontWeight={400}
        pl={'52px'}
        position={'absolute'}
        bottom={6}
      >
        {`Copyright © ${CURRENT_YEAR} Myxellia Inc. All rights reserved.`}
      </Text>
      {/* </SlideFade> */}
    </Box>
  );
};

export default LayoutMobileView;
