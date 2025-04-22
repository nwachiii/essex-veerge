import React, {useState} from 'react';
import {Heading, FormControl, Stack, Box, Text, Select, useToast, Image} from '@chakra-ui/react';
import {ErrorMessage, useFormik} from 'formik';
import {Button, Input, Popup2} from '../../../../ui-lib';
import {useMutation, useQuery} from '@tanstack/react-query';
import {addBankAccount, BankList} from '../../../../apis/settings';
import AnimateInput from '../../../../components/AnimateInput';
import downArrow from '/src/images/icons/dropDownBankAccount.svg';

export const AddModal = ({isModalOpen, onModalClose, refetch, recipients}) => {
  const toast = useToast();
  const validateForm = values => {
    const errors = {};

    if (!Boolean(values.bank_code)) {
      errors.bank_code = 'Please Select The Bank !';
    }

    if (!values.account_number || values.account_number.length != 10) {
      errors.account_number = 'Please Enter the 10 digit Account Number !';
    } else if (!/^[0-9]+$/.test(values.account_number)) {
      errors.account_number = 'Please Enter the Digit Only !';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      console.log(JSON.stringify(values));
      mutate(values);
    },
    validate: validateForm,
    validateOnChange: true,
  });

  const {mutate, isLoading} = useMutation(
    values => {
      return addBankAccount(values);
    },
    {
      onSuccess: res => {
        console.log(res);
        formik.resetForm();
        onModalClose();
        refetch();
      },
      onError: err => {
        onModalClose();
        toast({
          status: 'error',
          position: 'top-right',
          title: err?.response?.data?.message || 'Something went wrong',
          description: 'Please try again later while we resolve it',
        });
      },
    }
  );

  return (
    <Popup2
      w="473px"
      mt="18vh"
      padding="30px 24px"
      isOpen={isModalOpen}
      onClose={() => {
        formik.resetForm();
        onModalClose();
      }}
      px={6}
    >
      <Popup2.Header>Add Bank Account</Popup2.Header>
      <Popup2.Body mr={0} mt="24px" mb="0px" px={0}>
        <Box bg="rgba(69, 69, 254, 0.10)" borderRadius="16px" padding="15px 12px" mb={'16px'}>
          <Text size="16px" lineHeight="20px" fontWeight="300" color={'#3D3D3D'} m="5px">
            You can only link your own bank account and cannot add a third-party account.
          </Text>
        </Box>

        <FormControl p="0px" px="2px" as="form" onSubmit={formik.handleSubmit}>
          <Select
            id="bank_code"
            name="bank_code"
            onChange={formik.handleChange}
            value={formik.values.bank_code}
            onBlur={formik.handleBlur}
            placeholder="Bank Name"
            _placeholder={{
              color: 'gray.400',
            }}
            border="1px solid #e4e4e4"
            h="55px"
            borderRadius={'10px'}
            fontSize="14px"
            icon={<Image src={downArrow.src} alt="down arrow" />}
          >
            {BankList().map(item => (
              <option value={item.code} key={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          {formik.errors.bank_code && formik.touched.bank_code ? (
            <Text color={'red'} fontSize={'14px'} my={'10px'}>
              {formik.errors.bank_code}
            </Text>
          ) : null}
          <AnimateInput
            mt="30px"
            w="full"
            borderRadius="10px"
            type="input"
            id="account_number"
            name="account_number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.account_number && formik.errors.account_number
                ? formik.errors.account_number
                : null
            }
            value={formik.values.account_number}
            placeholder="Account number"
            _placeholder={{
              color: '#19191966',
            }}
          />
          <Box width="100%">
            <Button
              mW="100%"
              alignSelf="strech"
              mt="16px"
              mb="0px"
              isF
              type="submit"
              isLoading={isLoading}
              onClick={formik.handleSubmit}
              variant="dark"
              bg="#4545FE"
              fontSize="18px"
              fontWeight="400"
              borderRadius='72px'

            >
              Proceed
            </Button>
          </Box>
        </FormControl>
      </Popup2.Body>
    </Popup2>
  );
};
export default AddModal;
