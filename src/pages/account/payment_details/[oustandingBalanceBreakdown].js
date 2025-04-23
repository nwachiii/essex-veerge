import React from 'react';
import {AnimatedLoader, LayoutView} from '../../../components';
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';

import {useRouter} from 'next/router';
import {themeStyles} from '../../../theme';
import {useQuery} from '@tanstack/react-query';
import defaultAvatar from '/src/images/avatar.svg';
import {priceString} from '../../../utils/formatAmount';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAnglesLeft} from '@fortawesome/free-solid-svg-icons';
import PaymentPlanSummary from '../../../components/Cards/PaymentPlanSummary';
import {getAccountPastPayments, getAccountPaymentDetails} from '../../../apis/account';
import ListingInfo from 'pages/residents/create_account/CustomerAccountSummary/ListingInfo';
// import ListingInfo from '../../residents/create_account/CustomerAccountSummary/ListingInfo';

export const OustandingBalanceBreakdown = () => {
  const router = useRouter();
  const toast = useToast();
  const ID = router?.query?.oustandingBalanceBreakdown;

  const ACCOUNT_PAYMENT_DETAILS = useQuery(['get-upcoming-details', ID], () =>
    getAccountPaymentDetails(ID)
  );
  const ACCOUNT_PAST_PAYMENTS = useQuery(['get-past-payments', ID], () =>
    getAccountPastPayments(ID)
  );

  const paymentData = ACCOUNT_PAYMENT_DETAILS?.data?.data?.data;
  const pastPayment = ACCOUNT_PAST_PAYMENTS?.data?.data;

  // console.log('past payments =>', ACCOUNT_PAST_PAYMENTS?.data?.data);
  // console.log('upcoming payments => ', pastPayment, paymentData);
  return (
    <div>
      <LayoutView activePage={'account'} />
      {ACCOUNT_PAYMENT_DETAILS.isLoading ? (
        <Flex direction="column" w="full" h="full" justify="center" align="center">
          <AnimatedLoader />
        </Flex>
      ) : ACCOUNT_PAYMENT_DETAILS.isError ? (
        toast({
          duration: 5000,
          status: 'error',
          isClosable: true,
          position: 'top-right',
          title: 'An error occured',
        })
      ) : pastPayment ? (
        <Box px="35px" position="relative" mt="-78vh">
          <div
            className="cursor-pointer mb-6 pl-10 flex flex-row items-center"
            onClick={() => router.back(-1)}
          >
            <Box
              zIndex="100"
              className=" w-12 h-12 rounded-full bg-[#DCDCDC] justify-center items-center flex mr-1"
            >
              <FontAwesomeIcon icon={faAnglesLeft} className="w-6 h-6" />
            </Box>
            <div className="font-medium text-lg">Back</div>
          </div>
          <Container
            p="12"
            maxW={'7xl'}
            color="gray.900"
            borderRadius="2xl"
            background="#FFFFFF"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          >
            {paymentData[0]?.equity?.co_owners?.length > 0 ||
            paymentData[0]?.equity?.co_owners?.length > 0 ? (
              <div>Co ownership</div>
            ) : (
              <VStack>
                <Image
                  alt=""
                  src={pastPayment[0]?.user?.avatar ?? defaultAvatar.src}
                  borderRadius="full"
                  boxSize={168}
                />
                <Text
                  fontWeight={700}
                  fontSize="32px"
                  lineHeight="41px"
                >{`${pastPayment[0]?.user?.first_name} ${pastPayment[0]?.user?.last_name}`}</Text>
                <Text as="small">{pastPayment[0]?.user?.phone}</Text>
                <Text as="small">{pastPayment[0]?.user?.email}</Text>
              </VStack>
            )}

            {/* Listing */}
            {pastPayment && <ListingInfo listing={pastPayment[0]?.equity} />}
            <Stack
              mb="50px"
              direction={{base: 'column', md: 'row'}}
              justifyContent="space-around"
              spacing="35px"
              w="full"
            >
              <VStack
                py="23px"
                px="19px"
                h="full"
                spacing="13px"
                w="50%"
                border="1px solid lightgray"
                borderRadius="14px"
              >
                <Text fontWeight={600} fontSize="26px" color={themeStyles.color.matador__green}>
                  {priceString('naira', pastPayment[0]?.equity?.amount_paid)}
                </Text>
                <Text fontSize="14px" fontWeight={400} color="#606060">
                  Total amount paid
                </Text>
              </VStack>
              <VStack
                py="23px"
                px="19px"
                h="full"
                spacing="13px"
                w="50%"
                border="1px solid lightgray"
                borderRadius="14px"
              >
                <Text fontWeight={600} fontSize="26px" color={themeStyles.color.matador__red}>
                  {priceString('naira', pastPayment[0]?.equity?.current_outstanding_balance)}
                </Text>
                <Text fontSize="14px" fontWeight={400} color="#606060">
                  Current outstanding balance
                </Text>
              </VStack>
            </Stack>
            <Text mb="15px" fontWeight={500} fontSize="xl" ml={2}>
              Past payment(s)
            </Text>
            {pastPayment.length > 0 ? (
              pastPayment?.map((item, index) => (
                <div key={index}>
                  <PaymentPlanSummary my={0} data={[item]} />
                </div>
              ))
            ) : (
              <Text pl={3}>
                <b>No payments made yet...</b>
              </Text>
            )}
            <Text mt="50px" mb="15px" fontWeight={500} fontSize="xl" ml={2}>
              Upcoming payment(s)
            </Text>
            {paymentData.length > 0 ? (
              paymentData?.map((item, index) => (
                <div key={index}>
                  <PaymentPlanSummary my={0} data={[item]} />
                </div>
              ))
            ) : (
              <Text pl={3}>
                <b>No upcoming payments...</b>
              </Text>
            )}
          </Container>
        </Box>
      ) : null}
    </div>
  );
};

export default OustandingBalanceBreakdown;

const UserInfoComponent = ({photo, firstName, lastName, userEmail, userPhoneNumber}) => {
  return (
    <VStack>
      <Image alt="" src={photo ?? defaultAvatar.src} borderRadius="full" boxSize={168} />
      <Text fontWeight={700} fontSize="32px" lineHeight="41px">{`${firstName} ${lastName}`}</Text>
      <Text as="small">{userPhoneNumber}</Text>
      <Text as="small">{userEmail}</Text>
    </VStack>
  );
};
