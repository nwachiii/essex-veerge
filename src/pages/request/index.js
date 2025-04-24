import {
  Box,
  Image,
  HStack,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Button,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {LayoutView} from '../../components';
import {tabs} from '../../constants/request/tabs';
import history_timer_icon from '/src/images/icons/request_history_icon.svg';
import backButton from '/src/images/icons/backButton.svg';

import {useRouter} from 'next/router';

export default function Request() {
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();
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
                  {tabs.map((item, idx) => (
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

                        {tabs[idx]?.countNo ? (
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
                              {tabs[idx]?.countNo}
                            </Text>
                          </HStack>
                        ) : null}
                      </HStack>
                    </HStack>
                  ))}
                </Stack>
              </Stack>

              <Box flex={`1`}>
                <Tabs variant="null" onChange={tabSwitched} isFitted spacing="none" w={`100%`}>
                  <Box padding="0">
                    <TabPanels>
                      <Box w="full" h="full">
                        <TabPanel w="full" py="0" px="0px">
                          {tabs[tabIndex]?.component(() => {}, false, false)}
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
