import {customScrollbarStyles} from '@/components/common/Calendar/DatePicker';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import {removeUserFromBlacklist} from 'apis/customers';
import React from 'react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import removeBlacklistIcon from '/src/images/icons/solar_user-block-bold-black.svg';

const RemoveUserFromBlacklist = ({row: userInfo, refetch}) => {
  const toast = useToast();
  const drawerDisclosure = useDisclosure();
  const USER_NAME = `${userInfo?.name?.toUpperCase()}`;
  const mutation = useMutation({
    mutationFn: formData => removeUserFromBlacklist(formData),
    retry: 0,
    onSuccess: res => {
      toast({
        title: 'USER ACTIVE!',
        description: `${USER_NAME} is no longer on your blacklist!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      refetch();
      drawerDisclosure.onClose();
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'Request failed',
        description: `${err?.response?.data?.message || err?.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const handleRemove = () => mutation.mutate(Number(userInfo?.id));
  return (
    <div>
      <Button
        onClick={drawerDisclosure.onOpen}
        border="1px solid #FF3636"
        color="#FF3636"
        variant="outline"
        w="150px"
        h="45px"
        borderRadius={'30px'}
        fontWeight="400"
        _hover={{background: 'transparent'}}
        _active={{background: 'transparent'}}
        _focus={{background: 'transparent'}}
      >
        Remove
      </Button>
      <Drawer
        autoFocus={false}
        isOpen={drawerDisclosure.isOpen}
        // isOpen={true}
        onClose={drawerDisclosure.onClose}
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          position="relative"
          zIndex={100}
          mt="58px"
          sx={customScrollbarStyles}
          // mt="112.12px"
          minW="fit-content"
          boxShadow="none"
          bg="#fff"
          p="0px"
        >
          <HStack
            py="30px"
            px="25px"
            h="49.699px"
            bg="#F5F5F5"
            align="center"
            position="relative"
            justify="space-between"
          >
            <Flex gap="5px">
              <Image
                alt="back icon"
                cursor="pointer"
                src={backIcon.src}
                onClick={drawerDisclosure.onClose}
              />
              <Heading fontSize="18.9px" fontWeight="700">
                {`Remove from Blacklist`}
              </Heading>
            </Flex>
            <HStack spacing="15px">
              <VStack
                w="30px"
                h="30px"
                _hover={{width: '30px', height: '30px'}}
                align="center"
                justify="center"
                position="relative"
                borderRadius="5px"
                transition="0.3s ease-in-out"
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
            sx={customScrollbarStyles}
            paddingTop="1rem"
            mr="2px"
            w="400px"
            position={'relative'}
          >
            <VStack gap={8} p={2} w="346px" h="60vh" my={'auto'} justify={'center'}>
              <Image alt="blacklist icon" cursor="pointer" src={removeBlacklistIcon.src} />
              <Text
                maxW={'300px'}
                fontSize="16px"
                fontWeight="500"
                textAlign="center"
                textDecorationSkipInk="none"
                fontFamily="Euclid Circular B"
                textUnderlinePosition="from-font"
              >
                {`Are you sure you want remove "${USER_NAME}" from backlist?`}
              </Text>
              <HStack mt={'30px'}>
                <Button
                  onClick={drawerDisclosure.onClose}
                  colorScheme="red"
                  variant="outline"
                  w="150px"
                  h="45px"
                  borderRadius={'30px'}
                  _hover={{background: 'transparent'}}
                  _active={{background: 'transparent'}}
                  _focus={{background: 'transparent'}}
                >
                  Cancel
                </Button>
                <Button
                  bg={'#000'}
                  w="150px"
                  h="45px"
                  isDisabled={mutation.isLoading}
                  color={'#FFFFFF'}
                  borderRadius={'30px'}
                  onClick={handleRemove}
                  _hover={{background: '#121212'}}
                  _active={{background: '#121212'}}
                  _focus={{background: '#121212'}}
                >
                  {mutation.isLoading ? <Spinner color="#FFFFFF" /> : `Yes`}
                </Button>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RemoveUserFromBlacklist;
