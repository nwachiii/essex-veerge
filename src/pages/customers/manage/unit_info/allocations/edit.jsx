import React, {useEffect, useState} from 'react';
import {LayoutView} from '/src/components';
import {
  Box,
  HStack,
  Input,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  Tooltip,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Button} from '../../../../../ui-lib/ui-lib.components';
import {Formik, Field, FieldArray, Form} from 'formik';
import {AnimatedLoader} from '../../../../../components';
import EditAllocationImages from './EditAllocationImages';
import {
  updateAllocationImages,
  updateAllocationValues,
  fetchAllocationsImages,
  fetchAvailableAllocationsPerUnit,
} from '../../../../../apis/customers';
import backArrow from '/src/images/icons/back-arrow.png';
import crossCircle from '/src/images/icons/cross-circle.svg';
import imageIcon from '/src/images/icons/image-upload.png';
import {extractBase64} from '../../../../../utils';
import {EditUnitQuantity} from 'apis/listings';
import {themeStyles} from 'theme';

export const EditAllocations = () => {
  const toast = useToast();
  const router = useRouter();
  const [photoString, setPhotoString] = useState([]);
  const {unitId, qtyStatus, qtyAmount} = router?.query;
  const [quantityData, setQuantityData] = useState();
  const [removedNumber, setRemovedNumber] = useState(0);
  const queryClient = useQueryClient();
  const FETCH_ALLOCATIONS_IMAGES = useQuery(['fetch-allocation-images', unitId], () =>
    fetchAllocationsImages(unitId)
  );
  const ALLOCATIONS_IMAGES =
    FETCH_ALLOCATIONS_IMAGES?.data &&
    FETCH_ALLOCATIONS_IMAGES?.data?.data?.map(item => item.image_file);

  const [files, setFiles] = useState([]);
  const [photoUrls, setPhotoUrl] = useState(files?.filter(file => typeof file == 'string') || []);
  const ALLOCATIONS_PER_UNIT = useQuery(['allocation-per-unit', unitId], () =>
    fetchAvailableAllocationsPerUnit(unitId)
  );

  useEffect(() => {
    if (ALLOCATIONS_IMAGES) {
      setFiles(ALLOCATIONS_IMAGES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ALLOCATIONS_PER_UNIT?.isLoading]);

  const UNIT_ALLOCATIONS = ALLOCATIONS_PER_UNIT?.data && ALLOCATIONS_PER_UNIT?.data?.data?.data;
  // Get the number of extra input fields from the query parameter
  const numExtraFields = qtyAmount > 0 ? Number(qtyAmount) : 0;
  // Initialize allocations with the default ones
  const defaultAllocations = UNIT_ALLOCATIONS || [];
  // Initialize the form values with the default allocations and extra empty allocations
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialAllocations = [...defaultAllocations, ...Array(numExtraFields).fill({name: ''})];
  const initialValues = {
    allocations: initialAllocations,
  };
  const [removedFields, setRemovedFields] = useState();

  useEffect(() => {
    const removedNum = initialValues.allocations.length - removedFields;
    setRemovedNumber(removedNum);
  }, [removedFields, initialValues.allocations.length]);

  const updateAllocationImagesMutation = useMutation(
    formData => updateAllocationImages(unitId, formData),
    {
      onSuccess: async res => {
        toast({
          title: 'Updated Successfully',
          description: `${
            res?.response?.data?.message ?? res?.response?.message ?? res?.message ?? ''
          }`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
      onError: res => {
        console.log(res);
        return toast({
          title: 'Oops ...',
          description: `${
            err?.response?.data?.message ??
            err?.response?.message ??
            err?.message ??
            'Something went wrong, we are working on resolving it'
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );
  const updateAllocation = useMutation(formData => updateAllocationValues(unitId, formData), {
    onSuccess: async res => {
      await refetch();
    },
    onError: res => {
      console.log(res);
      return toast({
        title: 'Oops ...',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.message ??
          'Something went wrong, we are working on resolving it'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const updateQuantity = useMutation(body => EditUnitQuantity(unitId, body), {
    onSuccess: res => {
      console.log(res);
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

  const handleSubmit = values => {
    // Find the removed allocations by comparing the initial values with the current values
    const removed =
      qtyAmount < 0
        ? initialValues.allocations
            .filter(
              initialAllocation =>
                !values.allocations.some(
                  currentAllocation =>
                    // Compare based on some unique identifier like an ID
                    initialAllocation.name === currentAllocation.name
                )
            )
            .map(item => item?.name)
        : [];
    // Find the newly added allocations
    const added =
      qtyAmount > 0 ? values.allocations.slice(-numExtraFields).map(item => item?.name) : [];

    const UPDATED_IMAGES_BODY = {
      old_photos: photoUrls,
      new_photos: extractBase64(photoString),
    };
    if (photoUrls.length > 0 || photoString.length > 0) {
      updateAllocationImagesMutation.mutate({...UPDATED_IMAGES_BODY});
    }
    updateAllocation.mutate({
      add_units: added,
      remove_units: removed,
    });
    updateQuantity.mutate({
      quantity: quantityData,
    });

    queryClient.invalidateQueries('allocation-per-unit');

    setTimeout(() => {
      if (!updateAllocationImagesMutation.isLoading && !updateAllocation.isLoading) {
        router.back();
      }
    }, 2500);
  };
  const positiveNumber = Math.abs(qtyAmount);
  useEffect(() => {
    const storedQuantityData = sessionStorage.getItem('editedQuantity');
    if (storedQuantityData) {
      setQuantityData(parseInt(storedQuantityData));
    }
  }, []);

  const totalUnits =
    Number(qtyAmount) > 0
      ? initialValues.allocations.length
      : initialValues.allocations.length - positiveNumber;

  return (
    <div style={{background: '#FAFAFA'}}>
      <LayoutView activePage="listings" />
      {ALLOCATIONS_PER_UNIT?.isLoading ? (
        <AnimatedLoader />
      ) : (
        <Box
          mx="auto"
          px={'48px'}
          pb="88px"
          maxW="1300px"
          className="relative w-100"
          style={{marginTop: '-84vh'}}
          fontFamily="Euclid Circular B"
        >
          <HStack onClick={() => router.back(-1)}>
            <Image
              style={{cursor: 'pointer'}}
              mr={2}
              height="50px"
              w="50px"
              src={backArrow.src}
              alt="back_arrow"
            />
            <Text fontSize="24px" fontWeight={'600'}>
              Back
            </Text>
          </HStack>
          <Heading {...themeStyles.textStyles.h3}>Update Unit Allocation Diagram</Heading>

          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({values, setFieldValue, isValid}) => (
              setRemovedFields(values.allocations.length),
              (
                <Form>
                  <Box
                    px="43px"
                    py="37px"
                    bg="#fff"
                    borderRadius="16px"
                    border={'1px solid #E4E4E4'}
                  >
                    <EditAllocationImages
                      photoUrls={photoUrls}
                      photoString={photoString}
                      setPhotoUrl={setPhotoUrl}
                      setPhotoString={setPhotoString}
                      w="full"
                      minW="fit-content"
                      imageColumns={3}
                      title={`Upload/Drag 'n' drop Image`}
                      icon={imageIcon.src}
                      type={{'image/*': ['.jpg', '.png']}}
                      files={files}
                      setFiles={setFiles}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                    <VStack align={'flex-start'} py={4}>
                      <Text fontSize={'20px'} fontWeight={500}>
                        Name Allocations
                      </Text>
                      <Text>
                        {` You've ${Number(qtyAmount) > 0 ? 'increased' : 'reduced'} the quantity to
                        ${totalUnits} units. Kindly
                        ${
                          Number(qtyAmount) > 0
                            ? `number the new ${positiveNumber} ${positiveNumber > 1 ? 'units' : 'unit'}`
                            : `remove ${positiveNumber} ${positiveNumber > 1 ? 'units' : 'unit'}  from the ${initialValues.allocations.length}`
                        }
                        to proceed`}
                      </Text>
                    </VStack>
                    <FieldArray
                      name="allocations"
                      render={({remove, push}) => (
                        <SimpleGrid columns={2} spacing={'40px 50px'} my={'10px'}>
                          {values.allocations.map((allocation, index) => {
                            const isFieldEnabled = index >= values.allocations.length - positiveNumber;
                            return (
                              <HStack key={index} position={'relative'}>
                              <Field
                                type="text"
                                required
                                disabled={!isFieldEnabled}
                                className="formik__field"
                                name={`allocations.${index}.name`}
                                placeholder={`Allocation ${index + 1}`}
                              />
                              {qtyAmount > 0 ? null : (
                                <Tooltip
                                  bg={'white'}
                                  color={'black'}
                                  fontSize={12}
                                  fontWeight={300}
                                  label="Remove"
                                  aria-label="A tooltip"
                                >
                                  <Image
                                    alt=""
                                    top={'35%'}
                                    right="3%"
                                    position="absolute"
                                    src={crossCircle.src}
                                    type="button"
                                    onClick={() => remove(index)}
                                    cursor={'pointer'}
                                  />
                                </Tooltip>
                              )}
                            </HStack>
                            )
                      })}
                        </SimpleGrid>
                      )}
                    />
                    <HStack w="full" justify={'flex-end'}>
                      <Button
                        mt="4"
                        fontSize="16px"
                        fontWeight="500"
                        width="202px"
                        height="55px"
                        border="1px solid #FF3636"
                        color="#FF3636"
                        onClick={() => router.back(-1)}
                        borderRadius='72px'
                      >
                        Discard
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        isDisabled={qtyAmount > 0 ? false : removedNumber !== positiveNumber}
                        borderRadius='72px'
                      >
                        {updateAllocationImagesMutation?.isLoading ||
                        updateAllocation?.isLoading ? (
                          <Spinner color="#FFFFFF" />
                        ) : (
                          'Proceed'
                        )}
                      </Button>
                    </HStack>
                  </Box>
                </Form>
              )
            )}
          </Formik>
        </Box>
      )}
    </div>
  );
};
export default EditAllocations;
