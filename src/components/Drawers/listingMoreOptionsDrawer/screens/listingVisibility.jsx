import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import listingLockIcon from '/src/images/icons/listing-lock.svg';
import privateSecureIcon from '/src/images/icons/privateSecureIcon.svg';
import subscribeHomeIcon from '/src/images/icons/subscribeHomeIcon.svg';
import makePublicUnlockIcon from '/src/images/icons/makePublicUnlockIcon.svg';
import {useMutation} from '@tanstack/react-query';
import {makeListingPrivate} from 'apis/listings';
import {toastForError} from 'utils/toastForErrors';
import {descStyle} from './mapViewDrawer';

export const ListingVisibility = ({isOpen, onClose, handleBack, listingId, isPrivate, refetch}) => {
  const toast = useToast();
  const status = isPrivate ? 'False' : 'True';
  const mutation = useMutation(formData => makeListingPrivate(listingId, status), {
    onSuccess: async res => {
      toast({
        status: 'success',
        position: 'top-right',
        duration: 3000,
        title: isPrivate ? 'Listing has been made public' : 'Listing has been privatized',
      });
      refetch();
      onClose();
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });
  const handleExit = () => {
    onClose();
    handleBack();
  };

  const handleProceed = () => {
    mutation.mutate(listingId);
  };

  return (
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
          <Flex align={'center'} gap="5px">
            <Image alt="back icon" cursor="pointer" src={backIcon.src} onClick={handleExit} />
            <Heading fontSize="18.9px" fontWeight="700">
              {isPrivate ? 'Make Listing Public' : 'Make Listing Private'}
            </Heading>
          </Flex>
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
        <DrawerBody marginTop="3rem" px={8}>
          {!isPrivate ? (
            <Center flexDirection={'column'} h="95%" justifyContent={'space-between'}>
              <Box>
                {' '}
                <Text
                  color="#191919"
                  fontSize="24px"
                  fontWeight="600"
                  textAlign="center"
                  fontStyle="normal"
                  lineHeight="normal"
                  fontFamily="Euclid Circular B"
                >
                  What does this mean?
                </Text>
                <Stack spacing="32px" mt="40px">
                  <HStack spacing={'12px'} align="center">
                    <Image src={privateSecureIcon.src} alt="" />
                    <Box>
                      <Text fontWeight={600}>Private and Secure</Text>
                      <Text {...descStyle}>
                        By making a listing private, it’s kept off public view and out of sight from
                        potential buyers. You can still send exclusive offers directly to interested
                        parties.
                      </Text>
                    </Box>
                  </HStack>
                  <HStack spacing={'12px'} align="center">
                    <Image src={subscribeHomeIcon.src} alt="" />
                    <Box>
                      <Text fontWeight={600}>Subscriber-Only Access</Text>
                      <Text {...descStyle}>
                        Existing subscribers who have invested in the project will continue to have
                        access to the listing in their portfolio section.
                      </Text>
                    </Box>
                  </HStack>
                </Stack>
              </Box>
              <Stack gap={4} direction={'column-reverse'} w="full">
                <Button
                  border="1px solid #FF3636"
                  color="#FF3636"
                  bg={'#fff'}
                  w={'full'}
                  h={'45px'}
                  onClick={onClose}
                  fontWeight={400}
                  _hover={{bg: '#fff'}}
                  rounded="full"
                >
                  Cancel
                </Button>
                <Button
                  color="#FFF"
                  bg="#191919"
                  w={'full'}
                  h={'45px'}
                  fontWeight={400}
                  isDisabled={mutation.isLoading}
                  isLoading={mutation?.isLoading}
                  onClick={handleProceed}
                  _hover={{bg: '#191919'}}
                  rounded="full"
                >
                  Proceed
                </Button>
              </Stack>
            </Center>
          ) : (
            <VStack
              align={'center'}
              justify={'center'}
              p={10}
              border={'1px solid #F5F5F5'}
              borderRadius={'6px'}
              gap={4}
            >
              <Image src={makePublicUnlockIcon.src} alt="" />
              <Text fontSize={18} fontWeight={600}>
                Are you sure?
              </Text>
              <Text textAlign={'center'} fontSize={14} color={'#606060'}>
                Setting this listing to public will grant access to all users for a better sharing
                experience
              </Text>
              <HStack gap={4}>
                <Button
                  borderRadius={'full'}
                  border="1px solid #FF3636"
                  color="#FF3636"
                  bg={'#fff'}
                  w={'150px'}
                  h={'45px'}
                  onClick={handleExit}
                  fontWeight={400}
                  _hover={{bg: '#fff'}}
                >
                  Cancel
                </Button>
                <Button
                  borderRadius={'full'}
                  color="#FFF"
                  bg="#191919"
                  w={'150px'}
                  h={'45px'}
                  fontWeight={400}
                  onClick={handleProceed}
                  _hover={{bg: '#191919'}}
                  isDisabled={mutation?.isLoading}
                  isLoading={mutation?.isLoading}
                >
                  Yes
                </Button>
              </HStack>
            </VStack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
