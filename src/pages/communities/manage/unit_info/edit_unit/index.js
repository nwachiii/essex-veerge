import React, {useState} from 'react';
import {
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  useDisclosure,
  useNumberInput,
  useToast,
  Heading,
  ModalCloseButton,
  Spinner,
  Textarea,
  Box,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';
import {FileUploads} from './FileUploads';
import {extractBase64} from '../../../../../utils';
import {EditUnitInfo} from '../../../../../apis/listings';
import imageIcon from '/src/images/icons/image-upload.png';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Popup} from '../../../../../ui-lib/ui-lib.components';
import {AnimatedLoader} from '../../../../../components/common/loaders';
import UnitInfoUpdateSuccess from '../components/UnitInfoModal';
import emptyState from '../../../../../images/empty_state_image.svg';
import imageFallback from '/src/images/image-fallback.png';

export const EditUnit = ({bundleId, refetch, modalDisclosure, unitInfo}) => {
  const toast = useToast();
  const router = useRouter();
  const unitId = router?.query?.unitId;
  const [photoUrls, setPhotoUrl] = useState([]);
  const [photoString, setPhotoString] = useState([]);
  const [files, setFiles] = useState(unitInfo?.photos?.map(obj => obj?.photo));
  const UnitInfoModal = useDisclosure();
  const queryClient = useQueryClient();

  const BEDROOM_INPUT_FIELD_PROPS = useNumberInput({
    step: 1,
    defaultValue: unitInfo?.no_of_bedrooms || '',
    min: 1,
    max: 100,
    precision: 0,
  });

  // console.log(photoUrls);
  // console.log(files);

  // docs_updated
  const mutation = useMutation(body => EditUnitInfo(unitInfo?.id, body), {
    onSuccess: res => {
      const response_body = res?.data?.extra;
      toast({
        title: 'You have successfully updated unit information.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
      queryClient.invalidateQueries('payment_plan');
      modalDisclosure.onClose();
    },
    onError: err => {
      console.log(err);
      toast({
        title: `${err?.response?.data?.message || 'Editing process failed'}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const formik = useFormik({
    initialValues: {...unitInfo},
    onSubmit: values => {
      // Only send the data that was edited to the server
      const {unit_title, no_of_bedrooms, unit_size, unit_description, youtube_url, ...EDITED_BODY} =
        {
          ...values,
          no_of_bedrooms: parseInt(BEDROOM_INPUT_FIELD_PROPS.value),
        };

      if (files?.length < 1) {
        toast({
          title: 'Image cannot be empty',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        mutation.mutate({
          unit_size,
          unit_title,
          unit_description,
          no_of_bedrooms,
          youtube_url,
          photos: {
            old_photos: photoUrls,
            new_photos: extractBase64(photoString),
          },
        });
      }
    },
  });

  const bedRoomInput = BEDROOM_INPUT_FIELD_PROPS.getInputProps();

  return (
    <>
      <Popup
        mt="6vh"
        size="full"
        minH="508px"
        color="#191919"
        overflowY="auto"
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        minW={{base: '90%', md: '750px'}}
      >
        <Popup.Body px="22px" paddingLeft="2px">
          <>
            <Heading
              fontSize="24px"
              fontWeight={600}
              align="left"
              w="full"
              mt="-2"
              mb="5"
              pl={'20px'}
            >
              Modify Unit Info
            </Heading>

            <Flex w="full" justify="space-between" gap="23px">
              <VStack mt="0px">
                <Center
                  w={'345px'}
                  minH="231px"
                  aspectRatio={'345 / 231'}
                  mr="10px"
                  ml="20px"
                  justifyContent={'center'}
                  alignItems={'center'}
                  border={formik.values?.photos[0]?.photo ? '1px solid lightgray' : 'none'}
                  borderRadius={'16px'}
                  overflow={'hidden'}
                  // background={'lightgray 50%'}
                >
                  <Image
                    alt="Unit Image"
                    // src={
                    //   (files.length > 0 ? formik.values?.photos[0]?.photo : imageFallback.src) ||
                    //   imageFallback.src ||
                    //   '/'
                    // }
                    src={
                      (files.length > 0
                        ? files[0]?.image || files[0]?.photo || files[0]
                        : imageFallback.src) ||
                      imageFallback.src ||
                      '/'
                    }
                    minH={'100%'}
                    minW={'105%'}
                  />
                </Center>
                <FileUploads
                  w="full"
                  h="auto"
                  files={files}
                  // files={[...files, ...files, ...files]}
                  imageColumns={3}
                  minW="fit-content"
                  setFiles={setFiles}
                  icon={imageIcon.src}
                  photoUrls={photoUrls}
                  photoString={photoString}
                  setPhotoUrl={setPhotoUrl}
                  setPhotoString={setPhotoString}
                  maxFiles={unitInfo?.photos?.length}
                  title={`Upload/Drag 'n' drop Image`}
                  type={{'image/*': ['.jpg', '.png']}}
                  editUnitInfo
                />
              </VStack>
              <VStack spacing={4} as={'form'} onSubmit={formik.handleSubmit} flex="1">
                <VStack align="flex-start" w="full">
                  <label style={{fontSize: '12px'}}>Unit Title</label>
                  <Input
                    // w="262px"
                    // h="37px"
                    required
                    type="text"
                    id="unit_title"
                    name="unit_title"
                    borderRadius="6px"
                    fontSize={'14px'}
                    placeholder="Unit name"
                    onChange={formik.handleChange}
                    value={formik.values.unit_title}
                  />
                </VStack>

                <VStack align="flex-start" w="full">
                  <label style={{fontSize: '12px'}}>Unit size</label>
                  <Input
                    required
                    fontSize={'14px'}
                    id="unit_size"
                    name="unit_size"
                    borderRadius="6px"
                    onChange={formik.handleChange}
                    value={formik.values.unit_size}
                    placeholder="Unit size"
                  />
                </VStack>
                <VStack align="flex-start" w="full">
                  <label style={{fontSize: '12px'}}>Youtube Url</label>
                  <Input
                    type="text"
                    fontSize={'14px'}
                    id="youtube_url"
                    name="youtube_url"
                    borderRadius="6px"
                    onChange={formik.handleChange}
                    value={formik.values.youtube_url}
                    placeholder="Youtube Url"
                  />
                </VStack>

                <HStack
                  mt={-2}
                  w="full"
                  gap="32px"
                  justify="space-between"
                  fontSize={'12px'}
                  h="fit-content"
                >
                  {!(
                    unitInfo?.project?.building_type === 'Mall' || unitInfo?.project?.building_type === 'Land' ||
                    unitInfo?.project?.building_type === 'Parcel of Land'
                  ) && (
                    <VStack align="flex-start" w="full">
                      <label style={{fontSize: '12px'}}>No of bedrooms</label>
                      <Input
                        // w="122px"
                        // h="37px"
                        borderRadius="6px"
                        fontSize={'14px'}
                        id="no_of_bedrooms"
                        name="no_of_bedrooms"
                        onChange={formik.handleChange}
                        value={formik.values.no_of_bedrooms}
                        {...bedRoomInput}
                      />
                    </VStack>
                  )}
                </HStack>
                <VStack align="flex-start" w="full">
                  <label style={{fontSize: '12px'}}>Description</label>
                  <Box
                    pos={'relative'}
                    w="full"
                    borderRadius="6px"
                    border={'.1px solid #e4e4e4'}
                    paddingBottom={'30px'}
                  >
                    <Textarea
                      // w="262px"
                      h="110px"
                      required
                      resize={'none'}
                      fontSize={'14px'}
                      type="text"
                      maxLength={'1500'}
                      id="unit_description"
                      name="unit_description"
                      borderRadius="6px"
                      border={'none'}
                      outline={'none'}
                      onChange={formik.handleChange}
                      _hover={{border: 'none', outline: 'none'}}
                      _focus={{border: 'none', outline: 'none'}}
                      _focusVisible={{border: 'none', outline: 'none'}}
                      _active={{border: 'none', outline: 'none'}}
                      value={formik.values.unit_description}
                      placeholder="Add description"
                    />
                  </Box>
                </VStack>

                <HStack w="full" pt="40px" gap="13.4px" justifySelf="flex-end">
                  <Button
                    // py={4}
                    h="45.5px"
                    // w="124px"
                    flex={'1'}
                    color="#FF3636"
                    textAlign={'center'}
                    borderRadius={'full'}
                    fontSize={'16px'}
                    fontWeight={400}
                    padding={'12px 20px'}
                    border={'1px solid #FF3636'}
                    bg="transparent"
                    _hover={{bg: 'transparent'}}
                    onClick={modalDisclosure.onClose}
                  >
                    Discard
                  </Button>
                  <Button
                    // py={4}
                    // w="124px"
                    flex="1"
                    bg="#4545FE"
                    type="submit"
                    color="#FFFFFF"
                    h="45.5px"
                    cursor={'pointer'}
                    textAlign={'center'}
                    borderRadius={'full'}
                    fontSize={'16px'}
                    fontWeight={400}
                    padding={'12px 20px'}
                    _hover={{
                      background: '',
                    }}
                    isDisabled={mutation?.isLoading}
                  >
                    {mutation?.isLoading ? <Spinner /> : 'Proceed'}
                  </Button>
                </HStack>
              </VStack>
            </Flex>
          </>
        </Popup.Body>
      </Popup>
      <UnitInfoUpdateSuccess UnitInfoModal={UnitInfoModal} />
    </>
  );
};

export default EditUnit;
