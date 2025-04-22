import {HStack, Image, Link, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {CURRENT_YEAR} from '../Navbar';
import veergeLogo from '/src/images/icons/veergeLogo.svg';

const LayoutForRoleSignUp = ({children}) => {
  let user;
  try {
    user =
      typeof window !== 'undefined' &&
      localStorage &&
      localStorage?.getItem('loggedinUser') !== 'undefined' &&
      JSON?.parse(localStorage.getItem('loggedinUser'));
  } catch (err) {
    console.log('user error', err);
  }
  return (
    <VStack align="center" justify="center" w="full" minH="100vh">
      <HStack top="19px" left="78px" position="fixed">
        <Image src={veergeLogo.src} boxSize="40px" alt="veerge logo" />

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

      {children}
      <HStack w="full" justify="space-between" px="78px" position="fixed" bottom="5.78vh">
        <HStack justify="20px">
          <Text color="#ffffff" fontSize="12px" fontWeight={400}>
            <a target="_blank" href="https://veerge-support.myxellia.io/privacy">
              Privacy Policy
            </a>
          </Text>
          <Text color="#ffffff" fontSize="12px" fontWeight={400}>
            <a target="_blank" href="https://veerge-support.myxellia.io/terms">
              Terms of Use
            </a>
          </Text>
          <Text color="#ffffff" fontSize="12px" fontWeight={400}>
            <a target="_blank" href="https://veerge-support.myxellia.io/">
              Help Center
            </a>
          </Text>{' '}
          <Text color="#ffffff" fontSize="12px" fontWeight={400}>
            <a target="_blank" href="https://veerge-support.myxellia.io/blog">
              Blog
            </a>
          </Text>
        </HStack>
        <Text color="#ffffff" fontSize="12px" fontWeight={400}>
          {`Copyright © ${CURRENT_YEAR} Myxellia Inc. All rights reserved.`}
        </Text>
      </HStack>
    </VStack>
  );
};

export default LayoutForRoleSignUp;
