import Head from 'next/head';
import Link from 'next/link';
import {BillingFAQ} from './faq';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {LayoutView} from '/src/components';
import BillingFreqency from './BillingFreqency';
import BackBtn from '../account/components/BackBtn';
import {MatadorCustomToast} from '../veerge_menu/loop';
import {handleDateFormat} from '../../utils/formatDate';
import CheckIcon from '../../components/assets/checkIcon';
import {useMutation, useQuery} from '@tanstack/react-query';
import noPlanBanner from '/src/images/billing/no-selected-plan-notice.svg';
import {changeBillingPlan, fetchCurrentBillingPlan} from '../../apis/account';
import BillingHistoryIcon from '../../components/assets/billing-history-icon';
import {
  STANDARD_PLAN_MONTHLY,
  PLUS_PLAN_MONTHLY,
  PREMIUM_PLAN_MONTHLY,
  PLATINUM_PLAN_MONTHLY,
} from './data';
import {
  Td,
  Th,
  Tr,
  Box,
  Flex,
  Image,
  Stack,
  Table,
  Tbody,
  Text,
  Thead,
  Center,
  Button,
  TableContainer,
  useDisclosure,
  useToast,
  Skeleton,
  HStack,
  VStack,
} from '@chakra-ui/react';
import popularTag from '/src/images/icons/billing-popular-tag.svg';
import learnMoreTag from '/src/images/learn-more-button.svg';
import CtaModal from './cta-modal';
import {themeStyles} from '../../theme';

export const Billing = () => {
  const router = useRouter();
  const [billingFreq, setBillingFreq] = useState('monthly');
  const BILLING = useQuery(['billing-plan'], fetchCurrentBillingPlan);
  const NO_PLAN_SELECTED = BILLING?.data?.data?.plan == 'null';
  const CURRENT_PLAN = BILLING?.data?.data?.plan;
  const NEXT_DUE_DATE = BILLING?.data?.data?.next_due_date;

  const plan_prices = {
    standard: 250,
    premium: 300,
    platinum: 350,
  };

  const duration_package = {
    monthly: {count: 1, discount: 0},
    'six-months': {count: 6, discount: 0.05},
    six_months: {count: 6, discount: 0.05},
    annually: {count: 12, discount: 0.1},
    yearly: {count: 12, discount: 0.1},
  };

  // console.log('Billing history', BILLING?.data?.data);

  return (
    <Stack w="full" minH="100vh" bg="#FAFAFA">
      <Head>
        <title>Veerge | Account - Billing</title>
        <meta name="description" content="Billing" />
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <LayoutView activePage="account" />
      <Box
        className="relative w-100"
        w="full"
        mx="auto"
        px={'48px'}
        maxW="1500px"
        style={{marginTop: '-84vh'}}
        fontFamily={'Euclid Circular B'}
      >
        <Flex w="full" justify="space-between" mb={4} align={'flex-start'}>
          <BackBtn name="Back" w="fit-content" />

          {/* {BILLING.isLoading ? (
            <Skeleton
              {...themeStyles.transactionBox}
              fadeDuration={0.6}
              speed={1}
              endColor="#ececec"
              startColor="#FAFAFA"
              h="114px"
              maxW="710px"
              w="full"
              borderRadius="20px"
              border="1px solid #4545FE"
            />
          ) : (
            <Stack
              // h="114px"
              w="full"
              mt={'50px'}
              align={'center'}
              maxW="710px"
              spacing={'10px'}
              fontSize={'20px'}
              justify={'center'}
              borderRadius="4px"
              fontWeight={'500'}
              border="1px solid #e4e4e4"
            >
              <HStack
                w="100%"
                p="16px"
                bg="#F1F3F4"
                justify={`center`}
                borderBottom="1px solid #e4e4e4"
                borderRadius="4px 4px 0px 0px"
              >
                <PlanIcon />
                <Text
                  textTransform={`capitalize`}
                  color="#232425"
                  fontWeight={`600`}
                  lineHeight={'24px'}
                >
                  {CURRENT_PLAN ? `${CURRENT_PLAN} Plan` : 'No Plan Selected'}

                  {console.log(BILLING?.data?.data)}
                </Text>
              </HStack>
              <VStack p="14px 16px" textAlign={`center`}>
                {plan_prices[`${CURRENT_PLAN}`] && (
                  <Text color={`#344054`} fontSize={'30px'} lineHeight={'38px'} fontWeight="600">
                    $
                    {plan_prices[`${CURRENT_PLAN}`] * duration_package[`${billingFreq}`]?.count -
                      plan_prices[`${CURRENT_PLAN}`] *
                        duration_package[`${billingFreq}`]?.count *
                        duration_package[`${billingFreq}`]?.discount}{' '}
                    <Box
                      as="span"
                      lineHeight={'20px'}
                      fontSize="14px"
                      fontWeight="400"
                      color="#475467"
                    >
                      /{billingFreq.split('-').join(' ').toLowerCase()}
                    </Box>
                  </Text>
                )}

                {!CURRENT_PLAN ? (
                  <Text color={'#475467'} fontSize={'14px'} fontWeight={'500'}>
                    You’re currently not on any plan. Kindly choose a plan below.
                  </Text>
                ) : NEXT_DUE_DATE ? (
                  <Text color={'#475467'} fontSize={'14px'} fontWeight={'500'}>
                    Your next yearly charge will be applied to your primary payment method on{' '}
                    <b>{handleDateFormat(NEXT_DUE_DATE)}</b>.
                  </Text>
                ) : (
                  <Text color={'#475467'} fontSize={'14px'} fontWeight={'500'}>
                    Next due date will be automated & updated shortly
                  </Text>
                )}
              </VStack>
            </Stack>
          )}

          {BILLING?.data?.data?.billing_history ? (
            <Center
              cursor={'pointer'}
              zIndex={!CURRENT_PLAN ? -1 : 1}
              w="140px"
              h="48px"
              border={'1px solid #242526'}
              borderRadius="12px"
              as={Link}
              href="/billing/history"
            >
              <BillingHistoryIcon />
              <Text color="#242526" pl={'5px'} fontSize={'12px'} fontWeight={'500'}>
                Billing history
              </Text>
            </Center>
          ) : (
            <Box w="100px" />
          )} */}
        </Flex>
        <BillingFreqency billingFreq={billingFreq} setBillingFreq={setBillingFreq} />
        <Stack mt="15px" maxW="90%" w="full" mx="auto">
          <BillingPackageContent
            billingFreq={billingFreq}
            CURRENT_PLAN={CURRENT_PLAN}
            NO_PLAN_SELECTED={NO_PLAN_SELECTED}
            refetBillingDetails={BILLING.refetch}
            plan_prices={plan_prices}
            duration_package={duration_package}
          />
        </Stack>

        <BillingFAQ />
      </Box>
    </Stack>
  );
};

export default Billing;

const BillingPackageContent = ({
  billingFreq,
  CURRENT_PLAN,
  refetBillingDetails,
  plan_prices,
  duration_package,
}) => {
  const toast = useToast();
  const router = useRouter();
  const [planSelection, setPlanSelection] = useState('');
  const OPEN_ACTION_MODAL = useDisclosure();
  const isPlan = CURRENT_PLAN?.toLowerCase();
  const mutation = useMutation(
    formData => changeBillingPlan({...formData, frequency: billingFreq}),
    {
      onSuccess: async res => {
        console.log(res);
        toast({
          title: 'Your plan has been successfully updated',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        refetBillingDetails();
        OPEN_ACTION_MODAL.onClose();
      },
      onError: res => {
        console.log(res);
        return toast({
          title: res?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
          description: `${
            res?.response?.data?.message ??
            res?.response?.message ??
            res?.message ??
            'Something went wrong, we are working on resolving it.'
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );
  const headerStyles = {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '600',
    color: '#4545FE',
    position: 'relative',
    textTransform: 'capitalize',
  };
  const headerStyles2 = {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: '800',
    color: '#3d3d3d',
    textTransform: 'capitalize',
  };

  const handlePlanSelection = arg => {
    if (mutation.isLoading) {
      return;
    } else if (arg == 'plus') {
      router.push('/veerge_menu/support_center');
    } else if (!isPlan) {
      OPEN_ACTION_MODAL.onOpen();
      setPlanSelection(arg);
    } else if (isPlan == arg) {
      return;
    } else if (arg == 'standard') {
      router.push('/veerge_menu/support_center');
    } else if (arg == 'premium' && isPlan == 'platinum') {
      router.push('/veerge_menu/support_center');
    } else {
      OPEN_ACTION_MODAL.onOpen();
      setPlanSelection(arg);
    }
  };
  const handleButtonDisplay = arg => {
    if (isPlan == arg) {
      return 'Current Plan';
    } else if (arg == 'plus') {
      return 'Contact Sales';
    } else if (!isPlan) {
      return 'Select Plan';
    } else if (arg == 'standard') {
      return 'Contact Sales';
    } else if (arg == 'premium' && isPlan == 'platinum') {
      return 'Contact Sales';
    } else if (arg == 'premium' && isPlan == 'standard') {
      return 'Upgrade Plan';
    } else if (arg == 'platinum') {
      return 'Upgrade Plan';
    } else {
      return 'Select Plan';
    }
  };

  const open_veerge_plus = () => {
    // router.push('/veerge_plus')
    window.open('https://veerge-support.myxellia.io/veerge_plus');
  };

  return (
    <TableContainer w="full" mx="auto">
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr borderBottomColor={'#FFF'}>
            <Th w="50px"></Th>
            <Th {...headerStyles} color="#242526" py={6}>
              Standard
            </Th>
            <Th {...headerStyles} color="#242526">
              Premium
              <Image alt="" position={'absolute'} top="30%" right={'-16%'} src={popularTag.src} />
            </Th>
            <Th {...headerStyles} color="#242526">
              Platinum
            </Th>
            <Th {...headerStyles} color="#242526" textAlign="left" pl="30px">
              Plus
              <Image
                alt=""
                top="30%"
                left={'37%'}
                cursor={'pointer'}
                position={'absolute'}
                src={learnMoreTag.src}
                onClick={open_veerge_plus}
                filter="brightness(0)"
              />
            </Th>
          </Tr>
          <Tr borderBottomColor={'#FFF'}>
            <Th></Th>
            <Th {...headerStyles2} py={6}>
              $
              {Intl.NumberFormat('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }).format(
                plan_prices.standard -
                  plan_prices.standard * duration_package[`${billingFreq}`]?.discount
              )}
              {/* <Box as="span" lineHeight={'20px'} fontSize="14px" fontWeight="400" color="#475467">
                /{billingFreq.split('-').join(' ').toLowerCase()}
              </Box> */}
            </Th>
            <Th {...headerStyles2}>
              $
              {Intl.NumberFormat('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }).format(
                plan_prices.premium -
                  plan_prices.premium * duration_package[`${billingFreq}`]?.discount
              )}{' '}
              {/* <Box as="span" lineHeight={'20px'} fontSize="14px" fontWeight="400" color="#475467">
                /{billingFreq.split('-').join(' ').toLowerCase()}
              </Box> */}
            </Th>
            <Th {...headerStyles2}>
              $
              {Intl.NumberFormat('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }).format(
                plan_prices.platinum -
                  plan_prices.platinum * duration_package[`${billingFreq}`]?.discount
              )}
              {/* <Box as="span" lineHeight={'20px'} fontSize="14px" fontWeight="400" color="#475467">
                /{billingFreq.split('-').join(' ').toLowerCase()}
              </Box> */}
            </Th>
            <Th {...headerStyles2}>{`Let's talk`}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object?.entries(STANDARD_PLAN_MONTHLY)?.map(([key, value], idx) => (
            <Tr
              key={idx}
              color={'#000'}
              bg={idx % 2 == 0 ? '#F9FAFC !important' : `#ffffff !important`}
            >
              <Td fontSize={'14px'} fontWeight={'500'} textTransform={'capitalize'}>
                {key == 'purchase_button' ? '' : key.replace(/\_/g, ' ')}
              </Td>
              <Td fontSize={'12px'} fontWeight={'300'} textAlign={'center'}>
                {key == 'purchase_button' ? //     _hover={{ //     px="15px" //   <Button // <Center>
                //       backgroundColor: isPlan == 'standard' ? '#4545FE' : 'transparent',
                //     }}
                //     color={isPlan == 'standard' ? '#FFFFFF' : '#191919'}
                //     bg={isPlan == 'standard' ? '#4545FE' : 'transparent'}
                //     border={isPlan == 'standard' ? '' : '1px solid #191919'}
                //     fontFamily="Euclid Circular B"
                //     fontSize="14px"
                //     fontWeight="400"
                //     borderRadius="8.07px"
                //     display="flex"
                //     onClick={() => handlePlanSelection('standard')}
                //   >
                //     {handleButtonDisplay('standard')}
                //   </Button>
                // </Center>
                null : value == 'true' ? (
                  <Center>
                    <CheckIcon />
                  </Center>
                ) : value == 'false' ? (
                  <span style={{color: '#4545FE', fontWeight: '700'}}>-</span>
                ) : (
                  value
                )}
              </Td>
              <Td fontSize={'12px'} fontWeight={'300'} textAlign={'center'}>
                {key == 'purchase_button' ? //     px="15px" //   <Button // <Center>
                //     _hover={{
                //       backgroundColor: isPlan == 'premium' ? '#4545FE' : 'transparent',
                //     }}
                //     color={isPlan == 'premium' ? '#FFFFFF' : '#191919'}
                //     bg={isPlan == 'premium' ? '#4545FE' : 'transparent'}
                //     border={isPlan == 'premium' ? '' : '1px solid #191919'}
                //     fontFamily="Euclid Circular B"
                //     fontSize="14px"
                //     fontWeight="400"
                //     borderRadius="8.07px"
                //     display="flex"
                //     // width="fit-content"
                //     onClick={() => handlePlanSelection('premium')}
                //   >
                //     {handleButtonDisplay('premium')}
                //   </Button>
                // </Center>
                null : Object?.values(PREMIUM_PLAN_MONTHLY)[idx] == 'true' ? (
                  <Center>
                    <CheckIcon />
                  </Center>
                ) : Object?.values(PREMIUM_PLAN_MONTHLY)[idx] == 'false' ? (
                  <span style={{color: '#4545FE', fontWeight: '700'}}>-</span>
                ) : (
                  Object?.values(PREMIUM_PLAN_MONTHLY)[idx]
                )}
              </Td>
              <Td fontSize={'12px'} fontWeight={'300'} textAlign={'center'}>
                {key == 'purchase_button' ? //   <Button // <Center>
                //     px="15px"
                //     _hover={{
                //       backgroundColor: isPlan == 'platinum' ? '#4545FE' : 'transparent',
                //     }}
                //     color={isPlan == 'platinum' ? '#FFFFFF' : '#191919'}
                //     bg={isPlan == 'platinum' ? '#4545FE' : 'transparent'}
                //     border={isPlan == 'platinum' ? '' : '1px solid #191919'}
                //     fontFamily="Euclid Circular B"
                //     fontSize="14px"
                //     fontWeight="400"
                //     borderRadius="8.07px"
                //     display="flex"
                //     // width="fit-content"
                //     onClick={() => handlePlanSelection('platinum')}
                //   >
                //     {handleButtonDisplay('platinum')}
                //   </Button>
                // </Center>
                null : Object?.values(PLATINUM_PLAN_MONTHLY)[idx] == 'true' ? (
                  <Center>
                    <CheckIcon />
                  </Center>
                ) : Object?.values(PLATINUM_PLAN_MONTHLY)[idx] == 'false' ? (
                  <span style={{color: '#4545FE', fontWeight: '700'}}>-</span>
                ) : (
                  Object?.values(PLATINUM_PLAN_MONTHLY)[idx]
                )}
              </Td>
              <Td fontSize={'12px'} fontWeight={'300'} textAlign={'center'}>
                {key == 'purchase_button' ? // <Center>
                //   <Button
                //     px="15px"
                //     _hover={{
                //       backgroundColor: isPlan == 'plus' ? '#4545FE' : 'transparent',
                //     }}
                //     color={isPlan == 'plus' ? '#FFFFFF' : '#191919'}
                //     bg={isPlan == 'plus' ? '#4545FE' : 'transparent'}
                //     border={isPlan == 'plus' ? '' : '1px solid #191919'}
                //     fontFamily="Euclid Circular B"
                //     fontSize="14px"
                //     fontWeight="400"
                //     borderRadius="8.07px"
                //     display="flex"
                //     // width="fit-content"
                //     onClick={() => handlePlanSelection('plus')}
                //   >
                //     {handleButtonDisplay('plus')}
                //   </Button>
                // </Center>
                null : Object?.values(PLUS_PLAN_MONTHLY)[idx] == 'true' ? (
                  <Center>
                    <CheckIcon />
                  </Center>
                ) : Object?.values(PLUS_PLAN_MONTHLY)[idx] == 'false' ? (
                  <span style={{color: '#4545FE', fontWeight: '700'}}>-</span>
                ) : (
                  Object?.values(PLUS_PLAN_MONTHLY)[idx]
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* <CtaModal
        modal={OPEN_ACTION_MODAL}
        plan={planSelection}
        amount={
          planSelection == 'standard'
            ? '250.00'
            : planSelection == 'premium'
              ? '300.00'
              : planSelection == 'platinum'
                ? '350.00'
                : '0'
        }
        mutation={mutation}
        freq={billingFreq}
      /> */}
    </TableContainer>
  );
};

const PlanIcon = () => {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g style={{mixBlendMode: 'multiply'}}>
        <rect x="2" y="2" width="32" height="32" rx="16" fill="#344054" fillOpacity="0.1" />
        <rect
          x="2"
          y="2"
          width="32"
          height="32"
          rx="16"
          stroke="#344054"
          strokeOpacity="0.05"
          strokeWidth="4"
        />
        <path
          d="M15.334 17.5998C15.334 18.1131 15.734 18.5331 16.2207 18.5331H17.2207C17.6473 18.5331 17.994 18.1665 17.994 17.7198C17.994 17.2331 17.7807 17.0598 17.4673 16.9465L15.8673 16.3865C15.5473 16.2731 15.334 16.0998 15.334 15.6131C15.334 15.1665 15.6807 14.7998 16.1073 14.7998H17.1073C17.6007 14.8065 18.0007 15.2198 18.0007 15.7331"
          stroke="#242526"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.666 18.5664V19.0597"
          stroke="#242526"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.666 14.2734V14.7934"
          stroke="#242526"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.6607 21.9863C19.6025 21.9863 21.9873 19.6015 21.9873 16.6597C21.9873 13.7178 19.6025 11.333 16.6607 11.333C13.7188 11.333 11.334 13.7178 11.334 16.6597C11.334 19.6015 13.7188 21.9863 16.6607 21.9863Z"
          stroke="#242526"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.6543 23.2537C19.2543 24.1003 20.2343 24.6537 21.3543 24.6537C23.1743 24.6537 24.6543 23.1737 24.6543 21.3537C24.6543 20.247 24.1076 19.267 23.2743 18.667"
          stroke="#242526"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
