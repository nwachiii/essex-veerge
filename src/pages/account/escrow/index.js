import React, {useState} from 'react';
import Head from 'next/head';
import BackBtn from '../components/BackBtn';
import {useQuery} from '@tanstack/react-query';
import {fetchExcrowPayments} from '/src/apis/account';
import {fetchEscrowHistory, fetchExcrowSummary} from '../../../apis/account';
import {AnimatedLoader, LayoutView} from '/src/components';
import {Box, Center, Flex, HStack, Image, Stack, Text, useToast} from '@chakra-ui/react';
import {MatadorCustomTable} from '../../../components/common/Table';
import {EXCROW_TXNS_COLUMNS} from '../../../constants/accounts/payment/excrow';
import {formatAmountWithDecimal} from '../../../utils/formatAmount';
import {useRouter} from 'next/router';
import {Button} from 'ui-lib/ui-lib.components';
import {AiOutlineHistory} from 'react-icons/ai';

export const ExcrowPayments = () => {
  const toast = useToast();
  const router = useRouter();

  const [limit, setLimit] = useState(10);

  const EXCROW_SUMMARY_QUERY = useQuery(['excrow-summary'], fetchExcrowSummary);
  const EXCROW_PAYMENTS_QUERY = useQuery(['excrow-payments'], fetchExcrowPayments);
  const EXCROW_PAYMENT_HIISTORY_QUERY = useQuery(['escrow-history'], fetchEscrowHistory);
  const ESCROW_DATA = EXCROW_PAYMENT_HIISTORY_QUERY?.data?.data?.results;
  const routeQueries = router.query;

  const TOTAL_AMOUNT_IN_EXCROW = EXCROW_SUMMARY_QUERY?.data?.data?.total_amount_in_escrow;
  const TOTAL_PENDING_TXN = EXCROW_SUMMARY_QUERY?.data?.data?.total_pending_transaction;

  const handlePagination = direction => {
    if (direction === 'next') {
      const defaultQuery = {
        page: `${routeQueries?.page ? ~~routeQueries.page + 1 : 2}`,
        limit,
      };

      const mergedQuery = {
        ...router.query,
        ...defaultQuery,
      };
      router.push({
        pathname: router.pathname,
        query: mergedQuery,
      });
    }
    if (direction === 'prev') {
      const defaultQuery = {
        page: `${routeQueries?.page ? ~~routeQueries.page - 1 : 1}`,
        limit,
      };

      const mergedQuery = {
        ...router.query,
        ...defaultQuery,
      };
      router.push({
        pathname: router.pathname,
        query: mergedQuery,
      });
    }
  };
  const EXCROW_PAYMENTS_COUNT = EXCROW_PAYMENTS_QUERY?.data?.data?.count;
  const number_of_pages = Math.ceil(~~EXCROW_PAYMENTS_COUNT / ~~limit);

  return (
    <>
      <Head>
        <title>Veerge | Account - Escrow payments</title>
        <meta name="description" content="Escrow payments" />
        <meta name="theme-color" content="#191919" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <LayoutView
        activePage="account"
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
      >
        {EXCROW_PAYMENTS_QUERY?.isLoading || EXCROW_SUMMARY_QUERY?.isLoading ? (
          <Center h="65vh">
            <AnimatedLoader />
          </Center>
        ) : EXCROW_PAYMENTS_QUERY?.isError ? (
          toast({
            title: 'Request failed',
            description: `An error occured while fetching`,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
        ) : (
          <Box
            mt="clamp(52px,calc(11.4vh + 40px),96px)"
            px={{base: '0px', xl: '30px'}}
            maxW="full"
            w="full"
            mx="auto"
          >
            <HStack w="full" justify={'space-between'}>
              <BackBtn name="Escrow" />

              {ESCROW_DATA?.length > 0 ? (
                <Button
                  py={0}
                  h="100%"
                  mt={0}
                  px="13px"
                  p={`12px 14.5px`}
                  w="max-content"
                  color="#4545fe"
                  fontSize="16px"
                  fontWeight="400"
                  borderRadius="72px"
                  variant="secondary"
                  border="1px solid #4545FE"
                  lineHeight={`20.29px`}
                  onClick={() => router.push('/account/escrow/history')}
                  leftIcon={
                    <AiOutlineHistory
                      style={{fontSize: '24px', transform: 'scaleX(-1)'}}
                      color="#4545FE"
                    />
                  }
                >
                  Escrow History
                </Button>
              ) : null}
            </HStack>
            <Flex
              maxW="800px"
              w="full"
              justify={'center'}
              my={'20px'}
              borderRadius="12px "
              border="1px solid #E4E4E4"
              background="#FFF"
              mx={`auto`}
            >
              <Center
                flex={`1`}
                p={{base: `24.5px`}}
                flexDirection="column"
                gap="14px"
                flexShrink="0"
                borderRight="1px solid #E4E4E4"
              >
                <Text
                  color="#191919"
                  textAlign="center"
                  fontFamily="Euclid Circular B"
                  fontSize="24px"
                  fontStyle="normal"
                  fontWeight="600"
                >
                  {TOTAL_AMOUNT_IN_EXCROW ? formatAmountWithDecimal(TOTAL_AMOUNT_IN_EXCROW) : '-'}
                </Text>
                <Text
                  color="var(--Mid-Gray, #606060)"
                  textAlign="center"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="400"
                >
                  Total Amount in Escrow
                </Text>
              </Center>
              <Center
                flex={`1`}
                p={{base: `24.5px`}}
                flexDirection="column"
                gap="14px"
                flexShrink="0"
              >
                <Text
                  color="#191919"
                  textAlign="center"
                  fontFamily="Euclid Circular B"
                  fontSize="24px"
                  fontStyle="normal"
                  fontWeight="600"
                >
                  {TOTAL_PENDING_TXN ? formatAmountWithDecimal(TOTAL_PENDING_TXN) : '-'}
                </Text>
                <Text
                  color="var(--Mid-Gray, #606060)"
                  textAlign="center"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="400"
                >
                  Total Pending Transaction
                </Text>
              </Center>
            </Flex>
            <MatadorCustomTable
              maxW=""
              minW="100%"
              isManageAgentEmpty
              headerSpace="evenly"
              forMemo={[router]}
              forLimit={[limit, router]}
              handlePagination={handlePagination}
              number_of_pages={number_of_pages}
              COLUMNS={EXCROW_TXNS_COLUMNS(EXCROW_PAYMENTS_QUERY?.data?.data?.data)}
              DATA={EXCROW_PAYMENTS_QUERY?.data?.data?.results}
            />
          </Box>
        )}
      </LayoutView>
    </>
  );
};

export default ExcrowPayments;
