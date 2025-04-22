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
  Spinner,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import {useMutation} from '@tanstack/react-query';
import {pinListing, removeListingFromPinnedList} from 'apis/listings';
import {toastForError} from 'utils/toastForErrors';
import {LuPinOff} from 'react-icons/lu';
import {BsFillPinAngleFill} from 'react-icons/bs';
import {HighlightIcon} from '@/components/assets/highlightIcon';
import {CustomHomeIcon} from '@/components/assets/homeIcon';
import {themeStyles} from 'theme';

export const PinnedListingDrawer = ({
  isOpen,
  onClose,
  handleBack,
  isPinned,
  listingId,
  refetch,
}) => {
  const toast = useToast();
  const handleExit = () => {
    onClose();
    handleBack();
  };

  const pinMutation = useMutation({
    mutationFn: formData => pinListing(formData),

    onSuccess: async res => {
      refetch();
      onClose();
      toast({
        status: 'success',
        title: 'Success!',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
        description: res?.data?.message,
      });
      setTimeout(() => {
        pinMutation.reset();
      }, 2300);
    },
    onError: err => {
      toastForError(err, true, toast);
    },
    retry: 0,
  });

  const unpinMutation = useMutation({
    mutationFn: formData => removeListingFromPinnedList(formData),
    onSuccess: res => {
      refetch();
      onClose();
      toast({
        status: 'success',
        title: 'Success!',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
        description: res?.data?.message,
      });
      setTimeout(() => {
        pinMutation.reset();
      }, 2300);
    },
    onError: err => {
      toastForError(err, true, toast);
    },
    retry: 0,
  });

  const handlePin = () => {
    pinMutation.mutate(Number(listingId));
  };
  const handleUnpin = () => {
    unpinMutation.mutate(Number(listingId));
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
              {isPinned ? `Unpin Listing` : `Pin Listing`}
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
        <DrawerBody marginTop="3rem" px={8} position={'relative'}>
          {isPinned ? (
            <VStack
              align={'center'}
              justify={'center'}
              p={10}
              border={'1px solid #F5F5F5'}
              borderRadius={'6px'}
              gap={4}
            >
              {isPinned ? (
                <LuPinOff color={'#191919'} fontSize={'34px'} />
              ) : (
                <BsFillPinAngleFill color={'#222222'} fontSize={'34px'} />
              )}

              <Text fontSize={18} fontWeight={600} textAlign={'center'}>
                Are you sure you want to unpin this listing?
              </Text>
              <Text textAlign={'center'} fontSize={14} color={'#606060'}>
                {isPinned
                  ? 'This listing will no longer appear at the top. It will automatically return to its original position.'
                  : `Pinning this listing will make it appear at the top of your customer's view on your webstore`}
              </Text>
              <HStack gap={4} mt="30px">
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
                  h={'45px'}
                  w={'150px'}
                  bg="#191919"
                  color="#FFF"
                  fontWeight={400}
                  borderRadius={'full'}
                  onClick={handleUnpin}
                  _hover={{bg: '#191919'}}
                  isDisabled={unpinMutation.isLoading}
                >
                  {unpinMutation.isLoading ? <Spinner color="#FFFFFF" /> : `Yes`}
                </Button>
              </HStack>
            </VStack>
          ) : (
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
                  What does pin mean?
                </Text>
                <Stack spacing="32px" mt="40px">
                  <HStack spacing={'12px'} align="center">
                    <HighlightIcon />
                    <Box>
                      <Text {...leadTextStyle} pb={2}>
                        Highlight your best work
                      </Text>
                      <Text {...descStyle}>
                        Pin your top listings to the top of your application, keeping them front and
                        center for all your potential buyers to see.
                      </Text>
                    </Box>
                  </HStack>
                  <HStack spacing={'12px'} align="center">
                    <CustomHomeIcon />
                    <Box>
                      <Text {...leadTextStyle} pb={2}>
                        Boost Visibility for Key Content
                      </Text>
                      <Text {...descStyle}>
                        When you pin a listing, every new listing you create will appear after it,
                        keeping the pinned listing at the top until you choose to unpin it.
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
                  onClick={handleExit}
                  fontWeight={400}
                  _hover={{bg: '#fff'}}
                  rounded='full'
                >
                  Cancel
                </Button>
                <Button
                  color="#FFF"
                  bg="#191919"
                  w={'full'}
                  h={'45px'}
                  fontWeight={400}
                  isDisabled={pinMutation.isLoading}
                  onClick={handlePin}
                  _hover={{bg: '#191919'}}
                  rounded='full'
                >
                  {pinMutation.isLoading ? <Spinner color="#FFFFFF" /> : `Proceed`}
                </Button>
              </Stack>
            </Center>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const leadTextStyle = {
  color: '#191919',
  fontSize: '16px',
  fontWeight: '600',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontFamily: 'Euclid Circular B',
};
const descStyle = {
  color: '#606060',
  fontSize: '12px',
  fontWeight: '400',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontFamily: 'Euclid Circular B',
};
