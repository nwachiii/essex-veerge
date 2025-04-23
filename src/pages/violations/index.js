import SearchIcon from '@/components/assets/searchIcon';
import MatadorCustomTable from '@/components/common/Table';
import {LayoutView} from '@/components/index';
import ViolationOverviewHeader from '@/components/violations/violationOverviewHeader';
import ViolationFilter from '@/components/violations/violationfilter';
import {Box, Flex} from '@chakra-ui/react';
import {demoviolationTableData} from 'constants/DEMODATA/violations';
import {useRouter} from 'next/router';
import {VIOLATION_COLUMN} from 'pages/users/customer_overview/CustomersTable/Table/violationCOLUMN';
import React, {useMemo} from 'react';
import {useSmallerLaptopsBreakpoint} from 'ui-lib';

const limit = 10;
const Violations = () => {
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  const router = useRouter();

  const routeQueries = router.query;
  const currentPage = routeQueries?.page ?? '1';

  const violations =
    demoviolationTableData?.[`page${currentPage}`] ?? demoviolationTableData?.[`1`];

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
  const number_of_pages = 4;
  //   Math.ceil(~~customers?.data?.data?.count / ~~limit);

  const columns = useMemo(() => VIOLATION_COLUMN, []);
  return (
    <Box w="full" minH="100vh" bg="#FAFAFA" h={isSmallerLaptop ? '60vh' : ''}>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage="violations"
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
          <ViolationOverviewHeader />
          <Flex mb="32px" w="full" justify="end" gap="24px">
            <Flex
              h="36px"
              w="36px"
              justifyContent="center"
              border="0.5px solid #E4E4E7"
              alignItems="center"
              borderRadius="8.12px"
              bg="#ffffff"
            >
              <SearchIcon
                display="flex"
                justifyConten="center"
                alignItems="center"
                border="none"
                boxSize="20px"
                p="0px"
              />
            </Flex>
            <ViolationFilter />
          </Flex>
          <MatadorCustomTable
            minW="full"
            forMemo={[router]}
            forLimit={[limit, router]}
            headerSpace="evenly"
            COLUMNS={columns}
            number_of_pages={number_of_pages}
            handlePagination={handlePagination}
            DATA={violations}
            isManageAgentEmpty="No violation has been found yet"
          />
        </Box>
      </LayoutView>
    </Box>
  );
};

export default Violations;
