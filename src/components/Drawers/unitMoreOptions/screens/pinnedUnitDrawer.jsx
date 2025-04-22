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
import {useMutation} from '@tanstack/react-query';
import {toastForError} from 'utils/toastForErrors';
import {LuPinOff} from 'react-icons/lu';
import {BsFillPinAngleFill} from 'react-icons/bs';
import {CustomHomeIcon} from '@/components/assets/homeIcon';
import {HighlightIcon} from '@/components/assets/highlightIcon';
import {togglePinnedUnit} from 'apis/listings';

export const PinnedUnitDrawer = ({isOpen, onClose, handleBack, isPinned, bundleId, refetch}) => {
  const toast = useToast();
  const handleExit = () => {
    onClose();
    handleBack();
  };

  const pinMutation = useMutation({
    mutationFn: ({id, type}) => togglePinnedUnit(id, type),

    onSuccess: async response => {
      pinMutation.reset();
      await refetch();
      toast({
        title: 'Success!',
        description: response?.data?.message || 'Unit pinned successfully',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    },

    onError: error => {
      toastForError(error, true, toast);
    },
    retry: 0,
    useErrorBoundary: false,
  });

  const handlePin = () => {
    pinMutation.mutate({id: Number(bundleId), type: 'post'});
  };
  const handleUnpin = () => {
    pinMutation.mutate({id: Number(bundleId), type: 'delete'});
  };

  const handleCancel = () => {
    pinMutation.reset();
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
              {isPinned ? `Unpin Unit` : `Pin Unit`}
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
                Are you sure you want to unpin this unit?
              </Text>
              <Text textAlign={'center'} fontSize={14} color={'#606060'}>
                {isPinned
                  ? 'This unit will no longer appear at the top. It will automatically return to its original position.'
                  : `Pinning this unit will make it appear at the top of your customer's view on your webstore`}
              </Text>
              <HStack gap={4} mt="30px">
                <Button
                  borderRadius="72px"
                  border="1px solid #FF3636"
                  color="#FF3636"
                  bg={'#fff'}
                  w={'150px'}
                  h={'45px'}
                  onClick={handleCancel}
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
                  borderRadius="72px"
                  onClick={handleUnpin}
                  _hover={{bg: '#191919'}}
                  isDisabled={pinMutation.isLoading}
                >
                  {pinMutation.isLoading ? <Spinner color="#FFFFFF" /> : `Yes`}
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
                        Pin your top units, keeping them front and center for all your potential
                        buyers to see.
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
                        When you pin a unit, every new unit you create will appear after it, keeping
                        the pinned unit at the top until you choose to unpin it.
                      </Text>
                    </Box>
                  </HStack>
                </Stack>
              </Box>
              <Stack gap={4} direction={'column-reverse'} w="full">
                <Button
                  borderRadius={'full'}
                  border="1px solid #FF3636"
                  color="#FF3636"
                  bg={'#fff'}
                  w={'full'}
                  h={'45px'}
                  onClick={handleCancel}
                  fontWeight={400}
                  _hover={{bg: '#fff'}}
                >
                  Cancel
                </Button>
                <Button
                  borderRadius={'full'}
                  color="#FFF"
                  bg="#191919"
                  w={'full'}
                  h={'45px'}
                  fontWeight={400}
                  isDisabled={pinMutation.isLoading}
                  onClick={handlePin}
                  _hover={{bg: '#191919'}}
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
