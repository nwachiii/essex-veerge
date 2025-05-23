import Head from 'next/head';
import {AnimatedLoader, LayoutView} from '../../../components';
import Link from 'next/link';
import {Box, Flex, useToast} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {priceString} from '../../../utils/formatAmount';
import {getEquityOverview} from '../../../apis/account';
import {MatadorCustomTable} from '../../../components/common/Table';
import {OUSTANDING_BALANCE_COLUMN} from '../../../constants/accounts/outstanding_balance/outstanding_balance_column_api';
import OutstandingBalanceData from '../../../constants/accounts/outstanding_balance/outstandingBalanceData';
import BackBtn from '../components/BackBtn';
import PriceBox from '../components/PriceBox';

const OutstandingBalance = () => {
  const toast = useToast();
  const ACCOUNTEQUITYOVERVIEW = useQuery(['outstanding-balance-overview'], getEquityOverview);
  const TOTAL_PURCHASES =
    ACCOUNTEQUITYOVERVIEW?.data && ACCOUNTEQUITYOVERVIEW?.data?.data?.pruchases_data;

  return (
    <div className="relative">
      <Head>
        <title>Veerge | Outstanding Balance</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="theme-color" content="#191919" />
        <Link prefetch={false} rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutView activePage={'account'} />
      {ACCOUNTEQUITYOVERVIEW.isLoading ? (
        <Flex direction="column" w="full" h="full" justify="center" align="center">
          <AnimatedLoader />
        </Flex>
      ) : ACCOUNTEQUITYOVERVIEW.isError ? (
        toast({
          title: 'An error occured',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
      ) : (
        <Box px="35px" position="relative" mt="-83vh">
          <Flex w="full" justify="space-between" mb={4}>
            <BackBtn name="Outstanding Balance" />
          </Flex>
          <PriceBox
            price={priceString(
              'naira',
              ACCOUNTEQUITYOVERVIEW?.data?.data?.total_purchases || 1927953700.0
            )}
          />
          <MatadorCustomTable
            maxW=""
            minW="90%"
            COLUMNS={OUSTANDING_BALANCE_COLUMN(TOTAL_PURCHASES)}
            DATA={TOTAL_PURCHASES}
          />
        </Box>
      )}
    </div>
  );
};

export default OutstandingBalance;
