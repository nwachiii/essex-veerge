import {
  Center,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import avatar from '/src/images/avatar.svg';
import HoverText from '../../../../ui-lib/ui-lib.components/hoverOnText/hoverOnText';
import {useState} from 'react';
import {formatToCurrency} from '../../../../utils/formatAmount';
import RequestInfo from './requestInfo';
import {CommissionPayments} from './paymentBreakDown';
import HoverListingName from '@/components/dashboard/table/HoverListingName';

export const RealtorClientInfoAndRequestSummary = ({
  customScrollbarStyles,
  commissionRequestObj,
  pastPaymentObj,
  incomingPaymentObj,
  clientData,
  submitInfo,
}) => {
  const [expand, setExpand] = useState(false);
  const {
    data: {customer, agent},
  } = commissionRequestObj;

  return (
    <HStack w="full" h="100%" alignItems={`stretch`} gap={`24px`}>
      <Stack
        flex={`1`}
        p={`12px`}
        w="full"
        border="0.5px solid #E4E4E4"
        borderRadius="12px"
        gap="12px"
        background={`#FBFCFC`}
      >
        <HStack gap={`10px`} w="full" justify="space-between">
          <VStack spacing="15px" w="full" flex={`1`}>
            <Heading as="h2" color="#606060" fontSize="12px" fontWeight="400" w="full">
              Realtor
            </Heading>
            <HStack gap="8px">
              <Center
                w={`40px`}
                h={`40px`}
                minWidth={`40px`}
                overflow="hidden"
                borderRadius={`50%`}
              >
                <Image
                  src={agent?.avatar ?? avatar.src}
                  alt="client image"
                  objectFit="cover"
                  minW={`100%`}
                  minH={`100%`}
                />
              </Center>
              <VStack alignItems={`flex-start`} gap={`4px`}>
                <Text
                  color="#191919"
                  textTransform="capitalize"
                  fontSize="12px"
                  fontWeight="500"
                  m={`0px`}
                  maxW={`16ch`}
                  textOverflow={`ellipsis`}
                  whiteSpace={`nowrap`}
                  overflow={`hidden`}
                >
                  {`${agent?.first_name ?? '-'} ${agent?.last_name ?? '-'}`}
                </Text>
                <Text
                  color="#4545fe"
                  fontSize="10px"
                  fontWeight="400"
                  m={`0px`}
                  maxW={`16ch`}
                  textOverflow={`ellipsis`}
                  whiteSpace={`nowrap`}
                  overflow={`hidden`}
                >
                  {agent?.email ?? '-'}
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <VStack spacing="15px" w="full" flex={`1`}>
            <Heading as="h2" color="#606060" fontSize="12px" fontWeight="400" w="full">
              Client
            </Heading>
            <HStack gap="8px">
              <Center
                w={`40px`}
                h={`40px`}
                minWidth={`40px`}
                overflow="hidden"
                borderRadius={`50%`}
              >
                <Image
                  src={customer?.avatar ?? avatar.src}
                  alt="client image"
                  objectFit="cover"
                  minW={`100%`}
                  minH={`100%`}
                />
              </Center>
              <VStack alignItems={`flex-start`} gap={`4px`}>
                <Text
                  color="#191919"
                  textTransform="capitalize"
                  fontSize="12px"
                  fontWeight="500"
                  m={`0px`}
                  maxW={`16ch`}
                  textOverflow={`ellipsis`}
                  whiteSpace={`nowrap`}
                  overflow={`hidden`}
                >
                  {`${customer?.first_name ?? '-'} ${customer?.last_name ?? '-'}`}
                </Text>
                <Text
                  color="#4545fe"
                  fontSize="10px"
                  fontWeight="400"
                  m={`0px`}
                  maxW={`16ch`}
                  textOverflow={`ellipsis`}
                  whiteSpace={`nowrap`}
                  overflow={`hidden`}
                >
                  {customer?.email ?? '-'}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        {/* <HStack spacing="20px" align="start" justify="space-between">
          <VStack align="start" spacing="8.92px">
            <Heading fontSize="17.668px" fontWeight="400" color="#000">
              {" Realtor's details"}
            </Heading>
            <HStack spacing="13px" align="start">
              <Image
                src={agent?.avatar ?? avatar.src}
                alt="realtor image"
                w="41.779px"
                h="42.403px"
                objectFit="cover"
                borderRadius="full"
              />
              <VStack spacing="4.73px" align="start" justify="start">
                <Text
                  textTransform="capitalize"
                  as="span"
                  color="#191919"
                  fontSize="15.901px"
                  fontWeight="500"
                >
                  {agent?.first_name ?? '-'} {agent?.last_name ?? '-'}
                </Text>

                <HoverText
                  text={agent?.email ?? '-'}
                  as="span"
                  color="#4545FE"
                  fontSize="12.367px"
                  fontWeight="400"
                />
              </VStack>
            </HStack>
          </VStack>
          <VStack align="start" spacing="8.92px">
            <Heading fontSize="17.668px" fontWeight="400" color="#000">
              {"Client's details"}
            </Heading>
            <HStack spacing="13px" align="start">
              <Image
                src={customer?.avatar ?? avatar.src}
                alt="realtor image"
                w="41.779px"
                h="42.403px"
                objectFit="cover"
                borderRadius="full"
              />
              <VStack spacing="4.73px" align="start" justify="start">
                <Text
                  textTransform="capitalize"
                  as="span"
                  color="#191919"
                  fontSize="15.901px"
                  fontWeight="500"
                >
                  {`${customer?.first_name ?? '-'} ${customer?.last_name ?? '-'}`}
                </Text>

                <HoverText
                  text={customer?.email}
                  as="span"
                  color="#4545FE"
                  fontSize="12.367px"
                  fontWeight="400"
                />
              </VStack>
            </HStack>
          </VStack>
        </HStack> */}
        <CommissionPayments
          past_payment_obj={pastPaymentObj}
          incoming_payment_obj={incomingPaymentObj}
          client_data={clientData}
          customScrollbarStyles={customScrollbarStyles}
        />
      </Stack>
      <RequestInfo
        commissionRequestObj={commissionRequestObj}
        customScrollbarStyles={customScrollbarStyles}
      />
    </HStack>
  );
};

export default RealtorClientInfoAndRequestSummary;
