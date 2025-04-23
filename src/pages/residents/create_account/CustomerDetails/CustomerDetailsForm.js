import {Box, SimpleGrid, Stack, Text, Textarea} from '@chakra-ui/react';
import {useEffect} from 'react';
import PhoneInput from 'react-phone-input-2';
import {Input} from '../../../../ui-lib';
import {telInputProps, telInputStyles} from '../../../auth/onboarding/create_account/account_setup';

import DocInput from 'ui-lib/ui-lib.components/Input/DocInput';
import {InputPhoneNumber, PhoneNumberInput} from 'ui-lib/ui-lib.components/NumberInput';
import {CustomPhoneNumberInput} from 'ui-lib/ui-lib.components/Input/Input';

export default function CustomerDetailsForm({
  formik,
  file,
  setFile,
  docObj,
  setDocObj,
  handleIdDoc,
  phone,
  country,
  setCountry,
  setPhone,
}) {
  // useEffect(() => {
  //   setPhone(phone.slice(0, 10));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [phone.length == 10]);

  const handleCountrySelection = val => {
    setCountry(val.target.value);
  };

  const handlePhone = val => {
    // setPhone(val)
    function extractNumbers(inputString) {
      const result = inputString.replace(/\D/g, '');
      return result;
    }

    const phonenumber = extractNumbers(val);

    setPhone(phonenumber);
  };

  const inputStyles = {
    h: '50px',
    placeholder: 'Enter phone number',
    _placeholder: {color: '#606060', fontSize: '14px', fontWeight: '400'},
  };

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',

      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      marginTop: '10px',
      marginBottom: '10px',

      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#cbcbcb',
      // outline: '1px solid slategrey', // You can include this line if needed
    },
  };

  const stylingForPhoneInputComponent = {
    '.form-control': {
      paddingLeft: '46px',
    },
    '.selected-flag': {
      paddingLeft: '16px',
    },
    '.flag-dropdown': {
      background: 'transparent',
      border: 'none',
    },
    '.react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus': {
      background: 'transparent',
    },
    '.react-tel-input .form-control:focus': {
      boxShadow: '0 0 0 1.7px #3182ce',
    },
    '.react-tel-input .selected-flag.open,.react-tel-input .flag-dropdown.open': {
      background: 'transparent',
    },
  };

  const removeFile = () => {
    setDocObj({name: ''});
    setFile([]);
  };

  return (
    <SimpleGrid columns={2} alignItems="flex-end" spacingY="27px" spacingX={'88px'} mx="auto">
      <Input
        hideErrorMsg
        noLabel
        // mb="24px"
        mx={1}
        required
        h="50px"
        type="text"
        id="first_name"
        name="first_name"
        onChange={formik.handleChange}
        value={formik.values.first_name}
        placeholder="First name"
        _focusVisible={{
          boxShadow: '0 0 0 1px #3182ce',
          borderColor: '#3182ce',
        }}
        _placeholder={{
          color: '#606060',
          fontSize: '14px',
          fontWeight: '400',
        }}
        labelStyle={{
          color: '#191919',
          fontWeight: '400',
          my: '0px',
          mb: '3px',
        }}
      />
      <Input
        mx={1}
        hideErrorMsg
        noLabel
        required
        type="text"
        id="last_name"
        name="last_name"
        onChange={formik.handleChange}
        value={formik.values.last_name}
        h="50px"
        placeholder="Last name"
        _focusVisible={{
          boxShadow: '0 0 0 1px #3182ce',
          borderColor: '#3182ce',
        }}
        _placeholder={{
          color: '#606060',
          fontSize: '14px',
          fontWeight: '400',
        }}
        labelStyle={{
          color: '#191919',
          fontWeight: '400',
          my: '0px',
          mb: '3px',
        }}
      />
      <Input
        mx={1}
        hideErrorMsg
        noLabel
        type="text"
        id="middle_name"
        name="middle_name"
        onChange={formik.handleChange}
        value={formik.values.middle_name}
        h="50px"
        placeholder="Middle name"
        _focusVisible={{
          boxShadow: '0 0 0 1px #3182ce',
          borderColor: '#3182ce',
        }}
        _placeholder={{
          color: '#606060',
          fontSize: '14px',
          fontWeight: '400',
        }}
        labelStyle={{
          color: '#191919',
          fontWeight: '400',
          my: '0px',
          mb: '3px',
        }}
      />

      <Box alignSelf="end" sx={stylingForPhoneInputComponent}>
        {/* <PhoneNumberInput
          countryId={country}
          countrySelectHandleChange={handleCountrySelection}
          inputOnchange={handlePhone}
          inputValue={phone}
          inputStyles={inputStyles}
        /> */}
        <InputPhoneNumber
          value={phone}
          inputOnChange={handlePhone}
          countryOnChange={setCountry}
          inputStyles={inputStyles}
        />
      </Box>

      <Input
        required
        hideErrorMsg
        noLabel
        id="email"
        name="email"
        h="50px"
        type="email"
        placeholder="Email address"
        value={formik.values.email}
        onChange={formik.handleChange}
        _focusVisible={{
          boxShadow: '0 0 0 1px #3182ce',
          borderColor: '#3182ce',
        }}
        _placeholder={{
          color: '#606060',
          fontSize: '14px',
          fontWeight: '400',
        }}
        labelStyle={{
          color: '#191919',
          fontSize: '14px',
          fontWeight: '400',
          my: '0px',
          mb: '3px',
        }}
      />
      <Stack spacing="5px">
        <Text fontSize="14px" fontWeight="400" color="#191919">
          Upload ID (optional)
        </Text>

        <DocInput
          file={file}
          contract={''}
          removeFile={removeFile}
          docObj={docObj}
          handleIdDoc={handleIdDoc}
        />
      </Stack>

      <Stack spacing="5px">
        <Text as="label" fontSize="14px" fontWeight="400" color="#191919">
          Note
        </Text>
        <Box position="relative">
          <Textarea
            sx={customScrollbarStyles}
            borderRadius="8px"
            border="1px solid #E4E4E4"
            resize="none"
            h="106px"
            w="full"
            id="notes"
            placeholder="Add note"
            p="10px 17px 23px"
            fontSize="14px"
            fontWeight="400"
            color="#606060"
            _placeholder={{color: '#606060', fontSize: '14px', fontWeight: '400'}}
            maxLength={4500}
            value={formik.values.notes}
            onChange={formik.handleChange}
          />
          {formik.values?.notes?.length > 263 ? null : (
            <Text
              position="absolute"
              bottom="5px"
              right="9px"
              fontSize="12px"
              fontWeight="400"
              color="#919191"
            >
              Max 5000 words
            </Text>
          )}
        </Box>
      </Stack>
    </SimpleGrid>
  );
}
