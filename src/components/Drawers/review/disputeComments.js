import {
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
} from '@chakra-ui/react';
import React from 'react';

export const Disputecomment = ({drawerDisclosure, feedback}) => {
  return (
    <Drawer isOpen={drawerDisclosure.isOpen} onClose={drawerDisclosure.onClose} borderRadius="16px">
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />

      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        // mt="112.12px"
        minW="400px"
        bg="#fff"
        p="0px"
      >
        <HStack
          p="18.5px 16px 18.5px 29px"
          bg="#F5F5F5"
          justify="space-between"
          align="center"
          position="relative"
        >
          <Heading fontSize="20px" fontWeight="600">
            Comment
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
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
        </HStack>
        <DrawerBody p="20px 19px 20px 29px" w="400px">
          {feedback?.feedback?.map((item, idx) => (
            <Stack bg="#F5F5F5" key={idx} w="full" borderRadius="8px" p="10px">
              <Text fontSize="14px" fontWeight="400" color="#191919">
                {item?.feedback}
              </Text>
            </Stack>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Disputecomment;
