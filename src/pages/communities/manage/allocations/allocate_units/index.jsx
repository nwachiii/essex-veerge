import {Box, Center, Flex, Grid, GridItem, Image, Text, VStack, useToast} from '@chakra-ui/react';
import React, {useState} from 'react';
import {Button} from '../../../../../ui-lib/ui-lib.components';
import {useRouter} from 'next/router';
import {ErrorMessage, Field, FieldArray, Form, Formik} from 'formik';
import * as Yup from 'yup';

export const AllocateUnits = ({uploads, handleProgress}) => {
  const router = useRouter();
  const toast = useToast();
  const unitQuantity = router?.query?.qty;
  const totalArchived = router?.query?.archive;
  const [activeImg, setActiveImg] = useState(uploads[0]);

  const validationSchema = Yup.object().shape({
    allocations: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Allocation name is required'),
      })
    ),
  });

  return (
    <div>
      <Text fontSize="32px" fontWeight="500" lineHeight="41px" color="#191919" mt="42px" mb="20px">
        Allocate Units
      </Text>
      <Box px="43px" py="37px" bg="#fff" borderRadius="16px">
        <Box
          minW={{base: '90%', xl: '580px'}}
          h="558px"
          border="1.5px solid #4545FE"
          borderRadius="32px"
        >
          <Image alt="" src={activeImg} width="full" height="full" borderRadius="32px" />
        </Box>
        <Flex align={'center'} p={6}>
          {uploads.map((upload, index) => (
            <Flex maxW="680px" wrap="flex-wrap" key={index} align="center" h="full">
              <Box pos="relative" h="full" mr={8}>
                {activeImg === upload && (
                  <Flex
                    justify={'center'}
                    alignItems={'center'}
                    cursor="pointer"
                    pos="absolute"
                    right="0"
                    zIndex={1000}
                    bottom="0"
                    left="0"
                    top="0"
                    margin="auto"
                    width="95px"
                    height="35px"
                    borderRadius="12px"
                    alt="cancel_icon"
                    bg="rgba(25, 25, 25, 0.32)"
                  >
                    <Text color="#191919" lineHeight="20px" fontSize="16px" fontWeight="600">
                      Selected
                    </Text>
                  </Flex>
                )}

                <VStack
                  width="196px"
                  height="200px"
                  borderRadius="16px"
                  boxSize={140}
                  boxShadow={'sm'}
                >
                  <Image
                    alt=""
                    onClick={() => setActiveImg(upload)}
                    src={upload}
                    width="full"
                    height="full"
                    borderRadius="16px"
                  />
                </VStack>
              </Box>
            </Flex>
          ))}
        </Flex>
        <Text
          fontSize="24px"
          fontWeight="500"
          lineHeight="30px"
          color="#191919"
          mt="72px"
          mb="30px"
        >
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
          onSubmit={async values => {
            const ALLOCATION_NAMES = values?.allocations.map(item => item?.name);
            localStorage.setItem('allocations_data', JSON.stringify(ALLOCATION_NAMES));
            handleProgress(step => (parseInt(totalArchived) == 0 ? step + 2 : step + 1));

            // console.log('allocations', ALLOCATION_NAMES);
          }}
        >
          {({values, isSubmitting, setFieldValue, isValid, dirty}) => (
            <Form>
              <FieldArray name="allocations">
                {({insert, remove, push}) => (
                  <>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      {Array(parseInt(unitQuantity) || 6)
                        .fill(1)
                        .map((item, i) => (
                          <GridItem key={i} colSpan={1}>
                            <div>
                              <label htmlFor={`allocations.${i}.name`}>Allocation {i + 1}</label>
                              <Field
                                required
                                type="text"
                                placeholder="Enter allocation name"
                                className="formik__field"
                                name={`allocations.${i}.name`}
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
                    <Flex
                      mt="100px"
                      direction={'row'}
                      justifyContent={'flex-end'}
                      width="100%"
                      alignItems="center"
                    >
                      <Center
                        onClick={() => router.back(-1)}
                        width="202px"
                        height="55px"
                        borderRadius={'72px'}
                        border="1px solid #FF3636"
                        color="#FF3636"
                      >
                        Discard
                      </Center>
                      <Button
                        isDisabled={isSubmitting || !(isValid && dirty)}
                        type="submit"
                        ml="28px"
                        mt={0}
                        width="202px"
                        height="55px"
                        variant="primary"
                        borderRadius="72px"
                      >
                        Proceed
                      </Button>
                    </Flex>
                  </>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default AllocateUnits;
