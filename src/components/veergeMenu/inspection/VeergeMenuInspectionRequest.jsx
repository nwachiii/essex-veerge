import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import {useQuery} from '@tanstack/react-query';

import {Center, Spinner} from '@chakra-ui/react';

import {fetchTeammember} from '../../../apis/settings';
import RequestInfoWrapper from '@/components/request/requestInfoWrapper';
import {EmptyState} from '@/components/common/Table';
import {VeergeMenuInspectionComponent} from './components/VeergeMenuInspectionComponent';
import {AnimatedLoader} from '@/components/common/loaders';

export default function VeergeMenuInspectionRequest({response, refetch, isLoading, isError}) {
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

  // const dataKey =
  //   router?.query?.status === 'history' ? 'Inspection_requests_closed' : 'Inspection_requests';
  // const countKey =
  //   router?.query?.status === 'history' ? 'count_closed_inspection' : 'count_inspection';
  const dataKey = `data`;
  const countKey = `count`;

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

  const REQUESTCOMPONENT = info => (
    <VeergeMenuInspectionComponent
      refetch={refetch}
      info={info}
      history={router.query.status === 'Completed' ? true : false}
    />
  );

  const header =
    router.query.status === 'Completed'
      ? 'Inspection History'
      : ~~response?.[countKey]
        ? `${~~response?.[countKey]} Upcoming Inspection${~~response?.[countKey] === 1 ? '' : 's'}`
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

  const number_of_pages = Math.ceil(~~response?.[countKey] / ~~limit);

  return isError ? (
    <></>
  ) : isLoading ? (
    <Center minH={`60vh`}>
      {/* <Spinner /> */}
      <Center>
        <AnimatedLoader noAbsolute />
      </Center>
    </Center>
  ) : (
    <RequestInfoWrapper
      header={header}
      requestComponent={data => REQUESTCOMPONENT(data)}
      requestArray={response?.[dataKey] ?? []}
      number_of_pages={number_of_pages}
      handlePagination={handlePagination}
      handleChange={handleChange}
      searchText={searchText}
    />
  );
}
