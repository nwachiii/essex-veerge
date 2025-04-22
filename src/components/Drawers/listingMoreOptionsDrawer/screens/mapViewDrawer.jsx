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
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import mapOffIcon from '/src/images/icons/map-off.svg';
import makePublicUnlockIcon from '/src/images/icons/makePublicUnlockIcon.svg';
import mapShieldIcon from '/src/images/icons/map-shield.svg';
import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {toggleMapView} from 'apis/listings';
import {toastForError} from 'utils/toastForErrors';

export const MapViewDrawer = ({isOpen, onClose, listingId, refetch, listingDetail}) => {
  const [screen, setScreen] = useState('overview');
  const toast = useToast();
  const mapMutation = useMutation({
    mutationFn: formData => toggleMapView(listingId, formData),
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
        mapMutation.reset();
      }, 2300);
    },
    onError: err => {
      toastForError(err, true, toast);
    },
    retry: 0,
  });

  const handleProceed = () => {
    mapMutation.mutate(listingDetail?.maps_view ? 'Disabled' : 'Enabled');
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
            {/* <Image alt="back icon" cursor="pointer" src={backIcon.src} onClick={onClose} /> */}
            <Heading fontSize="18.9px" fontWeight="700">
              Map View
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
          {listingDetail?.maps_view ? (
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
                    <Image src={mapOffIcon.src} alt="" />
                    <Box>
                      <Text {...descStyle}>
                        Turning off map visibility means that users will no longer be able to see
                        the application on your web or mobile platform, making it hidden from view.
                      </Text>
                    </Box>
                  </HStack>
                  <HStack spacing={'12px'} align="center">
                    <Image src={mapShieldIcon.src} alt="" />
                    <Box>
                      <Text {...descStyle}>
                        Additionally, they won&apos;t be able to get directions to the listing, so
                        the path to your property will remain out of sight.
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
                  isDisabled={mapMutation.isLoading}
                  isLoading={mapMutation?.isLoading}
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
              p={6}
              border={'1px solid #F5F5F5'}
              borderRadius={'6px'}
              gap={4}
            >
              <Image src={makePublicUnlockIcon.src} alt="" />
              <Text textAlign="center" fontWeight={500}>
                Are you sure you want to make map visible?
              </Text>
              <HStack gap={4}>
                <Button
                  borderRadius={'full'}
                  border="1px solid #FF3636"
                  color="#FF3636"
                  bg={'#fff'}
                  w={'150px'}
                  h={'45px'}
                  onClick={onClose}
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
                  isDisabled={mapMutation?.isLoading}
                  isLoading={mapMutation?.isLoading}
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

export const descStyle = {
  color: '#606060',
  fontSize: '12px',
  fontWeight: '400',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontFamily: 'Euclid Circular B',
};
