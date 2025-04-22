import {VStack, Heading, Text, Image} from '@chakra-ui/react';
import error from '/src/images/isRole403Error.png';
import React from 'react';

export const IsRoleRestricted = () => {
  return (
    <VStack py="23px" px="23px" my="14px" maxW="100%" boxShadow="base">
      <Image
        alt=""
        src={error.src}
        mb="30px"
        objectFit="cover"
        maxW="550px"
        h="250px"
      />
      <Heading fontSize="24px" fontWeight="600">
       {` You're not permitted to access this page`}
      </Heading>
      <Text fontSize="16px" fontWeight="400">
        {`The page you're trying to access has restricted access.`}
      </Text>
      <Text fontSize="16px" fontWeight="400">
        If you feel this is a mistake,contact the{' '}
        <a
          style={{color: '#4545fe', textDecorationLine: 'underline'}}
          href="mailto:matadortrust@gmail.com?subject=Account Restriction Inquiry"
        >
          {' '}
          admin
        </a>
        .
      </Text>
    </VStack>
  );
};
