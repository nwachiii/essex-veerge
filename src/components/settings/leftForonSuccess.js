import {Button, Heading, Image, VStack} from '@chakra-ui/react';
import successGif from '/src/images/check-icon.gif';
import React from 'react';

export const LeftForOnSuccess = ({domainUrl}) => {
  return (
    <VStack borderLeftRadius="20px" justify="center" bg="#ffffff" w="50%" h="full">
      <VStack p="42px" py="76px" spacing="20px">
        <Image
          width="100px"
          height="100px"
          objectFit="contain"
          src={successGif.src}
          alt="success image"
        />
        <Heading
          as="h1"
          w="350px"
          color="#191919"
          fontSize="24px"
          fontWeight="600"
          textAlign="center"
        >
          Congratulations your Web application is live
        </Heading>

        <Button
          maxW="497px"
          ButtonAlign="center"
          fontSize="16px"
          fontWeight="400"
          background="transparent"
          _hover={{
            opacity: '0.4',
            background: 'transparent',
          }}
          _active={{
            opacity: '0.4',
            background: 'transparent',
          }}
          color="#2CDA94"
          onClick={() => window.open(`${domainUrl ? domainUrl : ''}`, '_blank')}
        >
          Visit your web application
        </Button>
      </VStack>
    </VStack>
  );
};

export default LeftForOnSuccess;
