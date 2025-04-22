import {Box, SkeletonText, useToast} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {fetchAllRequests} from '../../../apis/requests';
import {AnimatedLoader} from '../../../components';
import {MatadorCustomTable} from '../../../components/common/Table';
import {DEED_REQUEST_COLUMN, DEED_REQUEST_DATA} from '../../../constants/request/DeedRequestData';
import {
  DEED_REQUEST_COLUMN_HISTORY,
  DEED_REQUEST_DATA_HISTORY,
} from '../../../constants/request/request_history/History.DeedRequestData';

export default function DeedRequest() {
  const router = useRouter();
  const toast = useToast();

  const [searchText, setText] = useState('');
  const [deedData, setDeedData] = useState([]);
  const [filteredDeedData, setFilteredDeedData] = useState([]);

  const param = router.route.slice(-7) === 'history' ? 'history' : 'dashboard';
  console.log(param);
  const {
    data: allRequests,
    isError,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useQuery([`requests-${param}`, param], () => fetchAllRequests(param));

  const ALL_REQUESTS = allRequests && allRequests?.data?.message?.deed_requests;

  console.log('deed', ALL_REQUESTS, isLoading, isError);

  useEffect(() => {
    console.log(allRequests?.data?.message?.deed_requests ?? []);
    setDeedData(allRequests?.data?.message?.deed_requests ?? []);

    setFilteredDeedData(allRequests?.data?.message?.deed_requests ?? []);
  }, [allRequests]);

  const handInput = e => {
    const searchQuery = e.target.value;
    setText(searchQuery);

    const filtered = deedData.filter((item, idx) => {
      const name = `${item?.owner.first_name} ${item?.owner.last_name}`;
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredDeedData(filtered);
  };

  if (isError) {
    toast({
      title: 'An error occured',
      description: `${error?.code} : ${error?.message}`,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  }

  return (
    <div>
      {isError ? (
        <></>
      ) : router.route.slice(-7) === 'history' ? (
        <Box
          padding="0"
          border={isLoading && 'solid 1px #f4f4f4'}
          borderRadius={isLoading && '8px'}
          overflow={isLoading && 'hidden'}
          bg={isLoading && 'white'}
        >
          <SkeletonText
            isLoaded={!isLoading}
            skeletonHeight="60px"
            noOfLines={1}
            startColor="gray.300"
            endColor={'#F3F3F3'}
          />
          <SkeletonText
            isLoaded={!isLoading}
            mt="4"
            noOfLines={6}
            spacing="10px"
            skeletonHeight="20px"
            startColor="gray.300"
            endColor={'#F3F3F3'}
          >
            {!isLoading && (
              <MatadorCustomTable
                minW="full"
                handInput={handInput}
                teams
                searchText={searchText}
                request
                forMemo={filteredDeedData}
                headerSpace="evenly"
                isManageAgentEmpty="There is no request at the moment"
                DATA={filteredDeedData ?? []}
                COLUMNS={DEED_REQUEST_COLUMN_HISTORY}
              />
            )}
          </SkeletonText>
        </Box>
      ) : (
        <Box
          padding="0"
          border={isLoading && 'solid 1px #f4f4f4'}
          borderRadius={isLoading && '8px'}
          overflow={isLoading && 'hidden'}
          bg={isLoading && 'white'}
        >
          <SkeletonText
            isLoaded={!isLoading}
            skeletonHeight="60px"
            noOfLines={1}
            startColor="gray.300"
            endColor={'#F3F3F3'}
          />
          <SkeletonText
            isLoaded={!isLoading}
            mt="4"
            noOfLines={6}
            spacing="10px"
            skeletonHeight="20px"
            startColor="gray.300"
            endColor={'#F3F3F3'}
          >
            {!isLoading && (
              <MatadorCustomTable
                minW="full"
                handInput={handInput}
                teams
                searchText={searchText}
                request
                forMemo={filteredDeedData}
                headerSpace="evenly"
                isManageAgentEmpty="There is no request at the moment"
                DATA={filteredDeedData ?? []}
                COLUMNS={DEED_REQUEST_COLUMN(refetch)}
              />
            )}
          </SkeletonText>
        </Box>
      )}
      {/* <MatadorCustomTable DATA={[]} COLUMNS={DEED_REQUEST_COLUMN} /> */}
    </div>
  );
}
