import {AddIcon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {PHONEPREFIX} from 'constants/PHONEPREFIX';
import React from 'react';
import {RiSubtractFill} from 'react-icons/ri';
import dropDownIcon from '/src/images/icons/dropDownForRoleSelection.svg';
import 'react-international-phone/style.css';
import 'react-international-phone/style.css';

import {defaultCountries, FlagImage, parseCountry, usePhoneInput} from 'react-international-phone';
import countries from 'constants/auth/country';

export const CustomNumberInput = ({
  label,
  getIncrementButtonProps,
  getDecrementButtonProps,
  getInputProps,
  background,
}) => {
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <VStack w={'full'} align="flex-start">
      <Text fontSize={'14px'} color="#191919">
        {label || 'Number'}
      </Text>
      <HStack w="full">
        <Input h="48px" {...input} />
        <Button type="button" h="48px" w="84px" bg={background} {...inc}>
          <AddIcon fontWeight={'900'} fontSize={'18px'} color="#FFF" />
        </Button>
        <Button type="button" h="48px" w="84px" bg={background} {...dec}>
          <RiSubtractFill style={{fontSize: '18px', color: '#FFF'}} />
        </Button>
      </HStack>
    </VStack>
  );
};

export const PhoneNumberInput = ({
  label,

  countrySelectHandleChange,
  inputValue,
  inputOnchange,
  labelStyles,
  sTop,
  userLogin,
  formik,
  error,
  selectStyles,
  labelSize,
  countryId = '1',
  inputStyles,
  textStyle,
  ...rest
}) => {
  const countryCode = PHONEPREFIX.find(item => item.name === countryId)?.code;

  const formatToPhoneNumber = val => {
    // const formattedNumber = val.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

    // const formattedNumber = val.replace(/(\d{1,3})(?=(\d{3})+(?!\d))/g, '$1 ');
    // return formattedNumber.trim();

    const formattedNumber = val.replace(
      /(\d{1,3})(\d{1,3})?(\d{1,4})?(\d{1,4})?/,
      (_, p1, p2, p3, p4) => {
        let result = '';
        if (p1) result += p1;
        if (p2) result += ' ' + p2;
        if (p3) result += ' ' + p3;
        if (p4) result += ' ' + p4;
        return result;
      }
    );
    return formattedNumber;
  };
  return (
    <Stack>
      {label ? (
        <Text color={'#919191'} {...labelStyles}>
          {label}
        </Text>
      ) : null}
      <InputGroup position="relative" borderColor={'#747474'}>
        <InputLeftElement
          h={inputStyles?.h || inputStyles?.height ? inputStyles?.h || inputStyles?.height : '55px'}
          p="0px"
        >
          <Box
            position="relative"
            w="100px"
            height={
              inputStyles?.h || inputStyles?.height ? inputStyles?.h || inputStyles?.height : '55px'
            }
          >
            <HStack spacing="10px" pl="16px" h="full">
              <Text fontSize="14px" color="#606060" fontWeight="400" {...textStyle}>
                {countryCode}
              </Text>
              <Image src={dropDownIcon.src} alt="dropDown icon" />
            </HStack>
            <Select
              name="country"
              overflowX="hidden"
              // hidden={true}
              opacity="0"
              onChange={countrySelectHandleChange}
              icon={<Image opacity="0" src={dropDownIcon.src} alt="dropDown icon" />}
              // onChange={updateDisplayedValue}
              w="70px"
              zIndex="2"
              position="absolute"
              p="0px"
              cursor="pointer"
              left="0"
              top={'2px'}
              // bottom="3px"

              value={countryId}
              border="none"
              required
              // fontWeight="400"
              // fontSize="20px"
              // icon={<DropDown />}
              id="countryPhoneNumber"
              lineHeight="18px "
              color="#919191"
              fontSize="14px"
              height={
                inputStyles?.h || inputStyles?.height
                  ? inputStyles?.h || inputStyles?.height
                  : '55px'
              }
              fontWeight="300"
              _focus={{
                border: 'none',
              }}
              _active={{
                border: 'none',
              }}
              _focusVisible={
                {
                  // border: 'none',
                }
              }
              {...selectStyles}
            >
              {PHONEPREFIX.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {`${item.code}   ${item.name}`}
                  </option>
                );
              })}
              {/* <option value="married">+234</option> */}
            </Select>
          </Box>
        </InputLeftElement>

        <Input
          width="100%"
          height="55px"
          borderRadius="8px"
          textAlign="left"
          pl="70px"
          color="#191919"
          background="transparent"
          border="0.5px #E4E4E4 solid"
          containerClass="#000"
          fontSize={'14px'}
          fontWeight="400"
          value={formatToPhoneNumber(inputValue)}
          onChange={inputOnchange}
          {...inputStyles}
        />
      </InputGroup>
    </Stack>
  );
};

export default CustomNumberInput;

const extractCountryKey = (key, country) => {
  const defaultCountry = country
    ? country
    : localStorage.getItem('baseCountry') !== 'undefined' && localStorage.getItem('baseCurrency')
      ? localStorage.getItem('baseCountry')
      : 'United States Of America';

  return countries.find(item => item.name === 'Nigeria')?.[key]?.toLowerCase() || 'us';
};

export const InputPhoneNumber = ({
  value,
  countryValue,
  dialCodeWrapper,
  inputGroupStyle,
  inputOnChange,
  countryOnChange,
  selectStyles,
  inputStyles,
  h,
}) => {
  const {inputValue, handlePhoneValueChange, inputRef, country, setCountry} = usePhoneInput({
    defaultCountry: extractCountryKey('code', countryValue),
    value,
    disableDialCodeAndPrefix: true,

    disableDialCodePrefill: true,
    countries: defaultCountries,
    onChange: data => {
      inputOnChange(data.inputValue);
      countryOnChange(data.country.name);
    },
  });

  const displayDialCode = country => {
    return `+${
      defaultCountries.find(item => {
        return item[0] === country?.name;
      })?.[2] || '1'
    }`;
  };

  return (
    <InputGroup position="relative" borderColor={'#747474'} {...inputGroupStyle}>
      <InputLeftElement h={h || '55px'} p="0px">
        <Box position="relative" w="100px" h={h || '55px'}>
          <HStack spacing="10px" pl="16px" h="full" {...dialCodeWrapper}>
            <Text fontSize="14px" color="#606060" fontWeight="400">
              {displayDialCode(country)}
            </Text>
            <Image src={dropDownIcon.src} alt="dropDown icon" />
          </HStack>
          <Select
            name="country"
            overflowX="hidden"
            opacity="0"
            onChange={e => setCountry(e.target.value)}
            icon={<Image opacity="0" src={dropDownIcon.src} alt="dropDown icon" />}
            w="70px"
            zIndex="2"
            position="absolute"
            p="0px"
            cursor="pointer"
            left="0"
            top={'2px'}
            value={country.iso2}
            border="none"
            id="countryPhoneNumber"
            lineHeight="18px "
            color="#919191"
            fontSize="14px"
            fontWeight="300"
            _focus={{
              border: 'none',
            }}
            _active={{
              border: 'none',
            }}
            _focusVisible={
              {
                // border: 'none',
              }
            }
            h={h || '55px'}
            {...selectStyles}
          >
            {defaultCountries.map((item, index) => {
              const country = parseCountry(item);
              return (
                <option key={index} value={country.iso2}>
                  +{`${country.dialCode} ${country.name}`}
                </option>
              );
            })}
            {/* <option value="married">+234</option> */}
          </Select>
        </Box>
      </InputLeftElement>

      <Input
        width="100%"
        ref={inputRef}
        h={h || '55px'}
        borderRadius="8px"
        textAlign="left"
        pl="70px"
        color="#191919"
        background="transparent"
        border="0.5px #E4E4E4 solid"
        containerClass="#000"
        fontSize={'14px'}
        fontWeight="400"
        value={inputValue}
        onChange={handlePhoneValueChange}
        {...inputStyles}
      />
    </InputGroup>
  );
};
