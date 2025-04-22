import {
  Image,
  Heading,
  HStack,
  Box,
  useToast,
  SkeletonText,
  Center,
  AbsoluteCenter,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';

import React, {useEffect, useState} from 'react';
import {fetchAgentInfo} from '../../../apis/manageAgent';
import {AnimatedLoader, LayoutView} from '../../../components';
import {MatadorCustomTable} from '../../../components/common/Table';
import {AGENTS_PROFILE_COLUMN} from '../../../constants/agents';
import {themeStyles} from '../../../theme';
import {AgentsProfile} from './AgentsProfile';
import backArrow from '/src/images/icons/back-arrow.png';
import SortBy from '../../../components/SortBy';
import FilterForId from './filter/FilterForId';
import {toastForError} from '../../../utils/toastForErrors';
import MoreOptions from './moreOptions';

export default function SingleAgentPage({id}) {
  const [blacklistCustomer, setBlacklistCustomer] = React.useState(false);
  const [limit, setLimit] = useState(10);
  const router = useRouter();
  const routeQueries = router.query;

  const [addedParam, setAddedParam] = useState({
    sort: '',
    filter: '',
    param: '',
  });

  const convertToApiQuery = () => {
    return `${Object.entries(routeQueries)
      .flatMap(item =>
        item?.[0] === 'filter'
          ? `${item?.[1]}`
          : item?.[0] === 'page' || item?.[0] === 'sort' || item?.[0] === 'limit'
            ? `${item?.[0]}=${item?.[1]}`
            : []
      )
      .join('&')}`;
  };
  const param = `${convertToApiQuery() ? `${id}?` : `${id}`}${convertToApiQuery()}`;

  const {data, isError, isLoading, error, refetch} = useQuery(['manageAgent', param], () =>
    fetchAgentInfo(param)
  );

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
    const fetch = async () => await refetch();
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const toast = useToast();

  if (isError) {
    toastForError(error, true, toast);
  }

  const sort_params = [
    'A-Z',
    'Z-A',
    'Date joined oldest to newest',
    'Date joined newest to oldest',
  ];

  const handleBack = () => {
    router.back(-1);
  };

  const number_of_pages = Math.ceil(~~data?.data?.count / ~~limit);

  return (
    <LayoutView px={{base: '0px', xl: '30px'}} tabPanelStyle={{pb: '0px'}} pb="0px">
      {isLoading ? (
        <AbsoluteCenter mt="25vh">
          <AnimatedLoader />
        </AbsoluteCenter>
      ) : (
        <Box
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          mx="auto"
        >
          <HStack w="100%" justify="space-between">
            <HStack onClick={handleBack} mb="10px">
              <Image
                style={{cursor: 'pointer'}}
                mr={2}
                height="50px"
                w="50px"
                src={backArrow.src}
                alt="back_arrow"
              />
              <Heading {...themeStyles.textStyles.h3}>Back</Heading>
            </HStack>
            <MoreOptions agent={data?.data?.profile} />
          </HStack>

          <AgentsProfile
            refetch={refetch}
            isError={isError}
            customer_sold={data?.data?.customers}
            units_sold={data?.data?.number_of_units_sold}
            referrals={data?.data?.referrals}
            referral={data?.data?.referral}
            info={data?.data?.profile}
          />

          {isError ? (
            <></>
          ) : (
            <>
              <Box mt={{base: '30px', xl: '54px'}}>
                <HStack
                  mb="20px"
                  spacing={6}
                  align="center"
                  justify="flex-end"
                  h="48px"
                  position="relative"
                  zIndex="2"
                >
                  <SortBy
                    url={addedParam}
                    setUrl={setAddedParam}
                    sortFor="manage_agent"
                    sort_params={sort_params}
                    btnStyle={{
                      _focus: {bg: 'transparent'},
                      _active: {bg: 'transparent'},
                      _hover: {bg: 'transparent'},
                    }}
                  />
                  <FilterForId
                    listings={data?.data?.listings_available}
                    url={addedParam}
                    setUrl={setAddedParam}
                  />
                </HStack>

                <MatadorCustomTable
                  headerSpace="evenly"
                  isManageAgentEmpty="No data yet"
                  tableContainerStyle={{bg: 'transparent'}}
                  emptyStateStyle={{bg: 'transparent'}}
                  maxW=""
                  minW="100%"
                  DATA={data?.data?.listings ?? []}
                  COLUMNS={AGENTS_PROFILE_COLUMN}
                  forMemo={[router]}
                  forLimit={[limit, router]}
                  number_of_pages={number_of_pages}
                  handlePagination={handlePagination}
                />
              </Box>
            </>
          )}
        </Box>
      )}
    </LayoutView>
  );
}

export async function getServerSideProps(context) {
  const {query} = context;
  const id = query.id;

  return {
    props: {
      id,
    },
  };
}
