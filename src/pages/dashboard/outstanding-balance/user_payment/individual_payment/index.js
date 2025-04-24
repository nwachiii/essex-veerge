import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import emptyIcon from '/src/images/icons/emptyIcon.png';
import {
  getAccountPastPayments,
  getCoownerIndividualBreakdown,
  getUserPaymentBreakdown,
} from '../../../../../apis/account';
// import ListingInfo from '../../../../residents/create_account/CustomerAccountSummary/ListingInfo';
import UserTransactionSummary from '../userTransactionSummary';
import PaymentPlanSummary from '../../../../../components/Cards/PaymentPlanSummary';
import {AnimatedLoader} from '../../../../../components/common/loaders';
import {LayoutView} from '../../../../../components/PageLayout/LayoutView';
import PageHeader from '../../../../../components/common/PageHeader';
import {BackArrowWithText} from '../../../../../components/assets/BackArrow';
import {Box, Container, Flex, Text, VStack, useToast, Image} from '@chakra-ui/react';
import CoownershipHeader, {UpcomingPaymentsHeader, UserHeader} from '../header';
import ListingInfo from 'pages/residents/create_account/CustomerAccountSummary/ListingInfo';

export const IndividualPaymentPageForCoOwnedProperties = () => {
  const toast = useToast();
  const router = useRouter();
  const [recurring, setRecurring] = useState(false);
  const equityId = router?.query?.equityId || router?.query?.id;
  const {user} = router?.query;

  const ACCOUNT_PAYMENT_DETAILS = useQuery(['get-upcoming-details', equityId], () =>
    getUserPaymentBreakdown(equityId, `?recurring=${recurring}&user=${user}`)
  );
  const ACCOUNT_PAST_PAYMENTS = useQuery(['get-past-payments', equityId], () =>
    getAccountPastPayments(Number(equityId))
  );

  const GET_INDIVIDUAL_PAYMENT_DETAILS = useQuery(['get-individual-payment-details'], () =>
    getCoownerIndividualBreakdown(Number(equityId), user)
  );

  const paymentData = ACCOUNT_PAYMENT_DETAILS?.data?.data?.data;
  const pastPayment = ACCOUNT_PAST_PAYMENTS?.data?.data;
  // console.log('past=>', pastPayment, 'upcoming=>', paymentData);
  // console.log('coown-individual', GET_INDIVIDUAL_PAYMENT_DETAILS?.data && GET_INDIVIDUAL_PAYMENT_DETAILS?.data?.data);

  useEffect(() => {
    setRecurring(pastPayment && pastPayment[0]?.equity?.auto_debit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <LayoutView>
      <PageHeader pageTitle="Co-ownership payment | Individual breakdown" />
      {ACCOUNT_PAYMENT_DETAILS.isLoading ? (
        <Flex direction="column" w="full" h="full" justify="center" align="center">
          <VStack h="45vh">
            <AnimatedLoader />
          </VStack>
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
        <Box position="relative" mt="11vh">
          <BackArrowWithText text="Back" />
          <Container
            mt="25px"
            p="12"
            bg="#FFFFFF"
            maxW={'7xl'}
            color="gray.900"
            borderRadius="2xl"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          >
            {pastPayment?.length !== 0 || paymentData?.length !== 0 ? (
              <Box w="full">
                {paymentData[0]?.equity?.co_owners?.length > 0 ||
                paymentData[0]?.equity?.co_owners?.length > 0 ? (
                  <CoownershipHeader isIndividual pastPayment={pastPayment} />
                ) : (
                  <UserHeader pastPayment={pastPayment} />
                )}

                {/* Listing */}
                {pastPayment && <ListingInfo my="35px" noQty listing={pastPayment[0]?.equity} />}
                <UserTransactionSummary pastPayment={pastPayment} />
                <Text mb="15px" fontWeight={500} fontSize="xl" ml={2}>
                  Previous payments
                </Text>
                {pastPayment.length > 0 ? (
                  pastPayment?.map((item, index) => (
                    <div key={index}>
                      <PaymentPlanSummary my={0} data={[item]} />
                    </div>
                  ))
                ) : (
                  <VStack spacing={8} mx="auto" w="full" h="full" py="100px">
                    {/* <ImFilesEmpty style={{height: '70px', width: '75px', color: '#606060'}} /> */}
                    <Image alt="empty table icon" src={emptyIcon.src} />
                    <Text w="full" textAlign="center" fontSize="1em" mx="auto">
                      No payments made yet...
                    </Text>
                  </VStack>
                )}

                <UpcomingPaymentsHeader pastPayment={pastPayment} paymentData={paymentData} />
                {paymentData.length > 0
                  ? paymentData?.map((item, index) => (
                      <Box key={index}>
                        <PaymentPlanSummary my={0} data={[item]} />
                      </Box>
                    ))
                  : null}
              </Box>
            ) : (
              <VStack spacing={8} mx="auto" w="full" h="full" py="100px">
                {/* <ImFilesEmpty style={{height: '70px', width: '75px', color: '#606060'}} /> */}
                <Image alt="empty table icon" src={emptyIcon.src} />
                <Text
                  w="full"
                  textAlign="center"
                  mx="auto"
                  bgGradient="linear(to-r, #FF008A, #4545FE, #4545FE)"
                  bgClip="text"
                  fontSize="xl"
                  fontWeight="bold"
                >
                  This user has no active payments record
                </Text>
              </VStack>
            )}
          </Container>
        </Box>
      ) : null}
    </LayoutView>
  );
};

export default IndividualPaymentPageForCoOwnedProperties;
