import React from 'react';
import {formatNumberWithCommas, formatToCurrency} from 'utils/formatAmount';
import {
  Button,
  Divider,
  DrawerBody,
  DrawerCloseButton,
  Flex,
  HStack,
  Input,
  InputGroup,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import {IoArrowBackSharp} from 'react-icons/io5';
import {PriceMenu} from 'pages/listings/create/WholeUnits/WholeUnits.Form';
const formatNumberObj = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};
export const InputClosingCost = ({setValues, navigateBack, handleScreen, values}) => {
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
    setValues(prev => ({...prev, amount: Number(val)}));
  };

  const handleChange = e => {
    const {value, name} = e.target;
    setValues(prev => ({...prev, [name]: value}));
  };
  const isValid = values.amount >= 0 && values.name.trim();

  return (
    <>
      <HStack
        boxShadow="0px 3.206px 6.413px 0px rgba(0, 0, 0, 0.02)"
        mb="10px"
        py="12px"
        bg="#F5F5F5"
        h="49.7px"
        px="23.2px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
      >
        <Flex alignItems="center" gap={2}>
          <IoArrowBackSharp fontSize="20px" cursor="pointer" onClick={navigateBack} />
          <Text fontSize="20px" fontWeight={600} color="#191919">
            Additional Closing Cost
          </Text>
        </Flex>
        {/* <HStack spacing="15px">
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
            <DrawerCloseButton position="initial" />
          </VStack>
        </HStack> */}
      </HStack>
      <DrawerBody marginTop="1rem" px={8}>
        <Stack as="form" spacing="16px" onSubmit={handleScreen('2fa')}>
          <Input
            borderColor="#e4e4e4"
            placeholder="Closing cost name"
            _focusVisible={{
              boxShadow: 'none',
              borderColor: '#e4e4e4',
            }}
            _focus={{
              boxShadow: 'none',
              borderColor: '#e4e4e4',
            }}
            _hover={{bg: 'transparent'}}
            fontWeight="400"
            fontSize="14px"
            w="full"
            height="50px"
            mb="3px"
            color="#191919"
            _placeholder={{
              color: '#a3a3a3',
            }}
            onChange={handleChange}
            type="text"
            name="name"
            value={values.name}
          />
          <Stack gap={`10px`} w={`100%`}>
            <Text
              fontFamily="Euclid Circular B"
              ml={0}
              mb="0px"
              fontWeight="400"
              color="#191919"
              fontSize="12px"
            >
              Amount
            </Text>
            <InputGroup
              align="center"
              border="1px solid #E4E4E4"
              h="50px"
              w="full"
              _focus={{
                borderColor: '#525252',
              }}
              borderRadius={'8px'}
              // py="4px"
            >
              <PriceMenu
                styleForIcon={{transform: 'scale(1)'}}
                fillForNairaSvgIcon="#000000"
                disableMenu
              />
              <Divider orientation="vertical" ml="4px" height="full" />

              <Input
                borderColor="transparent"
                placeholder="0.00"
                borderLeft="none"
                _hover={{bg: 'transparent'}}
                boxShadow="none"
                marginBottom="0px"
                border="none"
                borderRadius="0px 8px 8px 0"
                _focusVisible={{
                  border: 'none',
                  outline: 'none',
                }}
                _focus={{
                  border: 'none',

                  outline: 'none',
                }}
                fontWeight="400"
                fontSize="14px"
                w="full"
                height="100%"
                color="#191919"
                _placeholder={{
                  color: '#606060',
                }}
                onChange={handleAmount}
                type="text"
                value={formatNumberWithCommas(values.amount, formatNumberObj)}
              />
            </InputGroup>
          </Stack>
          <Textarea
            value={values.extra_reason}
            onChange={handleChange}
            name="extra_reason"
            border={'1px solid #E4E4E4'}
            placeholder="Add note..."
            minH={'165px'}
            _focus={{
              boxShadow: 'none',
              borderColor: '#e4e4e4',
            }}
            _hover={{
              borderColor: '#e4e4e4',
            }}
            fontSize="10px"
            fontWeight="300"
            lineHeight="14px"
            p="12px"
            borderRadius="6.68px"
            resize={'none'}
          />
          <Stack mt="17.11vh" spacing="34px">
            <Button
              variant="filled-radius"
              h={'45px'}
              fontWeight={400}
              w="full
"
              isDisabled={!isValid}
              fontSize="14.91px"
              lineHeight="18.9px"
              type="submit"
            >
              Proceed
            </Button>
          </Stack>
        </Stack>
      </DrawerBody>
    </>
  );
};
