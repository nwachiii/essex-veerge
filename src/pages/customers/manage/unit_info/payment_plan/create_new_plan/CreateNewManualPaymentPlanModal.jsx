import {
  Text,
  Box,
  Input,
  HStack,
  SimpleGrid,
  InputGroup,
  Flex,
  Button as ChakraBtn,
  useDisclosure,
  Spinner,
  Stack,
  Image,
  DrawerCloseButton,
  useToast,
} from '@chakra-ui/react';
import {themeStyles} from '/src/theme';
import {Button, Popup} from 'ui-lib';
import {useEffect, useState} from 'react';
import {FaRegLightbulb} from 'react-icons/fa';
import {Field, FieldArray} from 'formik';
import {formatAmount, encodeFileToBase64} from '/src/utils';
import PaymentPlan from '/src/components/Drawers/paymentPlan';
import DocInput from 'ui-lib/ui-lib.components/Input/DocInput';
import {scrollBarStyles} from '/src/components/common/ScrollbarStyling';
import {PriceInputWrapperStyle, PriceMenu} from 'pages/customers/create/WholeUnits/WholeUnits.Form';
import cancelBlackIcon from '/src/images/icons/closeIconForFilter.svg';
import {convertNumberStringToInteger} from 'utils/removeEmptyObjectValues';
import {PAYMENT_PLAN_SCHEMA} from 'constants/createListing';
import {formatNumberWithCommas} from 'utils/formatAmount';
import {toastForError} from 'utils/toastForErrors';

const formatNumberObj = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const CreateNewManualPaymentPlanModal = ({
  setFieldValue,
  modal2,
  values,
  index,
  unit,
  errors,
  touched,
  mutation,
  handleSubmit,
}) => {
  const paymentPlanDrawer = useDisclosure();
  const [docObj, setDocObj] = useState({name: ''});
  const toast = useToast();

  const handleContractUpload = async (arg, idx) => {
    // setDocObj(event?.currentTarget?.files[0]);
    // setFieldValue(`units.${index}.payment_plan.${idx}.contract`, [
    //   await encodeFileToBase64(event?.currentTarget?.files[0]).then(res => res),
    // ]);
    const file = arg[0];

    let docfile;
    try {
      const base64 = await encodeFileToBase64(file);

      docfile = [base64];

      setDocObj(file);
      setFieldValue(`units.${index}.payment_plan.${idx}.contract`, docfile);
    } catch (error) {
      toastForError(error, true, toast);
    }
  };

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

  const removeFile = idx => () => {
    setDocObj({name: ''});
    setFieldValue(`units.${index}.payment_plan.${idx}.contract`, []);
  };

  return (
    <>
      <Popup
        mt="2vh"
        px="30px"
        size="full"
        hideCloseBtn
        color="#191919"
        minH="fit-content"
        isOpen={modal2?.isOpen}
        onClose={modal2?.onClose}
        minW={{base: '90%', md: '738px'}}
      >
        <HStack w="full" justify={'space-between'} pb={1} borderBottom="1px solid #FCFCFC">
          <Text fontSize="24px" fontWeight={600}>
            Quick Payment Plan
          </Text>
          {/* <Image
            alt=""
            w="28px"
            h={'26px'}
            cursor={'pointer'}
            objectFit={'cover'}
            src={cancelBlackIcon.src}
            onClick={modal2.onClose}
          /> */}
          <DrawerCloseButton position="initial" onClick={modal2.onClose} />
        </HStack>
        <Popup.Body overflowY="hidden" css={scrollBarStyles} h="fit-content">
          {values.units[index].payment_class == 'manual' && (
            <FieldArray name={`units.${index}.payment_plan`}>
              {arrayHelpers => (
                <Box>
                  {unit?.payment_plan &&
                    unit?.payment_plan.length > 0 &&
                    unit?.payment_plan.map((payments, idx) => {
                      const freq =
                        unit.payment_plan[idx].payment_frequency == 'daily'
                          ? Number(30)
                          : unit.payment_plan[idx].payment_frequency == 'weekly'
                            ? Number(4)
                            : Number(1);
                      const selectedDirection =
                        unit.payment_plan[idx].payment_frequency == 'quarterly'
                          ? Number(unit.payment_plan[idx].payment_period_in_months) / 3
                          : Number(unit.payment_plan[idx].payment_period_in_months);
                      const planDuration = freq * selectedDirection;
                      const planInstallmentAmount = Number(
                        unit.payment_plan[idx].periodic_payment?.toString()?.replace(/,/g, '')
                      );
                      const planInitialDeposit = Number(
                        unit?.payment_plan[idx]?.initial_deposit_in_value
                          ?.toString()
                          ?.replace(/,/g, '')
                      );
                      const planPurchasePrice =
                        planDuration * planInstallmentAmount + planInitialDeposit;

                      return (
                        <Box key={idx} w="full" position="relative">
                          {idx == unit?.payment_plan?.length - 1 ? (
                            <SimpleGrid mt="0" columns={2} spacing="26px" className="row" key={idx}>
                              <Stack spacing={0} mt={1.5}>
                                <label
                                  style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                  }}
                                  htmlFor={`units.${index}.payment_plan.${idx}.payment_period_in_months`}
                                >
                                  Duration
                                </label>
                                <Field
                                  as="select"
                                  label="Duration"
                                  className="formik__field_select"
                                  name={`units.${index}.payment_plan.${idx}.payment_period_in_months`}
                                  required
                                >
                                  <option disabled value="" hidden>
                                    Choose payment duration
                                  </option>
                                  {[3, 6, 9, 12, 18].map(duration => (
                                    <option key={duration} value={duration}>
                                      {duration} months
                                    </option>
                                  ))}
                                </Field>
                                {touched.payment_period_in_months && errors.payment_period_in_months
                                  ? errors.payment_period_in_months
                                  : null}
                              </Stack>

                              <Stack mt={1.5}>
                                <label
                                  style={{
                                    fontSize: '14px',
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
                                >
                                  <PriceMenu disableMenu />
                                  <Field
                                    type="text"
                                    placeholder="e.g., 10,000"
                                    style={{...PriceInputWrapperStyle}}
                                    className="formik__field"
                                    name={`units.${index}.payment_plan.${idx}.initial_deposit_in_value`}
                                    value={
                                      formatNumberWithCommas(
                                        unit?.payment_plan[idx]?.initial_deposit_in_value
                                      ) == 'NaN'
                                        ? ''
                                        : formatNumberWithCommas(
                                            unit.payment_plan[idx].initial_deposit_in_value,
                                            formatNumberObj
                                          )
                                    }
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

                              <Stack spacing={0} mt={1.5}>
                                <label
                                  style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                  }}
                                  htmlFor={`units.${index}.payment_plan.${idx}.payment_frequency`}
                                >
                                  Payment frequency
                                </label>
                                <Field
                                  as="select"
                                  className="formik__field_select"
                                  name={`units.${index}.payment_plan.${idx}.payment_frequency`}
                                >
                                  <option disabled value="" hidden>
                                    Choose payment frequency...
                                  </option>
                                  {['daily', 'flexible', 'weekly', 'monthly'].map(frequency => (
                                    <option key={frequency} value={frequency}>
                                      {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                                    </option>
                                  ))}
                                  {values.units[index].payment_plan[idx]
                                    .payment_period_in_months !== '3' && (
                                    <option value={'quarterly'}>Quaterly</option>
                                  )}
                                </Field>
                              </Stack>

                              {values?.units[index]?.payment_plan[idx]?.payment_frequency !==
                                'flexible' && (
                                <Stack mt={1.5}>
                                  <label
                                    style={{
                                      fontSize: '14px',
                                      fontWeight: '600',
                                    }}
                                    htmlFor={`units.${index}.payment_plan.${idx}.periodic_payment`}
                                  >
                                    Installment payment
                                  </label>
                                  <InputGroup
                                    align="center"
                                    borderRadius={'10px'}
                                    border="1px solid #E4E4E4"
                                  >
                                    <PriceMenu disableMenu />
                                    <Field
                                      type="text"
                                      placeholder="e.g., 1,000"
                                      style={{
                                        ...PriceInputWrapperStyle,
                                      }}
                                      className="formik__field"
                                      name={`units.${index}.payment_plan.${idx}.periodic_payment`}
                                      value={
                                        formatNumberWithCommas(
                                          unit.payment_plan[idx].periodic_payment
                                        ) == 'NaN'
                                          ? ''
                                          : formatNumberWithCommas(
                                              unit.payment_plan[idx].periodic_payment,
                                              formatNumberObj
                                            )
                                      }
                                      onChange={event =>
                                        handleAmount(
                                          event,
                                          `units.${index}.payment_plan.${idx}.periodic_payment`,
                                          setFieldValue
                                        )
                                      }
                                    />
                                  </InputGroup>
                                </Stack>
                              )}

                              {values.units[index]?.payment_plan[idx]?.payment_frequency ==
                                'flexible' && (
                                <div>
                                  <label
                                    style={{
                                      fontSize: '14px',
                                      fontWeight: '600',
                                    }}
                                    htmlFor={`units.${index}.payment_plan.${idx}.puchase_price`}
                                  >
                                    Enter Purchase price
                                  </label>
                                  <InputGroup
                                    align="center"
                                    border="1px solid #E4E4E4"
                                    borderRadius={'10px'}
                                    mt={1.5}
                                  >
                                    <PriceMenu disableMenu />
                                    <Field
                                      type="text"
                                      placeholder="Enter purchase price for flexible payment..."
                                      style={{...PriceInputWrapperStyle}}
                                      className="formik__field"
                                      name={`units.${index}.payment_plan.${idx}.purchase_price`}
                                      value={
                                        formatNumberWithCommas(
                                          unit?.payment_plan[idx]?.purchase_price
                                        ) == 'NaN'
                                          ? ''
                                          : formatNumberWithCommas(
                                              unit.payment_plan[idx].purchase_price,
                                              formatNumberObj
                                            )
                                      }
                                      onChange={event =>
                                        handleAmount(
                                          event,
                                          `units.${index}.payment_plan.${idx}.purchase_price`,
                                          setFieldValue
                                        )
                                      }
                                    />
                                  </InputGroup>
                                </div>
                              )}

                              {values.units[index]?.payment_plan[idx]?.payment_frequency !==
                                'flexible' && (
                                <AutoCalculatedPurchasePrice
                                  idx={idx}
                                  index={index}
                                  values={values}
                                  setFieldValue={setFieldValue}
                                  planPurchasePrice={planPurchasePrice}
                                />
                              )}

                              <div>
                                <label
                                  style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                  }}
                                  htmlFor={`units.${index}.payment_plan.${idx}.contract`}
                                >
                                  Purchase agreement
                                </label>

                                <DocInput
                                  lengthToBeTruncated={17}
                                  contract={''}
                                  handleIdDoc={file => handleContractUpload(file, idx)}
                                  file={`units.${index}.payment_plan.${idx}.contract`}
                                  // component={
                                  //   <Input
                                  //     id="file"
                                  //     type="file"
                                  //     w="full"
                                  //     mt="2px"
                                  //     h="54px"
                                  //     maxW="450px"
                                  //     borderRadius="12px"
                                  //     onChange={e => handleContractUpload(e, idx)}
                                  //     name={`units.${index}.payment_plan.${idx}.contract`}
                                  //     className="file__inputField file_Style"
                                  //     accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                                  //     autocapitalize="characters"
                                  //   />
                                  // }
                                  // contract={values.units[index]?.payment_plan[idx]?.contract}
                                  removeFile={removeFile(index)}
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
                              </div>
                            </SimpleGrid>
                          ) : null}
                        </Box>
                      );
                    })}
                  <HStack justify="space-between" w="full" mt={'35px'}>
                    <Flex
                      gap="2px"
                      pl="5px"
                      color="#4545FE"
                      align={'center'}
                      display={'flex'}
                      cursor="pointer"
                      fontSize={'16px'}
                      onClick={paymentPlanDrawer.onOpen}
                    >
                      <FaRegLightbulb
                        fontSize={'18px'}
                        fontWeight={'800'}
                        color={themeStyles.color.matador__primary}
                      />
                      <Text>
                        <small>Need help?</small>
                      </Text>
                    </Flex>
                    <HStack spacing="20px">
                      <ChakraBtn
                        w="169px"
                        variant="md-filled-radius"
                        onClick={() => {
                          handleSubmit(values.units?.[0]);
                          // arrayHelpers.push(PAYMENT_PLAN_SCHEMA);
                          // setDocObj({});
                          // setFieldValue(
                          //   `units.${index}.payment_plan.${0}.initial_deposit_in_value`,
                          //   ''
                          // );
                          // setFieldValue(`units.${index}.payment_plan.${0}.periodic_payment`, '');
                        }}
                        mt={0}
                      >
                        {mutation?.isLoading ? <Spinner color="#FFFFFF" /> : 'Proceed'}
                      </ChakraBtn>
                    </HStack>
                  </HStack>
                </Box>
              )}
            </FieldArray>
          )}
        </Popup.Body>
      </Popup>
      <PaymentPlan drawerModal={paymentPlanDrawer} />
    </>
  );
};

export default CreateNewManualPaymentPlanModal;

const AutoCalculatedPurchasePrice = ({values, planPurchasePrice, index, idx, setFieldValue}) => {
  const targetPurchasePrice = `units.${index}.payment_plan.${idx}.purchase_price`;
  const purchasePriceToInteger = convertNumberStringToInteger(planPurchasePrice);
  useEffect(() => {
    setFieldValue(targetPurchasePrice, purchasePriceToInteger);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planPurchasePrice]);
  return (
    <Box hidden={values?.units[index]?.payment_plan[idx]?.payment_frequency == 'flexible'}>
      <label
        style={{
          fontSize: '14px',
          fontWeight: '600',
        }}
        htmlFor={`units.${index}.payment_plan.${idx}.purchase_price`}
      >
        Purchase price
      </label>
      <InputGroup
        opacity={'0.5'}
        align="center"
        border="1px solid #E4E4E4"
        borderRadius={'10px'}
        mt={1.5}
      >
        <PriceMenu disableMenu />
        <Field
          disabled
          type="text"
          style={{...PriceInputWrapperStyle}}
          placeholder="0.00"
          className="formik__field"
          name={`units.${index}.payment_plan.${idx}.purchase_price`}
          value={formatNumberWithCommas(planPurchasePrice, formatNumberObj)}
        />
      </InputGroup>
    </Box>
  );
};
