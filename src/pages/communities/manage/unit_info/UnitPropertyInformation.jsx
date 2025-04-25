import {
  Heading,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
  Image,
} from '@chakra-ui/react';
import React from 'react';

export const UnitPropertyInformation = () => {
  return (
    <VStack
      align={`stretch`}
      w="full"
      maxW={{base: 'full', lg: '520px'}}
      ml={{base: '', lg: 'auto'}}
      spacing="20px"
    >
      <Heading
        display={{base: 'none', lg: 'initial'}}
        textAlign={'left'}
        alignSelf="flex-start"
        fontSize={`32px`}
        fontWeight={`500`}
        lineHeight={`normal`}
      >
        12-B
      </Heading>
      <Stack
        p="20px"
        w={`100%`}
        gap="16px"
        borderRadius={`8px`}
        border={`0.5px solid`}
        borderColor={`#E4E4E7`}
        background={`#FBFCFC`}
      >
        <Flex w="full" align="center" justify="space-between">
          <Stack spacing="12px">
            <Text fontWeight=" 400" fontSize="14px" letterSpacing="0.26px" color="#52525B">
              Occupant
            </Text>
            <HStack mx="auto" spacing="11px">
              <Image
                alt=""
                boxSize="40px"
                src={`https://d1x2tneac0i3nn.cloudfront.net/Occupant-Icon1.png`}
              />
              <Text fontSize="13px" fontWeight={500} color="#191919">
                Ralph Edwards
              </Text>
            </HStack>
          </Stack>
          <HStack
            justify={'center'}
            bg="#F0FDF4"
            w="max-content"
            h="38px"
            borderRadius={'16px'}
            p="4px 12px"
            fontWeight={500}
            fontFamily="Inter"
          >
            <Text fontSize={'14px'} color="#116932">
              Owner
            </Text>
          </HStack>
        </Flex>
        <Stack spacing="12px">
          <Text fontWeight=" 400" fontSize="14px" letterSpacing="0.26px" color="#52525B">
            Address
          </Text>
          <Text fontSize="16px" fontWeight={500} color="#191919">
            344 Dublin Dr Mineral Wells, West Virginia(WV)
          </Text>
        </Stack>
        <Stack spacing="12px">
          <Text fontWeight=" 400" fontSize="14px" letterSpacing="0.26px" color="#52525B">
            Email Address
          </Text>
          <Text fontSize="16px" fontWeight={500} color="#4545FE">
            Oliviarhye@gmail.com
          </Text>
        </Stack>
        <Stack spacing="12px">
          <Text fontWeight=" 400" fontSize="14px" letterSpacing="0.26px" color="#52525B">
            Phone
          </Text>
          <Text fontSize="16px" fontWeight={500} color="#191919">
            +1 415 555 2671
          </Text>
        </Stack>
      </Stack>
    </VStack>
  );
};

export default UnitPropertyInformation;
