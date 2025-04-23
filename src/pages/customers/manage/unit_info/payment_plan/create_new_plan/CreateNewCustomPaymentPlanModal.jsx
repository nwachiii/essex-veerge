/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {Input, Popup} from 'ui-lib';
import {
  Text,
  Box,
  HStack,
  Button,
  Icon,
  SimpleGrid,
  InputGroup,
  useDisclosure,
  Stack,
  Spinner,
  Image,
  useToast,
  DrawerCloseButton,
} from '@chakra-ui/react';
import dropDownIcon from '/src/images/icons/dropDownForRoleSelection.svg';

import {SmallCloseIcon} from '@chakra-ui/icons';
import {Field, FieldArray, Form, Formik} from 'formik';
import {motion} from 'framer-motion';
import {formatAmount} from '/src/utils';
import {encodeFileToBase64} from '/src/utils';
import {QUICK_PAYMENT_PLAN} from '/src/constants/createListing';
import {scrollBarStyles} from '/src/components/common/ScrollbarStyling';
import DocInput from 'ui-lib/ui-lib.components/Input/DocInput';
import {PriceInputWrapperStyle, PriceMenu} from 'pages/customers/create/WholeUnits/WholeUnits.Form';
import cancelBlackIcon from '/src/images/icons/closeIconForFilter.svg';
import {formatNumberWithCommas, formatToCurrency} from 'utils/formatAmount';
import {toastForError} from 'utils/toastForErrors';

const formatNumberObj = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const CreateNewCustomPaymentPlanModal = ({
  modal3,
  values,
  index,
  unit,
  mutation,
  setFieldValue,
  handleModalClose,
}) => {
  const [planIndex, setPlanIndex] = useState(0);

  const handleAmount = (event, name, setFieldValue) => {
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

  const duePeriodArray = num => {
    let i = 0;
    const result = [];
    while (i < num) {
      result.push(i + (i >= 18 ? 6 : 3));
      i = i + (i >= 18 ? 6 : 3);
    }
    return result;
  };

  return (
    <Popup
      // mt="4vh"
      size="full"
      hideCloseBtn
      px="15px"
      pb="15px"
      color="#191919"
      minH="fit-content"
      overflowX="hidden"
      isOpen={modal3.isOpen}
      onClose={modal3.onClose}
      closeOnOverlayClick={false}
      minW={{base: '90%', md: '718px'}}
    >
      <HStack w="full" justify={'space-between'} px={'20px'}>
        <Text fontSize="24px" fontWeight={600}>
          Custom Payment Plan
        </Text>
        {/* <Image
          alt=""
          w="28px"
          h={'26px'}
          cursor={'pointer'}
          objectFit={'cover'}
          src={cancelBlackIcon.src}
          onClick={modal3.onClose}
        /> */}

        <DrawerCloseButton position="initial" onClick={modal3.onClose} />
      </HStack>
      <Popup.Body css={scrollBarStyles} overflowY="auto" maxH="412px" px="20px">
        <FieldArray name={`units.${index}.payment_plan`}>
          {({insert, remove, push}) => (
            <Stack spacing="none" w="full">
              {values?.units[index]?.payment_plan?.length > 0 &&
                values?.units[index]?.payment_plan?.map((payments, idx) => {
                  const planTotalInstallmentAmount = Number(
                    values?.units[index]?.payment_plan[idx]?.custom_payments
                      ?.map((item, i) => item?.amount?.toString()?.replace(/,/g, ''))
                      ?.reduce((a, b) => parseInt(a) + parseInt(b))
                  );

                  const planInitialDeposit = Number(
                    values.units[index]?.payment_plan[idx]?.initial_deposit_in_value
                      ?.toString()
                      ?.replace(/,/g, '')
                  );

                  const planPurchasePrice = Number(planTotalInstallmentAmount + planInitialDeposit);
                  return (
                    <Box key={idx} w="full" position="relative">
                      {idx == unit?.payment_plan?.length - 1 ? (
                        <>
                          <SimpleGrid
                            w="full"
                            spacing="26px"
                            mt="17px"
                            mb="20px"
                            columns={2}
                            className="row"
                            key={idx}
                          >
                            <Stack spacing={'8px'} mt={1.5}>
                              <label
                                style={{
                                  fontSize: '14px',
                                  fontWeight: '500',
                                }}
                                htmlFor={`units.${index}.payment_plan.${idx}.payment_period_in_months`}
                              >
                                Select Duration
                              </label>
                              <InputGroup
                                align="center"
                                border="1px solid #E4E4E4"
                                borderRadius={'10px'}
                                position="relative"
                              >
                                <Field
                                  as="select"
                                  className="formik__field_select"
                                  style={{height: '48px', marginTop: '0px', border: 'none'}}
                                  name={`units.${index}.payment_plan.${idx}.payment_period_in_months`}
                                >
                                  <option disabled value="">
                                    Choose payment duration...
                                  </option>
                                  {duePeriodArray(60).map((period, indx) => (
                                    <option key={indx} value={period}>
                                      {period} months
                                    </option>
                                  ))}
                                </Field>
                                <Image
                                  position="absolute"
                                  right="10px"
                                  boxSize="24px"
                                  top="50%"
                                  transform="translateY(-50%)"
                                  zIndex={1}
                                  src={dropDownIcon.src}
                                  alt="drop down icon"
                                />
                              </InputGroup>
                            </Stack>
                            <Stack spacing={'8px'} mt={1.5}>
                              <label
                                style={{
                                  fontSize: '14px',
                                  fontWeight: '500',
                                }}
                                htmlFor={`units.${index}.payment_plan.${idx}.initial_deposit_in_value`}
                              >
                                Initial deposit
                              </label>
                              <InputGroup
                                align="center"
                                border="1px solid #E4E4E4"
                                borderRadius={'10px'}
                              >
                                <PriceMenu disableMenu />
                                <Field
                                  type="text"
                                  placeholder="0.00"
                                  style={{
                                    ...PriceInputWrapperStyle,
                                    border: 'none',
                                    borderLeft: '1px solid #e4e4e4',
                                    height: '48px',
                                  }}
                                  className="formik__field"
                                  name={`units.${index}.payment_plan.${idx}.initial_deposit_in_value`}
                                  // value={
                                  //   formatAmount(unit.payment_plan[idx].initial_deposit_in_value) ==
                                  //   'NaN'
                                  //     ? ''
                                  //     : formatAmount(
                                  //         unit.payment_plan[idx].initial_deposit_in_value
                                  //       )
                                  // }
                                  value={formatNumberWithCommas(
                                    unit.payment_plan[idx].initial_deposit_in_value,
                                    formatNumberObj
                                  )}
                                  onChange={event =>
                                    handleAmount(
                                      event,
                                      `units.${index}.payment_plan.${idx}.initial_deposit_in_value`,
                                      setFieldValue
                                    )
                                  }
                                />
                              </InputGroup>
                            </Stack>
                          </SimpleGrid>

                          <InstallmentPayments
                            idx={idx}
                            unit={unit}
                            index={index}
                            values={values}
                            modal3={modal3}
                            mutation={mutation}
                            handleAmount={handleAmount}
                            setPlanIndex={setPlanIndex}
                            setFieldValue={setFieldValue}
                            purchasePrice={planPurchasePrice}
                            handleModalClose={() => handleModalClose(values.units[0])}
                          />
                        </>
                      ) : null}
                    </Box>
                  );
                })}
            </Stack>
          )}
        </FieldArray>
      </Popup.Body>
    </Popup>
  );
};

export default CreateNewCustomPaymentPlanModal;

export const InstallmentPayments = ({
  idx,
  handleModalClose,
  index,
  modal3,
  handleAmount,
  unit,
  mutation,
  purchasePrice,
  setFieldValue: setParentFieldValue,
  setPlanIndex,
}) => {
  const customPayments = `units.${index}.payment_plan.${idx}.custom_payments`;
  const targetPurchasePrice = `units.${index}.payment_plan.${idx}.purchase_price`;
  const [custom, setCustom] = useState([]);
  const [docObj, setDocObj] = useState({name: ''});
  const ABOUT_TO_CLEAR_ALL_FIELDS = useDisclosure();
  const toast = useToast();

  const handleReset = async () => {
    await setParentFieldValue(`units.${index}.payment_plan`, QUICK_PAYMENT_PLAN);
    modal3?.onClose();
    ABOUT_TO_CLEAR_ALL_FIELDS.onClose();
  };

  useEffect(() => {
    setParentFieldValue(customPayments, custom);
  }, [custom]);

  useEffect(() => {
    setParentFieldValue(targetPurchasePrice, purchasePrice);
  }, [purchasePrice]);

  const initialValues = {
    custom_payments: [
      {
        amount: 0,
        period_in_months: '',
      },
    ],
  };

  const handleContractUpload = async (arg, idx) => {
    const prefixRegex = /^data:(image\/(png|jpeg|gif)|application\/pdf);base64,/;

    const file = arg[0];

    let docfile;
    try {
      const base64 = await encodeFileToBase64(file);

      docfile = base64?.replace(prefixRegex, '') ?? '';
      setParentFieldValue(`units.${index}.payment_plan.${idx}.contract`, [docfile]);
      setPlanIndex(idx);
      setDocObj(file);
    } catch (error) {
      toastForError(error, true, toast);
    }
  };

  const removeFile = idx => () => {
    setDocObj({name: ''});
    setParentFieldValue(`units.${index}.payment_plan.${idx}.contract`, []);
  };

  return (
    <Formik initialValues={initialValues}>
      {({values, setFieldValue}) => (
        <>
          {values.custom_payments.length > 0 && setCustom(values.custom_payments)}
          <Form>
            <FieldArray name={`custom_payments`}>
              {({insert, remove, push}) => (
                <div>
                  {values?.custom_payments?.length > 0 &&
                    values?.custom_payments?.map((payment, indx) => (
                      <Box key={indx} w="full" position="relative">
                        {indx > 0 && (
                          <div className="col">
                            <Icon
                              top={-1}
                              right={0}
                              color="red"
                              width="30px"
                              height="30px"
                              cursor="pointer"
                              alt="cancel_icon"
                              position="absolute"
                              as={SmallCloseIcon}
                              onClick={() => remove(indx)}
                            />
                          </div>
                        )}
                        <SimpleGrid
                          spacing="26px"
                          mb="28px"
                          columns={2}
                          className="row"
                          key={idx}
                          w="full"
                        >
                          <Stack spacing={'8px'}>
                            <label
                              style={{
                                fontSize: '14px',
                                fontWeight: '500',
                              }}
                              htmlFor={`custom_payments.${indx}.amount`}
                            >
                              Next Installment Amount
                            </label>
                            <InputGroup
                              align="center"
                              border="1px solid #E4E4E4"
                              borderRadius={'10px'}
                            >
                              <PriceMenu disableMenu />
                              <Field
                                type="text"
                                style={{
                                  ...PriceInputWrapperStyle,
                                  border: 'none',
                                  borderLeft: '1px solid #e4e4e4',
                                  height: '48px',
                                }}
                                placeholder="next installment amount..."
                                className="formik__field"
                                name={`custom_payments.${indx}.amount`}
                                value={formatNumberWithCommas(
                                  values.custom_payments[indx].amount,
                                  formatNumberObj
                                )}
                                onChange={event =>
                                  handleAmount(
                                    event,
                                    `custom_payments.${indx}.amount`,
                                    setFieldValue
                                  )
                                }
                              />
                            </InputGroup>
                          </Stack>

                          <Stack spacing={'8px'}>
                            <label
                              style={{
                                fontSize: '14px',
                                fontWeight: '500',
                              }}
                              htmlFor={`custom_payments.${indx}.period_in_months`}
                            >
                              Due period
                            </label>
                            <InputGroup
                              align="center"
                              border="1px solid #E4E4E4"
                              borderRadius={'10px'}
                              position="relative"
                            >
                              <Field
                                as="select"
                                name={`custom_payments.${indx}.period_in_months`}
                                className="formik__field_select"
                                style={{height: '48px', marginTop: '0', border: 'none'}}
                              >
                                {/* Filter options dynamically */}
                                <option disabled value="">
                                  Select due period...
                                </option>
                                {Array.from({length: 60}, (_, i) => i + 1)
                                  .filter(option => {
                                    // Filter out selected options from previous indexes
                                    const selectedOptions = values.custom_payments
                                      .slice(0, indx) // Consider indexes before the current one
                                      .map(item => item.period_in_months);
                                    return !selectedOptions.includes(option);
                                  })
                                  .map((value, idx) => (
                                    <option key={value} value={value}>
                                      {`${value} ${idx == 0 ? 'month' : 'months'} after initial deposit`}
                                    </option>
                                  ))}
                              </Field>
                            </InputGroup>
                            <Image
                              position="absolute"
                              right="10px"
                              boxSize="24px"
                              top="50%"
                              // transform="translateY(-50%)"
                              zIndex={1}
                              src={dropDownIcon.src}
                              alt="drop down icon"
                            />
                          </Stack>
                        </SimpleGrid>
                      </Box>
                    ))}
                  <SimpleGrid pt="5px" mb="20px" spacing="26px" columns={2}>
                    <Stack spacing="8px">
                      <label
                        style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          opacity: '0.6',
                        }}
                      >
                        Puchase price
                      </label>
                      <InputGroup
                        align="center"
                        border="1px solid #E4E4E4"
                        borderRadius={'10px'}
                        w="full"
                        h="48px"
                      >
                        <PriceMenu disableMenu />
                        <Field
                          type="text"
                          disabled
                          style={{
                            ...PriceInputWrapperStyle,
                            border: 'none',
                            borderLeft: '1px solid #e4e4e4',

                            color: 'rgba(0,0,0,0.5)',
                          }}
                          placeholder="purchase price..."
                          className="formik__field"
                          value={formatNumberWithCommas(purchasePrice, formatNumberObj)}
                        />
                      </InputGroup>
                    </Stack>
                    <Stack>
                      <label
                        style={{
                          fontSize: '14px',
                          fontWeight: '500',
                        }}
                        htmlFor={`units.${index}.payment_plan.${idx}.contract`}
                      >
                        Purchase agreement
                      </label>

                      <DocInput
                        lengthToBeTruncated={17}
                        contract={''}
                        handleIdDoc={file => handleContractUpload(file, idx)}
                        removeFile={removeFile(idx)}
                        file={`units.${index}.payment_plan.${idx}.contract`}
                        docObj={docObj}
                        selectDocStyle={{
                          wrapperStyle: {
                            h: '48px',
                            w: 'full',
                          },
                          uploadBtnStyle: {
                            fontSize: '12px',
                            p: '11px 21px 12px 19px',
                            // bg: '#3D3D3D',
                            borderRadius: '8px',
                          },
                          emptyStateTextStyle: {
                            fontSize: '12px',
                          },
                        }}
                        selectedDocStyle={{
                          text: {
                            fontSize: '14px',
                            fontWeight: '400',
                            color: '#191919',
                          },
                        }}
                      />
                    </Stack>
                  </SimpleGrid>
                  {/* ============================= */}

                  <HStack
                    position="sticky"
                    bottom="0"
                    bg="#ffffff"
                    justify="space-between"
                    w="full"
                    pt="10px"
                  >
                    <Box />
                    <HStack>
                      <Button
                        mt={0}
                        variant="md-outline-radius"
                        w="200px"
                        // fontWeight="400"
                        // fontSize="16px"
                        // border={`1px solid #191919`}

                        // _hover={{
                        //   background: '#f7f7f7',
                        //   borderColor: '#191919',
                        // }}
                        onClick={() =>
                          push({
                            amount: 0,
                            period_in_months: '',
                          })
                        }
                      >
                        Add installments
                      </Button>

                      <Button
                        // fontWeight="400"
                        // mt={0}
                        w="147px"
                        variant="md-filled-radius"
                        onClick={handleModalClose}
                      >
                        {mutation?.isLoading ? <Spinner color="#FFFFFF" /> : 'Proceed'}
                      </Button>
                    </HStack>
                  </HStack>
                </div>
              )}
            </FieldArray>
          </Form>
        </>
      )}
    </Formik>
  );
};
