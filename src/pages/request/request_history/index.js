import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {
  Box,
  Heading,
  HStack,
  Image,
  SkeletonText,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import emptyIcon from '/src/images/icons/emptyIcon.png';

import {themeStyles} from '../../../theme';
import {LayoutView} from '../../../components';
import backArrow from '../../../images/icons/back-arrow.png';
import {HistoryTabs} from '../../../constants/request/request_history/History.tabs';
import {fetchAllRequests} from '../../../apis/requests';
import {useQuery} from '@tanstack/react-query';
import {toastForError} from '../../../utils/toastForErrors';

export default function RequestHistory() {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const toast = useToast();

  const handleBack = () => {
    router.back(-1);
  };

  const {
    data: allRequests,
    isError,
    isLoading,
    error,
  } = useQuery(['requests-dashboard', 'history'], () => fetchAllRequests('history'));

  // isError &&
  //   toast({
  //     title: "An error occured",
  //     description: `${error?.code} : ${error?.message}`,
  //     status: "error",
  //     duration: 8000,
  //     isClosable: true,
  //     position: "top-right",
  //   });
  const ALL_REQUESTS = allRequests && allRequests?.data?.message;

  toastForError(error, isError, toast);

  return (
    <Box position="relative" bg="#FAFAFA" w="full">
      <LayoutView activePage={'request'} />
      <HStack
        // mt="10vh"
        mt="-84vh"
        overflow="auto"
        mx="auto"
        maxW={'1285px'}
        // w="1232px"
        className="main-app"
      >
        <Image
          onClick={handleBack}
          style={{cursor: 'pointer'}}
          mr={2}
          height="50px"
          src={backArrow.src}
          alt="back_arrow"
        />
        <Heading {...themeStyles.textStyles.h3} fontWeight={'600'}>
          Request History
        </Heading>
      </HStack>
      <Box
        mt="36px"
        maxW={'1285px'}
        w="1232px"
        mx="auto"
        pb={4}
        align="center"
        className="main-app"
      >
        <Tabs
          variant="null"
          onChange={index => setTabIndex(index)}
          isFitted
          spacing="none"
          defaultIndex={0}
        >
          <TabList
            // {...themeStyles.containerStyles}
            maxW="1284px"
            // px="26px"
            // h="82px"
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
            >
              {HistoryTabs.map((item, index) => (
                <Tab
                  key={index}
                  maxW="34px"
                  w="34px"
                  wordBreak="keep-all"
                  position="relative"
                  whiteSpace="nowrap"
                  fontSize="18px"
                  fontWeight="400"
                  color="#919191"
                  _selected={{
                    color: `${themeStyles.color.primary}`,
                    fontWeight: '600',
                    border: 'none',
                  }}
                >
                  {item.tablist}{' '}
                  {/* {tabIndex == index && (
                    <Box
                      mx="auto"
                      h="6px"
                      mt={2}
                      w="34px"
                      borderRadius="27px"
                      bg={themeStyles.color.primary}
                    />
                  )} */}
                  <Text
                    position="relative"
                    right="-10px"
                    fontSize="18px"
                    fontWeight="400"
                    color="#919191"
                    pr="10px"
                  >
                    {ALL_REQUESTS?.[item?.countName]?.length || ''}
                  </Text>
                </Tab>
              ))}
            </HStack>
          </TabList>
          <TabIndicator mt="-20px" height="6px" minW="34px" bg="#4545FE" borderRadius="27px" />
          {isError ? (
            <></>
          ) : (
            <Box
              padding="0"
              mt={isLoading && '16px'}
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
                startColor="gray.300"
                endColor={'#F3F3F3'}
                isLoaded={!isLoading}
                mt="4"
                noOfLines={6}
                spacing="10px"
                skeletonHeight="20px"
              >
                <TabPanels>
                  {HistoryTabs.map((item, index) => (
                    <Box key={index} w="full" h="full">
                      {item?.component ? (
                        <TabPanel w="full" py="0" px="0px" key={index}>
                          {item?.component}
                        </TabPanel>
                      ) : (
                        <VStack spacing={8} mx="auto" w="full" h="full" py="100px">
                          {/* <ImFilesEmpty
                                style={{
                                  height: "70px",
                                  width: "75px",
                                  color: "#606060",
                                }}
                              /> */}
                          <Image alt="empty table icon" src={emptyIcon.src} />
                          <Text w="full" textAlign="center" fontSize="1em" mx="auto">
                            {` Oops! you don't have any data yet...`}
                          </Text>
                        </VStack>
                      )}
                    </Box>
                  ))}
                </TabPanels>
              </SkeletonText>
            </Box>
          )}
        </Tabs>
      </Box>
      {/* </LayoutView> */}
    </Box>
  );
}
