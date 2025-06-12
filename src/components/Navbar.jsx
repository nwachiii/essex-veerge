import {Box, HStack, Image, Stack, Text} from '@chakra-ui/react';
import Link from 'next/link';
import myxelliaGlobe from '/src/images/brand/Orbit.svg';
import veergeLogo from '/src/images/icons/veergeLogo.svg';

export const Navbar = () => {
  return (
    <Box mr="auto" pb={6} mt="19px">
      <HStack className="header-wrap">
        <Link prefetch={false} href="/">
          <Image src={veergeLogo.src} boxSize="40px" alt="veerge logo" />
        </Link>
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
      <Box position="absolute" bottom={'3%'}>
        {/* <Image alt="" src={myxelliaGlobe.src} maxW="500px" /> */}
        <Stack
          position="absolute"
          color="#FFFFFF"
          left="10%"
          right="5%"
          bottom="3%"
          w="max-content"
        >
          <Text display={'flex'} gap="6px" fontSize="12px" fontWeight={400}>
            <a target="_blank" href="https://doorhive.vercel.app/help/privacy">
              <u>Privacy Policy</u>
            </a>{' '}
            &{' '}
            <a target="_blank" href="https://doorhive.vercel.app/help/tos">
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

const currentDate = new Date();
export const CURRENT_YEAR = currentDate.getFullYear();
