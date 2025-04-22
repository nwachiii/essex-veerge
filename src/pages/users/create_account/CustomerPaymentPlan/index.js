import {Box, Container, Divider, extendTheme, Heading, SimpleGrid, Text} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import axios from 'utils/axiosInstance';
import {useFormik} from 'formik';
import React from 'react';
import {CUSTOMER_PAYMENT_PLAN} from '../../../../constants/createCustomers';
import {theme} from '../../../../theme';
import {CustomSelect, Input} from '../../../../ui-lib';
import {formatAmount} from '../../../../utils';
import {removeEmptyObjectValues} from '../../../../utils/removeEmptyObjectValues';
import CreateCustomerFooter from '../CustomerDetails/CreateCustomerFooter';
import PaymentType from './PaymentType';

const styles = extendTheme({...theme});

export default function CustomerPaymentPlan({
  planObject,
  paymentPlan,
  setPaymentPlan,
  index,
  handleProgress,
  subPages,
}) {
  // I only need two props - subPages and handleProgress; clear out the rest
  const AddPaymentPlanType = () => {
    setPaymentPlan([...paymentPlan, Object.fromEntries(CUSTOMER_PAYMENT_PLAN)]);
  };

  const SubmitPlanTypeForm = e => {
    if (e.cancelable) e.preventDefault();
    removeEmptyObjectValues(paymentPlan);
    console.log('customers payment plan', paymentPlan);
  };

  const handleChangeInput = (id, event) => {
    const val = event.target.value;
    const name = event.target.name;
    const newInputFields = paymentPlan.map((i, index) => {
      if (id == index) {
        i[name] = val;
      }
      return i;
    });
    setPaymentPlan(newInputFields);
  };

  const mutation = useMutation(formData => {
    return axios.post('/api', formData);
    //  axios.post('/api', new FormData(formData));
  });
  const formik = useFormik({
    initialValues: CUSTOMER_PAYMENT_PLAN,
    onSubmit: values => {
      mutation.mutate({...values});
    },
  });
  return (
    <Box>
      <Heading {...styles.textStyles.h2}>Payment Plan</Heading>
      <Container
        p="12"
        maxW={'7xl'}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
        color="gray.900"
        borderRadius="2xl"
        background="#FFFFFF"
        box-shadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      >
        <Box mt={10}>
          <SimpleGrid placeItems="center" columns={2} spacing={10}>
            <Input
              mx={1}
              required
              type="text"
              id="initial_deposit_in_value"
              name="initial_deposit_in_value"
              onChange={e => handleChangeInput(index, e)}
              value={
                formatAmount(formik.values.initial_deposit_in_value) == 'NaN'
                  ? ''
                  : formatAmount(formik.values.initial_deposit_in_value)
              }
              placeholder="Initial deposit"
              _placeholder={{color: 'gray.500'}}
            />
            <Input
              mx={1}
              required
              type="date"
              id="next_due_date"
              name="next_due_date"
              onChange={e => handleChangeInput(index, e)}
              defaultValue={formik.values.next_due_date}
              placeholder="Payment date"
              _placeholder={{color: 'gray.500'}}
            />

            <CustomSelect
              id="total_duration"
              name="total_duration"
              placeholder="Total duration"
              onChange={e => handleChangeInput(index, e)}
              defaultValue={formik.values.total_duration}
            >
              <option value={3}>3 months</option>
              <option value={6}>6 months</option>
              <option value={9}>9 months</option>
              <option value={12}>12 months</option>
              <option value={18}>18 months</option>
            </CustomSelect>
            <CustomSelect
              id="payment_cycle"
              name="payment_cycle"
              placeholder="Payment cycle"
              onChange={e => handleChangeInput(index, e)}
              defaultValue={formik.values.payment_cycle}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="bi-annually">Bi-annually</option>
              <option value="annually">Yearly</option>
            </CustomSelect>
          </SimpleGrid>
        </Box>
        <PaymentType
          AddPaymentPlanType={AddPaymentPlanType}
          SubmitPlanTypeForm={SubmitPlanTypeForm}
          index={index}
          planTypeObject={planObject}
          handleChangeInput={handleChangeInput}
        />
        <Divider color="#E4E4E4" my="50px" w="full" orientation="horizontal" />
        <CreateCustomerFooter formik={formik} handleProgress={handleProgress} subPages={subPages} />
      </Container>
    </Box>
  );
}
