import {HStack, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {CUSTOMER_ADDITIONAL_INFO} from '../../../constants/customersProfile';
import {BsDashLg} from 'react-icons/bs';

export const NextOfKinDetails = ({customerInfo}) => {
  return (
    <Stack w="full">
      <Text color="#4545FE" fontSize="24px" fontWeight={500}>
        Next of Kin Details
      </Text>

      <HStack
        justify="space-between"
        fontSize={'16px'}
        color="#191919"
        borderBottom="1px solid #F5F5F5"
        pt={4}
        pb={2}
      >
        <Text>Legal First Name</Text>
        <Text fontWeight={500}>{customerInfo?.first_name ?? <BsDashLg />}</Text>
      </HStack>
      <HStack
        justify="space-between"
        fontSize={'16px'}
        color="#191919"
        borderBottom="1px solid #F5F5F5"
        pt={4}
        pb={2}
      >
        <Text>Legal Last Name</Text>
        <Text fontWeight={500}>{customerInfo?.last_name ?? <BsDashLg />}</Text>
      </HStack>
      <HStack
        justify="space-between"
        fontSize={'16px'}
        color="#191919"
        borderBottom="1px solid #F5F5F5"
        pt={4}
        pb={2}
      >
        <Text>Relationship</Text>
        <Text fontWeight={500}>{customerInfo?.relationship ?? <BsDashLg />}</Text>
      </HStack>
      <HStack
        justify="space-between"
        fontSize={'16px'}
        color="#191919"
        borderBottom="1px solid #F5F5F5"
        pt={4}
        pb={2}
      >
        <Text>Email address</Text>
        <Text fontWeight={500}>{customerInfo?.email ?? <BsDashLg />}</Text>
      </HStack>
      <HStack
        justify="space-between"
        fontSize={'16px'}
        color="#191919"
        borderBottom="1px solid #F5F5F5"
        pt={4}
        pb={2}
      >
        <Text>Phone</Text>
        <Text fontWeight={500}>{customerInfo?.phone ?? <BsDashLg />}</Text>
      </HStack>
      <HStack
        justify="space-between"
        fontSize={'16px'}
        color="#191919"
        borderBottom="1px solid #F5F5F5"
        pt={4}
        pb={2}
      >
        <Text>Residential</Text>
        <Text fontWeight={500} maxW={526} textAlign="right">
          {customerInfo?.residential_address ?? <BsDashLg />}
        </Text>
      </HStack>
    </Stack>
  );
};
