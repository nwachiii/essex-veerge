import {
  Button,
  Divider,
  DrawerBody,
  DrawerCloseButton,
  Flex,
  HStack,
  Input,
  InputGroup,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {fetchCustomerViaEmail} from 'apis/customers';
import {PriceMenu} from 'pages/communities/create/WholeUnits/WholeUnits.Form';
import React, {useState} from 'react';
import {IoArrowBackSharp} from 'react-icons/io5';
import {formatToCurrency} from 'utils/formatAmount';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '16px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: 'inset 0 0 6px transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: '#e1e1e1',
    // outline: '1px solid #f5f5f5',
  },
};
export const InputTransferDetails = ({
  handleClose,
  no_of_paid_fraction,
  handleScreen,
  payloadObj,
  setPayLoadObj,
}) => {
  const [isEmailValid, setIsEmailValid] = useState('');
  const [customerName, setCustomerName] = useState(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = event => {
    const {value, name} = event.target;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    setPayLoadObj(prev => ({...prev, email: value}));
    if (regex.test(value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
      setCustomerName('');
    }
  };

  const handleChange = event => {
    let {value, name} = event.target;
    if (name === 'no_of_fraction') {
      const cleanedString = value.replace(/[^\d]/g, '');

      value = cleanedString.replace(/^0+(?=\d)/, '');
      if (Number(value) >= Number(no_of_paid_fraction)) {
        value = no_of_paid_fraction;
      }
    }

    setPayLoadObj(prev => ({...prev, [name]: value}));
  };

  const handleAmount = event => {
    const input = event.target.value || '';
    let val = input;

    const cleanedString = val.replace(/[^\d]/g, '');

    val = cleanedString.replace(/^0+(?=\d)/, '');

    const length = val.length;

    if (length === 0) {
      val = '0.00';
    } else if (length === 1) {
      val = '0.0' + val;
    } else if (length === 2) {
      val = '0.' + val.padStart(2, '0');
    } else {
      const integerPart = val.slice(0, length - 2);
      const decimalPart = val.slice(-2);
      val = integerPart + '.' + decimalPart;
    }
    setPayLoadObj(prev => ({...prev, amount: val}));
  };
  const isQueryEnabled = emailRegex.test(payloadObj.email);
  const {data, isError, isFetching} = useQuery(
    [payloadObj.email, 'customer-via-Email'],
    () => fetchCustomerViaEmail(payloadObj.email),

    {
      onSuccess: res => {
        if (res?.data?.data) {
          setCustomerName(`${res?.data?.data?.first_name} ${res?.data?.data?.last_name}`);
        }
      },
      enabled: isQueryEnabled,
      onError: () => {
        setCustomerName('');
      },
    }
  );

  const isLoading = isQueryEnabled && isFetching;
  const isValid = payloadObj?.amount && isEmailValid && Number(payloadObj?.no_of_fraction);

  return (
    <>
      <HStack
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        mb="10px"
        py="12px"
        px="29px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
      >
        <Flex width="full" gap="2" alignItems="center">
          <IoArrowBackSharp fontSize="20px" cursor="pointer" onClick={handleClose} />

          <Text fontSize="20px" fontWeight={600} color="#191919">
            Transaction Details
          </Text>
        </Flex>
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
      <DrawerBody pb="10px" mb="10px" sx={customScrollbarStyles} px="28px" pr="17px" mr="8px">
        <Stack spacing="28px" w="full">
          <Stack position="relative" w="full">
            <Input
              className="formik__field"
              type="text"
              placeholder="Enter Email Address"
              name={`email`}
              value={payloadObj?.email}
              onChange={handleEmailChange}
              style={{
                marginTop: '0px',
                width: '100%',
                height: '50px',
                borderRadius: '8px',
                borderColor: '#E4E4E4',
                fontSize: '14px',
                fontWeight: '400',
              }}
              _focus={{
                boxShadow: 'none',
              }}
              _placeholder={{
                color: '#606060',
                fontSize: '14px',
                fontWeight: '400',
              }}
            />
            <HStack position="absolute" bottom="-20px" right="5px" justify="end">
              {isLoading ? (
                <Spinner color="#e5e5e5" boxSize="15px" />
              ) : (
                <Text
                  fontSize="12px"
                  fontWeight="400"
                  color={isError || data?.response?.status ? '#FF6A6A' : '#191919'}
                  textTransform={isError || data?.response?.status ? 'initial' : 'capitalize'}
                >
                  {isError || data?.response?.status
                    ? "Account doesn't exist"
                    : isEmailValid
                      ? customerName
                      : null}
                </Text>
              )}
            </HStack>
          </Stack>
          <Stack position="relative" w="full">
            <Input
              className="formik__field"
              type="text"
              placeholder="Number of Fractions"
              name={`no_of_fraction`}
              value={Number(payloadObj?.no_of_fraction) ? payloadObj?.no_of_fraction : ''}
              onChange={handleChange}
              style={{
                marginTop: '0px',
                width: '100%',
                height: '50px',
                borderRadius: '8px',
                borderColor: '#E4E4E4',
                fontSize: '14px',
                fontWeight: '400',
              }}
              _focus={{
                boxShadow: 'none',
              }}
              _placeholder={{
                color: '#606060',
                fontSize: '14px',
                fontWeight: '400',
              }}
            />

            <Text
              position="absolute"
              right="2%"
              bottom="-18px"
              alignSelf="end"
              fontSize="12px"
              fontWeight="400"
              color={'#606060'}
            >
              {no_of_paid_fraction
                ? `${Number(payloadObj?.no_of_fraction)}/${no_of_paid_fraction}`
                : null}
            </Text>
          </Stack>
          <Stack gap={`10px`} w={`100%`}>
            <Text
              fontFamily="Euclid Circular B"
              ml={0}
              mb="0px"
              fontWeight="400"
              color="#191919"
              fontSize="12px"
            >
              Price per fraction
            </Text>
            <InputGroup
              align="center"
              border="1px solid #E4E4E4"
              h="50px"
              w="full"
              borderRadius={'8px'}
              py="4px"
            >
              <PriceMenu
                styleForIcon={{transform: 'scale(1)'}}
                fillForNairaSvgIcon="#000000"
                disableMenu
              />
              <Divider orientation="vertical" ml="4px" height="full" />

              <Input
                borderColor="transparent"
                borderLeft="none"
                boxShadow="none"
                marginBottom="0px"
                border="none"
                _focusVisible={{
                  border: 'none',
                }}
                fontWeight="400"
                fontSize="14px"
                w="full"
                height="100%"
                color="#606060"
                onChange={handleAmount}
                placeholder=""
                type="text"
                value={
                  Number(payloadObj.amount || 0)
                    ? formatToCurrency(payloadObj.amount, 'naira', null, true)
                    : ''
                }
              />
            </InputGroup>
          </Stack>
        </Stack>
        <Stack mt="17.11vh" spacing="34px">
          <Button
            w="full"
            h="45px"
            borderRadius="72px"
            isDisabled={!isValid}
            bg="#191919"
            color="#fff"
            fontSize="14.617px"
            fontWeight="400"
            _hover={{
              opacity: '1',
            }}
            onClick={handleScreen('2fa')}
            _focus={{opacity: '1'}}
            _active={{opacity: '1'}}
          >
            Proceed
          </Button>
        </Stack>
      </DrawerBody>
    </>
  );
};
