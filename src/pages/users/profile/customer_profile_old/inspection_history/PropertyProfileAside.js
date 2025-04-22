import {Heading, HStack, Image, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {Button} from 'ui-lib/ui-lib.components';

const PropertyProfileAside = () => {
  return (
    <VStack
      borderRadius="16px"
      mt="70px"
      bg="#FFFFFF"
      //   w="371px"
      px="28px"
      pt="28px"
      pb="35px"
    >
      <HStack w="315px" spacing="41px">
        <HStack w="full" align="center">
          <Image alt="" boxSize="48px" objectFit="cover" src="" borderRadius="50%" />
          <Text as="span" fontSize="16px" fontWeight="600">
            Daniel Tonay
          </Text>
        </HStack>
        <Button w="113px" none variant="violet">
          Profile
        </Button>
      </HStack>
      {/* <VStack w="full" m spacing="16px">
        <Image src="" w="314px" h="320px" borderRadius="24px" />
        <VStack alignSelf="start" align="start">
          <Heading as="h1" fontSize="32px" fontWeight="600">
            Astrid 2.0
          </Heading>
          <Text as="span" fontSize="14px" color="#606060" fontWeight="400">
            Under construction
          </Text>
        </VStack>
      </VStack> */}
    </VStack>
  );
};

export default PropertyProfileAside;
