import {
  Box,
  Modal,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useToast,
  SimpleGrid,
  ModalHeader,
  Button,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useLayoutEffect } from 'react';
import {useRouter} from 'next/router';
// import {Button} from '../../../../../../ui-lib/ui-lib.components';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Field} from 'formik';
import {EditProjectCommission} from '../../../../../../apis/listings';

const SubmitSchema = Yup.object().shape({
  inHouseAgents: Yup.string().required('Required'),
  registeredRealtors: Yup.string().required('Required'),
});

export const EditCommissions = ({isOpen, onClose, defaultData, refetch}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useMutation(
    formData => {
      const data = {
        internal_commission_rate: formData.inHouseAgents,
        external_commission_rate: formData.registeredRealtors,
      };
      return EditProjectCommission(router.query.listingId, data);
    },
    {
      onSuccess: res => {
        console.log(res);
        setTimeout(() => {
          onClose();
        }, 2000);
        toast({
          title: 'Successfully Updated!',
          description: `Commission successfully updated.`,
          status: 'success',
          duration: 6000,
          isClosable: true,
          position: 'top-right',
        });
        queryClient.setQueryData(['listings', ''], res?.data?.project);
      },
      onError: err => {
        console.log(err);
        toast({
          title: `${err.code || 'Commission Request failed'}`,
          description: `${err.response.data.name ?? err}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  useEffect(() => {
    refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const numberInputOnWheelPreventChange = e => {
    const inputValue = e.target.value;
    const regex = !/^[0-9]+(\.[0-9]+)?$/; // Regular expression to match only positive numbers

    if (
      !regex.test(inputValue) ||
      parseFloat(inputValue) < 0 ||
      /[+\-*/^%]/.test(inputValue) ||
      /[+\-]/.test(inputValue)
    ) {
      e.preventDefault();
      return;
    }

    e.target.blur();
    // Prevent the page/container scrolling
    e.stopPropagation();

    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  function handleKeyDown(event) {
    // Prevent '-' character
    if (event.key === '-') {
      event.preventDefault();
    }
  }

  function handlePaste(event) {
    const pasteData = (event.clipboardData || window.clipboardData).getData('text');
    if (pasteData.startsWith('-')) {
      event.preventDefault();
    }
  }
  const handleInputChange = (e, setFieldValue) => {
    const val = e.target.value;
    const name = e.target.name;

    if (Number(val) >= 100) return setFieldValue(name, 100);
    return setFieldValue(name, val);
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="478px" borderRadius="16px">
        <ModalCloseButton />
        <ModalHeader fontSize={'24px'}>Commission</ModalHeader>
        <ModalBody px="30px" w="100%" mt="0" pb="31px">
          <Formik
            initialValues={{
              inHouseAgents: defaultData?.internal_commission_rate || '',
              registeredRealtors: defaultData?.external_commission_rate || '',
            }}
            validationSchema={SubmitSchema}
            onSubmit={values => mutation.mutate(values)}
          >
            {({handleChange, handleBlur, setFieldValue, handleSubmit, values, errors, touched}) => (
              <VStack width="100%" pb={'10px'}>
                <SimpleGrid w="full" spacing="30px" columns={1} mb="20px">
                  <Box>
                    <label fontSize="12px" fontWeight="400" lineHeight="15px">
                      {`Internal sales team (in-house)`}
                    </label>
                    <Field
                      bg="#E4E4E4"
                      mx={1}
                      required
                      type="number"
                      pattern="^[0-9]*$"
                      onPaste={handlePaste}
                      onKeyDown={handleKeyDown}
                      color="#CBCBCB"
                      id="inHouseAgents"
                      name="inHouseAgents"
                      _placeholder={{
                        color: 'white',
                      }}
                      className="formik__field"
                      defaultValue={values.inHouseAgents}
                      onBlur={handleBlur('inHouseAgents')}
                      onChange={
                        event => handleInputChange(event, setFieldValue)
                        // handleChange('inHouseAgents')
                      }
                      onWheel={numberInputOnWheelPreventChange}
                      borderBottom={
                        errors.inHouseAgents && touched.inHouseAgents ? 'red' : '1px solid #CBCBCB'
                      }
                      isAuth
                      placeholder="For internal sales team"
                    />
                  </Box>
                  <Box>
                    <label fontSize="12px" fontWeight="400" lineHeight="15px">
                      External registered realtors
                    </label>
                    <Field
                      bg="#E4E4E4"
                      className="formik__field"
                      color="#CBCBCB"
                      mx={1}
                      required
                      type="number"
                      pattern="^[0-9]*$"
                      onPaste={handlePaste}
                      onKeyDown={handleKeyDown}
                      id="registeredRealtors"
                      name="registeredRealtors"
                      onWheel={numberInputOnWheelPreventChange}
                      _placeholder={{
                        color: 'white',
                      }}
                      defaultValue={values.registeredRealtors}
                      onBlur={handleBlur('registeredRealtors')}
                      onChange={
                        // handleChange('registeredRealtors')
                        event => handleInputChange(event, setFieldValue)
                      }
                      borderBottom={
                        errors.registeredRealtors && touched.registeredRealtors
                          ? 'red'
                          : '1px solid #CBCBCB'
                      }
                      isAuth
                      placeholder=" For external registered realtors"
                    />
                  </Box>
                </SimpleGrid>
                <Flex w="full" direction="row" justifyContent="flex-end">
                  <Button
                    onClick={() => onClose()}
                    variant="outline-radius"
                    w="104px"
                    h="38px"
                    bg="transparent"
                    color="#FF6A6A"
                    fontSize="14px"
                    border="1px solid #FF6A6A"
                  >
                    Discard
                  </Button>
                  <Button
                    ml="12px"
                    disabled={mutation.isLoading}
                    loading={mutation.isLoading}
                    onClick={() => handleSubmit()}
                    variant="filled-radius"
                    w="104px"
                    fontSize="14px"
                    h="38px"
                    bg="#191919"
                    color="white"
                  >
                    {mutation.isLoading ? <Spinner color="#FFF" /> : 'Update'}
                  </Button>
                </Flex>
              </VStack>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditCommissions;
