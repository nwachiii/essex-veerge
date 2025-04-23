import {Box, Button, ButtonGroup, Icon, SimpleGrid, Stack} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import React, {useEffect, useState} from 'react';
import {formatAmount} from '../../../../../utils';
import {SmallCloseIcon} from '@chakra-ui/icons';
import {Field, FieldArray, Form, Formik} from 'formik';

export function CustomPaymentPlan({index, unit, values, setFieldValue}) {
  return (
    <Box mt={8}>
      {values.units[index].payment_class == 'custom' && (
        <FieldArray name={`units.${index}.payment_plan`}>
          {({insert, remove, push}) => (
            <div>
              {values.units[index].payment_plan.length > 0 &&
                values.units[index].payment_plan.map((payments, idx) => (
                  <Box key={idx} w="full" position="relative" mt="-60px">
                    <div className="col">
                      <Icon
                        position="absolute"
                        right={-6}
                        onClick={() => remove(idx)}
                        as={SmallCloseIcon}
                        cursor="pointer"
                        width="30px"
                        height="30px"
                        alt="cancel_icon"
                        color="red"
                      />
                    </div>{' '}
                    <SimpleGrid spacing="26px" my="106px" columns={2} className="row" key={idx}>
                      <div className="col">
                        <label
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
                          htmlFor={`units.${index}.payment_plan.${idx}.initial_deposit_in_value`}
                        >
                          Initial deposit
                        </label>

                        <Field
                          type="text"
                          placeholder="Initial deposit..."
                          className="formik__field"
                          name={`units.${index}.payment_plan.${idx}.initial_deposit_in_value`}
                          value={
                            formatAmount(unit.payment_plan[idx].initial_deposit_in_value) == 'NaN'
                              ? ''
                              : formatAmount(unit.payment_plan[idx].initial_deposit_in_value)
                          }
                        />
                      </div>
                    </SimpleGrid>
                    <InstallmentPayments
                      setFieldValue={setFieldValue}
                      idx={idx}
                      index={index}
                      values={values}
                      unit={unit}
                    />
                  </Box>
                ))}
            </div>
          )}
        </FieldArray>
      )}
    </Box>
  );
}

export default CustomPaymentPlan;

const InstallmentPayments = ({idx, index, unit, values, setFieldValue}) => {
  const customPayments = `units.${index}.payment_plan.${idx}.custom_payments`;
  const [custom, setCustom] = useState([]);
  useEffect(() => {
    setFieldValue(customPayments, custom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [custom]);
  const initialValues = {
    custom_payments: [
      {
        amount: '',
        period_in_months: '',
      },
    ],
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
        {({values, isSubmitting, setFieldValue}) => (
          <>
            {values.custom_payments.length > 0 && setCustom(values.custom_payments)}
            <Form>
              <FieldArray name={`custom_payments`}>
                {({insert, remove, push}) => (
                  <div style={{marginTop: '-54px'}}>
                    {values.custom_payments.length > 0 &&
                      values?.custom_payments.map((payment, indx) => (
                        <Box key={indx} w="full" position="relative" mt={'-6px'}>
                          <div className="col">
                            <Icon
                              position="absolute"
                              right={-3}
                              top={-4}
                              onClick={() => remove(indx)}
                              as={SmallCloseIcon}
                              cursor="pointer"
                              width="30px"
                              height="30px"
                              alt="cancel_icon"
                              color="orange"
                            />
                          </div>{' '}
                          <SimpleGrid
                            spacing="26px"
                            my="65px"
                            columns={2}
                            className="row"
                            key={idx}
                            w="full"
                          >
                            <div>
                              <label htmlFor={`custom_payments.${indx}.amount`}>
                                Next Installment Amount
                              </label>
                              <Field
                                type="text"
                                placeholder="next installment amount..."
                                className="formik__field"
                                name={`custom_payments.${indx}.amount`}
                                value={
                                  formatAmount(values.custom_payments[indx].amount) == 'NaN'
                                    ? ''
                                    : formatAmount(values.custom_payments[indx].amount)
                                }
                              />
                            </div>
                            <div className="col">
                              <label htmlFor={`custom_payments.${indx}.period_in_months`}>
                                Due period
                              </label>
                              <Field
                                as="select"
                                className="formik__field"
                                name={`custom_payments.${indx}.period_in_months`}
                              >
                                <option disabled value="">
                                  Due period...
                                </option>
                                <option value={1}> After 1 month</option>
                                <option value={2}>After 2 months</option>
                                <option value={3}>After 3 months</option>
                                <option value={4}>After 4 months</option>
                                <option value={5}>After 5 months</option>
                                <option value={6}>After 6 months</option>
                                <option value={7}>After 7 months</option>
                                <option value={8}>After 8 months</option>
                                <option value={9}>After 9 months</option>
                                <option value={10}>After 10 months</option>
                                <option value={11}>After 11 months</option>
                                <option value={12}>After 12 months</option>
                              </Field>
                            </div>
                          </SimpleGrid>
                        </Box>
                      ))}
                    <Button
                      mb={10}
                      colorScheme="orange"
                      type="button"
                      onClick={() =>
                        push({
                          amount: '',
                          period_in_months: '',
                        })
                      }
                    >
                      Add installments
                    </Button>
                  </div>
                )}
              </FieldArray>
            </Form>
          </>
        )}
      </Formik>
    </motion.div>
  );
};
