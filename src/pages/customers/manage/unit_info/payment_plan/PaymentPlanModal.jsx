import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useToast,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import modalImg from '/src/images/edit_plan_modal.png';
import {Button} from 'ui-lib/ui-lib.components';
import {useMutation} from '@tanstack/react-query';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'utils/axiosInstance';
import {BaseURL_TWO} from '/src/constants/routes';
import {Field} from 'formik';

const SubmitSchema = Yup.object().shape({
  duration: Yup.string().required('Required'),
  installmentPayment: Yup.string().required('Required'),
  initialDeposit: Yup.string().required('Required'),
  paymentFrequency: Yup.string().required('Required'),
});

const PaymentPlanModal = ({isOpen, onClose, unitToUse}) => {
  const toast = useToast();
  const token = JSON.parse(localStorage.getItem('devToken'));
  const mutation = useMutation({
    mutationFn: values => {
      const data = {
        initial_deposit_in_value: Number(values.initialDeposit),
        periodic_payment: Number(values.installmentPayment),
        payment_period_in_months: Number(values.duration),
        payment_frequency: values.paymentFrequency,
      };
      // console.log('unitToUse', unitToUse?.id);
      return axios.patch(
        `${BaseURL_TWO}/investment/edit-plan/${unitToUse?.id}/`,
        {bundles: data},
        {headers: {Authorization: `Bearer ${token}`}}
      );
    },
    onSuccess: res => {
      console.log(res);
      onClose();
      toast({
        title: 'Request success',
        description: `Payment plan edited successfully!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'An error occured',
        description: `${err?.code} : ${err?.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="383px" borderRadius="16px" h="580px" mt="21vh">
        <ModalCloseButton />
        <ModalBody px="25px" w="100%" pb="31px">
          <Formik
            initialValues={{
              duration: unitToUse?.payment_period_in_months || '',
              installmentPayment: unitToUse?.periodic_payment || '',
              initialDeposit: unitToUse?.initial_deposit_in_value || '',
              paymentFrequency: unitToUse?.payment_frequency || '',
            }}
            validationSchema={SubmitSchema}
            onSubmit={values => {
              mutation.mutate(values);
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
              <VStack width="100%" pb={'10px'}>
                <Image
                  alt=""
                  mt="9px"
                  src={modalImg.src}
                  boxSize="72px"
                  width="68px"
                  height="68px"
                />
                <Text
                  mt="5px"
                  textAlign="center"
                  maxW="235px"
                  fontSize="24px"
                  fontWeight="600"
                  lineHeight="30px"
                >
                  Edit Quick Plan
                </Text>
                <SimpleGrid w="full" spacing="20px" mt="27px" columns={1}>
                  <Field
                    as="select"
                    className="formik__field"
                    id="duration"
                    name="duration"
                    onChange={handleChange('duration')}
                    value={values.duration}
                    onBlur={handleBlur('duration')}
                    borderBottom={errors.duration && touched.duration ? 'red' : '1px solid #CBCBCB'}
                    placeholder="Duration"
                    color="#CBCBCB"
                  >
                    <option disabled value="">
                      Duration
                    </option>
                    <option value={3}>3 months</option>
                    <option value={6}>6 months</option>
                    <option value={9}>9 months</option>
                    <option value={12}>12 months</option>
                    <option value={18}>18 months</option>
                  </Field>
                  <Field
                    className="formik__field"
                    color="#CBCBCB"
                    mx={1}
                    required
                    type="text"
                    id="installmentPayment"
                    name="installmentPayment"
                    _placeholder={{color: 'gray.500'}}
                    defaultValue={values.installmentPayment}
                    onBlur={handleBlur('installmentPayment')}
                    onChange={handleChange('installmentPayment')}
                    borderBottom={
                      errors.installmentPayment && touched.installmentPayment
                        ? 'red'
                        : '1px solid #CBCBCB'
                    }
                    isAuth
                    placeholder="Installment payment"
                  />
                  <Field
                    className="formik__field"
                    color="#CBCBCB"
                    mx={1}
                    required
                    type="text"
                    id="initialDeposit"
                    name="initialDeposit"
                    _placeholder={{color: 'gray.500'}}
                    defaultValue={values.initialDeposit}
                    onBlur={handleBlur('initialDeposit')}
                    onChange={handleChange('initialDeposit')}
                    borderBottom={
                      errors.initialDeposit && touched.initialDeposit ? 'red' : '1px solid #CBCBCB'
                    }
                    isAuth
                    placeholder="Initial deposit"
                  />
                  <Field
                    as="select"
                    className="formik__field"
                    value={values.paymentFrequency}
                    onBlur={handleBlur.paymentFrequency}
                    onChange={handleChange('paymentFrequency')}
                    borderBottom={
                      errors.paymentFrequency && touched.paymentFrequency
                        ? 'red'
                        : '1px solid #CBCBCB'
                    }
                    color="#CBCBCB"
                    placeholder="Payment frequency"
                  >
                    <option disabled value="">
                      Payment frequency
                    </option>
                    <option value={'daily'}>Daily</option>
                    <option value={'flexible'}>Flexible</option>
                    <option value={'weekly'}>Weekly</option>
                    <option value={'monthly'}>Monthly</option>
                    <option value={'quarterly'}>Quaterly</option>
                    <option value={'bi-annually'}>Bi-annually</option>
                    <option value={'annually'}>Yearly</option>
                  </Field>
                </SimpleGrid>
                <Button
                  disabled={mutation.isLoading}
                  loading={mutation.isLoading}
                  onClick={() => handleSubmit()}
                  mt="33px"
                  variant="primary"
                  w={{base: 'full', lg: '80%'}}
                  h="48px"
                >
                  {mutation.isLoading ? <Spinner color="#FFF" /> : 'Save'}
                </Button>
              </VStack>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentPlanModal;
