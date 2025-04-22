import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import leftArrow from '/src/images/icons/leftArrow.svg';
import UpcomingAndHistoryComponent from '../components/upcomingAndHistoryComponent';
import historyIcon from '/src/images/icons/historyIcon.svg';
import sortIcon from '/src/images/icons/sortIconForInspectionListing.svg';
import sortIdentityIcon from '/src/images/icons/sortIdentifier.svg';
import emptyIcon from '/src/images/icons/emptyIcon.svg';

export const HistoryAndInspectionList = ({
  handleScreen,
  customScrollbarStyles,
  handleForMainScreen,
  forHistory,
  historyLength,
  inspectiionList,
  setDetails,
  sortValue,
  handleSortValue,
}) => {
  return (
    <DrawerContent
      position="relative"
      zIndex={100}
      mt="65.12px"
      // mt="112.12px"
      maxW="400px"
      bg="#fff"
      p="0px"
    >
      <HStack
        boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.02)"
        py="12px"
        bg="#F5F5F5"
        px="29px"
        justify="space-between"
        align="center"
        position="relative"
      >
        <HStack spacing="10px">
          {forHistory ? (
            <Image
              cursor="pointer"
              src={leftArrow.src}
              onClick={handleForMainScreen()}
              alt="left arrow"
            />
          ) : null}
          <Text fontSize="16px" fontWeight={600} color="#191919">
            {forHistory ? 'Inspection History' : 'Upcoming Inspection'}
          </Text>
        </HStack>

        <HStack spacing="20px">
          <HStack spacing="10.77px">
            <SortMenu sortValue={sortValue} handleSortValue={handleSortValue} />
            {forHistory || !historyLength ? null : (
              <HistoryMenu handleForMainScreen={handleForMainScreen} />
            )}
          </HStack>
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
      <DrawerBody sx={customScrollbarStyles} p="24px">
        <Stack gap="12px">
          {inspectiionList?.length ? (
            inspectiionList.map((item, idx) => {
              return (
                <UpcomingAndHistoryComponent
                  handleScreen={handleScreen()}
                  info={item}
                  key={idx}
                  setDetails={setDetails}
                />
              );
            })
          ) : (
            <AbsoluteCenter>
              <VStack spacing="14px">
                <Image src={emptyIcon.src} alt="emptyDocIcon" />
                <VStack spacing="none">
                  <Text fontSize={'20px'} mt="10px" color="#606060" fontWeight={'700'}>
                    Nothing Found
                  </Text>
                  <Text fontSize="14px" fontWeight="400" color="#606060">
                    No upcoming inspection
                  </Text>
                </VStack>
              </VStack>
            </AbsoluteCenter>
          )}
        </Stack>
      </DrawerBody>
    </DrawerContent>
  );
};

export default HistoryAndInspectionList;

const SortMenu = ({sortValue, handleSortValue}) => {
  const sortDisclosure = useDisclosure();
  const hoverDisclosure = useDisclosure();
  const defaultSortValue = 'latest_to_oldest';
  const sort_name = sortValue ?? defaultSortValue;
  const sort_params = [
    {param: 'latest_to_oldest', name: 'Latest to Oldest'},
    {param: 'oldest_to_latest', name: 'Oldest to Latest'},
  ];

  const clickForSort = e => {
    handleSortValue(e.target.name);
  };

  return (
    <Box position="relative">
      <Menu autoSelect={false} isOpen={hoverDisclosure.isOpen} onClose={hoverDisclosure.onClose}>
        <MenuButton
          position="absolute"
          right="0px"
          opacity="0"
          onClick={sortDisclosure.onOpen}
          p="0px"
          onMouseEnter={hoverDisclosure.onOpen}
          onMouseLeave={hoverDisclosure.onClose}
          w="fit-content"
          _hover={{
            background: 'transparent',
          }}
          bg="transparent"
          _focus={{background: 'transparent'}}
          _active={{
            background: 'transparent',
          }}
          as={Button}
        >
          <Image src={sortIcon.src} alt="sortIcon" />
        </MenuButton>
        <Menu autoSelect={false} isOpen={sortDisclosure.isOpen} onClose={sortDisclosure.onClose}>
          <MenuButton
            onClick={sortDisclosure.onOpen}
            p="0px"
            onMouseEnter={hoverDisclosure.onOpen}
            onMouseLeave={hoverDisclosure.onClose}
            w="fit-content"
            _hover={{
              background: 'transparent',
            }}
            bg="transparent"
            _focus={{background: 'transparent'}}
            _active={{
              background: 'transparent',
            }}
            as={Button}
          >
            <Image src={sortIcon.src} alt="sortIcon" />
          </MenuButton>
          <MenuList minW="fit-content" borderRadius="13.775px" padding="18px 0px">
            {sort_params.map((item, idx) => {
              return (
                <MenuItem
                  key={idx}
                  px="25px"
                  pl="12.9px"
                  name={item?.param}
                  onClick={clickForSort}
                  icon={
                    <Image
                      opacity={sort_name === item.param ? 1 : 0}
                      _hover={{background: '#EDF2F7'}}
                      // mr="10px"
                      h="11px"
                      src={sortIdentityIcon.src}
                      alt=" identifier for sort"
                    />
                  }
                  textAlign="start"
                >
                  {item.name}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
        <MenuList
          bg="#191919"
          minW="fit-content"
          borderRadius="3.624px"
          padding="7.8px 5.2px"
          mt="-8px"
        >
          <MenuItem
            m="0"
            fontSize="10.873px"
            fontWeight="400"
            color="#fff"
            p="0"
            bg="transparent"
            w="fit-content"
          >
            Sort by
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

const HistoryMenu = ({handleForMainScreen}) => {
  const hoverForHistoryDisclosure = useDisclosure();

  return (
    <Menu
      autoSelect={false}
      isOpen={hoverForHistoryDisclosure.isOpen}
      onClose={hoverForHistoryDisclosure.onClose}
    >
      <MenuButton
        onClick={handleForMainScreen('inspectionHistory')}
        p="0px"
        onMouseEnter={hoverForHistoryDisclosure.onOpen}
        onMouseLeave={hoverForHistoryDisclosure.onClose}
        w="fit-content"
        _hover={{
          background: 'transparent',
        }}
        bg="transparent"
        _focus={{background: 'transparent'}}
        _active={{
          background: 'transparent',
        }}
        as={Button}
      >
        <Image
          // onClick={handleForMainScreen("inspectionHistory")}
          src={historyIcon.src}
          alt="historyIcon"
        />
      </MenuButton>
      <MenuList
        bg="#191919"
        minW="fit-content"
        borderRadius="3.624px"
        padding="7.8px 5.2px"
        mt="-8px"
      >
        <MenuItem
          m="0"
          fontSize="10.873px"
          fontWeight="400"
          color="#fff"
          p="0"
          bg="transparent"
          w="fit-content"
        >
          History
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
