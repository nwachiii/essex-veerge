import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {useState} from 'react';

import enableProgressBar from '/src/images/icons/fractional/enable-progress-bar.svg';
import disableProgressBar from '/src/images/icons/fractional/disable-progress-bar.svg';
import {useMutation} from '@tanstack/react-query';
import {toggleFractionalProgressBar} from 'apis/listings';

export const EnableProgressBarDrawer = ({listingID, drawerDisclosure, active, refetch}) => {
  const toast = useToast();
  const mutation = useMutation(payload => toggleFractionalProgressBar(listingID, payload), {
    onSuccess: res => {
      toast({
        description: `Progress Bar ${!active ? `Enabled` : `Disabled`}`,
        status: `success`,
        duration: 3000,
        position: 'top-right',
      });
      drawerDisclosure.onClose();
      refetch();
    },
    onError: err => {
      toast({
        description: `Error changing progress bar display status`,
        status: `error`,
        duration: 3000,
        position: 'top-right',
      });
    },
  });

  const handleClick = async event => {
    if (mutation.isLoading) return;
    mutation.mutate(active ? `Disabled` : `Enabled`);
  };
  return (
    <Drawer isOpen={drawerDisclosure.isOpen} onClose={drawerDisclosure.onClose}>
      <DrawerOverlay />
      <DrawerContent mt="65.12px" maxW="400px">
        <DrawerHeader
          p="12px 27px"
          bg="#F5F5F5"
          display={`flex`}
          alignItems="center"
          position="relative"
          justifyContent="space-between"
          boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.02)"
          fontSize={`16px`}
          fontWeight={`600`}
          lineHeight={`20.29px`}
          textAlign={`left`}
          color="#191919"
        >
          <HStack gap={`8px`}>
            <Image
              alt="back icon"
              cursor="pointer"
              src={backIcon.src}
              onClick={drawerDisclosure.onClose}
            />
            <Text></Text>
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
        </DrawerHeader>
        <DrawerBody p={`24px`}>
          <Center
            flexDirection={`column`}
            my={`150px`}
            gap={`18px`}
            border={`1px solid #F5F5F5`}
            p={`48px 14px`}
            borderRadius={`5px`}
          >
            <Image
              src={active ? disableProgressBar.src : enableProgressBar.src}
              alt={`Image`}
              boxSize={`40px`}
            />
            <Text textAlign={`center`}>
              Are you sure you want to {active ? `deactivate` : `activate`} the progress bar?
            </Text>
            <HStack gap={`18px`} w={`100%`}>
              <Button
                w="full"
                h="45px"
                flex={`1`}
                bg="transparent"
                borderRadius="full"
                _hover={{opacity: `auto`}}
                _active={{opacity: `auto`}}
                // _hover={{opacity: 1}}
                // _active={{opacity: 1}}
                _focus={{outline: 'none'}}
                _focusVisible={{outline: 'none'}}
                border={`1px solid`}
                color={`#FF6A6A`}
                borderColor={`#FF6A6A`}
                fontWeight={`400`}
                onClick={drawerDisclosure.onClose}
              >
                Cancel
              </Button>
              <Button
                w="full"
                h="45px"
                flex={`1`}
                bg="#191919"
                borderRadius="full"
                color="#fff"
                _hover={{opacity: `auto`}}
                _active={{opacity: `auto`}}
                // _hover={{opacity: 1}}
                // _active={{opacity: 1}}
                _focus={{outline: 'none'}}
                _focusVisible={{outline: 'none'}}
                fontWeight={`400`}
                onClick={handleClick}
              >
                Yes
              </Button>
            </HStack>
          </Center>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
