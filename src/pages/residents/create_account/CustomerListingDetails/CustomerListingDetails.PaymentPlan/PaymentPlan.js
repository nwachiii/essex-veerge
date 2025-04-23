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
  Button as ChakraBtn,
  useToast,
  Stack,
  Image,
  Flex,
} from '@chakra-ui/react';
import trashIcon from '/src/images/icons/redTrashIcon.svg';
import {Button} from 'ui-lib';
import {AddIcon} from '@chakra-ui/icons';

import {formatAmount} from '/src/utils';
import {Field, FieldArray} from 'formik';
import {theme} from '../../../../../theme';
import {
  PriceMenu,
  PriceInputWrapperStyle,
} from '../../../../customers/create/WholeUnits/WholeUnits.Form';
import {CalenderMenu} from '@/components/common/Calendar/CalenderMenu';
import {changeDateFormat} from 'utils/formatDate';
import {CheckIcon} from 'images/icons/checkForCustomerCreation';
import {formatNumberWithCommas} from 'utils/formatAmount';
import AmountAggregator from 'ui-lib/ui-lib.components/CustomTag/AmountAggregator';

const styles = extendTheme({...theme});
const formatValueoptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};
export const PaymentPlan = ({values, index, equity, setFieldValue, isOffer, forDispute}) => {
  const toast = useToast();

  const CURRENT_PLAN = equity?.bundle?.paymentplan;
  const LAST_ADDED_UNIT = CURRENT_PLAN ? Number(CURRENT_PLAN[CURRENT_PLAN?.length - 1]) : null;

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

  const setDuration = event => {
    const inputValue = event.target.value;
    const inputName = event.target.name;

    if (/^\d*$/.test(inputValue)) {
      setFieldValue(inputName, Number(inputValue));
    }
  };

  const listOfPayments = [
    ...equity.bundle.paymentplan.payments,
    ...equity.bundle.paymentplan.upcomings,
  ];

  return (
    <div>
      <HStack
        align="center"
        pb={'24px'}
        spacing="16px"
        as="div"
        role="group"
        aria-labelledby="my-radio-group"
      >
        <Button
          onClick={() => setFieldValue(`equities.${index}.bundle.payment_class`, 'outright')}
          mt={0}
          variant="ghost"
          bg="#F5F5F5"
          color="#191919"
          borderRadius="23.826px"
          p="12px"
          w="fit-content"
          h="40px"
          iconSpacing="8px"
          fontWeight={'400'}
          fontSize={'17.019px'}
          _hover={{opacity: '1', bg: '#f5f5f5'}}
          rightIcon={<CheckIcon isChecked={!!(equity?.bundle?.payment_class === 'outright')} />}
        >
          Outright
        </Button>

        <Button
          onClick={() => setFieldValue(`equities.${index}.bundle.payment_class`, 'custom')}
          mt={0}
          variant="ghost"
          bg="#F5F5F5"
          color="#191919"
          borderRadius="23.826px"
          p="12px"
          w="fit-content"
          h="40px"
          iconSpacing="8px"
          fontWeight={'400'}
          fontSize={'17.019px'}
          _hover={{opacity: '1', bg: '#f5f5f5'}}
          rightIcon={<CheckIcon isChecked={!!(equity?.bundle?.payment_class == 'custom')} />}
        >
          Payment Plan
        </Button>
      </HStack>
      {equity?.bundle?.payment_class == 'outright' ? null : (
        <Stack spacing="10.5px" position="relative" className="col">
          <label
            style={{fontSize: '14px', fontWeight: '500', color: '#3D3D3D'}}
            htmlFor={`equities.${index}.bundle.payment_period_in_months`}
          >
            Duration in month(s)
          </label>
          <Input
            className="formik__field"
            type="text"
            placeholder="Duration in months"
            name={`equities.${index}.bundle.payment_period_in_months`}
            value={equity?.bundle.payment_period_in_months}
            onChange={setDuration}
            style={{
              marginTop: '0px',
              marginBottom: '16px',
              maxWidth: '390px',
              width: '100%',
              height: '40.568px',
              borderRadius: ' 6.491px',
              borderColor: '#E4E4E4',
              fontSize: '14.604px',
              fontWeight: '500',
            }}
            _focus={{
              boxShadow: 'none',
            }}
          />
        </Stack>
      )}

      {equity?.bundle?.payment_class == 'outright' && (
        <SimpleGrid spacing="100px 26px" columns={2} mb="24px">
          <Stack spacing="5px" position="relative" className="col">
            <label
              htmlFor={`equities.${index}.bundle.outright[0].amount`}
              style={{fontSize: '11.359px', fontWeight: '400', color: '#191919'}}
            >
              {' '}
              {isOffer ? 'Offer price' : ' Amount'}
            </label>
            <InputGroup
              align="center"
              border="1px solid #E4E4E4"
              pl="7px"
              h="40.568px"
              borderRadius={'6.491px'}
              maxW="390px"
              w="full"
            >
              <PriceMenu
                styleForIcon={{transform: 'scale(0.7)'}}
                fillForNairaSvgIcon="#000000"
                disableMenu
              />
              <Field
                type="text"
                placeholder="Enter amount..."
                className="formik__field"
                style={{
                  ...PriceInputWrapperStyle,
                  borderColor: 'transparent',
                  borderLeft: '1px solid #E4E4E4',
                  boxShadow: 'none',
                  marginTop: '4px',
                  marginBottom: '4px',
                  marginLeft: '14.04px',
                  color: '#606060',
                  fontWeight: '500',
                  fontSize: '12px',
                  maxWidth: '390px',
                  width: '100%',
                }}
                name={`equities.${index}.bundle.outright[0].amount`}
                onChange={event =>
                  handleAmount(event, `equities.${index}.bundle.outright[0].amount`)
                }
                value={formatNumberWithCommas(
                  equity.bundle?.outright?.[0]?.amount,
                  formatValueoptions
                )}
              />
            </InputGroup>
          </Stack>
          <Stack
            spacing="5px"
            maxW="390px"
            w="full"
            justifySelf="end"
            position="relative"
            className="col"
          >
            <label
              htmlFor={`equities.${index}.bundle.outright[0].payment_date`}
              style={{fontSize: '11.359px', fontWeight: '400', color: '#191919'}}
            >
              {isOffer ? 'Offer Expiration Date' : 'Payment date'}
            </label>

            <CalenderMenu
              mainDate={equity.bundle.outright[0].payment_date}
              handleSelectedDate={startDate =>
                handleSelectedDate(`equities.${index}.bundle.outright[0].payment_date`, startDate)
              }
              imageStyles={{boxSize: '19.473px'}}
              menuBtnStyle={{maxW: '390px', width: '100%', h: '40.568px'}}
              btnTextStyle={{fontSize: '13px', fontWeight: '500'}}
              btnStyle={{maxW: '390px', width: '100%', h: '40.568px', borderRadius: '6.491px'}}
              datePickerObj={{minDate: false, maxDate: new Date()}}
            />
          </Stack>
        </SimpleGrid>
      )}

      {isOffer
        ? null
        : equity?.bundle?.payment_class == 'custom' && (
            <FieldArray name={`equities.${index}.bundle.paymentplan.payments`}>
              {({insert, remove, push}) => (
                <div>
                  <HStack w="99.7%" justify="space-between" mb="32px">
                    <Flex gap="12px" alignItems="center">
                      <Heading
                        {...styles.textStyles.h3}
                        color="#3D3D3D"
                        fontWeight="500"
                        fontSize="16px"
                        ml={0}
                      >
                        Past Payments
                      </Heading>
                      <AmountAggregator
                        data={equity.bundle.paymentplan.payments}
                        keyToSum="amount"
                      />
                    </Flex>

                    <ButtonGroup isAttached variant="outline">
                      <ChakraBtn
                        mt={0}
                        variant="outline-radius"
                        bg="#FFFFFF"
                        border="1px solid #a3a3a3"
                        fontSize="14.604px"
                        fontWeight="400"
                        w="106.264px"
                        type="button"
                        h=" 46.247px"
                        // borderRadius="9.73px"
                        _hover={{
                          boxShadow: 'none',
                        }}
                        onClick={() =>
                          push({
                            amount: '',
                            payment_date: '',
                            payment_type: 'past-payment',
                          })
                        }
                      >
                        <Icon alignSelf="center" as={AddIcon} mr="8.3px" />
                        Add
                      </ChakraBtn>
                    </ButtonGroup>
                  </HStack>
                  {equity.bundle.paymentplan?.payments?.length > 0 &&
                    equity.bundle.paymentplan.payments.map((payments, idx) => (
                      <Box key={idx} w="full" position="relative">
                        <div className="col"></div>{' '}
                        <SimpleGrid spacing="26px" my="19.473px" columns={2} className="row">
                          <Stack spacing="5px" position="relative" className="col">
                            <label
                              style={{fontSize: '11.359px', fontWeight: '400', color: '#191919'}}
                              htmlFor={`equities.${index}.bundle.paymentplan.payments.${idx}.amount`}
                            >
                              {isOffer ? 'Offer price' : idx === 0 ? 'Initial deposit' : ' Amount'}
                            </label>
                            <InputGroup
                              align="center"
                              border="1px solid #E4E4E4"
                              pl="7px"
                              h="40.568px"
                              borderRadius={'6.491px'}
                              maxW="390px"
                              w="full"
                            >
                              <PriceMenu
                                styleForIcon={{transform: 'scale(0.7)'}}
                                fillForNairaSvgIcon="#000000"
                                disableMenu
                              />
                              <Field
                                className="formik__field"
                                style={{
                                  ...PriceInputWrapperStyle,
                                  borderColor: 'transparent',
                                  borderLeft: '1px solid #E4E4E4',
                                  boxShadow: 'none',
                                  marginTop: '4px',
                                  marginBottom: '4px',
                                  marginLeft: '14.04px',
                                  color: '#606060',
                                  fontWeight: '500',
                                  fontSize: '12px',
                                  maxWidth: '390px',
                                  width: '100%',
                                }}
                                name={`equities.${index}.bundle.paymentplan.payments.${idx}.amount`}
                                placeholder="Enter amount..."
                                type="text"
                                onChange={event =>
                                  handleAmount(
                                    event,
                                    `equities.${index}.bundle.paymentplan.payments.${idx}.amount`
                                  )
                                }
                                value={formatNumberWithCommas(
                                  equity.bundle.paymentplan.payments[idx].amount,
                                  formatValueoptions
                                )}
                              />
                            </InputGroup>
                          </Stack>
                          <Stack
                            spacing="5px"
                            position="relative"
                            justifySelf="end"
                            maxW="390px"
                            w="full"
                            className="col"
                          >
                            <label
                              style={{fontSize: '11.359px', fontWeight: '400', color: '#191919'}}
                              htmlFor={`equities.${index}.bundle.paymentplan.payments.${idx}.payment_date`}
                            >
                              Payment date
                            </label>
                            <Box position="relative">
                              <CalenderMenu
                                mainDate={equity.bundle.paymentplan.payments[idx].payment_date}
                                handleSelectedDate={startDate =>
                                  handleSelectedDate(
                                    `equities.${index}.bundle.paymentplan.payments.${idx}.payment_date`,
                                    startDate
                                  )
                                }
                                imageStyles={{boxSize: '19.473px'}}
                                menuBtnStyle={{w: 'full', maxW: '390px', h: '40.568px'}}
                                btnTextStyle={{fontSize: '13px', fontWeight: '500'}}
                                btnStyle={{
                                  maxW: '390px',
                                  w: 'full',
                                  h: '40.568px',
                                  borderRadius: '6.491px',
                                }}
                                datePickerObj={{
                                  minDate: setMinDate(
                                    equity.bundle.paymentplan.payments[idx - 1]?.payment_date,
                                    idx
                                  ),
                                  maxDate: new Date(),
                                }}
                              />

                              {idx > 0 || forDispute ? (
                                <Image
                                  src={trashIcon.src}
                                  alt="trash icon"
                                  position="absolute"
                                  my="auto"
                                  top="0px"
                                  bottom="0px"
                                  right="-9%"
                                  onClick={() => remove(idx)}
                                  cursor="pointer"
                                />
                              ) : null}
                            </Box>
                          </Stack>{' '}
                        </SimpleGrid>
                      </Box>
                    ))}
                </div>
              )}
            </FieldArray>
          )}
      {isOffer ? null : equity?.bundle?.paymentplan?.payments?.length > 0 &&
        equity?.bundle?.payment_class !== 'outright' ? (
        <Divider color="#E4E4E4" my="19.473px" w="full" orientation="horizontal" />
      ) : null}

      {isOffer
        ? null
        : equity?.bundle?.payment_class == 'custom' && (
            <FieldArray name={`equities.${index}.bundle.paymentplan.upcomings`}>
              {({insert, remove, push}) => (
                <div style={{marginBottom: '25.96px'}}>
                  <HStack w="99.7%" justify="space-between" mb="32px">
                    <Flex gap="12px" alignItems="center">
                      <Heading
                        {...styles.textStyles.h3}
                        color="#3D3D3D"
                        fontWeight="500"
                        fontSize="16px"
                        ml={0}
                      >
                        Upcoming Payments
                      </Heading>
                      <AmountAggregator
                        data={equity.bundle.paymentplan.upcomings}
                        keyToSum="amount"
                      />
                    </Flex>
                    <ButtonGroup isAttached variant="outline">
                      <ChakraBtn
                        mt={0}
                        variant="outline-radius"
                        bg="#FFFFFF"
                        border="1px solid #a3a3a3"
                        fontSize="14.604px"
                        fontWeight="400"
                        w="106.264px"
                        type="button"
                        h=" 46.247px"
                        _hover={{
                          boxShadow: 'none',
                        }}
                        onClick={() =>
                          push({
                            amount: '',
                            payment_date: '',
                            payment_type: 'upcoming-payment',
                          })
                        }
                      >
                        <Icon alignSelf="center" as={AddIcon} mr="8.3px" />
                        Add
                      </ChakraBtn>
                    </ButtonGroup>
                  </HStack>
                  {equity?.bundle?.paymentplan?.upcomings?.length > 0 &&
                    equity?.bundle?.paymentplan?.upcomings.map((payments, idx) => (
                      <Box key={idx} w="full" position="relative">
                        <SimpleGrid spacingX="26px" my="16px" columns={2} key={idx}>
                          <Stack spacing="5px" position="relative" className="col">
                            <label
                              style={{fontSize: '11.359px', fontWeight: '400', color: '#191919'}}
                              htmlFor={`equities.${index}.bundle.paymentplan.upcomings.${idx}.amount`}
                            >
                              Amount
                            </label>
                            <InputGroup
                              align="center"
                              border="1px solid #E4E4E4"
                              pl="7px"
                              h="40.568px"
                              borderRadius={'6.491px'}
                              maxW="390px"
                              w="full"
                            >
                              <PriceMenu
                                styleForIcon={{transform: 'scale(0.7)'}}
                                fillForNairaSvgIcon="#000000"
                                disableMenu
                              />
                              <Field
                                className="formik__field"
                                style={{
                                  ...PriceInputWrapperStyle,
                                  borderColor: 'transparent',
                                  borderLeft: '1px solid #E4E4E4',
                                  boxShadow: 'none',
                                  marginTop: '4px',
                                  marginBottom: '4px',
                                  marginLeft: '14.04px',
                                  color: '#606060',
                                  fontWeight: '500',
                                  fontSize: '12px',
                                  maxWidth: '390px',
                                  width: '100%',
                                }}
                                name={`equities.${index}.bundle.paymentplan.upcomings.${idx}.amount`}
                                placeholder="Enter amount..."
                                type="text"
                                value={formatNumberWithCommas(
                                  equity.bundle.paymentplan.upcomings[idx].amount,
                                  formatValueoptions
                                )}
                                onChange={event =>
                                  handleAmount(
                                    event,
                                    `equities.${index}.bundle.paymentplan.upcomings.${idx}.amount`
                                  )
                                }
                              />
                            </InputGroup>
                          </Stack>
                          <Stack
                            spacing="5px"
                            position="relative"
                            justifySelf="end"
                            maxW="390px"
                            w="full"
                            className="col"
                          >
                            <label
                              style={{fontSize: '11.359px', fontWeight: '400', color: '#191919'}}
                              htmlFor={`equities.${index}.bundle.paymentplan.upcomings.${idx}.payment_date`}
                            >
                              Payment date
                            </label>
                            <Box position="relative">
                              <CalenderMenu
                                mainDate={equity.bundle.paymentplan.upcomings[idx].payment_date}
                                handleSelectedDate={startDate =>
                                  handleSelectedDate(
                                    `equities.${index}.bundle.paymentplan.upcomings.${idx}.payment_date`,
                                    startDate
                                  )
                                }
                                imageStyles={{boxSize: '19.473px'}}
                                menuBtnStyle={{w: 'full', maxW: '390px', h: '40.568px'}}
                                btnTextStyle={{fontSize: '13px', fontWeight: '500'}}
                                btnStyle={{
                                  w: 'full',
                                  maxW: '390px',
                                  h: '40.568px',
                                  borderRadius: '6.491px',
                                }}
                                datePickerObj={{
                                  minDate: setMinDate(
                                    equity.bundle.paymentplan.payments.length && idx === 0
                                      ? equity.bundle.paymentplan.payments[
                                          equity.bundle.paymentplan.payments.length - 1
                                        ].payment_date
                                      : equity.bundle.paymentplan.upcomings[idx - 1]?.payment_date
                                  ),
                                }}
                              />

                              {idx > 0 || forDispute ? (
                                <Image
                                  src={trashIcon.src}
                                  alt="trash icon"
                                  position="absolute"
                                  my="auto"
                                  top="0px"
                                  bottom="0px"
                                  right="-9%"
                                  onClick={() => remove(idx)}
                                  cursor="pointer"
                                />
                              ) : null}
                            </Box>
                          </Stack>{' '}
                        </SimpleGrid>
                      </Box>
                    ))}
                </div>
              )}
            </FieldArray>
          )}
      {equity?.bundle?.payment_class == 'outright' ? null : (
        <Flex alignItems="center" gap="12px">
          <Heading
            {...styles.textStyles.h3}
            color="#3D3D3D"
            fontWeight="500"
            fontSize="16px"
            ml={0}
          >
            Purchase Price
          </Heading>
          <AmountAggregator data={listOfPayments} keyToSum="amount" />
        </Flex>
      )}
      {/* {isOffer
        ? null
        : equity.bundle.paymentplan?.upcomings.length > 0 && (
            <Divider color="#E4E4E4" mt="24px" mb="24px" w="full" orientation="horizontal" />
          )} */}
      {isOffer && equity?.bundle?.payment_class == 'custom' ? (
        <FieldArray name={`equities.${index}.bundle.paymentplan.payments`}>
          {({insert, remove, push}) => (
            <div>
              {equity?.bundle?.paymentplan?.length > 0 &&
                equity?.bundle?.paymentplan?.map((payments, idx) => {
                  const planTotalInstallmentAmount = Number(
                    equity?.bundle?.paymentplan[idx]?.custom_payments
                      ?.map((item, i) => item?.amount?.toString()?.replace(/,/g, ''))
                      .reduce((a, b) => parseInt(a) + parseInt(b))
                  );

                  const planInitialDeposit = Number(
                    equity?.bundle?.paymentplan[idx]?.initial_deposit_in_value
                      ?.toString()
                      ?.replace(/,/g, '')
                  );

                  const planPurchasePrice = Number(planTotalInstallmentAmount + planInitialDeposit);
                  return (
                    <Box
                      key={idx}
                      w="full"
                      position="relative"
                      borderBottom={
                        idx == unit?.payment_plan.length - 1 ? null : '1px solid #E5E5E5'
                      }
                    >
                      {idx > 0 && (
                        <HStack w="full" justify={'flex-end'} className="col">
                          <Text pt="8px" onClick={() => remove(idx)} cursor="pointer" color="red">
                            Delete
                          </Text>
                        </HStack>
                      )}
                      <SimpleGrid
                        w="full"
                        spacing="26px"
                        mt="17px"
                        mb="20px"
                        columns={2}
                        className="row"
                        key={idx}
                      >
                        <div className="col">
                          <label
                            style={{
                              fontWeight: '600',
                            }}
                            htmlFor={`units.${index}.payment_plan.${idx}.payment_period_in_months`}
                          >
                            Duration
                          </label>
                          <Field
                            as="select"
                            className="formik__field"
                            name={`units.${index}.payment_plan.${idx}.payment_period_in_months`}
                          >
                            <option disabled value="">
                              Choose payment duration...
                            </option>
                            <option value={3}>3 months</option>
                            <option value={6}>6 months</option>
                            <option value={9}>9 months</option>
                            <option value={12}>12 months</option>
                            <option value={18}>18 months</option>
                          </Field>
                        </div>
                        <div>
                          <label
                            style={{
                              fontWeight: '600',
                            }}
                            htmlFor={`units.${index}.payment_plan.${idx}.initial_deposit_in_value`}
                          >
                            Initial deposit
                          </label>
                          <InputGroup
                            align="center"
                            border="1px solid #E4E4E4"
                            borderRadius={'10px'}
                            mt={1.5}
                          >
                            <PriceMenu
                              styleForIcon={{transform: 'scale(0.7)'}}
                              fillForNairaSvgIcon="#000000"
                            />
                            <Field
                              type="text"
                              placeholder="Initial deposit..."
                              style={{...PriceInputWrapperStyle}}
                              className="formik__field"
                              name={`units.${index}.payment_plan.${idx}.initial_deposit_in_value`}
                              value={
                                formatAmount(unit.payment_plan[idx].initial_deposit_in_value) ==
                                'NaN'
                                  ? ''
                                  : formatAmount(unit.payment_plan[idx].initial_deposit_in_value)
                              }
                            />
                          </InputGroup>
                        </div>
                      </SimpleGrid>

                      {/* <InstallmentPayments
                            handleModalClose={handleModalClose}
                            purchasePrice={planPurchasePrice}
                            modal3={modal3}
                            setFieldValue={setFieldValue}
                            idx={idx}
                            index={index}
                            values={values}
                            unit={unit}
                          /> */}
                    </Box>
                  );
                })}
            </div>
          )}
        </FieldArray>
      ) : null}
    </div>
  );
};

export default PaymentPlan;
