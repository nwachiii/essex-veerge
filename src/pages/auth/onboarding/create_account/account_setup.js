import axios from 'utils/axiosInstance';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';
import React, {Fragment, useState} from 'react';
import PhoneInput from 'react-phone-input-2';
import {useMutation} from '@tanstack/react-query';
import {Button, Form, Input} from 'ui-lib/ui-lib.components';
import {BaseURL_ONE} from '../../../../constants/routes';
import {Box, Flex, Spinner, Stack, Text, useDisclosure, useToast} from '@chakra-ui/react';
import CreateAccountAssistance from '../../../../components/VeergeAssistance/CreateAccountAssistance';

import 'react-phone-input-2/lib/style.css';
import Head from 'next/head';
import Link from 'next/link';

export default function AccountSetup() {
  const toast = useToast();
  const router = useRouter();
  const WIDGET_MODAL = useDisclosure();
  const [phone, setPhone] = useState('');
  const [check, setCheck] = useState(false);
  const nextPage = '/auth/onboarding/create_account/phone_verification';

  // Post request to the server
  const mutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/create_totp_phone_developer`, {
        phone: formData,
        country: 1,
      });
    },
    {
      onSuccess: res => {
        setTimeout(() => {
          router.push(nextPage);
        }, 1000);
      },
      onError: err => {
        console.log(err);
        toast({
          title: `${err.response.data.phone || err.response.data.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  // check if window is undefined, this tells next.js to render on the client side
  const currentSignUpData =
    typeof window !== undefined &&
    localStorage.getItem('SignUpData') !== undefined &&
    JSON.parse(localStorage.getItem('SignUpData'));

  const formik = useFormik({
    initialValues: currentSignUpData ? currentSignUpData : {},
    onSubmit: values => {
      mutation.mutate(phone?.slice(3));
      localStorage.setItem('SignUpData', JSON.stringify({...values, phone}));
    },
  });
  const isFieldEmpty =
    !formik.values?.company_address ||
    !formik.values?.company_name ||
    !formik.values?.role ||
    !phone ||
    check == false;

  return (
    <Fragment>
      <Head>
        <title>Veerge | Create Account</title>
        <meta name="description" content="Veerge | Create Account" />
        <meta name="theme-color" content="#191919" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <Form as="form">
        <Form.Header fontSize="32px" fontWeight="600">
          Account setup
        </Form.Header>
        <Form.Body>
          <Stack spacing={'8px'}>
            <Box mb="10px">
              <PhoneInput
                enableSearch={true}
                countryCodeEditable={true}
                id="phone"
                name="phone"
                country={'ng'}
                type="tel"
                inputProps={telInputProps}
                inputStyle={telInputStyles}
                defaultValue={phone}
                onKeyPress={e => (e.cancelable ? e.preventDefault() : console.log(''))}
                onChange={phone => setPhone(phone)}
                _focus={{outline: `none`}}
                _focusVisible={{outline: `none`}}
              />
            </Box>
            <Input
              isAuth
              mx={1}
              required
              type="text"
              id="company_name"
              name="company_name"
              onChange={formik.handleChange}
              value={formik?.values?.company_name}
              placeholder={`Company's name`}
              // _placeholder={{
              //   color: 'gray.500',
              // }}
            />
            <Input
              isAuth
              mx={1}
              required
              type="text"
              id="company_address"
              name="company_address"
              onChange={formik.handleChange}
              value={formik?.values?.company_address}
              placeholder={`Company's physical address`}
              // _placeholder={{
              //   color: 'gray.500',
              // }}
            />

            {/* <Input
							isAuth
							mx={1}
							required
							id='cac_number'
							name='cac_number'
							onChange={formik.handleChange}
							value={formik?.values?.cac_number}
							placeholder={`Company's registration number (optional)`}
							_placeholder={{
								color: 'gray.500',
							}}
						/> */}
            <Input
              isAuth
              mx={1}
              required
              type="text"
              id="role"
              name="role"
              onChange={formik.handleChange}
              value={formik?.values?.role}
              placeholder={`Your role`}
              // _placeholder={{
              //   color: 'gray.500',
              // }}
            />
            <Flex gap="3px" align={'flex-start'} w="95%" pl={2}>
              <input type="checkbox" onChange={e => setCheck(e.target.checked)} isChecked={check} />
              <Text fontSize="14px" ml={2} textAlign={'left'}>
                I acknowledge I am qualified to enter this agreement on behalf of the company{' '}
              </Text>
            </Flex>
          </Stack>
        </Form.Body>
        <Form.Footer>
          <Button
            fontSize={'18px'}
            fontWeight="500"
            mx="auto"
            variant={'tertiary'}
            type="button"
            onClick={formik.handleSubmit}
            isDisabled={isFieldEmpty}
            borderRadius="72px"

            // onClick={formik.handleSubmit}
          >
            {mutation.isLoading ? <Spinner color="#191919" /> : 'Proceed'}
          </Button>
        </Form.Footer>
      </Form>
      <CreateAccountAssistance WIDGET_MODAL={WIDGET_MODAL} />
    </Fragment>
  );
}

export const telInputStyles = {
  width: '100%',
  height: '55px',
  borderRadius: '8px',
  border: 'none',
  textAlign: 'left',
  color: '#FFFFFF',
  background: 'transparent',
  border: '0.5px lightgrey solid',
  containerClass: '#000',
  outline: `none`,
  boxShadow: 'none',
};

export const telInputProps = {required: true, autoFocus: true, placeholder: 'Enter phone number'};

// src / pages / auth / onboarding / create_account / account_setup.js;
