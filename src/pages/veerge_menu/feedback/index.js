import React, {useState} from 'react';
import {useRouter} from 'next/router';
import SortBy from '../../../components/SortBy';
import {useQuery} from '@tanstack/react-query';
import {fetchFeedBack} from '../../../apis/veerge_menu';
import {FEEDBACK_COLUMN} from '../../../constants/feedback';
import {toastForError} from '../../../utils/toastForErrors';
import {FilterForFeedBack} from '../../../components/feedback/FilterForFeedBack';
import {AnimatedLoader, LayoutView} from '../../../components';
import {TableForFeedBack} from '../../../components/common/Table/TableForFeedBack';
import {Box, HStack, VStack, useToast, Heading} from '@chakra-ui/react';

const FeedBack = () => {
  const [limit, setLimit] = useState(10);
  const router = useRouter();
  const routeQueries = router.query;

  const convertToApiQuery = () => {
    return `${Object.entries(routeQueries)
      .map(item => (item?.[0] === 'filter' ? `${item?.[1]}` : `${item?.[0]}=${item?.[1]}`))
      .join('&')}`;
  };

  const param = convertToApiQuery();

  const {data, isError, isLoading, error} = useQuery(['feedback_', param], () =>
    fetchFeedBack(param)
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

  const number_of_pages = Math.ceil(~~data?.data?.count / ~~limit);

  const toast = useToast();

  const feedbackData = data?.data?.message;

  toastForError(error, isError, toast);

  const sort_params = [
    'Oldest to Latest',
    'Latest to Oldest',
    'Highest rating to lowest',
    'Lowest rating to highest',
  ];
  return (
    <Box position="relative" bg="#FAFAFA" w="full">
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage="request"
      >
        <Box
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          mx="auto"
        >
          <HStack mb="24px" justify="space-between" w="full">
            <Heading fontSize="32px" fontWeight="700">
              Feedback
            </Heading>
            <HStack spacing="20px">
              <FilterForFeedBack />
              <SortBy
                defaultSortValue="latest_to_oldest"
                sortFor="listing"
                sort_params={sort_params}
                _active={{
                  background: 'transparent',
                }}
                _hover={{
                  background: 'transparent',
                }}
                _focus={{background: 'transparent'}}
              />
            </HStack>
          </HStack>
          {isLoading ? (
            <VStack h="50vh" align="center" justify={'center'}>
              <AnimatedLoader />
            </VStack>
          ) : isError ? (
            <></>
          ) : (
            <TableForFeedBack
              minW="full"
              forMemo={[router]}
              headerSpace="evenly"
              forLimit={[limit, router]}
              number_of_pages={number_of_pages}
              handlePagination={handlePagination}
              isManageAgentEmpty="There is no feedback yet"
              DATA={feedbackData}
              COLUMNS={FEEDBACK_COLUMN}
            />
          )}
        </Box>
      </LayoutView>
    </Box>
  );
};
export default FeedBack;
