import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Image,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import {archiveTabs} from '../../../../constants/archiveTabs';
import {useState} from 'react';
import {useRouter} from 'next/router';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';

export const HandleArchiving = ({
  customScrollbarStyles,
  unitInfo,
  refetch,
  handleScreen,
  handleMainScreen,
  archiveUnitModal,
  value,
  setValue,
  bundleId,
}) => {
  const tabProps = {
    refetch,
    unitInfo,
    value,
    setValue,
    handleScreen,
    bundleId,
    numberOfArchivedUnits: unitInfo?.total_archive,
    numberOfUnits: unitInfo?.quantity,
    archiveUnitModal,
  };

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = index => {
    setTabIndex(index);
  };
  return (
    <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="425px" bg="#fff" p="0px">
      <HStack
        py="12px"
        px="29px"
        bg="#F5F5F5"
        align="center"
        position="relative"
        justify="space-between"
        boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.02)"
      >
        <HStack>
          <Image
            alt="back icon"
            cursor="pointer"
            src={backIcon.src}
            onClick={() => handleMainScreen('options')}
          />
          <Text fontSize="20px" fontWeight={600} color="#191919">
            Archived Units
          </Text>
        </HStack>

        <HStack spacing="15px">
          <VStack
            position="relative"
            justify="center"
            align="center"
            w="30px"
            h="30px"
            borderRadius="5px"
            transition="0.3s ease-in-out"
            _hover={{
              width: '30px',
              height: '30px',
            }}
          >
            <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
          </VStack>
        </HStack>
      </HStack>
      <Tabs variant="null" onChange={handleTabChange} isFitted align="center" isLazy>
        <TabList
          bg="transparent"
          boxShadow="none"
          fontWeight="600"
          fontSize="18px"
          lineHeight="23px"
          color="lightgray"
          maxW="100%"
          px="17px"
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
            {archiveTabs.map((item, index) => (
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
        <TabPanels sx={customScrollbarStyles} overflow="auto">
          {archiveTabs.map((item, index) => (
            <TabPanel key={index} px="27px" h="full">
              <DrawerBody p="0">{item.component(tabProps)}</DrawerBody>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </DrawerContent>
  );
};

export default HandleArchiving;
