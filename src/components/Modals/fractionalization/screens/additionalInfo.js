import React, {useState} from 'react';
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
import HoldingPeriod from '@/components/Drawers/holdingPeroid';
import Strategy from '@/components/Drawers/strategy';
import DealStructure from '@/components/Drawers/dealStructure';
import InvestorsPacket from '@/components/Drawers/investorsPacket';
import EditFractionalInfo from '../../editFractional/editFractionalInfo';
import FillDividend from '../../editFractional/fillDividend';
import Stakeholders from '../../editFractional/stakeHolders';
import BackArrowIcon from '@/components/assets/BackArrowIcon';
import {encodeFileToBase64} from 'utils';

const AdditionalInfoForFractional = ({
  customScrollbarStyle,
  setDocObj,
  docObj,
  unitInfo,
  formik,
  handleScreen,
  isBuildingTypeSingleFamilyResidential,
}) => {
  const strategyModal = useDisclosure();
  const holdingPeriodModal = useDisclosure();
  const dealStructureModal = useDisclosure();
  const investorsPacketModal = useDisclosure();

  const toast = useToast();

  const isValidToProceed = () => {
    const val = formik.values;
    const areEquitiesValid = () => {
      const isPricePerFractionValid = Number(val.price_per_fraction) > 0;
      const isBundleValid = val.bundle;
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
        isPricePerFractionValid &&
        isBundleValid &&
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
    try {
      docfile = await encodeFileToBase64(arg[0]);
      formik.setFieldValue('packets', [docfile]);
      setDocObj(arg[0]);
    } catch (error) {
      toastForError(error, true, toast);
    }
  };

  const displayDropDownDefaultName = (dropDownArray, valueOfdropDown) => {
    return dropDownArray.find(item => item.value === valueOfdropDown)?.name ?? '';
  };

  return (
    <>
      <HStack my="24px" px="36px" pr="18px" justifyContent="space-between" w="full">
        <HStack spacing="8px">
          <BackArrowIcon onClick={handleScreen('fractionalize')} cursor="pointer" />

          <Heading fontSize="24px" color="#191919" fontWeight="500">
            Additional Info
          </Heading>
        </HStack>
        <ModalCloseButton position="initial" />
      </HStack>
      <ModalBody p="0px" minW="622px" maxW="622px" px="36px" pr="0px">
        <Stack spacing="24px" w="full" position="relative" zIndex={2}>
          <Stack
            spacing="24px"
            w="full"
            maxH="410px"
            overflowY="auto"
            px="0px"
            pr="18px"
            sx={customScrollbarStyle('#cbcbcb', '#fff')}
          >
            <EditFractionalInfo
              forFractionalization
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
              isBuildingTypeSingleFamilyResidential={isBuildingTypeSingleFamilyResidential}
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
          <Flex justify={'flex-end'} pr="8px" pb="24px" w="full">
            <Button
              h="48px"
              variant="md-filled-radius"
              px="63.85px"
              onClick={handleScreen('summary')}
              isDisabled={!isValidToProceed()}
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
            >
              Proceed
            </Button>
          </Flex>
        </Stack>
      </ModalBody>
      <Strategy drawerModal={strategyModal} />
      <HoldingPeriod drawerModal={holdingPeriodModal} />
      <DealStructure drawerModal={dealStructureModal} />
      <InvestorsPacket drawerModal={investorsPacketModal} />
    </>
  );
};

export default AdditionalInfoForFractional;
