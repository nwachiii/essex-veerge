/* eslint-disable react-hooks/exhaustive-deps */
import {AddIcon, SmallCloseIcon} from '@chakra-ui/icons';
import {
  Box,
  Center,
  Flex,
  Icon,
  Image,
  Spinner,
  Text,
  VStack,
  useDisclosure,
  Grid,
  GridItem,
  useToast,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useDropzone} from 'react-dropzone';
import {useMutation} from '@tanstack/react-query';
import React, {useCallback, useEffect, useState} from 'react';
import {Button} from '../../../../../ui-lib/ui-lib.components';
import uploadImg from '../../../../../images/upload_diagram.png';
import {extractBase64, encodeFileToBase64} from '../../../../../utils';
import {createAllocations, uploadAllocationsDiagram} from '../../../../../apis/listings';
import {ShowEnlargedImage} from '../../../../../utils/ShowEnlargedImage';
import {ErrorMessage, Field, FieldArray, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Persist} from 'formik-persist';
import usePublish from '../publish/usePublish';
import SuccessModal from '../publish/successModal';
import {clearLocalStorage} from 'utils/clearLocalStorage';
import keys from 'constants/listings/key';

export const UploadAllocations = ({
  uploads,
  setUploads,
  noFooter,
  handleProgress,
  isPersisting,
  setIsPersisting,
}) => {
  const router = useRouter();
  const toast = useToast();
  const unitQuantity = router?.query?.qty;
  const totalArchived = router?.query?.archive;
  const {unit_id} = router?.query;
  const id = router?.query?.unit_id;
  const [files, setFiles] = useState(uploads || []);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const IMAGE_MODAL = useDisclosure();
  Yup.addMethod(Yup.array, 'unique', function (message, mapper = (a) => a) {
    return this.test('unique', message, function (list) {
      const uniqueValues = new Set();
      for (const item of list) {
        const value = mapper(item);
        if (uniqueValues.has(value)) {
          return false; // Duplicate found
        }
        uniqueValues.add(value);
      }
      return true;
    });
  });

  const validationSchema =Yup.object().shape({
    allocations: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required('Allocation name is required'),
        }),
      )
      .unique("Allocation name must be unique", (a) => a?.name),
  })

  useEffect(() => {
    return () => files && files.forEach(file => URL.revokeObjectURL(file?.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {'image/*': ['.jpg', '.png']},
    onDrop: useCallback(acceptedFiles => {
      if (files.length + acceptedFiles.length > 5) {
        toast({
          status: 'error',
          title: 'You cannot upload more than 5 images',
          duration: 5000,
          position: 'top-right',
          isClosable: true,
        });
        return;
      }

      const numFiles = files.length;
      const numNewFiles = acceptedFiles.length;
      if (numFiles + numNewFiles > 5) {
        acceptedFiles = acceptedFiles.slice(0, 5 - numFiles);
      }

      acceptedFiles.forEach(file => {
        encodeFileToBase64(file).then(res => {
          const newFile = Object.assign({image: res}, file, {
            preview: URL.createObjectURL(file),
          });

          if (
            files.some(existingFile => existingFile.image === newFile.image) ||
            files.some(existingFile => existingFile === newFile.image)
          ) {
            toast({
              status: 'error',
              title: `This file has already been uploaded`,
              duration: 5000,
              position: 'top-right',
              isClosable: true,
            });
            return;
          }

          setFiles(prevValue => [...prevValue, newFile]);
        });
      });
    }),
  });
  const removeFile = index => {
    const copy = [...files];
    copy.splice(index, 1);
    setFiles(copy);
  };

  useEffect(() => {
    async function handleUpload() {
      const UNEXTRACTED_IMAGES = files.filter(file => file?.image);
      const EXTRACTED_IMAGES = files.filter(file => !UNEXTRACTED_IMAGES.includes(file));
      if (!UNEXTRACTED_IMAGES.length) return;

      const newFiles = await Promise.all(extractBase64(UNEXTRACTED_IMAGES));
      const updatedFiles = [...EXTRACTED_IMAGES, ...newFiles];

      if (JSON.stringify(updatedFiles) !== JSON.stringify(files)) {
        setUploads([...updatedFiles]);
      }
    }
    handleUpload();
  }, [files]);

  const mutation = useMutation(body => createAllocations(id, body), {
    onSuccess: res => {
      toast({
        title: `Allocations published successfully`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
      clearLocalStorage(keys);
      router.back(`/listings/manage/unit_info/?unitId=${parseInt(unit_id)}`);
    },
    onError: err => {
      console.log(err);
      toast({
        title: `${err?.response?.data?.message || 'Allocation creation failed'}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const {handlePublish} = usePublish(mutation, unit_id, uploads);

  const handleSubmit = () => {
    if (parseInt(totalArchived) > 1) {
      handleProgress(step => (parseInt(totalArchived) === 0 ? step + 2 : step + 1));
    } else {
      handlePublish();
      setIsPersisting(false);
    }
    setIsPersisting(true);
  };

  const enlargeImage = index => {
    if (files[index].image) {
      setEnlargedImage(files[index].image);
    }
    setEnlargedImage(files[index]);
    IMAGE_MODAL.onOpen();
  };

  return (
    <div>
      <Box px="43px" py="37px" bg="#fff" borderRadius="16px" mt={'30px'} border={'1px solid #E4E4E4'}>
        <Text fontSize="1.4rem" fontWeight="500" mb="1rem">
          Name Allocations
        </Text>
        <Formik
          initialValues={{
            allocations: [
              {
                name: '',
              },
            ],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({isValid, dirty, values, errors}) => (
            <Form>
              <FieldArray name="allocations">
                {() => (
                  <>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      {Array(parseInt(unitQuantity) || 6)
                        .fill(1)
                        .map((item, i) => (
                          <GridItem key={i} colSpan={1}>
                            <div>
                              <label htmlFor={`allocations.${i}.name`}><b>Allocation {i + 1}</b></label>
                              <Field
                                required
                                type="text"
                                placeholder="Enter allocation name"
                                className="formik__field"
                                name={`allocations.${i}.name`}
                                onKeyUp={e => {
                                  const currentValues = values;
                                  if (!currentValues.allocations[i]) {
                                    currentValues.allocations[i] = {};
                                  }
                                  currentValues.allocations[i].name = e.target.value;
                                  const ALLOCATION_NAMES = currentValues.allocations.map(
                                    item => item?.name
                                  );
                                  localStorage.setItem(
                                    'allocations_data',
                                    JSON.stringify(ALLOCATION_NAMES)
                                  );
                                }}
                              />
                              <ErrorMessage
                                name={`allocations.${i}.name`}
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </GridItem>
                        ))}
                    </Grid>
                  </>
                )}
              </FieldArray>
              <Text mt="3rem" mb="1rem" fontSize="1.4rem" fontWeight="500">
                Upload Allocation Layout
              </Text>
              <Box
                minW={{base: '90%', xl: '580px'}}
                minH="201px"
                h="fit-content"
                border="1px solid #E4E4E4"
                borderRadius="32px"
                position={'relative'}
              >
                {files.length ? (
                  <Flex align={'center'} gap="20px" flexWrap={'wrap'} p={6}>
                    <Center
                      position={'absolute'}
                      right={'2%'}
                      bottom="7%"
                      bg="#f5f5f5"
                      h="30px"
                      w="30px"
                      borderRadius={'5px'}
                      cursor={files.length < 5 ? 'pointer' : 'not-allowed'}
                      {...(files.length < 5 ? getRootProps({className: 'dropzone'}) : {})}
                    >
                      <AddIcon cursor={files.length < 5 ? 'pointer' : 'not-allowed'} color="#4545FE" />
                      <input {...getInputProps()} />
                    </Center>
                    {files.map((file, index) => (
                      <Flex maxW="680px" wrap="flex-wrap" key={index} align="center" h="full">
                        <Box pos="relative" h="full" mr={8}>
                          <Flex
                            justify={'center'}
                            alignItems={'center'}
                            cursor="pointer"
                            onClick={() => removeFile(index)}
                            pos="absolute"
                            right="45%"
                            zIndex={1000}
                            bottom="5px"
                            width="20px"
                            height="20px"
                            borderRadius="20px"
                            alt="cancel_icon"
                            bg="#fff"
                          >
                            <Icon color="#000" width="10px" height="10px" as={SmallCloseIcon} />
                          </Flex>

                          <VStack
                            boxShadow={'sm'}
                            width="196px"
                            height="200px"
                            borderRadius="16px"
                            boxSize={140}
                            background={`linear-gradient(180deg, rgba(0, 0, 0, 0) 53.65%, #000000 100%)`}
                          >
                            <Image
                              alt=""
                              cursor={'pointer'}
                              onClick={() => enlargeImage(index)}
                              src={file?.image ? file.image : file}
                              width="full"
                              height="full"
                              borderRadius="16px"
                            />
                            <ShowEnlargedImage modalTriger={IMAGE_MODAL} imgSrc={enlargedImage} />
                          </VStack>
                        </Box>
                      </Flex>
                    ))}
                  </Flex>
                ) : (
                  <VStack
                    cursor="pointer"
                    h="100%"
                    spacing={6}
                    justify="center"
                    pos="relative"
                    {...getRootProps({className: 'dropzone'})}
                  >
                    <input {...getInputProps()} />
                    <Image alt="" mt={10} src={uploadImg.src} width="58px" height="58px" />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <Text textAlign={'center'} maxWidth={'750px'}>You can easily add allocation layout by uploading them or simply dragging & dropping.
                      Keep in mind, you can add up to 5 images, with PNG and JPEG formats supported.</Text>
                    )}
                  </VStack>
                )}
              </Box>

              {noFooter ? null : (
                <Flex
                  mt="50px"
                  direction={'row'}
                  justifyContent={'flex-end'}
                  width="100%"
                  alignItems="center"
                >
                  <Button
                    mt={0}
                    fontSize="16px"
                    fontWeight="500"
                    onClick={() => router.back(-1)}
                    width="202px"
                    height="55px"
                    border="1px solid #FF3636"
                    color="#FF3636"
                    borderRadius='72px'
                  >
                    Discard
                  </Button>
                  <Button
                    mt={0}
                    type="submit"
                    isDisabled={!isValid || !dirty || !files.length}
                    ml="28px"
                    width="202px"
                    height="55px"
                    variant="primary"
                    borderRadius='72px'
                  >
                    {parseInt(totalArchived) < 1 ? (
                      mutation.isLoading ? (
                        <Spinner color="white" />
                      ) : (
                        'Publish'
                      )
                    ) : (
                      'Proceed'
                    )}
                  </Button>
                </Flex>
              )}
              {isPersisting && <Persist name="allocations" />}
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default UploadAllocations;
