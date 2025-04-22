import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import leftArrow from '/src/images/icons/leftArrow.svg';
import ClientDetails from '../components/clientDetails';
import AssigneesDetails from '../components/assigneeDetails';
import RatingAndFeedBacks from '../components/ratingAndFeedback';

export const InspectionDetails = ({
  handleScreen,
  customScrollbarStyles,
  inspectionDetails,
  refetch,
}) => {
  return (
    <>
      <HStack
        boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.02)"
        mb="20px"
        py="12px"
        bg="#F5F5F5"
        px="29px"
        justify="space-between"
        align="center"
        position="relative"
      >
        <HStack spacing="10px">
          <Image
            src={leftArrow.src}
            cursor="pointer"
            onClick={handleScreen('closedInspections')}
            alt="left arrow"
          />
          <Text fontSize="16px" fontWeight={600} color="#191919">
            Inspection Details
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

      <DrawerBody p="0" pr="19px" mr="2px" mb="10px" pl="29px" sx={customScrollbarStyles}>
        <Stack spacing="15px">
          {/* <ClientDetails info={inspectionDetails} /> */}
          <AssigneesDetails info={inspectionDetails} />
          {inspectionDetails?.user_feedback ? (
            <RatingAndFeedBacks refetch={refetch} info={inspectionDetails} />
          ) : null}
        </Stack>
      </DrawerBody>
    </>
  );
};

export default InspectionDetails;
