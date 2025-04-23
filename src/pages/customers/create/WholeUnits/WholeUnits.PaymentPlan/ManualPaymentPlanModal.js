import {useEffect, useState} from 'react';
import {Button, Popup} from 'ui-lib';
import {
  Text,
  Box,
  Input,
  HStack,
  SimpleGrid,
  InputGroup,
  Flex,
  useToast,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import {Field, FieldArray} from 'formik';
import {formatAmount} from '/src/utils';
import {PriceInputWrapperStyle, PriceMenu} from '../WholeUnits.Form';
import {encodeFileToBase64} from '../../../../../utils';
import {FaRegLightbulb} from 'react-icons/fa';
import {themeStyles} from '../../../../../theme';
import {QUICK_PAYMENT_PLAN} from '../../../../../constants/createListing';
import ResetInputFieldsModal from './ResetInputFieldsModal';
import {scrollBarStyles} from '../../../../../components/common/ScrollbarStyling';
import PaymentPlan from '../../../../../components/Drawers/paymentPlan';
import DocInput from 'ui-lib/ui-lib.components/Input/DocInput';
import cancelBlackIcon from '/src/images/icons/closeIconForFilter.svg';

export const ManualPaymentPlanModal = ({
  setShowPreview,
  showPreview,
  setFieldValue,
  modal2,
  values,
  index,
  unit,
  errors,
  touched,
  setSavedPaymentPlan,
  setPreviewData,
  WIDGET_MODAL,
}) => {
  // console.log('Values', values, unit);
  const toast = useToast();
  const ABOUT_TO_CLEAR_ALL_FIELDS = useDisclosure();
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [planIndex, setPlanIndex] = useState(0);
  // const [savedPaymentPlanLength, setSavedPaymentPlanLength] = useState(null);
  const [docObj, setDocObj] = useState({name: ''});

  const paymentPlanDrawer = useDisclosure();

  const LAST_ADDED_UNIT = unit?.payment_plan?.[unit?.payment_plan?.length - 1];

  const handleReset = async () => {
    await setFieldValue(`units.${index}.payment_plan`, QUICK_PAYMENT_PLAN);
    modal2?.onClose();
    setShowPreview('false');
    ABOUT_TO_CLEAR_ALL_FIELDS.onClose();
  };
  const handleModalClose = pushNewFields => {
    // Check if purchase price has been calculated correctly
    // console.log(unit?.payment_plan);
    if (LAST_ADDED_UNIT.purchase_price == '') {
      setShowPreview('false');
      toast({
        title: 'All fields must be filled correctly',
        status: 'info',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    }
    if (
      LAST_ADDED_UNIT.payment_frequency !== 'flexible' &&
      LAST_ADDED_UNIT.periodic_payment == ''
    ) {
      setShowPreview('false');
      // console.log(unit?.payment_plan);
      toast({
        title: 'Periodic payment is required',
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    }
    // Check for each field
    LAST_ADDED_UNIT.payment_period_in_months == ''
      ? toast({
          title: 'Duration is required',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      : LAST_ADDED_UNIT.initial_deposit_in_value == ''
        ? toast({
            title: 'Initial deposit is required',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
        : LAST_ADDED_UNIT.contract == ''
          ? toast({
              title: 'You are required to upload a purchase agreement',
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'top-right',
            })
          : LAST_ADDED_UNIT.payment_frequency == ''
            ? toast({
                title: 'Payment Frequency is required',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
              })
            : console.log('pplan: unknown use case');

    // Truthy use case
    if (
      LAST_ADDED_UNIT.payment_period_in_months !== '' &&
      LAST_ADDED_UNIT.initial_deposit_in_value !== '' &&
      LAST_ADDED_UNIT.contract !== '' &&
      LAST_ADDED_UNIT.purchase_price !== ''
    ) {
      modal2?.onClose();
      setShowPreview('true');
      pushNewFields({
        initial_deposit_in_value: '',
        periodic_payment: '',
        payment_period_in_months: '',
        payment_frequency: '',
        contract: '',
        purchase_price: '',
      });
      setPreviewData(unit?.payment_plan || []);
      setSavedPaymentPlan('true');
      setFieldValue(`units.${index}.payment_plan.${planIndex}.plan_type`, 'manual');
      console.log('UNITTT', unit?.payment_plan);
    }
  };

  const handleContractUpload = async (event, idx) => {
    // console.log(event?.currentTarget?.files[0]);
    setDocObj(event?.currentTarget?.files[0]);
    setFieldValue(`units.${index}.payment_plan.${idx}.contract`, [
      await encodeFileToBase64(event?.currentTarget?.files[0]).then(res => res),
    ]);
    setPlanIndex(idx);
  };

  const removeFile = () => {
    setDocObj({});
  };

  return (
    <>
      <Popup
        closeOnOverlayClick={false}
        hideCloseBtn
        size="full"
        minH="fit-content"
        mt="2vh"
        minW={{base: '90%', md: '838px'}}
        px="30px"
        color="#191919"
        isOpen={modal2?.isOpen}
        onClose={modal2?.onClose}
      >
        <HStack w="full" justify={'space-between'} pb={2} borderBottom="1px solid #FCFCFC">
          <Text fontSize="24px" fontWeight={600}>
            Quick Payment Plan
          </Text>
          <Image
            alt=""
            w="28px"
            h={'26px'}
            cursor={'pointer'}
            objectFit={'cover'}
            src={cancelBlackIcon.src}
            onClick={modal2.onClose}
          />
        </HStack>
        <Popup.Body overflowY="auto" css={scrollBarStyles} h="442px">
          {values.units[index].payment_class == 'manual' && (
            <FieldArray name={`units.${index}.payment_plan`}>
              {({insert, remove, push}) => (
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
                      const planPurchasePrice = Number(
                        planDuration * planInstallmentAmount + planInitialDeposit
                      );

                      return (
                        <Box key={idx} w="full" position="relative">
                          {idx == unit?.payment_plan?.length - 1 ? (
                            <SimpleGrid
                              spacing="26px"
                              mt="17px"
                              mb="36px"
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
                                  required
                                >
                                  Duration
                                </label>
                                <Field
                                  // id="payment_period_in_months"
                                  as="select"
                                  className="formik__field"
                                  name={`units.${index}.payment_plan.${idx}.payment_period_in_months`}
                                  required
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
                                {touched.payment_period_in_months && errors.payment_period_in_months
                                  ? errors.payment_period_in_months
                                  : null}
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
                                  <PriceMenu disableMenu />
                                  <Field
                                    type="text"
                                    placeholder="Initial deposit..."
                                    style={{...PriceInputWrapperStyle}}
                                    className="formik__field"
                                    name={`units.${index}.payment_plan.${idx}.initial_deposit_in_value`}
                                    value={
                                      formatAmount(
                                        unit?.payment_plan[idx]?.initial_deposit_in_value
                                      ) == 'NaN'
                                        ? ''
                                        : formatAmount(
                                            unit.payment_plan[idx].initial_deposit_in_value
                                          )
                                    }
                                  />
                                </InputGroup>
                              </div>

                              <div className="col">
                                <label
                                  style={{
                                    fontWeight: '600',
                                  }}
                                  htmlFor={`units.${index}.payment_plan.${idx}.payment_frequency`}
                                >
                                  Payment frequency
                                </label>
                                <Field
                                  as="select"
                                  className="formik__field"
                                  name={`units.${index}.payment_plan.${idx}.payment_frequency`}
                                >
                                  <option disabled value="">
                                    Choose payment frequency...
                                  </option>
                                  <option value={'daily'}>Daily</option>
                                  <option value={'flexible'}>Flexible</option>
                                  <option value={'weekly'}>Weekly</option>
                                  <option value={'monthly'}>Monthly</option>
                                  {values.units[index].payment_plan[idx]
                                    .payment_period_in_months !== '3' && (
                                    <option value={'quarterly'}>Quaterly</option>
                                  )}
                                </Field>
                              </div>

                              {values?.units[index]?.payment_plan[idx]?.payment_frequency !==
                                'flexible' && (
                                <div>
                                  <label
                                    style={{
                                      fontWeight: '600',
                                    }}
                                    htmlFor={`units.${index}.payment_plan.${idx}.periodic_payment`}
                                  >
                                    Installment payment
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
                                      placeholder="Installment payment..."
                                      style={{...PriceInputWrapperStyle}}
                                      className="formik__field"
                                      name={`units.${index}.payment_plan.${idx}.periodic_payment`}
                                      value={
                                        formatAmount(unit.payment_plan[idx].periodic_payment) ==
                                        'NaN'
                                          ? ''
                                          : formatAmount(unit.payment_plan[idx].periodic_payment)
                                      }
                                    />
                                  </InputGroup>
                                </div>
                              )}

                              {values.units[index]?.payment_plan[idx]?.payment_frequency ==
                                'flexible' && (
                                <div>
                                  <label
                                    style={{
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
                                        formatAmount(unit?.payment_plan[idx]?.purchase_price) ==
                                        'NaN'
                                          ? ''
                                          : formatAmount(unit.payment_plan[idx].purchase_price)
                                      }
                                    />
                                  </InputGroup>
                                </div>
                              )}

                              {values.units[index]?.payment_plan[idx]?.payment_frequency !==
                                'flexible' && (
                                <AutoCalculatedPurchasePrice
                                  values={values}
                                  planPurchasePrice={planPurchasePrice}
                                  index={index}
                                  idx={idx}
                                  setFieldValue={setFieldValue}
                                />
                              )}

                              <div>
                                <label
                                  style={{
                                    fontWeight: '600',
                                  }}
                                  htmlFor={`units.${index}.payment_plan.${idx}.contract`}
                                >
                                  Purchase agreement
                                </label>

                                <DocInput
                                  component={
                                    <Input
                                      id="file"
                                      name={`units.${index}.payment_plan.${idx}.contract`}
                                      type="file"
                                      onChange={e => handleContractUpload(e, idx)}
                                      className="file__inputField file_Style"
                                      maxW="450px"
                                      w="full"
                                      mt="2px"
                                      h="54px"
                                      borderRadius="12px"
                                      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                                      autocapitalize="characters"
                                    />
                                  }
                                  contract={LAST_ADDED_UNIT?.contract}
                                  // idx={idx}
                                  removeFile={removeFile}
                                  docObj={docObj}
                                />
                              </div>
                            </SimpleGrid>
                          ) : null}
                        </Box>
                      );
                    })}
                  <HStack justify="space-between" w="full" mt={'70px'}>
                    <Flex
                      gap="2px"
                      pl="5px"
                      color="#4545FE"
                      align={'center'}
                      display={'flex'}
                      cursor="pointer"
                      fontSize={'16px'}
                      // justifyContent={'flex-end'}
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
                      <Button
                        w="169px"
                        borderRadius="72px"
                        isDisabled={isAllFieldsFilled}
                        variant="dark"
                        onClick={() => handleModalClose(push)}
                        mt={0}
                      >
                        Proceed
                      </Button>
                    </HStack>
                  </HStack>
                </Box>
              )}
            </FieldArray>
          )}
        </Popup.Body>
      </Popup>
      <PaymentPlan drawerModal={paymentPlanDrawer} />
      <ResetInputFieldsModal modal={ABOUT_TO_CLEAR_ALL_FIELDS} resetFnc={handleReset} />
    </>
  );
};

export default ManualPaymentPlanModal;

const AutoCalculatedPurchasePrice = ({values, planPurchasePrice, index, idx, setFieldValue}) => {
  const targetPurchasePrice = `units.${index}.payment_plan.${idx}.purchase_price`;
  useEffect(() => {
    setFieldValue(targetPurchasePrice, planPurchasePrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planPurchasePrice]);
  return (
    <Box hidden={values?.units[index]?.payment_plan[idx]?.payment_frequency == 'flexible'}>
      <label
        style={{
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
          value={formatAmount(planPurchasePrice)}
        />
      </InputGroup>
    </Box>
  );
};
