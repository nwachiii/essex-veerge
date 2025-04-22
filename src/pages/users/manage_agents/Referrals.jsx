import React from 'react';
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

const Referrals = ({referrals}) => {
  const {isOpen, onClose, onOpen} = useDisclosure();

  return (
    <div>
      <Text fontSize="0.7rem" mb="28px" color="#4545FE" cursor="pointer" onClick={onOpen}>
        View
      </Text>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="400px" bg="#fff" p="0px">
          <HStack
            py="30px"
            h="49.699px"
            bg="#F5F5F5"
            px="25px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <Heading fontSize="18.9px" fontWeight="700">
              Referrals
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
          <DrawerBody>
            <VStack>
              {referrals?.map(data => (
                <HStack
                  width="100%"
                  justifyContent="space-between"
                  key={data?.id}
                  padding="1rem 0"
                  borderBottom="1px solid #E4E4E4"
                >
                  <HStack>
                    <Avatar src={data?.avatar} />
                    <VStack alignItems="start">
                      <Text fontSize="0.875rem">{data?.name}</Text>
                      <Text fontSize="0.75rem" color="#4545FE">
                        {data?.email}
                      </Text>
                    </VStack>
                  </HStack>
                  <Text fontSize="0.625rem"> {data?.sign_up_time}</Text>
                </HStack>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Referrals;
