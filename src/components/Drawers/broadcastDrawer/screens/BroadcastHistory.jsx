import {
  DrawerBody,
  HStack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import {broadcastTabs} from 'constants/veergeMenu/broadcastMenuOptions';
import {useState} from 'react';

export const BroadcastHistory = ({emailHistory, notifHistory}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = index => {
    setTabIndex(index);
  };

  const tabProps = {
    emailHistory,
    notifHistory,
    tabIndex,
  };

  return (
    <Tabs variant="null" onChange={handleTabChange} isFitted align="center" isLazy>
      <TabList
        bg="transparent"
        boxShadow="none"
        fontWeight="600"
        fontSize="18px"
        lineHeight="23px"
        color="lightgray"
        maxW="100%"
        py="0px"
      >
        <HStack
          borderBottom="0.5px solid #CBCBCB"
          borderRadius="0px"
          w="full"
          px="27px"
          justify="space-between"
          align="center"
        >
          {broadcastTabs.map((item, index) => (
            <Tab
              key={index}
              wordBreak="keep-all"
              w="fit-content"
              minW="fit-content"
              maxW="fit-content"
              pb="3px"
              pt="17px"
              color="rgba(25,25,25,0.6)"
              px="5.5px"
              _selected={{
                color: '#191919',
                border: 'none',
              }}
            >
              <Text w="fit-content" fontWeight="300" fontSize="12.826px" whiteSpace="nowrap">
                {item.tablist}
              </Text>
            </Tab>
          ))}
        </HStack>
      </TabList>
      <TabIndicator
        mt="-2px"
        height="4px"
        minW="min-content"
        w="fit-content"
        bg="#191919"
        borderRadius="27px"
      />
      <TabPanels h="80vh">
        {broadcastTabs.map((item, index) => (
          <TabPanel mt="10px" p="0px" key={index} h="full">
            {item.component(tabProps)}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
