import React from 'react';
import {formatToCurrency} from 'utils/formatAmount';
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
  VStack,
} from '@chakra-ui/react';
import {IoArrowBackSharp} from 'react-icons/io5';
import {PriceMenu} from 'pages/listings/create/WholeUnits/WholeUnits.Form';

export const InputRefundAmount = ({setAmount, navigateBack, handleScreen, amount}) => {
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
    setAmount(val);
  };
  const isValid = amount;

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
            Refund
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
            <DrawerCloseButton position="initial" />
          </VStack>
        </HStack>
      </HStack>
      <DrawerBody marginTop="1rem" px={8}>
        <Stack as="form" onSubmit={handleScreen('2fa')}>
          <Stack gap={`10px`} w={`100%`}>
            <Text
              fontFamily="Euclid Circular B"
              ml={0}
              mb="0px"
              fontWeight="400"
              color="#191919"
              fontSize="12px"
            >
              Amount to refund
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
                placeholder="0.00"
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
                color="#191919"
                _placeholder={{
                  color: '#606060',
                }}
                onChange={handleAmount}
                type="text"
                value={formatToCurrency(amount, 'naira', null, true)}
              />
            </InputGroup>
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
              type="submit"
              _focus={{opacity: '1'}}
              _active={{opacity: '1'}}
            >
              Proceed
            </Button>
          </Stack>
        </Stack>
      </DrawerBody>
    </>
  );
};
