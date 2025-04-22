import {SmallCloseIcon} from '@chakra-ui/icons';
import {Box, Icon, SimpleGrid} from '@chakra-ui/react';
import {Field, FieldArray} from 'formik';
import React from 'react';
import {AddMoreBtn} from 'ui-lib/ui-lib.components';
import {formatAmount} from '../../../../../utils';

export function ManualPaymentPlan({unit, values, index}) {
  return (
    <Box mt={10}>
      {values.units[index].payment_class == 'manual' && (
        <FieldArray name={`units.${index}.payment_plan`}>
          {({insert, remove, push}) => (
            <div>
              {unit.payment_plan &&
                unit.payment_plan.length > 0 &&
                unit.payment_plan.map((payments, idx) => (
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
                      <div className="col">
                        <label htmlFor={`units.${index}.payment_plan.${idx}.payment_frequency`}>
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
                          <option value={'flexible'}>Flexible</option>
                          <option value={'weekly'}>Weekly</option>
                          <option value={'monthly'}>Monthly</option>
                          <option value={'quarterly'}>Quaterly</option>
                          <option value={'bi-annually'}>Bi-annually</option>
                          <option value={'annually'}>Yearly</option>
                        </Field>
                      </div>
                      {values.units[index].payment_plan[idx].payment_frequency !== 'flexible' && (
                        <div>
                          <label htmlFor={`units.${index}.payment_plan.${idx}.periodic_payment`}>
                            Installment payment
                          </label>

                          <Field
                            type="text"
                            placeholder="Installment payment..."
                            className="formik__field"
                            name={`units.${index}.payment_plan.${idx}.periodic_payment`}
                            value={
                              formatAmount(unit.payment_plan[idx].periodic_payment) == 'NaN'
                                ? ''
                                : formatAmount(unit.payment_plan[idx].periodic_payment)
                            }
                          />
                        </div>
                      )}
                    </SimpleGrid>
                  </Box>
                ))}
              <AddMoreBtn
                mt={-10}
                justify="flex-end"
                btnText="Add payment plan"
                clickFunction={() =>
                  push({
                    initial_deposit_in_value: '',
                    periodic_payment: '',
                    payment_period_in_months: '',
                    payment_frequency: '',
                  })
                }
              />
            </div>
          )}
        </FieldArray>
      )}
    </Box>
  );
}

export default ManualPaymentPlan;
