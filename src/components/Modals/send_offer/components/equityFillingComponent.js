import React, {useEffect} from 'react';
import {
  Box,
  extendTheme,
  Heading,
  HStack,
  SimpleGrid,
  Divider,
  ButtonGroup,
  Icon,
  Text,
  Input,
  InputGroup,
  useToast,
  Stack,
  Image,
  Button,
  Flex,
} from '@chakra-ui/react';
import trashIcon from '/src/images/icons/redTrashIcon.svg';
import addIcon from '/src/images/icons/addIcon.svg';

import {Field, FieldArray} from 'formik';

// import {
//   PriceMenu,
//   PriceInputWrapperStyle,
// } from '../../../../listings/create/WholeUnits/WholeUnits.Form';
import {CalenderMenu} from '@/components/common/Calendar/CalenderMenu';
import {changeDateFormat} from 'utils/formatDate';
import {PriceMenu, PriceInputWrapperStyle} from 'pages/communities/create/WholeUnits/WholeUnits.Form';
import {DropDownComponent} from './dropDown';
import {formatNumberWithCommas, formatToCurrency} from 'utils/formatAmount';
import {CalenderMenuAsModal} from './CalendarMenuAsModal';
import AddIcon from '@/components/assets/addIcon';

const formatWithCommaOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const EquityFillingComponent = ({values, setFieldValue}) => {
  const handleAmount = (event, name) => {
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

    setFieldValue(name, val);
  };

  useEffect(() => {
    const sumPlanArray = values.plan_info.custom_payments.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.amount || 0),
      0
    );

    const offerPrice = Number(values.plan_info.initial_deposit || 0) + sumPlanArray;

    values?.payment_type == 'outright'
      ? null
      : setFieldValue('plan_info.offer_price', parseFloat(offerPrice.toFixed(2)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.plan_info, values.payment_type]);

  const setMinDate = (prevDate, idx) => {
    if (idx === -1) {
      return false;
    }
    const minDateObj = new Date(prevDate);
    minDateObj.setDate(minDateObj.getDate() + 1);
    return minDateObj;
  };

  const handleSelectedDate = (name, setDate) => {
    setFieldValue(name, changeDateFormat(setDate, 'yyyy-mm-dd'));
  };

  const duePeriodArray = num =>
    Array(num)
      .fill()
      .map((i, idx) => ({
        value: idx + 1,
        name: `${idx + 1} month${idx === 0 ? '' : 's'} after initial deposit`,
      }));

  const shouldBeDisabled = (startIndex, value, selectedPeriodArray) => {
    // the startindex is the index of the active dropDown component

    let lowerLimit = 97;
    let upperLimit = 0;

    // Find the first valid lower limit from `startIndex` to the end of the selectedPeriodArray
    for (let i = startIndex + 1; i < selectedPeriodArray.length; i++) {
      const value = parseInt(selectedPeriodArray[i].period_in_months, 10);
      if (!isNaN(value)) {
        lowerLimit = value;
        break;
      }
    }

    // Find the first valid upper limit from `startIndex` to the start of the selectedPeriodArray
    for (let i = startIndex === 0 ? startIndex : startIndex - 1; i >= 0; i--) {
      const value = parseInt(selectedPeriodArray[i].period_in_months, 10);

      if (!isNaN(value) && startIndex > 0) {
        upperLimit = value;
        break;
      }
    }
    const disable = value >= lowerLimit || value <= upperLimit;

    return disable;
  };

  const setDuration = event => {
    const inputValue = event.target.value;
    const inputName = event.target.name;

    if (/^\d*$/.test(inputValue)) {
      setFieldValue(inputName, Number(inputValue));
    }
  };

  return (
    <>
      <Stack gap={`10px`} w={`100%`}>
        <Text
          fontFamily="Euclid Circular B"
          ml={0}
          mb="0px"
          // mt="18.92px"
          fontWeight="400"
          color="#4b4b4b"
          fontSize="12px"
        >
          Payment type
        </Text>
        <HStack
          align="center"
          // pb={'19.08px'}
          // spacing="20.42px"
          gap={`16px`}
          as="div"
          role="group"
          aria-labelledby="my-radio-group"
        >
          <Button
            onClick={() => setFieldValue(`payment_type`, 'outright')}
            mt={0}
            bg="#F5F5F5"
            borderRadius="18.782px"
            p="9.39px 12.07px"
            w="fit-content"
            h="35.8px"
            iconSpacing="8.51px"
            fontWeight={'400'}
            color="#4b4b4b"
            fontSize="12px"
            _hover={{opacity: '1'}}
            variant="unstyled"
            rightIcon={
              <HStack
                // boxSize="15.428px"
                p="4px"
                transition="ease-in-out 0.3s "
                bg="#fff"
                boxShadow={`0 0 0 1px ${values?.payment_type !== 'outright' ? '#CBCBCB' : '#4545FE'}`}
                borderRadius="full"
              >
                <Box
                  bg={values?.payment_type !== 'outright' ? 'transparent' : '#4545FE'}
                  h="9px"
                  w="9px"
                  borderRadius="full"
                />
              </HStack>
            }
          >
            Outright
          </Button>

          <Button
            onClick={() => setFieldValue(`payment_type`, 'custom')}
            mt={0}
            bg="#F5F5F5"
            borderRadius="18.782px"
            p="9.39px 12.07px"
            w="fit-content"
            h="35.8px"
            iconSpacing="8.51px"
            variant="unstyled"
            fontWeight={'400'}
            color="#4b4b4b"
            fontSize="12px"
            _hover={{opacity: '1'}}
            rightIcon={
              <HStack
                // boxSize="15.428px"
                p="4px"
                justify="center"
                transition="ease-in-out 0.3s "
                bg="#fff"
                boxShadow={`0 0 0 1px ${values?.payment_type !== 'custom' ? '#CBCBCB' : '#4545FE'}`}
                borderRadius="full"
              >
                <Box
                  bg={values?.payment_type !== 'custom' ? 'transparent' : '#4545FE'}
                  h="9px"
                  w="9px"
                  borderRadius="full"
                />
              </HStack>
            }
          >
            Payment Plan
          </Button>
        </HStack>
      </Stack>

      {values?.payment_type == 'outright' && (
        <SimpleGrid spacing={`20px`} columns={2}>
          <Stack spacing="2.1px" position="relative" className="col">
            <label
              htmlFor={`offer_price`}
              style={{fontWeight: '400', color: '#4b4b4b', fontSize: '12px'}}
            >
              Offer price
            </label>
            <InputGroup
              align="center"
              border="1px solid #E4E4E4"
              h="33.5px"
              w="100%"
              borderRadius={'5.366px'}
              py="4px"
            >
              <PriceMenu
                styleForIcon={{transform: 'scale(0.7)'}}
                fillForNairaSvgIcon="#12D8A0"
                disableMenu
              />
              <Divider orientation="vertical" ml="4px" height="full" />
              <Field
                type="text"
                as={Input}
                placeholder="Enter amount..."
                className="formik__field"
                style={{
                  ...PriceInputWrapperStyle,
                  borderColor: 'transparent',
                  //   borderLeft: '1px solid #E4E4E4',
                  boxShadow: 'none',
                  marginLeft: '14.04px',
                  color: '#606060',

                  marginBottom: '0px',
                  width: '321.6px',
                  fontWeight: '500',
                  fontSize: '10.5px',
                  height: '100%',
                }}
                _placeholder={{
                  fontWeight: '500',
                  fontSize: '10.5px',

                  color: '#919191',
                }}
                name={`offer_price`}
                onChange={event => handleAmount(event, `offer_price`)}
                value={formatNumberWithCommas(values?.offer_price, formatWithCommaOptions)}
              />
            </InputGroup>
          </Stack>
          <Stack
            spacing="2.1px"
            position="relative"
            justifySelf="flex-end"
            className="col"
            w={`100%`}
          >
            <label
              htmlFor={`offer_expiration`}
              style={{fontWeight: '400', color: '#4b4b4b', fontSize: '12px'}}
            >
              Offer Expiration Date
            </label>

            <CalenderMenuAsModal
              mainDate={values?.offer_expiration}
              handleSelectedDate={startDate => handleSelectedDate(`offer_expiration`, startDate)}
              imageStyles={{boxSize: '16.083px'}}
              menuBtnStyle={{w: '100%', h: '33.507px'}}
              btnTextStyle={{fontSize: '10.722px', fontWeight: '500'}}
              btnStyle={{w: '100%', h: '33.507px', borderRadius: '5.361px'}}
              datePickerObj={{minDate: setMinDate(new Date())}}
            />
          </Stack>
        </SimpleGrid>
      )}

      {values?.payment_type == 'custom' ? (
        <>
          <Stack spacing="5px" position="relative" className="col">
            <label
              style={{fontWeight: '400', color: '#4b4b4b', fontSize: '12px'}}
              htmlFor={`plan_info.duration_in_months`}
            >
              Duration By Month
            </label>
            <Input
              className="formik__field"
              name={`plan_info.duration_in_months`}
              type="text"
              placeholder="0"
              fontSize="13.615px"
              fontWeight="400"
              borderRadius="6.808px"
              _placeholder={{
                color: '#191919',
              }}
              value={values.plan_info.duration_in_months}
              onChange={setDuration}
              style={{
                marginTop: '0px',
                marginBottom: '0px',

                height: '33.5px',
                borderColor: '#E4E4E4',
                width: '321.6px',
                fontWeight: '500',
                fontSize: '10.5px',
              }}
              _focus={{
                boxShadow: 'none',
              }}
            />
          </Stack>
          <SimpleGrid gap="20px" columns={2}>
            <Stack width={`100%`} spacing="2.1px" position="relative" className="col">
              <label
                style={{fontWeight: '400', color: '#4b4b4b', fontSize: '12px'}}
                htmlFor={`plan_info.initial_deposit`}
              >
                {'Initial Deposit'}
              </label>
              <InputGroup
                align="center"
                border="1px solid #E4E4E4"
                h="33.5px"
                w="321.6px"
                borderRadius={'5.366px'}
                py="4px"
              >
                <PriceMenu
                  styleForIcon={{transform: 'scale(0.7)'}}
                  fillForNairaSvgIcon="#12D8A0"
                  disableMenu
                />
                <Divider orientation="vertical" ml="4px" height="full" />

                <Field
                  as={Input}
                  style={{
                    ...PriceInputWrapperStyle,
                    borderColor: 'transparent',
                    borderLeft: 'none',
                    boxShadow: 'none',
                    marginLeft: '14.04px',
                    color: '#606060',
                    marginBottom: '0px',
                    width: '321.6px',
                    fontWeight: '500',
                    fontSize: '10.5px',
                    height: '100%',
                  }}
                  _placeholder={{
                    fontWeight: '500',
                    fontSize: '10.5px',

                    color: '#919191',
                  }}
                  name={`plan_info.initial_deposit`}
                  placeholder="Enter amount..."
                  type="text"
                  value={formatNumberWithCommas(
                    values?.plan_info?.initial_deposit,
                    formatWithCommaOptions
                  )}
                  onChange={event => handleAmount(event, `plan_info.initial_deposit`)}
                />
              </InputGroup>
            </Stack>
            <Stack
              width={`100%`}
              spacing="2.1px"
              position="relative"
              justifySelf="flex-end"
              className="col"
            >
              <label
                style={{fontWeight: '400', color: '#4b4b4b', fontSize: '12px'}}
                htmlFor={`offer_expiration`}
              >
                {'Offer Expiration Date'}
              </label>
              <Box position="relative">
                <CalenderMenuAsModal
                  mainDate={values?.offer_expiration}
                  handleSelectedDate={startDate =>
                    handleSelectedDate(`offer_expiration`, startDate)
                  }
                  imageStyles={{boxSize: '16.083px'}}
                  menuBtnStyle={{w: '100%', h: '33.507px'}}
                  btnTextStyle={{fontSize: '10.722px', fontWeight: '500'}}
                  btnStyle={{w: '100%', h: '33.507px', borderRadius: '5.361px'}}
                  datePickerObj={{
                    minDate: setMinDate(new Date()),
                  }}
                />
              </Box>
            </Stack>{' '}
          </SimpleGrid>

          <FieldArray name={`plan_info.custom_payments`}>
            {({insert, remove, push}) => (
              <Flex rowGap="10px" flexDir="column">
                {values?.plan_info?.custom_payments?.length > 0 &&
                  values?.plan_info?.custom_payments.map((payments, idx) => (
                    <Box key={idx} w="full" position="relative">
                      <SimpleGrid spacingX="20px" columns={2} key={idx}>
                        <Stack spacing="2.1px" position="relative" className="col">
                          <label
                            style={{fontWeight: '400', color: '#4b4b4b', fontSize: '12px'}}
                            htmlFor={`plan_info.custom_payments.${idx}.amount`}
                          >
                            {'Next Instalment Amount'}
                          </label>
                          <InputGroup
                            align="center"
                            border="1px solid #E4E4E4"
                            h="33.5px"
                            w="321.6px"
                            borderRadius={'5.366px'}
                            py="4px"
                          >
                            <PriceMenu
                              styleForIcon={{transform: 'scale(0.7)'}}
                              fillForNairaSvgIcon="#12D8A0"
                              disableMenu
                            />
                            <Divider orientation="vertical" ml="4px" height="full" />

                            <Field
                              as={Input}
                              style={{
                                ...PriceInputWrapperStyle,
                                borderColor: 'transparent',
                                borderLeft: 'none',
                                boxShadow: 'none',
                                marginLeft: '14.04px',
                                color: '#606060',

                                marginBottom: '0px',
                                width: '321.6px',
                                fontWeight: '500',
                                fontSize: '10.5px',
                                height: '100%',
                              }}
                              name={`plan_info.custom_payments.${idx}.amount`}
                              placeholder="Enter amount..."
                              _placeholder={{
                                fontWeight: '500',
                                fontSize: '10.5px',

                                color: '#919191',
                              }}
                              type="text"
                              value={formatNumberWithCommas(
                                values?.plan_info.custom_payments[idx]?.amount,
                                formatWithCommaOptions
                              )}
                              onChange={event =>
                                handleAmount(event, `plan_info.custom_payments.${idx}.amount`)
                              }
                            />
                          </InputGroup>
                        </Stack>
                        <Stack
                          spacing="2.1px"
                          position="relative"
                          justifySelf="flex-end"
                          className="col"
                          w={`100%`}
                        >
                          <label
                            style={{fontWeight: '400', color: '#4b4b4b', fontSize: '12px'}}
                            htmlFor={`plan_info.custom_payments.${idx}.period_in_months`}
                          >
                            {'Due Period'}
                          </label>
                          <Box display="flex" gap="5px" position="relative" w={`100%`}>
                            <DropDownComponent
                              dropDownArray={duePeriodArray(96)}
                              disableOption={(val, arr) => shouldBeDisabled(idx, val, arr)}
                              dropDownMenuStyle={{placement: 'bottom-end'}}
                              setFieldValue={setFieldValue}
                              values={values.plan_info.custom_payments}
                              defaultDropName={
                                values.plan_info.custom_payments[idx].period_in_months
                                  ? duePeriodArray(96).find(
                                      item =>
                                        item.value ===
                                        values.plan_info.custom_payments[idx].period_in_months
                                    ).name
                                  : ''
                              }
                              fieldName={`plan_info.custom_payments.${idx}.period_in_months`}
                              placeHolderText="Due period"
                              dropDownStyle={{
                                wrapper: {
                                  spacing: '4px',
                                  width: `100%`,
                                  maxW: '409.303px',
                                  gap: '0px',
                                },
                                label: {fontSize: '10.5px', fontWeight: '400'},
                                btn: {
                                  mt: '0px',

                                  borderRadius: '5.366px',
                                  border: '0.851px solid #E4E4E4',
                                  gap: 'none',

                                  fontWeight: '400',

                                  w: '100%',
                                  h: '33.5px',
                                  borderRadius: '7.978px',
                                  fontSize: '10.637px',
                                },
                                menuList: {
                                  mb: '10px',
                                  maxH: '200px',
                                },
                              }}
                            />

                            {idx > 0 ? (
                              <Image
                                src={trashIcon.src}
                                alt="trash icon"
                                // position="absolute"
                                boxSize="18px"
                                my="auto"
                                top="0px"
                                bottom="0px"
                                right="-6%"
                                onClick={() => remove(idx)}
                                cursor="pointer"
                              />
                            ) : null}
                          </Box>
                        </Stack>{' '}
                      </SimpleGrid>
                    </Box>
                  ))}
                <HStack w="full" justify="flex-end" mt="16px">
                  <ButtonGroup isAttached variant="outline">
                    <Button
                      mt={0}
                      bg="#FFFFFF"
                      border="1.448px solid #a3a3a3"
                      color="#191919"
                      fontSize="10.274px"
                      fontWeight="400"
                      w="fit-content"
                      h="33.1px"
                      px="7.71px"
                      py="9.7px"
                      type="button"
                      variant="outline-radius"
                      _hover={{
                        boxShadow: 'none',
                      }}
                      onClick={() =>
                        push({
                          period_in_months: '',
                          amount: '',
                        })
                      }
                      // borderRadius="6.85px"
                      leftIcon={<AddIcon alignSelf="center" alt="add icon" boxSize="13.69px" />}
                      iconSpacing="11.42px"
                    >
                      Add next payment
                    </Button>
                  </ButtonGroup>
                </HStack>
              </Flex>
            )}
          </FieldArray>
        </>
      ) : null}
    </>
  );
};
