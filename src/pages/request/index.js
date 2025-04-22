import {
  Box,
  Image,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  Button,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {LayoutView} from '../../components';
import {tabs} from '../../constants/request/tabs';
import {useQuery} from '@tanstack/react-query';
import history_timer_icon from '/src/images/icons/request_history_icon.svg';
import backButton from '/src/images/icons/backButton.svg';

import {fetchAllRequests} from '../../apis/requests';
import {useRouter} from 'next/router';
import {toastForError} from '../../utils/toastForErrors';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';

export default function Request() {
  const [tabIndex, setTabIndex] = useState(0);
  const toast = useToast();
  const router = useRouter();
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();
  const routeQueries = router.query;

  const mergedQuery = status => ({
    ...routeQueries,
    page: 1,
    status,
  });

  const tabSwitched = index => {
    setTabIndex(index);
  };

  useEffect(() => {
    const defaultQuery = {
      page: `1`,
    };

    const mergedQuery = {
      ...router.query,
      ...defaultQuery,
    };
    router.push({
      pathname: router.pathname,
      query: mergedQuery,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex]);

  const tabParamObj = [
    {
      search: router?.query?.status === 'history' ? router?.query?.hiq : router?.query?.iq,
      searchKey:
        router?.query?.status === 'history' ? 'closed_inspection_search' : 'inspection_search',
      countName:
        router?.query?.status === 'history' ? 'count_closed_inspection' : 'count_inspection',
      page: router?.query?.status === 'history' ? 'page_closed_inspection' : 'page_inspection',
    },
    {
      search: router?.query?.status === 'history' ? router?.query?.haq : router?.query?.aq,
      searchKey: router?.query?.status === 'history' ? 'closed_agent_search' : 'agent_search',

      countName: router?.query?.status === 'history' ? 'count_closed_agent' : 'count_agent',
      page: router?.query?.status === 'history' ? 'page_closed_agent' : 'page_agent',
    },
    {
      search: router?.query?.status === 'history' ? router?.query?.hcq : router?.query?.cq,
      searchKey:
        router?.query?.status === 'history' ? 'closed_commission_search' : 'commission_search',

      countName:
        router?.query?.status === 'history' ? 'count_closed_commissions' : 'count_commissions',
      page: router?.query?.status === 'history' ? 'page_closed_commission' : 'page_commission',
    },
  ];

  const convertToApiQuery = () => {
    const params = new URLSearchParams();

    for (const key in routeQueries) {
      if (routeQueries.hasOwnProperty(key)) {
        if (
          key === 'iq' ||
          key === 'hiq' ||
          key === 'aq' ||
          key === 'haq' ||
          key === 'cq' ||
          key === 'hcq'
        ) {
        } else if (key === 'status') {
        } else if (key === 'page') {
        } else {
          params.append(key, routeQueries[key]);
        }
      }
    }
    //include current tab's search
    tabParamObj[tabIndex]?.search
      ? params.append(tabParamObj[tabIndex]?.searchKey, tabParamObj[tabIndex]?.search)
      : null;

    //set active tab's page query
    routeQueries?.page && routeQueries?.page !== '1' // check if theres a page query or if its not on page 1 (the default page is 1)
      ? params.append(tabParamObj[tabIndex]?.page, routeQueries?.page)
      : null;
    return `${'dashboard'}${params ? '?' : ''}${params}`;
  };

  const param = convertToApiQuery();
  // 'dashboard';

  const {
    data: allRequests,
    isError,
    isLoading,
    refetch,
    error,
  } = useQuery([`requests-${param}`, param], () => fetchAllRequests(param));

  const ALL_REQUESTS = allRequests && allRequests?.data?.message;

  toastForError(error, isError, toast);

  return (
    <Box
      position="relative"
      bg="#FAFAFA"
      w="full"
      // h={isSmallerLaptop ? '60vh' : ''}

      minH="100vh"
    >
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage="request"
        bg="#FAFAFA"
      >
        <Box
          // mx="auto"
          // maxW={'1285px'}
          // className="main-app"
          // mt={`calc(-100vh + 115px)`}
          // px={{base: `32px`}}
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          h="full"
          mx="auto"
        >
          <Box align="center" pb={8} h="full">
            <HStack gap={{base: `18px`}} w="full" position="relative" align="start">
              <Stack
                spacing="10px"
                position="sticky"
                top={`calc(44px + clamp(52px,calc(11.4vh + 40px),96px))`}
              >
                <Box py="10px" w="fit-content">
                  {router?.query?.status === 'history' ? (
                    <Link
                      prefetch={false}
                      href={{pathname: '/request', query: mergedQuery('dashboard')}}
                    >
                      <Button
                        leftIcon={<Image src={backButton.src} alt="history icon" />}
                        fontSize="16px"
                        fontWeight="500"
                        iconSpacing="8px"
                        color="#475467"
                        _hover={{bg: 'transparent'}}
                        _active={{bg: 'transparent'}}
                        _focus={{bg: 'transparent'}}
                        p="0px"
                        h="fit-content"
                        variant="ghost"
                      >
                        Back
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      prefetch={false}
                      href={{pathname: '/request', query: mergedQuery('history')}}
                    >
                      <Button
                        mx="16px"
                        leftIcon={
                          <Image src={history_timer_icon.src} alt="history icon" boxSize="18px" />
                        }
                        fontSize="14px"
                        iconSpacing="8px"
                        _hover={{bg: 'transparent'}}
                        _active={{bg: 'transparent'}}
                        _focus={{bg: 'transparent'}}
                        fontWeight="500"
                        p="0px"
                        h="fit-content"
                        color="#4545FE"
                        variant="ghost"
                      >
                        Request History
                      </Button>
                    </Link>
                  )}
                </Box>

                <Stack
                  as="ul"
                  spacing="none"
                  py="0px"
                  overflow="hidden"
                  px="0px"
                  w="258px"
                  borderRadius="8px"
                  border="1px solid #EAECF0"
                  boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                  divider={<StackDivider my="0px" />}
                >
                  {tabs.map((item, idx) => {
                    return (ALL_REQUESTS?.[tabParamObj[idx]?.countName] &&
                      item.tablist != 'Listing Inspection') ||
                      item.tablist === 'Listing Inspection' ? (
                      <HStack
                        cursor="pointer"
                        spacing="8px"
                        px="16px"
                        onClick={() => tabSwitched(idx)}
                        py="10px"
                        bg={idx === tabIndex ? '#F5F5F5' : ''}
                      >
                        {idx === tabIndex ? (
                          <Box boxSize="10px" borderRadius="full" bg="#191919" />
                        ) : null}
                        <HStack position="relative">
                          <Text
                            as="li"
                            fontSize="14px"
                            color={idx === tabIndex ? '#191919' : '#344054'}
                            fontWeight={idx === tabIndex ? '600' : '400'}
                          >
                            {item.tablist}
                          </Text>
                          {ALL_REQUESTS?.[tabParamObj[idx]?.countName] ? (
                            <HStack
                              justify="center"
                              position="absolute"
                              left="104%"
                              borderRadius="full"
                              bg={tabIndex === idx ? '#242526' : 'rgba(145, 145, 145, 0.1)'}
                              minH="20px"
                              minW="20px"
                              boxSizing="border-box"
                              py="2.5px"
                              align="center"
                              px="3.67px"
                            >
                              <Text
                                fontSize="11.667px"
                                lineHeight="20px"
                                minW="20px"
                                fontWeight="400"
                                color={tabIndex === idx ? '#fff' : '#919191'}

                                // pr="10px"
                              >
                                {ALL_REQUESTS?.[tabParamObj[idx]?.countName]}
                              </Text>
                            </HStack>
                          ) : null}
                        </HStack>
                      </HStack>
                    ) : null;
                  })}
                </Stack>
              </Stack>

              <Box flex={`1`}>
                <Tabs variant="null" onChange={tabSwitched} isFitted spacing="none" w={`100%`}>
                  <TabList
                    flex={`1`}
                    maxW="1284px"
                    fontWeight="light"
                    boxShadow="none"
                    color="#3D3D3D"
                  >
                    <HStack
                      border="none"
                      h="82px"
                      borderTopRadius="10px"
                      pt="23px"
                      pb="26px"
                      bg="#ffffff"
                      px="100px"
                      w="full"
                      justify="space-between"
                      hidden={true}
                    >
                      {tabs.map((item, index) => (
                        <Tab
                          key={index}
                          maxW="34px"
                          w="34px"
                          position="relative"
                          fontSize="18px"
                          fontWeight="400"
                          wordBreak="keep-all"
                          whiteSpace="nowrap"
                          color="#919191"
                          hidden={true}
                          _selected={{
                            color: `#191919`,
                            fontWeight: '600',
                            border: 'none',
                          }}
                        >
                          <HStack position="relative">
                            <Text>{item.tablist}</Text>
                            {ALL_REQUESTS?.[tabParamObj[index]?.countName] ? (
                              <HStack
                                justify="center"
                                position="absolute"
                                left="104%"
                                borderRadius="full"
                                bg={tabIndex === index ? '#242526' : 'rgba(145, 145, 145, 0.1)'}
                                minH="30px"
                                minW="30px"
                                boxSizing="border-box"
                                py="3px"
                                px="8px"
                              >
                                <Text
                                  fontSize="14px"
                                  lineHeight="14px"
                                  fontWeight="400"
                                  color={tabIndex === index ? '#fff' : '#919191'}

                                  // pr="10px"
                                >
                                  {ALL_REQUESTS?.[tabParamObj[index]?.countName]}
                                </Text>
                              </HStack>
                            ) : (
                              ''
                            )}
                          </HStack>
                        </Tab>
                      ))}
                    </HStack>
                  </TabList>
                  <Box padding="0">
                    <TabPanels>
                      <Box w="full" h="full">
                        <TabPanel w="full" py="0" px="0px">
                          {tabs[tabIndex]?.component(ALL_REQUESTS, refetch, isLoading, isError)}
                        </TabPanel>
                      </Box>
                    </TabPanels>
                  </Box>
                </Tabs>
              </Box>
            </HStack>
          </Box>
        </Box>
      </LayoutView>
    </Box>
  );
}
