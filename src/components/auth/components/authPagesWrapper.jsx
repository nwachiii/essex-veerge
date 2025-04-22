import {useRouter} from 'next/router';
import Link from 'next/link';

import veergeLogo from '/src/images/icons/gearVeergeIcon.svg';
import externalLink from '/src/images/icons/externalLink.svg';
import React from 'react';
import {Box, HStack, Link as ChakraLink, VStack, Image, Stack, Text, Flex} from '@chakra-ui/react';
import {CURRENT_YEAR} from '@/components/Navbar';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '16px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: 'inset 0 0 6px #f5f5f5',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: '#cbcbcb',
  },
};

const AuthPageLayout = ({children}) => {
  const router = useRouter();
  const handleHome = () => {
    router.push('/auth/onboarding/login');
  };
  return (
    <Box
      display="flex"
      flexDir="column"
      h="full"
      minH="100vh"
      w="100vw"
      position="relative"
      bg="#F5F5F5"
      p="48px 10px 43px "
    >
      <Box pos="sticky" w="fit-content" alignSelf="start" top="48px" px="70px">
        <HStack cursor="pointer" w="fit-content" onClick={handleHome}>
          <Image src={veergeLogo.src} boxSize="40px" alt="veerge logo" />
          <Text
            fontSize="34.67px"
            fontWeight="600"
            fontFamily="Poppins"
            alignSelf="start"
            color="#000000"
          >
            Veerge
          </Text>
        </HStack>
      </Box>
      <VStack
        px="10px"
        w="full"
        // h="calc(100% - 61px)"
        // overflowY="auto"
        sx={customScrollbarStyles}
        justify="center"
        align="center"
        h="full"
        minH={'calc(100vh - 164px)'}
      >
        <Box my="15px" h="full" mb="25px">
          {children}
        </Box>
      </VStack>
      <Box px="70px" w="full" position="relative">
        <HStack
          spacing="none"
          w="full"
          color="#141414"
          fontFamily="Neue Haas Grotesk Display Pro"
          justifyContent="space-between"
        >
          <Text fontSize="14px" fontWeight={500}>
            {`Copyright © ${CURRENT_YEAR} Myxellia Inc. All rights reserved.`}
          </Text>
          <Flex gap="15px" fontSize="14px" color="#141414" fontWeight={500}>
            <ChakraLink
              href="https://veerge-support.myxellia.io/privacy"
              display="flex"
              isExternal
              gap="8px"
              alignItems="flex-end"
            >
              <Text>Privacy Policy</Text>
              <Image boxSize="16px" src={externalLink.src} alt="external link icon" />
            </ChakraLink>

            <ChakraLink
              href="https://veerge-support.myxellia.io/terms"
              display="flex"
              isExternal
              gap="8px"
              alignItems="flex-end"
            >
              <Text>Terms of Use</Text>
              <Image boxSize="16px" src={externalLink.src} alt="external link icon" />
            </ChakraLink>
          </Flex>
        </HStack>
      </Box>
    </Box>
  );
};

export default AuthPageLayout;
