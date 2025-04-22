import {Modal, ModalContent, ModalOverlay, useToast} from '@chakra-ui/react';
import React, {useState} from 'react';
import Fractionalize from './screens/fractionalize';
import {useFormik} from 'formik';
import AdditionalInfoForFractional from './screens/additionalInfo';
import FractionalizationSummary from './screens/summary';
import {useMutation} from '@tanstack/react-query';
import {createFractions} from 'apis/listings';
import {CreateToast} from 'ui-lib/ui-lib.components';
import {toastForError} from 'utils/toastForErrors';

const FractionalizationModal = ({
  modalDisclosure,
  unitQtyLeft,
  refetch,
  unitInfo,
  bundleId,
  isBuildingTypeSingleFamilyResidential,
}) => {
  const defaultScreen = 'fractionalize';
  const [screen, setScreen] = useState(defaultScreen);
  const [docObj, setDocObj] = useState({
    name: '',
  });
  const toast = useToast();
  const toaster = CreateToast('', 'success');
  const initialValues = {
    bundle: bundleId,
    no_of_fractions: '',
    price_per_fraction: 0,
    quantity: 1,
    strategy: '',
    allow_insurance: false,
    holding_period: '',
    enable_dividend: false,
    deal_structure: 'equity',
    dividend_amount: '',
    dividend_payout: '',
    dividend_start_date: '',
    year: '',
    packets: [],
    stakeholders: [
      {
        name: '',
        type: '',
      },
    ],
  };

  const formikBag = useFormik({
    initialValues,
  });

  const customScrollbarStyles = (trackColor = '#fff', thumbColor = '#cbcbcb') => ({
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: thumbColor,
    },
  });

  const handleClose = () => {
    setScreen(defaultScreen);
    setDocObj({
      name: '',
    });
    formikBag.resetForm();
    return modalDisclosure.onClose();
  };

  const handleScreen = scrn => () => {
    setScreen(scrn);
  };
  const mutation = useMutation(formData => createFractions(formData), {
    onSuccess: res => {
      toast({
        description: `You have successfully fractionalised this ${unitInfo.unit_title} unit`,
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
      refetch();
      handleClose();
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const displayFractionalizationModals = key => {
    switch (key) {
      case 'fractionalize':
        return (
          <Fractionalize
            unitInfo={unitInfo}
            unitQtyLeft={unitQtyLeft}
            bundleId={bundleId}
            formik={formikBag}
            handleClose={handleClose}
            isBuildingTypeSingleFamilyResidential={isBuildingTypeSingleFamilyResidential}
            handleScreen={handleScreen('additionalInfo')}
          />
        );

      case 'additionalInfo':
        return (
          <AdditionalInfoForFractional
            formik={formikBag}
            unitInfo={unitInfo}
            docObj={docObj}
            setDocObj={setDocObj}
            handleScreen={handleScreen}
            isBuildingTypeSingleFamilyResidential={isBuildingTypeSingleFamilyResidential}
            customScrollbarStyle={customScrollbarStyles}
          />
        );

      case 'summary':
        return (
          <FractionalizationSummary
            mutation={mutation}
            formik={formikBag}
            customScrollbarStyle={customScrollbarStyles}
            handleScreen={handleScreen}
            isBuildingTypeSingleFamilyResidential={isBuildingTypeSingleFamilyResidential}
          />
        );

      default:
        return (
          <Fractionalize
            unitInfo={unitInfo}
            unitQtyLeft={unitQtyLeft}
            bundleId={bundleId}
            formik={formikBag}
            handleScreen={handleScreen('additionalInfo')}
          />
        );
    }
  };

  return (
    <Modal
      //   isOpen={true}
      isOpen={modalDisclosure.isOpen}
      scrollBehavior="inside"
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent
        minW="fit-content"
        mt="14vh"
        mb="0px"
        borderRadius="16px"
        px="0px"
        pr="18px"
        py="0px"
      >
        {displayFractionalizationModals(screen)}
      </ModalContent>
    </Modal>
  );
};

export default FractionalizationModal;
