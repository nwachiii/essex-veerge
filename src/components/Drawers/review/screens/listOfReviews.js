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

import emptyIcon from '/src/images/icons/emptyIcon.svg';

import RatingAndFeedBacks from '../components/ratingAndFeedback';

export const ListOfReviews = ({
  info,
  screen,
  handleScreen,
  setFeedbackDetailId,
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
        {isLoading ? (
          <AbsoluteCenter>
            <Spinner />
          </AbsoluteCenter>
        ) : isError ? (
          <></>
        ) : (
          <Stack spacing="24px" pt="4px">
            {info?.length ? (
              info.map((feedbackObj, idx) => {
                return (
                  <RatingAndFeedBacks
                    key={idx}
                    refetch={refetch}
                    setFeedbackDetailId={setFeedbackDetailId}
                    info={feedbackObj}
                    customScrollbarStyles={customScrollbarStyles}
                    handleScreen={handleScreen}
                    screen={screen}
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
                      No Feedback
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

export default ListOfReviews;
