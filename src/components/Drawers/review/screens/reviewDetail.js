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

import RatingAndFeedBacks from '../components/ratingAndFeedback';
import leftArrow from '/src/images/icons/leftArrow.svg';

export const ReviewDetail = ({
  info,
  screen,
  handleScreen,
  refetch,
  isLoading,
  isError,
  customScrollbarStyles,
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
          <Image
            src={leftArrow.src}
            cursor="pointer"
            onClick={() => handleScreen('reviews')}
            alt="left arrow"
          />
          <Text fontSize="20px" fontWeight={600} color="#191919">
            Review
          </Text>
        </HStack>

        <HStack spacing="14px">
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
      <DrawerBody sx={customScrollbarStyles} px="24px" py="20.2px" mr="2px">
        <RatingAndFeedBacks
          refetch={refetch}
          info={info}
          customScrollbarStyles={customScrollbarStyles}
          handleScreen={handleScreen}
          screen={screen}
        />
      </DrawerBody>
    </>
  );
};

export default ReviewDetail;
