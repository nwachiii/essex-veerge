import React, {useMemo} from 'react';
import {Box, Flex, Heading, Icon} from '@chakra-ui/react';
import {LayoutView} from '@/components/index';
import {useSmallerLaptopsBreakpoint} from 'ui-lib';
import {useRouter} from 'next/router';

import MatadorCustomTable from '@/components/common/Table';

import {FaAngleLeft} from 'react-icons/fa';

import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';

import AccountOverViewHeader from '@/components/account/overViewHeader';
import {demoAccountPageTableData} from 'constants/DEMODATA/account/accountPages';
import {REFUNDABLE_COLUMN} from 'constants/accounts/tables/refundableDeposit';

const limit = 10;
const RefundableDeposit = () => {
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  const router = useRouter();

  const routeQueries = router.query;
  const currentPage = routeQueries?.page ?? '1';

  const transactions =
    demoAccountPageTableData?.[`page${currentPage}`] ?? demoAccountPageTableData?.[`1`];

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
  const number_of_pages = 2;

  const columns = useMemo(() => REFUNDABLE_COLUMN, []);

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
          <Flex mb="28px" w="full" alignItems="center" justifyContent="space-between">
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
                Refundable Deposit
              </Heading>
            </Flex>
            <Box boxSize="36px">
              <DownloadCsv data={[]} />
            </Box>
          </Flex>
          <AccountOverViewHeader header="Total Refundable Deposit" amount="1650" />
          <MatadorCustomTable
            minW="full"
            forMemo={[router]}
            forLimit={[limit, router]}
            headerSpace="evenly"
            COLUMNS={columns}
            number_of_pages={number_of_pages}
            handlePagination={handlePagination}
            DATA={transactions}
            isManageAgentEmpty="No deposit has been found yet"
          />
        </Box>
      </LayoutView>
    </Box>
  );
};

export default RefundableDeposit;
