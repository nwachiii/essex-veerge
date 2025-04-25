import React, {useMemo} from 'react';
import {Box, Flex, Heading, Icon} from '@chakra-ui/react';
import {LayoutView} from '@/components/index';
import {useSmallerLaptopsBreakpoint} from 'ui-lib';
import {useRouter} from 'next/router';
import {demoTransactionTableData} from 'constants/DEMODATA/transaction';
import MatadorCustomTable from '@/components/common/Table';

import TransactionDetailsCard from '@/components/transactionDemoPage/transactionDetailsCard';
import {FaAngleLeft} from 'react-icons/fa';
import {TfiAngleLeft} from 'react-icons/tfi';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';
import TRANSACTIONPAGE_COLUMN from 'pages/residents/customer_overview/CustomersTable/Table/transactionCOLUMN';
const limit = 10;
const TransactionDemoPage = () => {
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  const router = useRouter();

  const routeQueries = router.query;
  const currentPage = routeQueries?.page ?? '1';

  const transactions =
    demoTransactionTableData?.[`page${currentPage}`] ?? demoviolationTableData?.[`1`];

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
  const number_of_pages = 3;

  const columns = useMemo(() => TRANSACTIONPAGE_COLUMN, []);

  return (
    <Box w="full" minH="100vh" bg="#FAFAFA" h={isSmallerLaptop ? '60vh' : ''}>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage="transactions"
      >
        <Box
          // mt="clamp(-100vh, -82vh, calc(-100vh + 120px))"
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          mx="auto"

          // className="main-app"
        >
          <Flex mb="32px" w="full" alignItems="center" justifyContent="space-between">
            <Flex gap="12px" alignItems="center">
              <Flex
                onClick={() => router.back()}
                bg="#f4f4f5"
                role="button"
                boxSize="50px"
                border="1px solid #e4e4e7"
                rounded="full"
                justify="center"
                align="center"
              >
                <Icon as={FaAngleLeft} boxSize="20px" />
              </Flex>
              <Heading fontSize="23px" fontWeight="600" color="#18181b">
                Transactions
              </Heading>
            </Flex>
            <Box boxSize="36px">
              <DownloadCsv data={[]} />
            </Box>
          </Flex>
          <TransactionDetailsCard />
          <MatadorCustomTable
            minW="full"
            forMemo={[router]}
            forLimit={[limit, router]}
            headerSpace="evenly"
            COLUMNS={columns}
            number_of_pages={number_of_pages}
            handlePagination={handlePagination}
            DATA={transactions}
            isManageAgentEmpty="No transaction has been found yet"
          />
        </Box>
      </LayoutView>
    </Box>
  );
};

export default TransactionDemoPage;
