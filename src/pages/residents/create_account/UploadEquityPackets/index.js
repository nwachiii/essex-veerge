import {useMutation} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {addEquityPackets, fetchAllocatedEquityInfo} from '../../../../apis/customers';
import {
  Box,
  Center,
  Container,
  Heading,
  Stack,
  Flex,
  Text,
  Input,
  useToast,
} from '@chakra-ui/react';
import {AnimatedLoader, Spinner} from '../../../../components/common/loaders/AnimatedLoader';
import {themeStyles} from '../../../../theme';
import {MultipleFileUploads} from '../../../../ui-lib';
import imageIcon from '/src/images/icons/image-upload.png';
import {Form, Field, Formik, FieldArray} from 'formik';
import {Button} from 'ui-lib';
import {encodeFileToBase64, extractBase64} from '../../../../utils';

export const UploadEquityPackets = ({handleProgress, subPages}) => {
  const [allocatedEquityInfo, setAllocatedEquityInfo] = useState(null);
  const toast = useToast();
  const equityIDs =
    typeof window !== 'undefined' && localStorage && JSON.parse(localStorage.getItem('equity'));
  const equityDetails =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('equityDetails'));

  const FETCH_EQUITY_ALLOCATION_INFO = useMutation(formData => fetchAllocatedEquityInfo(formData), {
    onSuccess: res => {
      console.log(res);
      setAllocatedEquityInfo(res.data.data);
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'Request failed',
        description: `An error occured while fetching`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const mutation = useMutation(formData => addEquityPackets(formData), {
    onSuccess: res => {
      handleProgress(step => (allocatedEquityInfo[0].allocations.length > 0 ? step + 1 : step + 2));
      toast({
        title: `Equity documents saved successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      console.log(err);
      toast({
        title: `${err?.response?.statusText}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  useEffect(() => {
    FETCH_EQUITY_ALLOCATION_INFO.mutate({equities: equityIDs});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log('allocated equity info', allocatedEquityInfo);
  return (
    <div>
      {' '}
      {FETCH_EQUITY_ALLOCATION_INFO.isLoading ? (
        <Center w="full" h="50vh">
          <AnimatedLoader />
        </Center>
      ) : (
        <Box>
          <Container
            p="12"
            maxW={'900px'}
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
            color="gray.900"
            borderRadius="2xl"
            background="#FFFFFF"
            box-shadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          >
            <Heading {...themeStyles.textStyles.h2} mt={0} ml={0} pb={3}>
              Upload a <span style={{color: '#4545FE'}}>contract</span> for{' '}
              <span style={{color: '#4545FE'}}>each</span> equity
            </Heading>
            <Formik
              initialValues={{
                packet_data: [
                  {
                    equity: '',
                    packets: [],
                  },
                ],
              }}
              onSubmit={values => {
                mutation.mutate({...values});
                // console.log('===', {...values});
              }}
            >
              {({setFieldValue, values, handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
                  <FieldArray name="packet_data">
                    {({insert, remove, push}) => (
                      <>
                        <Stack spacing={'35px'}>
                          {Array(allocatedEquityInfo?.length)
                            .fill(1)
                            .map((item, i) => (
                              <Box key={i}>
                                <Text
                                  as="label"
                                  htmlFor={`packet_data.${i}.equity_packets`}
                                  fontWeight={'500'}
                                  fontSize="18px"
                                  lineHeight="22.5px"
                                >
                                  {' '}
                                  For {equityDetails[i]?.project.name} ,{' '}
                                  {equityDetails[i]?.unit?.unit_title}
                                </Text>{' '}
                                <br />
                                <UploadEquityInput
                                  setFieldValue={setFieldValue}
                                  i={i}
                                  equityIDs={equityIDs}
                                />
                              </Box>
                            ))}
                        </Stack>
                        <Flex pt="40px" justify={'flex-end'} w="full" gap="12px">
                          <Button
                            w="150px"
                            isDisabled={mutation?.isLoading}
                            type="submit"
                            variant="dark"
                          >
                            {mutation?.isLoading ? 'Submitting...' : 'Submit'}
                          </Button>
                        </Flex>
                      </>
                    )}
                  </FieldArray>
                </Form>
              )}
            </Formik>
          </Container>
        </Box>
      )}
    </div>
  );
};

export default UploadEquityPackets;

export const UploadEquityInput = ({setFieldValue, i, equityIDs}) => {
  return (
    <Input
      id="file"
      name={`packet_data.${i}.equity_packets`}
      type="file"
      onChange={async event => {
        setFieldValue(`packet_data.${i}.equity`, equityIDs[i]);
        setFieldValue(
          `packet_data.${i}.packets`,
          [await encodeFileToBase64(event.currentTarget.files[0]).then(res => [res])][0]
        );
      }}
      className="formik_"
      maxW="450px"
      w="full"
      py="12px"
      mt="15px"
      h="fit-content"
      borderRadius="14px"
      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
    />
  );
};
