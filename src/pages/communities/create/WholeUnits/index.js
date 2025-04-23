import {
  Box,
  Container,
  extendTheme,
  HStack,
  SlideFade,
  Spinner,
  Text,
  Stack,
  Button as ChakraButton,
  useToast,
  Icon,
} from '@chakra-ui/react';
import axios from 'utils/axiosInstance';
import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';

import {theme, themeStyles} from '../../../../theme';
import {NEW_LISTING_UNITS_INFO} from '../../../../constants/createListing';

import {useRouter} from 'next/router';
import {UnitsHeader} from './new/UnitsHeader';
import {FieldArray, Form, Formik} from 'formik';
import {WholeUnitsForm} from './WholeUnits.Form';
import {AnimatedLoader} from '@/components/index';
import WholeUnitsOtherFees from './WholeUnits.OtherFees';
import {BaseURL_TWO} from '../../../../constants/routes';
import {
  cleanUpEmptyValues,
  handleUnitsIntegerValues,
} from '../../../../utils/removeEmptyObjectValues';
import {UploadUnitPhotos} from './new/UploadUnitPhotos';
import {AddMoreBtn, Button} from 'ui-lib/ui-lib.components';
import {FormErrorWrapper} from '@/components/formComponents/FormErrorWrapper';
import {AddIcon} from '@chakra-ui/icons';

const styles = extendTheme({...theme});

export default function WholeUnits({listingId, isLand, handleProgress}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem('devToken'));
  const projectId = listingId || JSON.parse(localStorage.getItem('newProjectId'));
  const listingInfo = localStorage && JSON.parse(localStorage.getItem('listingInfo'));

  const toast = useToast();

  const mutation = useMutation(
    formData => {
      return axios.post(
        `${BaseURL_TWO}/investment/create-bundle/`,
        {bundles: formData, project_id: Number(projectId)},
        {headers: {Authorization: `Bearer ${token}`}}
      );
    },
    {
      onSuccess: res => {
        toast({
          title: 'Units added successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        !handleProgress
          ? router.push(`/listings/manage/?listingId=${listingId}`)
          : setTimeout(() => {
              handleProgress(val => val + 1);
            }, 2600);
        handleProgress && localStorage.setItem('WholeUnitsHaveBeenAdded', 'true');
      },
      onError: err => {
        setLoading(false);
        toast({
          title: 'An error occured',
          description: `${err?.code} : ${err?.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const validateForm = values => {
    const errors = [{}];

    values?.units?.forEach((unit, index) => {
      if (unit?.photos?.length <= 0 || !unit?.photos) {
        errors[`${index}`].photos = 'You must upload a photo for this unit';
      }
      if (!unit?.unit_size) {
        errors[`${index}`].unit_size = 'Please provide a size for this unit';
      }
      if (!unit?.unit_description) {
        errors[`${index}`].unit_description = 'Please provide a description for this unit';
      }
      if (!unit?.unit_title) {
        errors[`${index}`].unit_title = 'Please provide a title for this unit';
      }
      // if (!unit?.no_of_bedrooms || unit?.no_of_bedrooms <= 0) {
      //   errors[`${index}`].no_of_bedrooms = 'Please provide the number of bedrooms this unit has';
      // }
      if (!unit?.price) {
        errors[`${index}`].price = 'Please enter the price of this unit';
      }
      if (!unit?.quantity) {
        errors[`${index}`].quantity = 'Please provide the number of units you would like';
      }
      // if (!unit?.outright_contract) {
      //   errors[`${index}`].outright_contract =
      //     'Please provide the purchase agreement for this unit';
      // }
    });
    const incomplete = errors.find(el => Object.keys(el).length > 0);

    return incomplete ? errors : {};
  };

  const initialValues = {units: [NEW_LISTING_UNITS_INFO]};

  return (
    <SlideFade in offsetX="100%" initialScale={1.2}>
      <Container
        {...styles.componentStyles.bigContainer}
        border={'1px solid #E9E9E9'}
        marginBottom="1em"
      >
        {loading ? (
          <Stack h="20vh">
            <AnimatedLoader showText="Saving unit information...this would only take a moment" />
          </Stack>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={values => {
              const alignedValuesToExpectedPayloadType = handleUnitsIntegerValues(values.units);
              cleanUpEmptyValues(alignedValuesToExpectedPayloadType);
              mutation.mutate(alignedValuesToExpectedPayloadType);

              setLoading(true);
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validate={validateForm}
          >
            {({values, errors, touched, setFieldValue}) => (
              <Form>
                <FieldArray name="units">
                  {({insert, remove, push}) => (
                    <>
                      <div>
                        {values.units.length > 0 &&
                          values.units.map((unit, index) => (
                            <Box key={index} w="full" position="relative">
                              <UnitsHeader index={index} remove={remove} values={values} />
                              <WholeUnitsForm
                                values={values?.units}
                                setFieldValue={setFieldValue}
                                index={index}
                                unit={unit}
                                errors={errors}
                                isLand={isLand}
                              />
                              <Text
                                color="#191919"
                                textStyle="p"
                                textAlign="left"
                                opacity={0.9}
                                w="100%"
                                fontWeight={'600'}
                                mb={2}
                                mt={'40px'}
                              >
                                Upload unit images
                              </Text>
                              <FormErrorWrapper
                                mt={0}
                                index={index}
                                values={values}
                                setFieldValue={setFieldValue}
                                border={'1.5px solid #E5E5E5'}
                                ChildComponent={UploadUnitPhotos}
                                error={errors[`${index}`]?.photos}
                              />
                              <WholeUnitsOtherFees
                                index={index}
                                unit={unit}
                                values={values}
                                setFieldValue={setFieldValue}
                              />
                            </Box>
                          ))}

                        <HStack mt="100px" w="full" justify="flex-end">
                          {/* TEMPORARILY TAKING THIS OUT IN VIEW OF A REWRITE */}
                          {/* {listingInfo &&
                            listingInfo?.building_type !== 'Land' &&
                            listingInfo?.building_type !== 'Detached' &&
                            listingInfo?.building_type !== 'Semi Detached' && (
                              <ChakraButton
                                h="57px"
                                w="200px"
                                color="#191919"
                                fontSize="18px"
                                fontWeight="400"
                                borderRadius="72px"
                                borderColor="#a3a3a3"
                                _hover={{opacity: 1}}
                                lineHeight="22.82px"
                                variant="md-outline-radius"
                                onClick={() => push({...NEW_LISTING_UNITS_INFO})}
                                leftIcon={<Icon boxSize="16px" as={AddIcon} />}
                              >
                                Add unit
                              </ChakraButton>
                            )} */}

                          <Button
                            withoutLoader
                            mt={0}
                            fontSize="18px"
                            fontWeight="400"
                            color="#FFFFFF"
                            bg={themeStyles.color.primary}
                            cursor="pointer"
                            maxW="217px"
                            borderRadius="72px"
                            type="submit"
                            _hover={{background: '#4545FE'}}
                            _active={{background: '#4545FE'}}
                            _focus={{background: '#4545FE'}}
                            rounded="full"
                          >
                            {mutation?.isLoading || loading ? <Spinner color="#FFF" /> : 'Proceed'}
                          </Button>
                        </HStack>
                      </div>
                    </>
                  )}
                </FieldArray>
              </Form>
            )}
          </Formik>
        )}
      </Container>
    </SlideFade>
  );
}
