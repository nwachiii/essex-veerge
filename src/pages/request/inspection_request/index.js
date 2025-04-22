import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import {useQuery} from '@tanstack/react-query';

import {Center, Stack} from '@chakra-ui/react';

import {fetchTeammember} from '../../../apis/settings';
import RequestInfoWrapper from '@/components/request/requestInfoWrapper';
import InspectionHistoryComponent from '@/components/request/inspection/inspectionHistoryComponent';
import PendingInspectionComponent from '@/components/request/inspection/inspectionComponent';

import {AnimatedLoader} from '@/components/index';

export default function InspectionRequest({AllRequests, refetch, isLoading, isError}) {
  const [limit, setLimit] = useState(10);
  const router = useRouter();

  const routeQueries = router.query;

  const defaultSearchValue =
    router?.query?.status === 'history' ? (routeQueries?.hiq ?? '') : (routeQueries?.iq ?? '');

  const [searchText, setSearchText] = useState(defaultSearchValue);

  useEffect(() => {
    setSearchText(defaultSearchValue);
  }, [router.query.status, defaultSearchValue]);

  const handleChange = e => {
    setSearchText(e.target.value);
  };

  const setSearctTextAsQuery = () => {
    let obj = {};
    if (router?.query?.status === 'history' && searchText) {
      obj = {
        hiq: searchText,
      };
      return obj;
    } else if (searchText) {
      obj = {
        iq: searchText,
      };
      return obj;
    } else {
      return;
    }
  };

  const dataKey =
    router?.query?.status === 'history' ? 'Inspection_requests_closed' : 'Inspection_requests';
  const countKey =
    router?.query?.status === 'history' ? 'count_closed_inspection' : 'count_inspection';

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
      searchText ? null : delete mergedQuery?.[router?.query?.status === 'history' ? 'hiq' : 'iq'];
      router.push({
        pathname: router.pathname,
        query: mergedQuery,
      });
    }, 800);
    return () => clearTimeout(timed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const {data: roleData, isError: roleHasError} = useQuery(['fetchAcceptedRoles'], fetchTeammember);

  const roles = roleData?.data?.data;

  // const COLUMN =
  //   router.query.status === 'history'
  //     ? INSPECTION_REQUEST_COLUMNS_HISTORY(refetch, roles)
  //     : INSPECTION_REQUEST_COLUMNS(refetch, roles);

  const REQUESTCOMPONENT = info =>
    router.query.status === 'history' ? (
      <InspectionHistoryComponent info={info} roles={roles} refetch={refetch} />
    ) : (
      <PendingInspectionComponent info={info} roles={roles} refetch={refetch} />
    );

  const header =
    router.query.status === 'history'
      ? 'Inspection History'
      : ~~AllRequests?.[countKey]
        ? `${~~AllRequests?.[countKey]} Pending Inspection${~~AllRequests?.[countKey] > 1 ? 's' : ''}`
        : '';

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
  //  (
  //   <Box w="full" spacing="none">
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
  //             forLimit={[limit, dataKey, router.query?.status]}
  //             forMemo={[AllRequests, AllRequests?.[dataKey], dataKey, router.query?.status] ?? []}
  //             number_of_pages={number_of_pages}
  //             handlePagination={handlePagination}
  //             minW="full"
  //             headerSpace="evenly"
  //             isManageAgentEmpty="There is no request at the moment"
  //             DATA={AllRequests?.[dataKey] ?? []}
  //             COLUMNS={COLUMN}
  //           />
  //         )}
  //       </SkeletonText>
  //     </Box>
  //   </Box>
  // );
}
