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
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {fetchListingDisplayImages, updateListingDisplayPicture} from 'apis/listings';
import {toastForError} from 'utils/toastForErrors';
import {themeStyles} from 'theme';
import Carousel from 'react-elastic-carousel';
import imageFallback from '/src/images/image-fallback.png';
import carrouselArrow from '/src/images/icons/paymentplanNavArrow.svg';
import {AnimatePresence} from 'framer-motion';
import {RiCheckboxCircleFill} from 'react-icons/ri';

export const ListingDisplayPicture = ({isOpen, onClose, listingId, listingDetail}) => {
  const GET_DISPLAY_IMAGE = useQuery(
    ['display-images'],
    () => fetchListingDisplayImages(listingId),
    {
      enabled: !!isOpen,
    }
  );
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: formData => updateListingDisplayPicture(listingId, formData),
    onSuccess: async res => {
      GET_DISPLAY_IMAGE.refetch();
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
        mutation.reset();
      }, 2300);
    },
    onError: err => {
      toastForError(err, true, toast);
    },
    retry: 0,
  });

  const CURRENT_DISPLAY_PICTURE = GET_DISPLAY_IMAGE.data?.data?.profile || null;

  const itemsToShow = 5;
  const breakPoints = [{width: 1, itemsToShow}];

  const [selectedImage, setSelectedImage] = useState(
    CURRENT_DISPLAY_PICTURE || listingDetail?.photo_urls?.[0]
  );

  useEffect(() => {
    setSelectedImage(CURRENT_DISPLAY_PICTURE);
  }, [CURRENT_DISPLAY_PICTURE]);

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
            <Image alt="back_icon" cursor="pointer" src={backIcon.src} onClick={onClose} />
            <Heading fontSize="18.9px" fontWeight="700">
              Set Display Listing Picture
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
        <DrawerBody px={4} position={'relative'}>
          <Center flexDirection={'column'} justifyContent={'space-between'}>
            <Stack spacing={8} w="95%" textAlign={'left'}>
              <Box>
                <Text mb={1} fontWeight={'400'} fontSize={'12px'} color={'#3D3D3D'}>
                  Preview
                </Text>
                {GET_DISPLAY_IMAGE.isLoading || GET_DISPLAY_IMAGE.isPending ? (
                  <Skeleton height="300px" width="100%" borderRadius="md" />
                ) : (
                  <Image
                    src={selectedImage}
                    alt="Preview"
                    borderRadius="md"
                    boxShadow="md"
                    w={'100%'}
                    h={'full'}
                    objectFit={'cover'}
                    {...themeStyles.imageFallback}
                  />
                )}
              </Box>

              {/* Image Gallery */}
              <Box>
                <Text mb={2} fontWeight={'400'} fontSize={'12px'} color={'#3D3D3D'}>
                  Select Display Picture
                </Text>
                <HStack spacing={2} overflowX="auto" mt={0}>
                  {GET_DISPLAY_IMAGE.isLoading || GET_DISPLAY_IMAGE.isPending ? (
                    <>
                      <SkeletonCircle size="75px" />
                      <SkeletonCircle size="75px" />
                      <SkeletonCircle size="75px" />
                    </>
                  ) : (
                    <Stack w="90%">
                      <Carousel
                        pagination={false}
                        itemPadding={[0, 1]}
                        showEmptySlots={true}
                        breakPoints={breakPoints}
                        disableArrowsOnEnd={true}
                        enableAutoPlay={false}
                        autoPlaySpeed={1500}
                        renderArrow={props => {
                          return (
                            <Image
                              my={'auto'}
                              boxSize={'20px'}
                              onClick={props.onClick}
                              src={carrouselArrow.src}
                              style={{cursor: 'pointer'}}
                              display={props.isEdge ? 'none' : 'block'}
                              transform={props.type === 'PREV' ? '' : 'rotate(180deg)'}
                              alt={props.type === 'PREV' ? 'left arrow' : 'right arrow'}
                            />
                          );
                        }}
                      >
                        {listingDetail?.photo_urls?.map((item, idx) => (
                          <AnimatePresence key={idx}>
                            <Stack position={'relative'}>
                              {CURRENT_DISPLAY_PICTURE === item && (
                                <Box
                                  top="3px"
                                  right="3px"
                                  position="absolute"
                                  fontSize={'19px'}
                                  zIndex={100}
                                >
                                  <RiCheckboxCircleFill
                                    color="#FFFFFF"
                                    transition="background 0.3s ease-in-out"
                                  />
                                </Box>
                              )}
                              <Image
                                alt=""
                                cursor="pointer"
                                boxSize={'50px'}
                                borderRadius="6px"
                                objectFit={'cover'}
                                position="relative"
                                {...themeStyles.imageFallback}
                                src={item ?? imageFallback.src}
                                onClick={() => setSelectedImage(item)}
                                border={
                                  selectedImage === item ? '3px solid blue' : '1px solid lightgray'
                                }
                              />
                            </Stack>
                          </AnimatePresence>
                        ))}
                      </Carousel>
                    </Stack>
                  )}
                </HStack>
              </Box>
            </Stack>
            <Stack mt={8} w="300px" textAlign={'center'}>
              <Button
                borderRadius={'10px'}
                color="#FFF"
                bg="#191919"
                w={'full'}
                h={'45px'}
                fontWeight={400}
                isDisabled={!selectedImage || mutation.isLoading}
                onClick={() => mutation.mutate({profile: selectedImage})}
                isLoading={mutation?.isLoading}
                _hover={{bg: '#191919'}}
                rounded="full"
              >
                Update
              </Button>
            </Stack>
          </Center>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
