import Head from 'next/head';
import {LayoutView} from '/src/components';
import {useQuery} from '@tanstack/react-query';
import BackBtn from '../account/components/BackBtn';
import {fetchBillingHistory, fetchCurrentBillingPlan} from '../../apis/account';
import {handleDateFormat} from '../../utils/formatDate';
import {MatadorCustomTable} from '../../components/common/Table';
import {Box, Center, Flex, Image, Stack, Text} from '@chakra-ui/react';
import {BILLING_HISTORY_COLUMN} from '../../constants/accounts/billing';
import noPlanBanner from '/src/images/billing/no-selected-plan-notice.svg';

export const BillingHistory = () => {
  const BILLING = useQuery(['billing-plan'], fetchCurrentBillingPlan);
  const BILLING_HISTORY = useQuery(['billing-history'], fetchBillingHistory);
  const CURRENT_PLAN = BILLING?.data?.data?.plan;
  const NEXT_DUE_DATE = BILLING?.data?.data?.next_due_date;
  const NO_PLAN_SELECTED = BILLING?.data?.data?.plan == null;

  // console.log('BILLING_HISTORY', BILLING_HISTORY?.data?.data?.results);

  const BILLING_HISTORY_RESULTS = BILLING_HISTORY?.data?.data?.results;

  return (
    <Box minH={'100vh'} bg={'#FAFAFA'}>
      <Head>
        <title>Veerge | Account - Billing history</title>
        <meta name="description" content="Billing history" />
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <LayoutView activePage="account" />
      <Box
        bg="#FAFAFA"
        className="relative w-100"
        style={{marginTop: '-84vh'}}
        px={'48px'}
        maxW="1300px"
        mx="auto"
      >
        <Flex w="full" justify="space-between" mt="30px" mb={4}>
          <BackBtn name="Back" />
        </Flex>

        {NO_PLAN_SELECTED ? (
          <Center w="full">
            <Image src={noPlanBanner.src} h="72px" alt="" />
          </Center>
        ) : (
          <Stack
            mx="auto"
            align={'center'}
            justify={'center'}
            spacing={'10px'}
            h="114px"
            maxW="710px"
            w="full"
            borderRadius="20px"
            border="1px solid #4545FE"
            fontWeight={'500'}
            fontSize={'20px'}
          >
            <Text color={'#000'} textTransform={'capitalize'}>
              Current plan: <span style={{color: '#4545FE'}}>{CURRENT_PLAN}</span>
            </Text>

            <Text color={'#000'} fontSize={'14px'} fontWeight={'500'}>
              {NEXT_DUE_DATE
                ? `Your next yearly charge will be applied to your primary payment method on ${handleDateFormat(
                    NEXT_DUE_DATE
                  )}.`
                : !CURRENT_PLAN
                  ? null
                  : 'Next due date will be automated & updated shortly'}
            </Text>
          </Stack>
        )}
        <Box py={10} />
        <MatadorCustomTable
          isManageAgentEmpty
          minW="full"
          // headerSpace="evenly"
          DATA={BILLING_HISTORY_RESULTS || []}
          COLUMNS={BILLING_HISTORY_COLUMN(BILLING_HISTORY_RESULTS || [])}
        />
      </Box>
    </Box>
  );
};

export default BillingHistory;
