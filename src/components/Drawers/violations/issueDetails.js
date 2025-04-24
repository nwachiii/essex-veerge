import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import filter_icon from '/src/images/icons/filter-icon.svg';
import IssueDetailProfile from './issueDetailProfile';
import AdditionalInfo from './additionalInfo';
import Timeline from './timeline';
import Note from './note';
import CureDeadline from './cureDeadline';

const IssueDetails = ({handleClose, handleScreen, customScrollbarStyles}) => {
  return (
    <>
      <HStack
        py="7px"
        h="50px"
        bg="#fafafa"
        px="20px"
        justify="space-between"
        boxShadow=" 0px 2px 4px 0px #0000000D"
        align="center"
        position="relative"
      >
        <Flex alignItems="center" gap="10px">
          {/* <IoArrowBackSharp
          fontSize="20px"
          cursor="pointer"
        /> */}
          <Heading fontSize="16px" fontWeight="600" color="#18181b">
            Issue Details
          </Heading>
        </Flex>
        <HStack spacing="13px">
          <Button
            onClick={handleScreen('options')}
            bg="transparent"
            fontWeight="400"
            fontSize="14px"
            lineHeight="18px"
            _hover={{
              bg: 'rgba(0,0,0,0.1)',
              borderColor: '#52525b',
              img: {opacity: '0.5'},
            }}
            color="#191919"
            p="10px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            h="36px"
            w="36px"
            minW="36px"
            border="0.5px solid #52525b"
            borderRadius="8.12px"
          >
            <Image w="16px" minW="16px" h="16px" src={filter_icon.src} alt="filter  icon" />{' '}
          </Button>
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
      <DrawerBody sx={customScrollbarStyles} paddingTop="20px" px="20px" w="400px">
        <Stack w="full" spacing="16px">
          <IssueDetailProfile />
          <AdditionalInfo />
          <Timeline />
          <CureDeadline />
          <Note />
        </Stack>
      </DrawerBody>
      <DrawerFooter p="20px 30px" borderTop="0.5px solid #e4e4e7">
        <Button
          onClick={handleClose}
          w="full"
          h="36.6px"
          borderRadius="72px"
          bg={'#000000'}
          color={'#FFFFFF'}
          fontWeight={'400'}
          fontSize={'13px'}
          _hover={{
            shadow: 'md',
          }}
          _active={{
            opacity: 0.8,
          }}
        >
          Mark as Resolved
        </Button>
      </DrawerFooter>
    </>
  );
};

export default IssueDetails;
