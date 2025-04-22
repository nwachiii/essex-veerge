import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalCloseButton,
  SlideFade,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import {PriceMenu} from 'pages/listings/create/WholeUnits/WholeUnits.Form';
import React, {useEffect, useState} from 'react';
import {formatNumberWithCommas, formatToCurrency} from 'utils/formatAmount';
import minusIcon from '/src/images/icons/substractIcon.svg';
import {PlusIcon} from '@/components/assets/PlusIcon';
import InfoIcon from '@/components/assets/infoIcon';
import {useMutation} from '@tanstack/react-query';
import {calculateTotalFractions} from 'apis/listings';
import {toastForError} from 'utils/toastForErrors';

const Fractionalize = ({
  unitInfo,
  unitQtyLeft,
  handleClose,
  handleScreen,
  formik,
  isBuildingTypeSingleFamilyResidential,
}) => {
  const toast = useToast();
  const [qtyError, setQtyError] = useState('');
  const UNIT_PRICE_WITH_FEES =
    parseFloat(unitInfo?.price) +
    unitInfo?.fees.reduce((total, current) => total + parseFloat(current.amount), 0);

  const handleNumberOfFractions = e => {
    const inputString = e.target.value;
    const no_of_fractions = inputString.replace(/\D/g, '');

    const name = e.target.name;
    const newPricePerfraction =
      no_of_fractions && Number(no_of_fractions) > 0
        ? UNIT_PRICE_WITH_FEES / Number(no_of_fractions)
        : 0;
    formik.setFieldValue(name, no_of_fractions);
    formik.setFieldValue('price_per_fraction', Number(newPricePerfraction?.toFixed(2)));
  };

  const inputFieldStyle = {
    _focusVisible: {
      borderColor: '#e4e4e4',
      boxShadow: 'none',
    },
    _focus: {
      borderColor: '#e4e4e4',
      boxShadow: 'none',
    },
    _active: {
      borderColor: '#e4e4e4',
      boxShadow: 'none',
    },
  };
  const totalFractions = formik?.values.no_of_fractions * formik.values.quantity;

  const handleQuantityValue = (event, type, name = 'quantity') => {
    event.preventDefault();
    let quantityValue = 1;
    if (type === 'add') {
      if (formik.values[name] >= unitQtyLeft) {
        setQtyError(
          'Apologies, but you cannot fractionalize more units than are currently available.'
        );
      }
      quantityValue =
        formik.values[name] >= unitQtyLeft ? formik.values[name] : formik.values.quantity + 1;
    } else if (type === 'subtract') {
      quantityValue = formik.values[name] === 1 ? 1 : formik.values[name] - 1;
    } else if (type === 'onchange') {
      const input = event.target.value || 1;

      let val = input;
      let cleanedString = val.toString().replace(/[^\d]/g, '');
      if (Number(cleanedString) > unitQtyLeft) {
        setQtyError(
          'Apologies, but you cannot fractionalize more units than are currently available.'
        );
      }
      quantityValue =
        Number(cleanedString) > unitQtyLeft ? formik.values[name] : Number(cleanedString);
    }
    // setTimeout(() => setQtyError(''), 3000);
    formik.setFieldValue(name, quantityValue);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setQtyError(''), 3000);
    return () => clearTimeout(timeout);
  }, [qtyError]);

  const mutation = useMutation(formData => calculateTotalFractions(formData), {
    onSuccess: res => {
      handleScreen();
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const submitFractionalizationForm = () => {
    const {bundle, no_of_fractions, price_per_fraction, quantity} = formik.values;
    const formData = {
      action: 'calculate',
      bundle,
      no_of_fractions,
      price_per_fraction,
      quantity,
    };
    return mutation.mutate(formData);
  };
  const isValid =
    formik.values.bundle &&
    formik.values.no_of_fractions &&
    Number(formik.values.price_per_fraction) > 0 &&
    formik.values.quantity;

  return (
    <>
      <HStack px="34px" pr="16px" mt="30px" mb="18px" justifyContent="space-between" w="full">
        <Heading as="h1" fontSize={'24px'} fontWeight="600" color="#191919">
          Fractional
        </Heading>
        <ModalCloseButton position="initial" />
      </HStack>
      <ModalBody minW="558px" pb="25px" pt="0px" px="34px" pr="16px">
        <Stack w="full" spacing="34px">
          <Stack spacing="5px">
            <Text
              as="label"
              color="#191919"
              cursor="pointer"
              fontSize="14px"
              fontWeight="400"
              htmlFor={`no_of_fractions`}
            >
              Total numbers of fractions per unit
            </Text>

            <Input
              id="no_of_fractions"
              type="text"
              placeholder="e.g, 100"
              h="50px"
              border="1px solid #E4E4E4"
              borderRadius="8px"
              name={`no_of_fractions`}
              onChange={handleNumberOfFractions}
              value={formik.values.no_of_fractions}
              {...inputFieldStyle}
            />
          </Stack>
          <Stack spacing="5px" h="fit-content">
            <Text
              as="label"
              color="#191919"
              fontSize="14px"
              lineHeight="24px"
              fontWeight="400"
              htmlFor={`price_per_fraction`}
            >
              Price per fraction
            </Text>
            <HStack
              w="full"
              align="center"
              border="1px solid #E4E4E4"
              h="50px"
              borderRadius={'8px'}
              py="3px"
            >
              <PriceMenu fillForNairaSvgIcon="#191919" disableMenu />
              <Divider orientation="vertical" ml="4px" height="full" />
              <Text fontSize="14px" color="#919191" fontWeight="500">
                {formatNumberWithCommas(formik.values.price_per_fraction, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </HStack>
          </Stack>
          {isBuildingTypeSingleFamilyResidential ? null : (
            <Stack spacing="5px">
              <Text
                as="label"
                color="#191919"
                fontSize="14px"
                fontWeight="400"
                htmlFor={`quantity`}
              >
                How many {unitInfo.unit_title} units do you want to fractionalise?
              </Text>
              <InputGroup
                align="center"
                border="1px solid #E4E4E4"
                h="50px"
                borderRadius={'8px'}
                marginTop="6px"
                pr="11px"
              >
                <Input
                  type="text"
                  h="48px"
                  id="quantity"
                  _hover={{bg: 'transparent'}}
                  border="none"
                  borderRadius="8px"
                  name={`quantity`}
                  onChange={event => handleQuantityValue(event, 'onchange', `quantity`)}
                  value={formik.values.quantity}
                  _focusVisible={{
                    borderColor: 'transparent',
                    boxShadow: 'none',
                  }}
                  _focus={{
                    borderColor: 'transparent',
                    boxShadow: 'none',
                  }}
                  _active={{
                    borderColor: 'transparent',
                    boxShadow: 'none',
                  }}
                />
                <InputRightElement h="full" w="fit-content" mr="11px">
                  <HStack spacing="6px">
                    <Button
                      h="fit-content"
                      maxH="fit-content"
                      onClick={event => handleQuantityValue(event, 'subtract')}
                      p="0px"
                      bg="transparent"
                      w="fit-content"
                      minW="fit-content"
                      variant="ghost"
                      _hover={{
                        bg: 'transparent',
                      }}
                      _active={{
                        bg: 'transparent',
                      }}
                      _focus={{
                        bg: 'transparent',
                      }}
                    >
                      <Image src={minusIcon.src} alt="minus icon" />
                    </Button>

                    <Button
                      h="fit-content"
                      maxH="fit-content"
                      onClick={event => handleQuantityValue(event, 'add')}
                      p="0px"
                      bg="transparent"
                      w="fit-content"
                      minW="fit-content"
                      variant="ghost"
                      _hover={{
                        bg: 'transparent',
                      }}
                      _active={{
                        bg: 'transparent',
                      }}
                      _focus={{
                        bg: 'transparent',
                      }}
                    >
                      {' '}
                      <PlusIcon />
                    </Button>
                  </HStack>
                </InputRightElement>
              </InputGroup>
              <SlideFade in={!!qtyError} offsetY="5px">
                <Text fontSize="12px" color="red" fontWeight="400">
                  {qtyError}
                </Text>
              </SlideFade>
              {formik.values.no_of_fractions ? (
                <HStack spacing="4px">
                  <InfoIcon borderFillColor="#919191" />
                  <Text color="#606060" fontSize="12px" fontWeight="400">
                    {` This implies that there will be a combined total of 
                ${totalFractions}
                fractional units`}
                  </Text>
                </HStack>
              ) : null}
            </Stack>
          )}
          <Flex justify={'flex-end'} gap="18px" w="full">
            <Button
              onClick={handleClose}
              h="55px"
              variant="md-outline-radius"
              px="53px"
              fontSize="15.961px"
              fontWeight="400"
              color="#FF3636"
              // borderRadius="12px"
              bg="transparent"
              border="1px solid #FF3636"
              _hover={{
                opacity: '1',
                bg: 'transparent',
              }}
              _active={{
                opacity: '1',
                bg: 'transparent',
              }}
              _focus={{
                opacity: '1',
                bg: 'transparent',
              }}
            >
              Discard
            </Button>
            <Button
              h="55px"
              px="53px"
              variant="md-filled-radius"
              fontSize="15.961px"
              fontWeight="400"
              color="#ffffff"
              // borderRadius="10px"
              bg="#242526"
              _hover={{
                opacity: '1',
              }}
              _active={{
                opacity: '1',
              }}
              _focus={{
                opacity: '1',
              }}
              isDisabled={!isValid || mutation.isLoading}
              isLoading={mutation.isLoading}
              onClick={submitFractionalizationForm}
            >
              Update
            </Button>
          </Flex>
        </Stack>
      </ModalBody>
    </>
  );
};

export default Fractionalize;
