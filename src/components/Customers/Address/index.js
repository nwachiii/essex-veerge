import {HStack, Image, Stack, Text} from '@chakra-ui/react';
import React from 'react';

import locationIcon from '../../../images/icons/location.png';
import {Container2} from '../../common/containers';
import {BsDashLg} from 'react-icons/bs';

export const CustomerAddress = ({customerInfo}) => {
  return (
    <Stack>
      <Container2 h="171px" p={22}>
        <Stack mb={4}>
          <HStack>
            <Image alt="" boxSize="24px" src={locationIcon.src} />
            <Text
              fontWeight="bold"
              fontSize={{base: '14px', lg: '16px'}}
              lineHeight={{base: '18px', lg: '20px'}}
            >
              Home Address
            </Text>
          </HStack>
          <Text
            pl={8}
            fontSize={{base: '14px', lg: '16px'}}
            lineHeight={{base: '18px', lg: '20px'}}
          >
            {customerInfo?.address ?? <BsDashLg />}
          </Text>
        </Stack>
        <Stack>
          <HStack>
            <Image alt="" boxSize="24px" src={locationIcon.src} />
            <Text
              fontWeight="bold"
              fontSize={{base: '14px', lg: '16px'}}
              lineHeight={{base: '18px', lg: '20px'}}
            >
              Company&apos;s Address
            </Text>
          </HStack>
          <Text
            pl={8}
            fontSize={{base: '14px', lg: '16px'}}
            lineHeight={{base: '18px', lg: '20px'}}
          >
            {customerInfo?.company_address ?? <BsDashLg />}
          </Text>
        </Stack>
      </Container2>
    </Stack>
  );
};
