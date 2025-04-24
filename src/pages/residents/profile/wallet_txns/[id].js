import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  SkeletonText,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {CSVLink} from 'react-csv';
import {useRouter} from 'next/router';
import {themeStyles} from '../../../../theme';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import downloadIcon from '/src/images/icons/download-icon.svg';
import {fetchUserWalletTxns} from '../../../../apis/customers';
import {AnimatedLoader} from '../../../../components/common/loaders';
import PageHeader from '../../../../components/common/PageHeader';
import {LayoutView} from '../../../../components/PageLayout/LayoutView';
import {BackArrowWithText} from '../../../../components/assets/BackArrow';
import {USER_WALLET_TRANSACTIONS} from '../../../../constants/customers/wallet_txns';
import {MatadorCustomTable} from '../../../../components/common/Table';
import {formatAmountWithDecimal} from '../../../../utils/formatAmount';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';

const WalletTransactions = () => {
  const toast = useToast();
  const router = useRouter();
  const id = router?.query?.id;
  const name = router?.query?.name;
  const [limit, setLimit] = useState(10);

  const routeQueries = router.query;
  const currentPage = routeQueries?.page ?? '1';

  const convertToApiQuery = () => {
    const regex = /&[^&]*&/g;
    return `?${Object.entries(routeQueries)
      .map(item =>
        item?.[0] === 'page' || item?.[0] === 'limit' ? `${item?.[0]}=${item?.[1]}` : ``
      )
      .join('&')
      .replace(regex, '')}`;
  };

  const param = convertToApiQuery();

  const FETCH_USER_WALLET_TXNs = useQuery(['user_wallet_txns', id, param], () =>
    fetchUserWalletTxns(id, param)
  );

  const WALLET_TXNS = FETCH_USER_WALLET_TXNs?.data?.data?.transactions;
  const META_DATA = FETCH_USER_WALLET_TXNs?.data?.data && FETCH_USER_WALLET_TXNs?.data?.data;

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

  useEffect(() => {
    const fetch = async () => await FETCH_USER_WALLET_TXNs.refetch();
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const number_of_pages = Math.ceil(~~FETCH_USER_WALLET_TXNs?.data?.data?.count / ~~limit);
  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          date: data[i]?.date,
          description: data[i]?.description,
          reference: data[i]?.reference,
          debit: data[i]?.debit,
          deposit: data[i]?.deposit,
          balance: data[i]?.balance,
        });
    }
    return result;
  };

  const isTableValid = !FETCH_USER_WALLET_TXNs.isError && !!WALLET_TXNS?.length;

  return (
    <LayoutView px={{base: '0px', xl: '30px'}} tabPanelStyle={{pb: '0px'}} pb="0px">
      <PageHeader pageTitle="Outstanding Balance | customers" />
      <Box
        mt="clamp(52px,calc(11.4vh + 40px),96px)"
        px={{base: '0px', xl: '30px'}}
        maxW="full"
        w="full"
        mx="auto"
      >
        <Flex w="full" justify="space-between">
          <BackArrowWithText mb={4} text={name ?? 'Back'} />
          <HStack mb="18px" w="full" justify="flex-end" gap="12px">
            {/* <CSVLink data={getDataFromJSON(WALLET_TXNS)}>
              <Button
                display="flex"
                gap="3px"
                w="177px"
                height="46px"
                border="1px solid #4545FE"
                borderRadius="12px"
                fontWeight="500"
                fontSize="12px"
                lineHeight="15px"
                textAlign="center"
                color="#4545FE"
                bg="transparent"
              >
                <Image w="18px" h="18px" src={downloadIcon.src} alt="" />
                Download as CSV
              </Button>
            </CSVLink> */}
            <DownloadCsv isTableValid={isTableValid} data={getDataFromJSON(WALLET_TXNS)} />
            {/* <SortBy
              // url={addedParam}
              // setUrl={setAddedParam}
              sortFor="outstanding_balance_id"
              // sort_params={sort_params}
            /> */}
          </HStack>
        </Flex>
        {FETCH_USER_WALLET_TXNs?.isLoading ? (
          <VStack h="80vh">
            <AnimatedLoader />
          </VStack>
        ) : FETCH_USER_WALLET_TXNs?.isError ? (
          toast({
            title: 'Fetch Error!',
            description:
              'Something went wrong while fetching the list of customer outstanding payments',
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top-right',
          })
        ) : WALLET_TXNS.length ? (
          <>
            <Container {...themeStyles.containerStyles} maxW="1284px" padding="19px 26px">
              <SimpleGrid
                columns={3}
                wrap="wrap"
                gap="18px 10px"
                maxW="1284px"
                mx="auto"
                placeItems="center"
              >
                <Box
                  {...themeStyles.md_Box}
                  w="290px"
                  h="auto"
                  py={'17px'}
                  border={'1px solid #ECECEC'}
                >
                  <Text fontWeight="bold" fontSize={24} color={'#191919'}>
                    {META_DATA?.current_balance == '0.00'
                      ? '-'
                      : formatAmountWithDecimal(META_DATA?.current_balance)}
                  </Text>
                  <Text py="7px" fontSize="14px" fontWeight={'400'} color="#606060">
                    Wallet Current Balance
                  </Text>
                </Box>{' '}
                <Box
                  {...themeStyles.md_Box}
                  w="290px"
                  h="auto"
                  py={'17px'}
                  border={'1px solid #ECECEC'}
                  color={themeStyles.color.matador__green}
                >
                  <Text fontWeight="bold" fontSize={24}>
                    {META_DATA?.total_deposit == '0.00'
                      ? '-'
                      : formatAmountWithDecimal(META_DATA?.total_deposit)}
                  </Text>
                  <Text py="2px" fontSize="14px" fontWeight={'400'} color="#606060">
                    Total Deposit
                  </Text>
                </Box>{' '}
                <Box
                  {...themeStyles.md_Box}
                  w="290px"
                  h="auto"
                  py={'17px'}
                  border={'1px solid #ECECEC'}
                  color={themeStyles.color.matador__red}
                >
                  <Text fontWeight="bold" fontSize={24}>
                    {META_DATA?.total_debit == '0.00'
                      ? '-'
                      : formatAmountWithDecimal(META_DATA?.total_debit)}
                  </Text>
                  <Text py="7px" fontSize="14px" fontWeight={'400'} color="#606060">
                    Total Debit
                  </Text>
                </Box>
              </SimpleGrid>
            </Container>
            <SkeletonText
              startColor="gray.300"
              endColor={'#F3F3F3'}
              isLoaded={!FETCH_USER_WALLET_TXNs?.isLoading}
              skeletonHeight="60px"
              noOfLines={1}
            />
            <SkeletonText
              startColor="gray.300"
              endColor={'#F3F3F3'}
              isLoaded={!FETCH_USER_WALLET_TXNs?.isLoading}
              mt="4"
              noOfLines={6}
              spacing="10px"
              skeletonHeight="20px"
            >
              {!FETCH_USER_WALLET_TXNs?.isLoading && (
                <MatadorCustomTable
                  handlePagination={handlePagination}
                  forMemo={[router]}
                  number_of_pages={number_of_pages}
                  forLimit={[limit, router]}
                  isRefetching={FETCH_USER_WALLET_TXNs?.isLoading}
                  minW="full"
                  DATA={WALLET_TXNS}
                  COLUMNS={USER_WALLET_TRANSACTIONS(WALLET_TXNS)}
                />
              )}
            </SkeletonText>
          </>
        ) : null}{' '}
      </Box>
    </LayoutView>
  );
};

export default WalletTransactions;
