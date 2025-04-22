import React from 'react';
import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  Divider,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  Spinner,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from '@chakra-ui/react';
import {IoArrowBackSharp} from 'react-icons/io5';
import {GoPlus} from 'react-icons/go';
import CustomCheckBox from '../components/utils/CustomCheckBox';
import AddSubscribersCheck from '../components/checkbox/addSubscribersCheck';

const subscribersList = [
  {
    name: 'Olivia Levy',
    value: 1,
  },
  {
    name: 'Mathew Line',
    value: 2,
  },
  {
    name: 'Home Pines',
    value: 3,
  },
  {
    name: 'Rebecca Brooke',
    value: 4,
  },
];

const AddNewSubscribers = ({setScreen}) => {
  const handleChange = val => {
    console.log(val);
  };
  let error;
  return (
    <>
      <HStack
        borderBottom="0.5px solid #e4e4e7"
        box-shadow=" 0px 2px 4px 0px #0000000D"
        py="7px"
        bg="#fafafa"
        h="50px"
        px="20px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
      >
        <Flex alignItems="center" gap="10px">
          <IoArrowBackSharp
            fontSize="20px"
            cursor="pointer"
            onClick={() => setScreen('track payment')}
          />
          <Text fontSize="16px" fontWeight={600} color="#18181b">
            Add New Subscriber
          </Text>
        </Flex>
      </HStack>
      <DrawerBody pt="24px" px={'20px'}>
        {false ? (
          <AbsoluteCenter>
            <Spinner />
          </AbsoluteCenter>
        ) : false ? (
          <AbsoluteCenter>
            <Text fontSize="11px" fontWeight="400" color="#52525b">
              {error?.message === 'Network Error'
                ? 'Please check your network connection'
                : error?.response?.status === 500
                  ? "Apologies for the inconvenience. We're working on it. Please try again later."
                  : error?.response?.status === 401
                    ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                    : (error?.response?.data?.message ??
                      error?.response?.message ??
                      error?.message ??
                      'Something went wrong')}
            </Text>
          </AbsoluteCenter>
        ) : (
          <Stack
            borderRadius="4px"
            border="0.5px solid #d4d4d8"
            borderBottom="none"
            divider={<StackDivider border="none" h="0.5px" bg="#e4e4e7" />}
            spacing="none"
            w="full"
          >
            <CustomCheckBox
              data={subscribersList}
              handleChange={handleChange}
              Component={AddSubscribersCheck}
            />
          </Stack>
        )}
      </DrawerBody>
      <DrawerFooter p="20px 30px" borderTop="0.5px solid #e4e4e7">
        <Button variant="md-filled-radius" w="full">
          Proceed
        </Button>
      </DrawerFooter>
    </>
  );
};

export default AddNewSubscribers;
