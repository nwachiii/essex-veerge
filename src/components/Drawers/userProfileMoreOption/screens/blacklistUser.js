import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  Flex,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import addBlacklistIcon from '/src/images/icons/solar_user-block-bold.svg';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import removeBlacklistIcon from '/src/images/icons/solar_user-block-bold-black.svg';
import {blacklistCustomer} from 'apis/customers';
import {useMutation} from '@tanstack/react-query';

export const BlacklistUser = ({handleScreen, customScrollbarStyles, handleClose, userInfo}) => {
  const toast = useToast();
  const USER_NAME = `${userInfo?.first_name?.toUpperCase()} ${userInfo.last_name?.toUpperCase()}`;

  const mutation = useMutation({
    mutationFn: formData => blacklistCustomer(formData),
    retry: 0,
    onSuccess: res => {
      toast({
        title: 'BLACKLISTED!',
        description: `${USER_NAME} has been blacklisted successfully!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      handleClose();
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'An error occured',
        description: `${err?.code} : ${err?.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const IS_BLACKLISTED = Boolean(userInfo?.is_blacklisted);

  const handleProceed = () => mutation.mutate(Number(userInfo?.id));

  return (
    <>
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
            onClick={handleScreen('options')}
          />
          <Heading fontSize="18.9px" fontWeight="700">
            {IS_BLACKLISTED ? `Remove from Blacklist` : `Blacklist User`}
          </Heading>
        </Flex>
        <HStack spacing="15px">
          <VStack
            w="30px"
            h="30px"
            _hover={{
              width: '30px',
              height: '30px',
            }}
            align="center"
            justify="center"
            position="relative"
            borderRadius="5px"
            transition="0.3s ease-in-out"
          >
            <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
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
          <Image
            alt="blacklist icon"
            cursor="pointer"
            src={IS_BLACKLISTED ? removeBlacklistIcon.src : addBlacklistIcon.src}
          />
          <Text
            maxW={'300px'}
            fontSize="16px"
            fontWeight="500"
            textAlign="center"
            textDecorationSkipInk="none"
            fontFamily="Euclid Circular B"
            textUnderlinePosition="from-font"
          >
            {IS_BLACKLISTED
              ? `Are you sure you want remove "${USER_NAME}" from backlist?`
              : `Are you sure you want to add "${USER_NAME}" to backlist?`}
          </Text>
          <HStack mt={'30px'}>
            <Button
              onClick={() => handleClose()}
              colorScheme="red"
              variant="outline"
              w="150px"
              h="45px"
              borderRadius={'30px'}
              _hover={{
                background: 'transparent',
              }}
              _active={{
                background: 'transparent',
              }}
              _focus={{
                background: 'transparent',
              }}
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
              onClick={handleProceed}
              _hover={{
                background: '#121212',
              }}
              _active={{
                background: '#121212',
              }}
              _focus={{
                background: '#121212',
              }}
            >
              {mutation.isLoading ? <Spinner color="#FFFFFF" /> : `Yes`}
            </Button>
          </HStack>
        </VStack>
      </DrawerBody>
    </>
  );
};
