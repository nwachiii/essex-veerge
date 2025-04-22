import {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
// import {fetchAgentsInfo} from '../../../apis/manageAgent';
import TopHeader from './TopHeader';
import {AnimatedLoader, LayoutView} from '../../../components';
// import {MatadorCustomTable} from '../../../components/common/Table';
// import {AGENTS_COLUMN} from '../../../constants/agents';
import {
  useToast,
  Image,
  HStack,
  Heading,
  extendTheme,
  Box,
  SkeletonText,
  Center,
  Stack,
} from '@chakra-ui/react';
import {theme} from '../../../theme';
import backArrow from '/src/images/icons/back-arrow.png';
import expandIcon from '/src/images/icons/expand-icon.svg';
import collapseIcon from '/src/images/icons/collapse.png';
import downloadIcon from '/src/images/icons/download-icon.svg';
import {CSVLink} from 'react-csv';

import {useRouter} from 'next/router';
import {Button} from '../../../ui-lib/ui-lib.components';
import SortBy from '../../../components/SortBy';
import Filter from './filter';
import {toastForError} from '../../../utils/toastForErrors';
import MatadorCustomTable, {EmptyState} from '@/components/common/Table';
import {fetchAgentsInfo} from 'apis/manageAgent';
import {AGENTS_COLUMN} from 'constants/agents';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';

const styles = extendTheme({...theme});

export default function ManageAgents() {
  const [expand, setExpand] = useState(true);
  const [limit, setLimit] = useState(10);

  const [addedParam, setAddedParam] = useState({
    sort: '',
    filter: '',
    param: '',
  });

  const router = useRouter();

  const routeQueries = router.query;
  const currentPage = routeQueries?.page ?? '1';

  const convertToApiQuery = () => {
    return `${Object.entries(routeQueries)
      .map(item => (item?.[0] === 'filter' ? `${item?.[1]}` : `${item?.[0]}=${item?.[1]}`))
      .join('&')}`;
  };

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

  const handleExpand = () => {
    setExpand(!expand);
    setLimit(prev => (prev === 10 ? 20 : 10));
    const defaultQuery = {
      limit: limit === 10 ? 20 : 10,
      ...(limit === 10 ? {page: 1} : {}),
    };

    const mergedQuery = {
      ...router.query,
      ...defaultQuery,
    };
    router.push({
      pathname: router.pathname,
      query: mergedQuery,
    });
    expand == false && window.scrollTo(0, 0);
  };

  const handleBack = () => {
    router.back(-1);
  };

  const param = `${convertToApiQuery() ? '?' : ''}${convertToApiQuery()}`;
  const {data, isError, isLoading, refetch, error} = useQuery(['manageAgentss', param], () =>
    fetchAgentsInfo(param)
  );

  useEffect(() => {
    const fetch = async () => await refetch();
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  const toast = useToast();

  const sort_params = [
    'Latest to Oldest',
    'Oldest to Latest',
    'A-Z',
    'Z-A',
    'Highest to lowest unit sold',
    'Lowest to highest unit sold',
  ];

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: data[i].name,
          units_sold: data[i].listings_sold,
          phone: data[i].phone,
          email: data[i].email,
          date_added: data[i].sign_up_time,
        });
    }
    return result;
  };

  if (isError) {
    toastForError(error, isError, toast);
  }

  const number_of_pages = Math.ceil(~~data?.data?.total_object_count / ~~limit);
  const isTableValid = !isError && !!data?.data?.agent_list?.length;

  return (
    <LayoutView
      px={{base: '0px', xl: '30px'}}
      tabPanelStyle={{pb: '0px'}}
      pb="0px"
      activePage="users"
    >
      <Box
        mt="clamp(52px,calc(11.4vh + 40px),96px)"
        px={{base: '0px', xl: '30px'}}
        maxW="full"
        w="full"
        mx="auto"
      >
        <TopHeader
          isError={isError}
          data={{
            units_sold: data?.data?.total_units_sold,
            agent_num: data?.data?.total_number_of_agents,
          }}
          handleExpand={handleExpand}
          expand={expand}
        />
        {isError ? (
          <></>
        ) : isLoading ? (
          <Center h="100vh">
            <AnimatedLoader />
          </Center>
        ) : (
          <>
            <Stack my="24px" spacing="20px" justify="space-between" align="end">
              {!expand && (
                <HStack w="full" justify="space-between" align="end">
                  <HStack>
                    <Image
                      onClick={handleBack}
                      style={{cursor: 'pointer'}}
                      mr={2}
                      height="50px"
                      width="50px"
                      src={backArrow.src}
                      alt="back_arrow"
                    />
                    <Heading {...styles.textStyles.h3} fontSize="24px">
                      Agents
                    </Heading>
                  </HStack>
                </HStack>
              )}

              {!isError ? (
                <HStack justify="space-between" w="full" align="center">
                  <Heading fontSize="28px" fontWeight="600" lineHeight="24px" color="#191919">
                    Overview
                  </Heading>
                  <HStack spacing={{base: '15px', lg: 6}} align="center" h="48px">
                    <DownloadCsv
                      isTableValid={isTableValid}
                      data={getDataFromJSON(data?.data?.agent_list)}
                    />
                    {/* <Button h="48px" mb={3} variant="primary" onClick={handleExpand}>
                  <Image
                    alt=""
                    src={expand ? expandIcon.src : collapseIcon.src}
                    styles={{marginRight: '5px'}}
                    width="20px"
                  />{' '}
                  {expand ? 'Expand List' : 'collapse'}
                </Button> */}

                    <SortBy
                      menuStyles={{placement: 'auto-start'}}
                      url={addedParam}
                      setUrl={setAddedParam}
                      sortFor="manage_agent"
                      sort_params={sort_params}
                      defaultSortValue="highest_to_lowest_unit_sold"
                    />

                    <Filter url={addedParam} setUrl={setAddedParam} />
                  </HStack>
                </HStack>
              ) : null}
            </Stack>

            {!isLoading && !isError ? (
              <MatadorCustomTable
                headerSpace="evenly"
                minW="full"
                forMemo={[router]}
                expanded={expand}
                COLUMNS={AGENTS_COLUMN}
                forLimit={[limit, router]}
                handleExpand={handleExpand}
                DATA={data?.data?.agent_list}
                number_of_pages={number_of_pages}
                handlePagination={handlePagination}
                isManageAgentEmpty="Looks like no one has been added yet"
              />
            ) : null}
          </>
        )}
      </Box>
    </LayoutView>
  );
}
