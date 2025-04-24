import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import {useQuery} from '@tanstack/react-query';

import {Center, Stack} from '@chakra-ui/react';

import {fetchTeammember} from '../../../apis/settings';
import RequestInfoWrapper from '@/components/request/requestInfoWrapper';
import InspectionHistoryComponent from '@/components/request/inspection/inspectionHistoryComponent';
import PendingInspectionComponent from '@/components/request/inspection/inspectionComponent';

import {AnimatedLoader} from '@/components/index';

export default function InspectionRequest({AllRequests, dataKey, refetch, header}) {
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
      <PendingInspectionComponent dataKey={dataKey} info={info} roles={roles} refetch={refetch} />
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

  const number_of_pages = Math.ceil(~~AllRequests?.[countKey] / ~~limit);

  return (
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
}
