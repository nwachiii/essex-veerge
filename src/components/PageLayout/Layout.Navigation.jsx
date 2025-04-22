import {useRouter} from 'next/router';
import {GlobalSearch} from '../Search';
import {useQuery} from '@tanstack/react-query';
import React, {useState, useEffect} from 'react';
import {fetchListings} from '../../apis/listings';
import {dashboardTabs} from '../../constants/common';
import {fetchAllCustomers} from '../../apis/customers';
import {
  Box,
  HStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  ButtonGroup,
  Progress,
  ScaleFade,
  Image,
  Center,
  Flex,
} from '@chakra-ui/react';
import {fetchSuggestionsData} from 'apis/veerge_menu';

export function LayoutNavigation({
  manageroles,
  tabPanelStyle,
  activePage,
  children,
  isPending,
  ...restProps
}) {
  const router = useRouter();
  const [activeLocation, setActiveLocation] = useState('');

  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const activeLink = activePage && activePage.toLowerCase();
    router.pathname.indexOf(activeLink) === -1
      ? setActiveLocation('false')
      : setActiveLocation(activeLink.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);
  const {data} = useQuery(['customers', 'listings'], fetchSuggestionsData);

  const handleNav = (linkText, e) => {
    const link = linkText?.toLowerCase();
    e.stopPropagation();
    if (link === router.pathname.replace('/', '')) return;
    if (link === 'settings') return;
    !isPending && router.push(`/${link}`);
    if (link == 'dashboard') {
      router.push(`/${link}`);
    }
  };
  const CUSTOMER_DATA = data?.data?.customers;
  const LISTING_DATA = data?.data?.listings;

  const PROPERTY_CUSTOMER_LIST = [LISTING_DATA?.concat(CUSTOMER_DATA)];

  return (
    <Box bg="#FAFAFA" color="#191919">
      <HStack spacing={8} alignItems={'center'} justify="center" w="100%">
        <Tabs w="full" variant="rounded" isFitted>
          <TabList
            align="center"
            h="52px"
            bg="#FFF"
            px={{base: `32px`, xl: '78px'}}
            position="fixed"
            zIndex={1400}
            w="full"
            top="3.6rem"
            boxShadow="0px 2px 32px 6px rgba(0,0,0,0.08)"
          >
            <Flex maxW="1500px" mx="auto" justify={'space-between'} w="full">
              {dashboardTabs.map((link, index) => {
                const LINK_TEXT = link.linkText.toLowerCase();
                const isActive = activeLocation == LINK_TEXT;

                return (
                  <Tab
                    key={index}
                    h="66%"
                    mt="12px"
                    // my="auto"
                    borderRadius="lg"
                    onClick={e => handleNav(link.linkText, e)}
                    bg={isActive ? '#F5F5F5' : 'transparent'}
                  >
                    <ButtonGroup
                      cursor={isPending && LINK_TEXT !== 'dashboard' ? 'not-allowed' : 'pointer'}
                      isAttached
                      variant="outline"
                    >
                      <Center
                        fontSize="14px"
                        variant="ghost"
                        color={isActive ? '#191919' : '#606060'}
                        fontWeight={
                          isActive ? 500 : isPending && LINK_TEXT !== 'dashboard' ? 300 : 400
                        }
                        opacity={isPending && LINK_TEXT !== 'dashboard' ? 0.5 : 1}
                      >
                        <Image
                          alt=""
                          alignSelf="center"
                          boxSize={'20px'}
                          src={isActive ? link.dark_iconSrc.src : link.iconSrc.src}
                          mr="5px"
                        />
                        {link.linkText}
                      </Center>
                    </ButtonGroup>
                  </Tab>
                );
              })}
              {PROPERTY_CUSTOMER_LIST && PROPERTY_CUSTOMER_LIST?.length && (
                <GlobalSearch
                  isPending={isPending}
                  propertyAndCustomerList={PROPERTY_CUSTOMER_LIST[0]}
                />
              )}
            </Flex>
          </TabList>
          {showProgress && !restProps.hideProgressBarLoader && (
            <Progress
              w="full"
              size="xs"
              left={'0'}
              colorScheme="gray"
              top="6.94rem"
              position="fixed"
              isIndeterminate
              zIndex={'1300'}
            />
          )}
          <TabPanels top="12vh">
            <Box w="full" p="16px" bg="#FAFAFA" {...tabPanelStyle}>
              <Box
                bg="#FAFAFA"
                px={manageroles ? '48px' : '78px'}
                py="28px"
                pb="30px"
                mx="auto"
                maxW="max-content"
                minW={'100%'}
                {...restProps}
              >
                <ScaleFade mx="auto" key={router.route} initialScale={0.9} in="true">
                  {children}
                </ScaleFade>
              </Box>
            </Box>
          </TabPanels>
        </Tabs>
      </HStack>
    </Box>
  );
}
export default LayoutNavigation;
