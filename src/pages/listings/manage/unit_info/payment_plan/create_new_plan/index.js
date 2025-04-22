/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {FieldArray, Form, Formik} from 'formik';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createNewPaymentPlan} from 'apis/listings';
import {toastForError} from 'utils/toastForErrors';
import {CreateNewManualPaymentPlanModal} from './CreateNewManualPaymentPlanModal';
import {
  convertNumberStringToInteger,
  validateAndProcessPaymentPlanData,
} from 'utils/removeEmptyObjectValues';
import {AddMoreBtn} from 'ui-lib/ui-lib.components';
import SelectPaymentPlanType from './SelectPaymentPlanType';
import {useDisclosure, Box, useToast, Button} from '@chakra-ui/react';
import {NEW_LISTING_UNITS_INFO, PAYMENT_PLAN_SCHEMA} from 'constants/createListing';
import CreateNewCustomPaymentPlanModal from './CreateNewCustomPaymentPlanModal';
import AOS from 'aos';
import {useRouter} from 'next/navigation';

export const CreateNewPaymentPlan = ({unitId, refetch}) => {
  const toast = useToast();
  const router = useRouter();
  const NEW_PLAN_MODAL = useDisclosure();
  // const formik = useFormikContext();
  const PAYMENT_PLAN_MODAL = useDisclosure();
  const CUSTOM_PAYMENT_PLAN_MODAL = useDisclosure();
  const WIDGET_MODAL = useDisclosure();
  const [payloadObject, setPayloadObject] = useState({});
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  let initialValues = {units: [NEW_LISTING_UNITS_INFO]};
  let PAYMENT_PLAN_DATA;
  const queryClient = useQueryClient();

  const mutation = useMutation(formData => createNewPaymentPlan(formData), {
    onSuccess: res => {
      refetch();
      // PAYMENT_PLAN_MODAL.onClose();
      // CUSTOM_PAYMENT_PLAN_MODAL.onClose();
      router.refresh();
      toast({
        title: 'Plan added successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      // PAYMENT_PLAN_DATA = PAYMENT_PLAN_SCHEMA;
    },
    onError: err => {
      console.log(err);
      toastForError(err, true, toast);
    },
  });

  // console.log('Plan added successfully 1', PAYMENT_PLAN_DATA);

  const handleAddPaymentPlan = () => {
    NEW_PLAN_MODAL.onOpen();
  };

  const handleSubmitPlan = arg => {
    PAYMENT_PLAN_DATA = arg?.payment_plan;
    const cleanData = validateAndProcessPaymentPlanData(PAYMENT_PLAN_DATA, setIsAllFieldsFilled);
    setPayloadObject({
      unit: unitId,
      plan_data: {
        ...cleanData[0],
        purchase_price: convertNumberStringToInteger(cleanData[0]?.purchase_price),
      },
    });
  };

  useEffect(() => {
    if (isAllFieldsFilled == true) {
      mutation.mutate({...payloadObject});
    }
  }, [isAllFieldsFilled]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async values => {
          // console.log('UNITS', values.units);
        }}
      >
        {({values, errors, touched, setFieldValue}) => (
          <Form>
            <FieldArray name="units">
              {({insert, remove, push}) => (
                <>
                  <div>
                    {/* {console.log('Plan 3', values)} */}
                    {values.units.map((unit, index) => (
                      <Box key={index}>
                        <AddMoreBtn
                          mb="15px"
                          btnText="Create new plan"
                          clickFunction={handleAddPaymentPlan}
                          h="42px"
                          fontSize="14px"
                          borderRadius="72px"
                          borderColor="#a3a3a3"
                          iconStyle={{color: '#191919'}}
                          color="#191919"
                        />

                        <SelectPaymentPlanType
                          unit={unit}
                          index={index}
                          values={values}
                          modal={NEW_PLAN_MODAL}
                          WIDGET_MODAL={WIDGET_MODAL}
                          modal2={PAYMENT_PLAN_MODAL}
                          setFieldValue={setFieldValue}
                          modal3={CUSTOM_PAYMENT_PLAN_MODAL}
                        />
                        <CreateNewManualPaymentPlanModal
                          unit={unit}
                          index={index}
                          values={values}
                          errors={errors}
                          touched={touched}
                          mutation={mutation}
                          handleSubmit={handleSubmitPlan}
                          modal2={PAYMENT_PLAN_MODAL}
                          setFieldValue={setFieldValue}
                        />

                        <CreateNewCustomPaymentPlanModal
                          unit={unit}
                          index={index}
                          values={values}
                          mutation={mutation}
                          handleModalClose={handleSubmitPlan}
                          setFieldValue={setFieldValue}
                          modal3={CUSTOM_PAYMENT_PLAN_MODAL}
                        />
                      </Box>
                    ))}
                  </div>
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateNewPaymentPlan;
