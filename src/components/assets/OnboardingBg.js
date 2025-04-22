import React from 'react';
import {Box, HStack, Image, Stack, Text} from '@chakra-ui/react';
import myxelliaGlobe from '/src/images/brand/Orbit.svg';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {CURRENT_YEAR} from '../Navbar';
import veergeLogo from '/src/images/icons/veergeLogo.svg';

export const OnboardingBg = () => {
  const router = useRouter();
  const handleHome = () => {
    router.push('/account');
  };
  return (
    /* 
	  USAGE: 
	  - Add `position = 'relative'` to the parent component
	  - Add `zIndex= "1"` to the main component's wrapper
	  */
    <Box h="100%" w="100vw" position="absolute" bg="#191919">
      <Box p="19px 78px">
        <HStack cursor="pointer" w="fit-content" onClick={handleHome}>
          {/* <Link prefetch={false} href="/"> */}
          <Image src={veergeLogo.src} boxSize="40px" alt="veerge logo" />
          {/* </Link> */}
          <Text
            fontSize="30px"
            fontWeight="400"
            fontFamily="Poppins"
            alignSelf="start"
            color="#ffffff"
          >
            Veerge
          </Text>
        </HStack>
      </Box>
      <Box position="absolute" bottom={'3%'} left={'5%'}>
        {/* <Image alt="" src={myxelliaGlobe.src} maxW="500px" /> */}
        <Stack
          position="absolute"
          color="#FFFFFF"
          left="10%"
          right="5%"
          bottom="3%"
          w="max-content"
        >
          <Text display={'flex'} w="full" gap="6px" fontSize="12px" fontWeight={400}>
            <a target="_blank" href="https://veerge-support.myxellia.io/privacy">
              <u>Privacy Policy</u>
            </a>{' '}
            &{' '}
            <a target="_blank" href="https://veerge-support.myxellia.io/terms">
              <u>Terms of Use</u>
            </a>
          </Text>
          <Text fontSize="12px" fontWeight={400}>
            {`Copyright © ${CURRENT_YEAR} Myxellia Inc. All rights reserved.`}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};
