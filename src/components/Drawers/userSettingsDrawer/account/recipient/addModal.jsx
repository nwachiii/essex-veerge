import React, {useState} from 'react';
import {
  Heading,
  FormControl,
  Stack,
  Box,
  Text,
  Select,
  useToast,
  Image,
  DrawerBody,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  VStack,
  HStack,
  DrawerFooter,
} from '@chakra-ui/react';
import {ErrorMessage, useFormik} from 'formik';
import {Button, Input, Popup2} from 'ui-lib/ui-lib.components';
import {useMutation, useQuery} from '@tanstack/react-query';
import {addBankAccount, BankList} from '/src/apis/settings';
import AnimateInput from '@/components/AnimateInput';
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
    <Drawer
      isOpen={isModalOpen}
      onClose={() => {
        formik.resetForm();
        onModalClose();
      }}
      size={'sm'}
    >
      <DrawerOverlay />
      <DrawerContent pt="67px">
        <HStack
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          mb="10px"
          py="12px"
          px="29px"
          justify="space-between"
          align="center"
          position="relative"
          width="full"
          bg="#F5F5F5"
        >
          <HStack spacing="8px">
            <Text textTransform={'capitalize'} fontSize="20px" fontWeight={600} color="#191919">
              Add Bank Account{' '}
            </Text>
          </HStack>
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
        <DrawerBody mb="0px">
          <Box
            bg="rgba(69, 69, 254, 0.10)"
            borderRadius="8px"
            padding="9px 10px"
            mt="10px"
            mb="24px"
          >
            <Text fontSize="12px" lineHeight="16px" fontWeight="300" color={'#3D3D3D'}>
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
              color={'#606060'}
              border="1px solid #e4e4e4"
              h="55px"
              borderRadius={'10px'}
              fontSize="12px"
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
            {/* <AnimateInput */}
            <AnimateInput
              mt="30px"
              w="full"
              pl="16px"
              borderRadius="10px"
              type="input"
              id="account_number"
              name="account_number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fontSize={'12px'}
              labelFontS={'12px'}
              labelColor={'#606060'}
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
          </FormControl>
        </DrawerBody>
        <DrawerFooter>
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
            // bg="#4545FE"
            fontSize="18px"
            fontWeight="400"
            borderRadius="72px"
          >
            Proceed
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default AddModal;
