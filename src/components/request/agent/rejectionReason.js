import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

export const RejectionReason = ({rejectionReason}) => {
  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#e1e1e1',
      outline: '1px solid slategrey', // You can include this line if needed
    },
  };
  const drawerDisclosure = useDisclosure();
  return (
    <>
      <Button
        borderRadius="4px"
        fontWeight="500"
        fontSize="12px"
        bg="#191919"
        _focus={{opacity: '1'}}
        _hover={{opacity: '1'}}
        _active={{opacity: '1'}}
        onClick={drawerDisclosure.onOpen}
        p="4px 8px"
        h="26px"
        color="#ffffff"
      >
        View Reason
      </Button>
      <Drawer
        autoFocus={false}
        isOpen={drawerDisclosure.isOpen}
        onClose={drawerDisclosure.onClose}
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          position="relative"
          zIndex={100}
          mt="65.12px"
          minW="fit-content"
          boxShadow="none"
          bg="#fff"
          p="0px"
        >
          <HStack
            boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
            py="13px"
            pl="29px"
            bg="#F5F5F5"
            h="50px"
            pr="12px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <Heading p="0px" fontSize="20px" fontWeight="600" borderBottom="none" color="#191919">
              Reason for Rejection
            </Heading>

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
                <DrawerCloseButton
                  right="0px"
                  left="0px"
                  my="auto"
                  color="#000"
                  top="0"
                  bottom="0"
                />
              </VStack>
            </HStack>
          </HStack>

          <DrawerBody
            pt="24.02px"
            sx={customScrollbarStyles}
            maxW="500px"
            minW="500px"
            mr="4px"
            px="23px"
            pr="27px"
          >
            <Stack bg="#F5F5F5" p="10.024px 13.365px" borderRadius=" 6.683px">
              <Text fontSize="12px" color="#191919" fontWeight="400">
                {rejectionReason}
              </Text>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RejectionReason;
