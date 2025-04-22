import {
  Box,
  HStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {LayoutView} from '../../components';
import {tabs} from '../../constants/settings/tabs';
import {fetchSettingsRequiredStatus} from '../../apis/settings';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {GoDotFill} from 'react-icons/go';
import useLocalStorage from 'utils/useLocalStorage';

export default function Settings() {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const [user] = useLocalStorage('loggedInUser');
  const [isCompleted, setisCompleted] = useState({
    Profile: true,
    Compliance: true,
    Teams: true,
    Account: true,
  });

  const queryClient = useQueryClient();

  const forTab = {
    isCompleted,
    setisCompleted: setisCompleted,
  };

  useEffect(() => {
    const updateProfile = async () => {
      await queryClient.refetchQueries(['dashboard', '']);
      const data = queryClient.getQueryData(['dashboard', '']);
      data &&
        localStorage.setItem('loggedinUser', JSON.stringify(data?.data?.dashboard_data?.user));
      return;
    };

    updateProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = index => {
    setTabIndex(index);
    router.query = {
      id: index,
      tabName: tabs[index].tablist,
    };
  };

  const {data: settingsStatus, isLoading} = useQuery(
    ['settingsStatus'],
    fetchSettingsRequiredStatus
  );

  useEffect(() => {
    setisCompleted({
      ...isCompleted,
      Profile: settingsStatus?.data?.profile,
      Compliance: settingsStatus?.data?.compliance,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsStatus]);

  return (
    <Box bg="#FAFAFA" minH="100vh" pb="20px">
      {/* <LayoutView initial_status={user?.initial_status} activePage="settings"> */}
      <LayoutView initial_status={user?.initial_status} activePage="settings" />
      <HStack
        alignItems={'flex-start'}
        gap={'23px'}
        mt="-93vh"
        maxW={{base: '1200px', '2xl': '85%'}}
        mx="auto"
        // mb="100px"

        w="100%"
        // px="10px"
        // h="100%"
        // minH="calc(100vh - 140px)"
        // backgroundColor={'white'}
        // transform={'translateY(-100%)'}
      >
        <Tabs
          variant="null"
          index={tabIndex}
          defaultIndex={0}
          onChange={handleTabChange}
          isFitted
          position="sticky"
          top={{base: '17vh', '2xl': '140px'}}
          // top={{base: '17vh'}}
          isLazy
          // width={{base: '20%', '2xl': '17.5%'}}
          w={{base: '258px', '2xl': '17.5%'}}
          minW={'258px'}
          direction="column"
          padding={0}
          mt={{base: '15vh', '2xl': '10vh'}}
          zIndex={9}
        >
          <TabList>
            <VStack
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05);"
              border="1px solid #EAECF0"
              borderRadius="8px"
              bg="#ffffff"
              w="full"
              justify="space-between"
              padding={0}
              gap={0}
            >
              {tabs.map((item, index) => (
                <Tab
                  p="10px 16px"
                  wordBreak="keep-all"
                  key={index}
                  _selected={{
                    fontWeight: '600',
                    background: '#F5F5F5',
                  }}
                  borderBottom={'1px solid #EAECF0'}
                  w={'100%'}
                  alignItems={'flex-start'}
                  justifyContent={'flex-start'}
                  color={'#344054'}
                >
                  <HStack alignItems={'center'} position="relative">
                    {index === tabIndex && <GoDotFill />}
                    <Text fontSize="18px" lineHeight={'20px'} whiteSpace="nowrap">
                      {item.tablist}
                    </Text>
                    {!isLoading && !isCompleted[item.tablist] && (
                      <Box
                        w="8px"
                        position="absolute"
                        right="-15px"
                        top="8px"
                        h="8px"
                        borderRadius="full"
                        bg="#FF9103"
                      ></Box>
                    )}
                  </HStack>
                </Tab>
              ))}
            </VStack>
          </TabList>
        </Tabs>
        <Tabs
          variant="null"
          defaultIndex={0}
          index={tabIndex}
          onChange={handleTabChange}
          isFitted
          mt={{base: '17vh', '2xl': '8vh'}}
          // mt={'0px'}
          align="center"
          position="relative"
          isLazy
          width={'100%'}
          direction="column"
        >
          <div style={{width: '100%'}}>
            {/* <TabPanels maxW={'75%'} marginLeft={{base: '27.5%', '2xl': '25%'}}> */}
            <TabPanels>
              {tabs.map((item, index) => (
                <TabPanel position="relative" minH="fit-content" pt={0} key={index} px="0px">
                  {item.component(forTab)}
                </TabPanel>
              ))}
            </TabPanels>
          </div>
        </Tabs>
      </HStack>
      {/* </LayoutView> */}
    </Box>
  );
}
