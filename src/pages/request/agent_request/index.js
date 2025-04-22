/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Center,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';

import {useRouter} from 'next/router';
import React, {Fragment, useEffect, useState} from 'react';

import {MatadorCustomTable} from '../../../components/common/Table';
import {AGENT_REQUEST_COLUMN} from '../../../constants/request/AgentRequestData';
import searchIcon from '/src/images/icons/searchIconRequest.svg';

import {AGENT_REQUEST_COLUMN_HISTORY} from '../../../constants/request/request_history/History.AgentRequestData';
import AgentHistoryComponent from '@/components/request/agent/agentHistoryComponent';
import PendingAgentComponent from '@/components/request/agent/agentComponent';
import RequestInfoWrapper from '@/components/request/requestInfoWrapper';
import {AnimatedLoader} from '@/components/index';

export default function AgentRequest({AllRequests, refetch, isLoading, isError}) {
  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [limit, setLimit] = useState(10);
  const routeQueries = router.query;

  const defaultSearchValue =
    router?.query?.status === 'history' ? routeQueries?.haq ?? '' : routeQueries?.aq ?? '';

  const setSearctTextAsQuery = () => {
    let obj = {};
    if (router?.query?.status === 'history' && searchText) {
      obj = {
        haq: searchText,
      };
      return obj;
    } else if (searchText) {
      obj = {
        aq: searchText,
      };
      return obj;
    } else {
      return;

      {
      }
    }
  };

  const handleChange = e => {
    setSearchText(e.target.value);
  };

  const dataKey = router?.query?.status === 'history' ? 'agent_request_closed' : 'agent_request';
  const countKey = router?.query?.status === 'history' ? 'count_closed_agent' : 'count_agent';

  useEffect(() => {
    setSearchText(defaultSearchValue);
  }, [router.query.status, defaultSearchValue]);

  useEffect(() => {
    const timed = setTimeout(() => {
      const defaultQuery = {
        page: `1`,
        limit,
        ...setSearctTextAsQuery(),
      };

      const mergedQuery = {
        ...router.query,
        ...defaultQuery,
      };
      searchText ? null : delete mergedQuery?.[router?.query?.status === 'history' ? 'haq' : 'aq'];
      router.push({
        pathname: router.pathname,
        query: mergedQuery,
      });
    }, 800);
    return () => clearTimeout(timed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);
  // const COLUMN =
  //   router.query.status === 'history'
  //     ? AGENT_REQUEST_COLUMN_HISTORY
  //     : AGENT_REQUEST_COLUMN(refetch);

  const REQUESTCOMPONENT = info =>
    router.query.status === 'history' ? (
      <AgentHistoryComponent info={info} />
    ) : (
      <PendingAgentComponent info={info} refetch={refetch} />
    );

  const header =
    router.query.status === 'history' ? 'Certified Realtors History' : `Certified Realtors`;

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

  const number_of_pages = Math.ceil(~~AllRequests?.[countKey] / ~~limit);

  return isError ? (
    <></>
  ) : isLoading ? (
    <Stack spacing="none" maxW="1001px" h="60vh" borderTopRadius="8px">
      <Center>
        <AnimatedLoader />
      </Center>
    </Stack>
  ) : (
    <RequestInfoWrapper
      header={header}
      requestComponent={data => REQUESTCOMPONENT(data)}
      requestArray={AllRequests?.[dataKey] ?? []}
      number_of_pages={number_of_pages}
      handlePagination={handlePagination}
      handleChange={handleChange}
      searchText={searchText}
    />
  );

  // (
  //   <>
  //     <HStack mb="24px" pr="2px" justify="end" w="full">
  //       <InputGroup w="fit-content" justifySelf="flex-end" alignSelf="flex-end">
  //         <InputRightElement pointerEvents="none">
  //           <Image src={searchIcon.src} alt="search icon" />
  //         </InputRightElement>
  //         <Input
  //           fontSize="14px"
  //           fontWeight="300"
  //           value={searchText}
  //           w="319px"
  //           h="43px"
  //           border="1px solid #E4E4E4"
  //           bg="#F5F5F5"
  //           color="#222222"
  //           borderRadius="12px"
  //           onChange={handleChange}
  //           placeholder="search"
  //           _placeholder={{
  //             color: '#606060',
  //             fontSize: '12px',
  //             fontWeight: '300',
  //           }}
  //         />
  //       </InputGroup>
  //     </HStack>
  //     <Box
  //       padding="0"
  //       border={isLoading && 'solid 1px #f4f4f4'}
  //       borderRadius={isLoading && '8px'}
  //       overflow={isLoading && 'hidden'}
  //       bg={isLoading && 'white'}
  //     >
  //       <SkeletonText
  //         isLoaded={!isLoading}
  //         skeletonHeight="60px"
  //         noOfLines={1}
  //         startColor="gray.300"
  //         endColor={'#F3F3F3'}
  //       />
  //       <SkeletonText
  //         isLoaded={!isLoading}
  //         mt="4"
  //         noOfLines={6}
  //         spacing="10px"
  //         skeletonHeight="20px"
  //         startColor="gray.300"
  //         endColor={'#F3F3F3'}
  //       >
  //         {!isLoading && (
  //           <MatadorCustomTable
  //             teams
  //             minW="full"
  //             forLimit={[limit, dataKey, router.query.status]}
  //             number_of_pages={number_of_pages}
  //             handlePagination={handlePagination}
  //             forMemo={[AllRequests, dataKey, router.query.status] ?? []}
  //             headerSpace="evenly"
  //             isManageAgentEmpty="There is no request at the moment"
  //             DATA={AllRequests?.[dataKey] ?? []}
  //             COLUMNS={COLUMN}
  //           />
  //         )}
  //       </SkeletonText>
  //     </Box>
  // </>
  // );
}
