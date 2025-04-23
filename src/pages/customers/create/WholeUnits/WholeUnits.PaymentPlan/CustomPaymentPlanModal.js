/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {Button, Input, Popup} from 'ui-lib';
import {
  Text,
  Box,
  HStack,
  Icon,
  SimpleGrid,
  InputGroup,
  useToast,
  useDisclosure,
  Stack,
  Image,
} from '@chakra-ui/react';
import SmallCloseIcon from '/src/images/icons/cancleBig.png';
import {Field, FieldArray, Form, Formik} from 'formik';
import {motion} from 'framer-motion';
import {formatAmount} from '/src/utils';
import {PriceInputWrapperStyle, PriceMenu} from '../WholeUnits.Form';
import {encodeFileToBase64} from '../../../../../utils';
import ResetInputFieldsModal from './ResetInputFieldsModal';
import {QUICK_PAYMENT_PLAN} from '../../../../../constants/createListing';
import {scrollBarStyles} from '../../../../../components/common/ScrollbarStyling';
import DocInput from 'ui-lib/ui-lib.components/Input/DocInput';
import cancelBlackIcon from '/src/images/icons/closeIconForFilter.svg';
import {formatToCurrency} from 'utils/formatAmount';

export const CustomPaymentPlanModal = ({
  modal3,
  values,
  index,
  unit,
  setFieldValue,
  setShowPreview,
  setPreviewData,
  setSavedPaymentPlan,
  WIDGET_MODAL,
}) => {
  // console.log('Values', values, unit);
  const toast = useToast();
  const [planIndex, setPlanIndex] = useState(0);

  const LAST_ADDED_UNIT = unit?.payment_plan?.[unit?.payment_plan?.length - 1];
  const handleModalClose = pushNewFields => {
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
        : LAST_ADDED_UNIT?.custom_payments[LAST_ADDED_UNIT?.custom_payments?.length - 1]?.amount ==
            ''
          ? toast({
              title: 'Amount is required',
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'top-right',
            })
          : LAST_ADDED_UNIT?.custom_payments[LAST_ADDED_UNIT?.custom_payments.length - 1]
                .period_in_months == ''
            ? toast({
                title: 'Due period is required',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
              })
            : LAST_ADDED_UNIT?.contract == ''
              ? toast({
                  title: 'You are required to upload a purchase agreement',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                  position: 'top-right',
                })
              : '';
    // console.log(unit?.payment_plan);

    // Truthy use case
    if (
      LAST_ADDED_UNIT.payment_period_in_months !== '' &&
      LAST_ADDED_UNIT.initial_deposit_in_value !== '' &&
      LAST_ADDED_UNIT.contract !== '' &&
      LAST_ADDED_UNIT.purchase_price !== '' &&
      LAST_ADDED_UNIT?.custom_payments[LAST_ADDED_UNIT?.custom_payments?.length - 1]
        .period_in_months !== '' &&
      LAST_ADDED_UNIT?.custom_payments[LAST_ADDED_UNIT?.custom_payments.length - 1].amount !== ''
    ) {
      modal3?.onClose();
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
      setFieldValue(`units.${index}.payment_plan.${planIndex}.plan_type`, 'custom');
    }
  };
  return (
    <Popup
      mt="6vh"
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
      minW={{base: '90%', md: '818px'}}
    >
      <HStack w="full" justify={'space-between'}>
        <Text fontSize="24px" fontWeight={600}>
          Custom Payment Plan
        </Text>
        <Image
          alt=""
          w="28px"
          h={'26px'}
          cursor={'pointer'}
          objectFit={'cover'}
          src={cancelBlackIcon.src}
          onClick={modal3.onClose}
        />
      </HStack>
      <Popup.Body css={scrollBarStyles} overflowY="auto" h="412px" px="20px">
        <FieldArray name={`units.${index}.payment_plan`}>
          {({insert, remove, push}) => (
            <div>
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
                                <PriceMenu />
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
                                      : formatAmount(
                                          unit.payment_plan[idx].initial_deposit_in_value
                                        )
                                  }
                                />
                              </InputGroup>
                            </div>
                          </SimpleGrid>

                          <InstallmentPayments
                            idx={idx}
                            unit={unit}
                            index={index}
                            modal3={modal3}
                            values={values}
                            setPlanIndex={setPlanIndex}
                            setFieldValue={setFieldValue}
                            purchasePrice={planPurchasePrice}
                            handleModalClose={() => handleModalClose(push)}
                          />
                        </>
                      ) : null}
                    </Box>
                  );
                })}
            </div>
          )}
        </FieldArray>
      </Popup.Body>
    </Popup>
  );
};

export default CustomPaymentPlanModal;

export const InstallmentPayments = ({
  idx,
  handleModalClose,
  index,
  modal3,
  unit,
  purchasePrice,
  setFieldValue,
  setPlanIndex,
}) => {
  const customPayments = `units.${index}.payment_plan.${idx}.custom_payments`;
  const targetPurchasePrice = `units.${index}.payment_plan.${idx}.purchase_price`;
  const [custom, setCustom] = useState([]);
  const [docObj, setDocObj] = useState({name: ''});
  const ABOUT_TO_CLEAR_ALL_FIELDS = useDisclosure();

  const handleReset = async () => {
    await setFieldValue(`units.${index}.payment_plan`, QUICK_PAYMENT_PLAN);
    modal3?.onClose();
    ABOUT_TO_CLEAR_ALL_FIELDS.onClose();
  };

  useEffect(() => {
    setFieldValue(customPayments, custom);
  }, [custom]);

  useEffect(() => {
    setFieldValue(targetPurchasePrice, purchasePrice);
  }, [purchasePrice]);

  const initialValues = {
    custom_payments: [
      {
        amount: '',
        period_in_months: '',
      },
    ],
  };

  const handleContractUpload = async (event, idx) => {
    // console.log(event?.currentTarget?.files[0]);
    setDocObj(event?.currentTarget?.files?.[0]);

    setFieldValue(`units.${index}.payment_plan.${idx}.contract`, [
      await encodeFileToBase64(event.currentTarget.files[0]).then(res => res),
    ]);
    setPlanIndex(idx);
  };

  const removeFile = () => {
    setDocObj({});
  };

  return (
    <motion.div
      exit={{opacity: [1, 0.5, 0.2, 0], y: '-10vw'}}
      initial={{opacity: 0, y: '-3vw'}}
      animate={{opacity: [0, 0.2, 0.5, 1], y: 0}}
      transition={{
        type: 'spring',
        stiffness: '20',
        delay: 0.1,
      }}
    >
      <Formik initialValues={initialValues}>
        {({values}) => (
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
                                position="absolute"
                                right={0}
                                top={-1}
                                color="red"
                                width="30px"
                                height="30px"
                                cursor="pointer"
                                alt="cancel_icon"
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
                            <div>
                              <label
                                style={{
                                  fontWeight: '600',
                                }}
                                htmlFor={`custom_payments.${indx}.amount`}
                              >
                                Next Installment Amount
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
                                  style={{...PriceInputWrapperStyle}}
                                  placeholder="next installment amount..."
                                  className="formik__field"
                                  name={`custom_payments.${indx}.amount`}
                                  value={
                                    formatAmount(values.custom_payments[indx].amount) == 'NaN'
                                      ? ''
                                      : formatAmount(values.custom_payments[indx].amount)
                                  }
                                />
                              </InputGroup>
                            </div>
                            <div className="col">
                              <label
                                style={{
                                  fontWeight: '600',
                                }}
                                htmlFor={`custom_payments.${indx}.period_in_months`}
                              >
                                Due period
                              </label>
                              <Field
                                as="select"
                                name={`custom_payments.${indx}.period_in_months`}
                                className="formik__field"
                              >
                                {/* Filter options dynamically */}
                                <option disabled value="">
                                  Due period...
                                </option>
                                {Array.from({length: 60}, (_, i) => i + 1)
                                  .filter(option => {
                                    // Filter out selected options from previous indexes
                                    const selectedOptions = values.custom_payments
                                      .slice(0, indx) // Consider indexes before the current one
                                      .map(item => item.period_in_months);
                                    return !selectedOptions.includes(option);
                                  })
                                  .map(value => (
                                    <option key={value} value={value}>
                                      {`${value} months after initial deposit`}
                                    </option>
                                  ))}
                              </Field>
                            </div>
                          </SimpleGrid>
                        </Box>
                      ))}
                    <SimpleGrid columns={2}>
                      <div>
                        <label
                          style={{
                            fontWeight: '600',
                            opacity: '0.6',
                          }}
                        >
                          Puchase price
                        </label>
                        <InputGroup
                          align="center"
                          border="1px solid #E4E4E4"
                          borderRadius={'10px'}
                          mt={2}
                          w="350px"
                          h="55px"
                        >
                          <PriceMenu disableMenu />
                          <Field
                            type="text"
                            disabled
                            style={{...PriceInputWrapperStyle, opacity: '0.6'}}
                            placeholder="purchase price..."
                            className="formik__field"
                            value={` ${formatToCurrency(purchasePrice)}`}
                          />
                        </InputGroup>
                      </div>
                      <Stack spacing={'10px'}>
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
                              mt={'-16px'}
                              h="50px"
                              name={`units.${index}.payment_plan.${idx}.contract`}
                              type="file"
                              onChange={e => handleContractUpload(e, idx)}
                              w="360px"
                              className="file__inputField file_Style"
                              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                              autocapitalize="characters"
                            />
                          }
                          removeFile={removeFile}
                          docObj={docObj}
                        />
                      </Stack>
                    </SimpleGrid>
                    {/* ============================= */}

                    <HStack justify="space-between" w="full" pt="30px">
                      {/* <Button
                        w="117px"
                        variant="dark"
                        onClick={ABOUT_TO_CLEAR_ALL_FIELDS.onOpen}
                        mt={0}
                        bg="#FFFFFF"
                        border={`1px solid ${themeStyles.color.matador__red}`}
                        color={themeStyles.color.matador__red}
                      >
                        Cancel
                      </Button> */}
                      <Box />
                      <HStack>
                        <Button
                          mt={0}
                          h="49px"
                          w="200px"
                          fontWeight="400"
                          fontSize="16px"
                          border={`1px solid #191919`}
                          type="button"
                          _hover={{
                            background: '#f7f7f7',
                            borderColor: '#191919',
                          }}
                          onClick={() =>
                            push({
                              amount: '',
                              period_in_months: '',
                            })
                          }
                          borderRadius="72px"
                        >
                          Add installments
                        </Button>

                        <Button
                          h="44px"
                          mt={0}
                          w="147px"
                          borderRadius="72px"
                          variant="dark"
                          onClick={handleModalClose}
                        >
                          Proceed
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
      <ResetInputFieldsModal modal={ABOUT_TO_CLEAR_ALL_FIELDS} resetFnc={handleReset} />
    </motion.div>
  );
};
