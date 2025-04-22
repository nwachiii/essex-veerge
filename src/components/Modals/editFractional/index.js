import React, {useEffect, useState} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button,
  HStack,
  Heading,
  Stack,
  useDisclosure,
  useToast,
  Spinner,
  Center,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import HoldingPeriod from '@/components/Drawers/holdingPeroid';
import Strategy from '@/components/Drawers/strategy';
import DealStructure from '@/components/Drawers/dealStructure';
import InvestorsPacket from '@/components/Drawers/investorsPacket';
import {useMutation} from '@tanstack/react-query';
import FillDividend from './fillDividend';
import Stakeholders from './stakeHolders';
import {editFractionalQuantity, editFractions} from 'apis/listings';
import {CreateToast} from 'ui-lib/ui-lib.components';
import {toastForError} from 'utils/toastForErrors';
import {encodeFileToBase64} from 'utils';
import EditFractionalInfo from './editFractionalInfo';

export const EditFractional = ({
  modalDisclosure,
  data,
  isError,
  isLoading,
  error,
  refetch,
  drawerDisclosure,
  unitInfoRefetch,
  unitInfo,
}) => {
  const FRACTIONALINFO = data?.data;

  const strategyModal = useDisclosure();
  const holdingPeriodModal = useDisclosure();
  const dealStructureModal = useDisclosure();
  const investorsPacketModal = useDisclosure();
  const [docObj, setDocObj] = useState({
    name: FRACTIONALINFO?.packets?.[0]?.packet ? 'Investor packet' : '',
  });
  const toast = useToast();
  const toaster = CreateToast();

  const handleErrorToast = error =>
    toast({
      title: 'Oops ...',
      description: `${
        error?.response?.status === 500
          ? "Apologies for the inconvenience. We're working on it. Please try again later."
          : error?.response?.status === 401
            ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
            : (error?.response?.data?.message ??
              error?.response?.message ??
              error?.message ??
              'Something went wrong')
      }`,
      status: 'error',
      duration: 8000,
      isClosable: true,
      position: 'top-right',
    });

  const customScrollbarStyle = (trackColor = '#fff', thumbColor = '#cbcbcb') => ({
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

  const editFractionMutation = useMutation(formData => editFractions(formData), {});

  const editQuantityMutation = useMutation(formData =>
    editFractionalQuantity(unitInfo.id, formData)
  );

  const handleMutations = async (formForFractions, formForQuantity, resetForm) => {
    try {
      await Promise.all([
        editFractionMutation.mutateAsync(formForFractions),
        editQuantityMutation.mutateAsync(formForQuantity),
      ]);
      unitInfoRefetch();
      refetch();
      toaster('Fractional details updated successfully');
      drawerDisclosure.onOpen();
      modalDisclosure.onClose();
      setDocObj({name: ''});
      resetForm();
    } catch (errorArray) {
      Array.isArray(errorArray)
        ? errorArray.forEach(({error}) => {
            handleErrorToast(error);
          })
        : handleErrorToast(errorArray);
    }
  };

  const stakeHolders =
    FRACTIONALINFO?.partners.length || FRACTIONALINFO?.partners
      ? FRACTIONALINFO?.partners.map((stakeHolder, index) => ({
          name: stakeHolder?.stakeholder_name,
          type: stakeHolder?.stakeholder_type,
        }))
      : [
          {
            name: '',
            type: '',
          },
        ];

  const initialValues = {
    bundle: unitInfo?.id,
    quantity: unitInfo?.total_fractionalized_units,
    strategy: unitInfo?.strategy,
    allow_insurance: unitInfo?.allow_insurance,
    holding_period: unitInfo.holding_period,
    enable_dividend: FRACTIONALINFO?.extra_info?.enable_dividend,
    deal_structure: FRACTIONALINFO?.extra_info?.deal_structure,
    dividend_amount: FRACTIONALINFO?.extra_info?.dividend_amount,
    dividend_payout: FRACTIONALINFO?.extra_info?.dividend_payout,
    dividend_start_date: FRACTIONALINFO?.extra_info?.dividend_start_date,
    packets: FRACTIONALINFO?.packets?.[0]?.packet || [],
    stakeholders: stakeHolders,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, prop) => {
      const {quantity, ...formBodyWithOutQuantity} = values;

      const formForFractionsEdit = {
        ...formBodyWithOutQuantity,
        stakeholders: formBodyWithOutQuantity.stakeholders.flatMap(holdersObj => {
          if (holdersObj?.name?.trim() && holdersObj?.type?.trim()) {
            return holdersObj;
          } else {
            return [];
          }
        }),
      };

      handleMutations(formForFractionsEdit, {quantity}, prop.resetForm);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setDocObj({name: ''});
    modalDisclosure.onClose();
    drawerDisclosure.onOpen();
  };

  const handleAmount = (event, name) => {
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

    formik.setFieldValue(name, val);
  };

  const removeFile = () => {
    setDocObj({name: ''});
    formik.setFieldValue('packets', []);
  };

  const handleContractUpload = async arg => {
    let docfile;
    const prefixRegex = /^data:(image\/(png|jpeg|gif)|application\/pdf);base64,/;

    try {
      docfile = await encodeFileToBase64(arg[0]);
      formik.setFieldValue('packets', [docfile?.replace(prefixRegex, '') ?? '']);
      setDocObj(arg[0]);
    } catch (error) {
      toastForError(error, true, toast);
    }
  };

  const isValidToProceed = val => {
    const areEquitiesValid = () => {
      const isQuantityOfFractionalIsValid = !!val.quantity || val.quantity === 0;
      const isStakeHoldersInfoValid = val.stakeholders.length
        ? val.stakeholders.every(item => item?.name?.trim() && item?.type?.trim()) ||
          (val.stakeholders.length === 1 &&
            !val.stakeholders[0]?.name?.trim() &&
            !val.stakeholders[0]?.type?.trim())
        : true;

      let isEnableDividendValid = true;

      const isStrategyValid = !!val.strategy;
      const isHoldingPeriodValue = !!val.holding_period;

      const dealStructureIsValid = !!val.deal_structure;

      const packetHasBeenSelected = !!val.packets.length;

      if (val.enable_dividend) {
        isEnableDividendValid =
          !!val.dividend_payout && !!val.dividend_amount && !!val.dividend_start_date;
      }

      return (
        isStakeHoldersInfoValid &&
        isEnableDividendValid &&
        isHoldingPeriodValue &&
        packetHasBeenSelected &&
        dealStructureIsValid &&
        isStrategyValid &&
        isQuantityOfFractionalIsValid
      );
    };

    return areEquitiesValid();
  };

  if (isError) {
    toastForError(error, isError, toast);
    modalDisclosure.onClose();
  }

  const displayDropDownDefaultName = (dropDownArray, valueOfdropDown) => {
    return dropDownArray.find(item => item.value === valueOfdropDown)?.name ?? '';
  };

  return (
    <>
      <Modal isOpen={modalDisclosure.isOpen} scrollBehavior="inside" onClose={handleClose}>
        <ModalOverlay />
        <ModalContent
          minW="631.8px"
          mt="14vh"
          maxW="637px"
          mb="0px"
          borderRadius="16px"
          px="32px"
          pr="0px"
          pt="24px"
          pb="0px"
        >
          <HStack pr="32px" justifyContent="space-between" w="full">
            <Heading fontSize="24px" color="#191919" fontWeight="500">
              Edit Fractional
            </Heading>
            <ModalCloseButton position="initial" />
          </HStack>
          <ModalBody p="0px">
            {isLoading ? (
              <Center minH="400px">
                <Spinner />
              </Center>
            ) : (
              <Stack spacing="24px" w="full" pr="10px">
                <Stack
                  spacing="24px"
                  w="full"
                  maxH="410px"
                  overflowY="auto"
                  pr="22px"
                  pl="2px"
                  sx={customScrollbarStyle('#cbcbcb', '#fff')}
                >
                  <EditFractionalInfo
                    unitInfo={unitInfo}
                    formik={formik}
                    strategyModal={strategyModal}
                    removeFile={removeFile}
                    handleContractUpload={handleContractUpload}
                    displayDropDownDefaultName={displayDropDownDefaultName}
                    investorsPacketModal={investorsPacketModal}
                    dealStructureModal={dealStructureModal}
                    customScrollbarStyle={customScrollbarStyle}
                    holdingPeriodModal={holdingPeriodModal}
                    docObj={docObj}
                  />

                  {formik.values.enable_dividend ? (
                    <FillDividend
                      formik={formik}
                      handleAmount={handleAmount}
                      displayDropDownDefaultName={displayDropDownDefaultName}
                      customScrollbarStyle={customScrollbarStyle}
                    />
                  ) : null}
                  <Stakeholders formik={formik} />
                </Stack>
                <Flex justify={'flex-end'} pr="22px" pb="24px" w="full">
                  <Button
                    w="121px"
                    h="48px"
                    variant="md-filled-radius"
                    px="32px"
                    fontSize="15.961px"
                    fontWeight="400"
                    color="#ffffff"
                    // borderRadius="10px"
                    bg="#242526"
                    _hover={{
                      opacity: '1',
                    }}
                    _active={{
                      opacity: '1',
                    }}
                    _focus={{
                      opacity: '1',
                    }}
                    onClick={formik.handleSubmit}
                    isDisabled={
                      !isValidToProceed(formik.values) ||
                      editFractionMutation.isLoading ||
                      editQuantityMutation.isLoading
                    }
                    isLoading={editFractionMutation.isLoading || editQuantityMutation.isLoading}
                  >
                    Update
                  </Button>
                </Flex>
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Strategy drawerModal={strategyModal} />
      <HoldingPeriod drawerModal={holdingPeriodModal} />
      <DealStructure drawerModal={dealStructureModal} />
      <InvestorsPacket drawerModal={investorsPacketModal} />
    </>
  );
};
