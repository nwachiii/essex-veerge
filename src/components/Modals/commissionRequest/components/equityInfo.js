import React, {useEffect, useState} from 'react';
import {
  HStack,
  Image,
  Stack,
  Text,
  Heading,
  VStack,
  SimpleGrid,
  Spinner,
  Center,
  Divider,
  Grid,
} from '@chakra-ui/react';

import avatar from '/src/images/avatar.svg';
import {formatToCurrency} from '../../../../utils/formatAmount';
import {changeDateFormat} from '../../../../utils/formatDate';
import HoverOnAmount from '../../../../ui-lib/ui-lib.components/hoverOnText/hoverOnAmount';
import HoverListingName from '../../../dashboard/table/HoverListingName';
import {getOrdinal} from '../../../../utils/getOrdinals';
import HoverText from '../../../../ui-lib/ui-lib.components/hoverOnText/hoverOnText';

export const EquityInfo = ({
  viewInfo: {
    data: {agent, project_name, unit_title, photo, unit_photo},
  },
  clientData,
  customScrollbarStyles,
  pastPaymentObj,
  incomingPaymentObj,
}) => {
  const payment_keys = ['amount', 'transaction_action_type', 'created_at'];
  const payment_keys_upcoming = ['amount', 'transaction_action_type', 'due_date'];

  //   const reversed = arr => arr.reverse();

  const [reserved, setReversed] = useState([]);

  useEffect(() => {
    pastPaymentObj.data?.length ? setReversed(pastPaymentObj.data.reverse()) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastPaymentObj.isLoading]);
  const transactionType = {
    equity_outright: 'outright',
    equity_plan_initial: 'Initial deposit',
    equity_plan_deposit: 'Top up',
    equity_fractions: 'Fractional',
  };
  return (
    <Stack
      flex={`1`}
      p={`12px`}
      border="0.5px solid #E4E4E4"
      borderRadius="12px"
      gap="8px"
      background={`#FBFCFC`}
    >
      <Heading as="h1" fontSize="12px" color="#606060" fontWeight="400">
        Realtor
      </Heading>

      <HStack gap={`10px`} w="full" justify="space-between">
        <HStack gap="8px" flex={`1`}>
          <Center w={`40px`} h={`40px`} minWidth={`40px`} overflow="hidden" borderRadius={`50%`}>
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
              {agent?.first_name ?? '-'} {agent?.last_name ?? '-'}
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
        <HStack gap="8px" flex={`1`}>
          <Center w={`45px`} h={`40px`} minWidth={`40px`} overflow="hidden" borderRadius={`5px`}>
            <Image
              src={photo ?? unit_photo ?? ''}
              alt="equity image"
              objectFit="cover"
              minW={`100%`}
              minH={`100%`}
            />
          </Center>
          <VStack justify="space-between" align="start" gap="4px">
            <HoverListingName
              text={project_name ?? '-'}
              lens={24}
              as="h2"
              fontSize="12px"
              fontWeight="500"
              color="#191919"
              m={`0px`}
            />
            <Text color="#4b4b4b" as="span" fontSize="10px" fontWeight="400">
              {unit_title ?? '-'}
            </Text>
          </VStack>
        </HStack>
      </HStack>
      {/* <HStack spacing="none" w="full" mb="21px" justify="space-between">
        <VStack align="start" spacing="4px">
          <Heading as="h1" fontSize="12px" color="#606060" fontWeight="400">
            Realtor
          </Heading>
          <HStack spacing="12px" align="start">
            <Image
              src={agent?.avatar ?? avatar.src}
              alt="realtor image"
              w="38.576px"
              h="39.152px"
              objectFit="cover"
              borderRadius="full"
            />
            <VStack spacing="3.84px" align="start" justify="start">
              <Text
                textTransform="capitalize"
                as="span"
                color="#191919"
                fontSize="14.682px"
                fontWeight="500"
              >
                {agent?.first_name ?? '-'} {agent?.last_name ?? '-'}
              </Text>
              <Text as="span" color="#4545FE" fontSize="11.419px" fontWeight="400">
                {agent?.email ?? '-'}
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack align="start" spacing="4px">
          <Heading fontSize="14.682px" fontWeight="400" color="#000">
            Property
          </Heading>
          <HStack spacing="5px" align="start">
            <Image
              src={photo ?? unit_photo ?? ''}
              alt="equity image"
              width="46.493px"
              height="41.599px"
              objectFit="cover"
              borderRadius="4px"
              bg="#191919"
            />
            <VStack justify="start" align="start" spacing="none">
              {project_name ? (
                <HoverText
                  text={project_name}
                  as="h2"
                  fontSize="14.682px"
                  fontWeight="500"
                  color="#191919"
                  textTransform="capitalize"
                />
              ) : (
                '-'
              )}

              <Text color="#191919" as="span" fontSize="11.419px" fontWeight="400">
                {unit_title ?? '-'}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </HStack> */}

      <Stack bg="#F5F5F5" borderRadius="10px" p={`9px 12px`} overflowY="auto" w="full" h={`100%`}>
        <Stack
          overflowY="scroll"
          sx={customScrollbarStyles}
          w="full"
          divider={<Divider my={`8px !important`} borderColor={`#e4e4e4`} />}
        >
          {clientData?.payment_plan ? (
            <VStack align="start" gap="4px" py="6px">
              <Heading as="h3" fontSize="9px" fontWeight="400" color="#606060">
                Payment duration
              </Heading>
              <Text as="span" fontSize="12px" fontWeight="500" color="#191919">
                {clientData?.payment_plan ?? '-'} months
              </Text>
            </VStack>
          ) : null}

          {pastPaymentObj.isLoading ? (
            <Center h={`40px`} w={`100%`}>
              <Spinner />
            </Center>
          ) : pastPaymentObj?.data?.length ? (
            <VStack align="start" py={``}>
              <Heading as="h3" fontSize="9px" fontWeight="400" color="#606060">
                Past Payments
              </Heading>
              <Grid templateColumns={`1fr 1.5fr 1.5fr`} w="full" gap="8px 12px">
                {reserved.map(item => {
                  return payment_keys.map(key => {
                    if (key === 'amount') {
                      return (
                        <HoverOnAmount
                          text={item[key]}
                          key={key}
                          as="span"
                          fontSize="10px"
                          fontWeight="600"
                          color="#191919"
                          w={`max-content`}
                        />
                      );
                    } else if (key === 'transaction_action_type') {
                      return (
                        <Text
                          key={key}
                          as="span"
                          fontSize="10px"
                          fontWeight="500"
                          color="#191919"
                          textTransform={`capitalize`}
                        >
                          {transactionType[item?.[key]]}
                        </Text>
                      );
                    } else if (key === 'created_at') {
                      return (
                        <Text key={key} as="span" fontSize="10px" fontWeight="500" color="#191919">
                          {item?.[key] ? changeDateFormat(item[key]) : '-'}
                        </Text>
                      );
                    }
                  });
                })}
              </Grid>
            </VStack>
          ) : null}

          {incomingPaymentObj.isLoading ? (
            <Center h={`40px`} w={`100%`}>
              <Spinner />
            </Center>
          ) : incomingPaymentObj.data?.length ? (
            <VStack align="start">
              <Heading as="h3" fontSize="9px" fontWeight="400" color="#606060">
                Upcoming payment
              </Heading>
              <Grid templateColumns={`1fr 1.5fr 1.5fr`} w="full" gap="8px 12px">
                {incomingPaymentObj?.data.map((item, idx) => {
                  return payment_keys.map(key => {
                    if (key === 'amount') {
                      return (
                        <HoverOnAmount
                          text={item[key]}
                          key={key}
                          as="span"
                          fontSize="10px"
                          fontWeight="600"
                          color="#191919"
                          w={`max-content`}
                        />
                        // <Text key={key} as="span" fontSize="10px" fontWeight="500" color="#191919">
                        //   {item[key] ? formatToCurrency(item[key]) : '-'}
                        // </Text>
                      );
                    } else if (key === 'transaction_action_type') {
                      return (
                        <Text key={key} as="span" fontSize="10px" fontWeight="500" color="#191919">
                          {`${getOrdinal(idx + 1 + pastPaymentObj?.data?.length)} payment`}
                        </Text>
                      );
                    } else if (key === 'created_at') {
                      return (
                        <Text key={key} as="span" fontSize="10px" fontWeight="500" color="#191919">
                          {item[key] ? changeDateFormat(item[key]) : '-'}
                        </Text>
                      );
                    }
                  });
                })}
              </Grid>
            </VStack>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EquityInfo;
