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
  Spinner,
  Stack,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import leftArrow from '/src/images/icons/leftArrow.svg';

import historyIcon from '/src/images/icons/historyIcon.svg';
import sortIcon from '/src/images/icons/sortIconForInspectionListing.svg';
import sortIdentityIcon from '/src/images/icons/sortIdentifier.svg';
import emptyIcon from '/src/images/icons/emptyIcon.svg';

import InspectionHistoryComponent from '../components/inspectionHistoryComponent';
import FilterInspectionHistory from '../components/filter';

export const ListOfClosedInspection = ({
  setAddedParam,
  handleScreen,
  isLoading,
  isError,
  customScrollbarStyles,
  inspectiionList,
  setDetails,
}) => {
  return (
    <>
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
          <Text fontSize="16px" fontWeight={600} color="#191919">
            {'Inspection History'}
          </Text>
        </HStack>

        <HStack spacing="14px">
          <FilterInspectionHistory setAddedParam={setAddedParam} />

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
        {isLoading ? (
          <AbsoluteCenter>
            <Spinner />
          </AbsoluteCenter>
        ) : isError ? (
          <></>
        ) : (
          <Stack divider={<StackDivider borderColor="#F5F5F5" />} spacing="12px">
            {inspectiionList?.length ? (
              inspectiionList.map((item, idx) => {
                return (
                  <InspectionHistoryComponent
                    handleScreen={handleScreen}
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
                    <Heading fontSize="14px" fontWeight="700" mb="8px" color="#606060">
                      Nothing Found
                    </Heading>
                    <Text fontSize="14px" fontWeight="400" color="#606060">
                      No inspection history
                    </Text>
                  </VStack>
                </VStack>
              </AbsoluteCenter>
            )}
          </Stack>
        )}
      </DrawerBody>
    </>
  );
};

export default ListOfClosedInspection;
