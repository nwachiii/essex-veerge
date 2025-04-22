import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import SendAnOfferScreen from './screens/sendAnOffer';
import ClosingCostScreen from './screens/closingCost.Screen';
import {Formik, useFormik} from 'formik';
import {useMutation} from '@tanstack/react-query';
import {toastForError} from 'utils/toastForErrors';
import {sendAnOffer} from 'apis/customers';
import {CreateToast} from 'ui-lib/ui-lib.components';
import ClosingCost from '@/components/Drawers/closingCost';

export const SendAnOffer = ({SEND_OFFER_MODAL, customerId, refetch}) => {
  const [screen, setScreen] = useState('defineEquityAndSendAnOffer');
  const [selectedListingId, setSelectedListingId] = useState('');
  const [equityPacketName, setEquityPacketName] = useState('');

  const drawerModal = useDisclosure();
  const toast = useToast();
  const toaster = CreateToast('', 'success');
  const [isShortScreenHeight] = useMediaQuery('(max-height: 740px)');

  const mutation = useMutation(formData => sendAnOffer(formData), {
    onSuccess: async res => {
      await refetch();
      // toaster('Your private offer has been sent successfully');
      toast({
        title: `Your private offer has been sent successfully`,
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
      handleClose();
    },
    onError: err => {
      toast({
        title: 'Oops ...',
        description: `${
          err?.response?.status === 500
            ? "Apologies for the inconvenience. We're working on it. Please try again later."
            : err?.response?.status === 401
              ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
              : (err?.response?.data?.message ??
                err?.response?.message ??
                err?.message ??
                'Something went wrong')
        }`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #cbcbcb',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#fff',

      //   outline: '1px solid slategrey', // You can include this line if needed
    },
  };
  const customScrollbarStyle = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #fff',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#cbcbcb',

      //   outline: '1px solid slategrey', // You can include this line if needed
    },
  };

  const initialValues = {
    customer: customerId,
    agent_assigned: null,

    project: '',
    unit: '',
    offer_expiration: '',
    contracts: [],
    payment_type: 'outright',
    offer_price: '',
    closing_costs: [],
    deduct_from: 'available',

    plan_info: {
      initial_deposit: '',
      duration_in_months: '',
      offer_price: '',
      custom_payments: [
        {
          period_in_months: '',
          amount: '',
        },
      ],
    },
  };

  const formik = useFormik({
    initialValues,
  });

  const handleScreen = scrn => {
    setScreen(scrn);
  };
  const handleClose = () => {
    setScreen('defineEquityAndSendAnOffer');
    setSelectedListingId('');
    setEquityPacketName('');
    formik.resetForm();

    return SEND_OFFER_MODAL.onClose();
  };

  const displaySendAnOfferScreen = (key, values, setFieldValue) => {
    switch (key) {
      case 'defineEquityAndSendAnOffer':
        return (
          <SendAnOfferScreen
            SEND_OFFER_MODAL={SEND_OFFER_MODAL}
            setSelectedListingId={setSelectedListingId}
            selectedListingId={selectedListingId}
            customScrollbarStyles={customScrollbarStyles}
            scrollStyle={customScrollbarStyle}
            handleScreen={handleScreen}
            values={values}
            mutation={mutation}
            setEquityPacketName={setEquityPacketName}
            equityPacketName={equityPacketName}
            setFieldValue={setFieldValue}
            formik={formik}
          />
        );
        break;

      case 'setClosingCost':
        return (
          <ClosingCostScreen
            values={values}
            setFieldValue={setFieldValue}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            closingCosts={formik.values.closing_costs}
            formik={formik}
            handleClose={handleClose}
            drawerModal={drawerModal}
          />
        );
        break;

      default:
        <SendAnOfferScreen
          SEND_OFFER_MODAL={SEND_OFFER_MODAL}
          setSelectedListingId={setSelectedListingId}
          selectedListingId={selectedListingId}
          customScrollbarStyles={customScrollbarStyles}
          scrollStyle={customScrollbarStyle}
          handleScreen={handleScreen}
          values={values}
          mutation={mutation}
          setEquityPacketName={setEquityPacketName}
          equityPacketName={equityPacketName}
          setFieldValue={setFieldValue}
          formik={formik}
        />;

        break;
    }
  };
  return (
    <>
      <Modal
        motionPreset="slideInBottom"
        isOpen={SEND_OFFER_MODAL.isOpen}
        scrollBehavior="inside"
        onClose={handleClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          p="24px"
          minW="700px"
          transform={isShortScreenHeight ? 'scale(0.8) !important' : 'none'}
          minH="fit-content"
          maxH={`648px`}
          borderRadius="13.615px"
          maxW="710px"
        >
          <Formik
            initialValues={formik.initialValues}
            style={{backgroundColor: 'red'}}
            onSubmit={values => {
              const removeClosingCost = () => {
                const mainObj = {
                  ...values,
                  closing_costs: values.closing_costs.map((item, idx) => {
                    const {id, ...rest} = item;
                    return {...rest};
                  }),
                };
                return mainObj;
              };

              mutation.mutate(removeClosingCost());
            }}
          >
            {({values, setFieldValue}) => displaySendAnOfferScreen(screen, values, setFieldValue)}
          </Formik>
        </ModalContent>
        <ClosingCost drawerModal={drawerModal} />
      </Modal>
    </>
  );
};

export default SendAnOffer;
