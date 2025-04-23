import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup, extendTheme, HStack,
  Icon,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { theme, themeStyles } from '../../../../../theme';
import SelectPaymentPlanType from './SelectType';
import { ManualPaymentPlanModal } from './ManualPaymentPlanModal';
import { CustomPaymentPlanModal } from './CustomPaymentPlanModal';
import PreviewPaymentPlan from '../PreviewPaymentPlan';
import { QUICK_PAYMENT_PLAN } from '../../../../../constants/createListing';
import ManualPaymentPlanAssistance from '../../../../../components/VeergeAssistance/ManualPaymentPlanAssistance';
// import {PreviewPaymentPlan} from './PreviewPaymentPlan'

const styles = extendTheme({...theme});

export function WholeUnitsPaymentPlan({
  setFieldValue,
  values,
  unit,
  index,
  paymentPlan,
  removeFile,
  errors,
  touched,
}) {
  const [showPreview, setShowPreview] = useState('false');
  const [previewData, setPreviewData] = useState([]);
  const [savedPaymentPlan, setSavedPaymentPlan] = useState('false');
  const SELECT_PAYMENT_PLAN_TYPE = useDisclosure();
  const PAYMENT_PLAN_MODAL = useDisclosure();
  const CUSTOM_PAYMENT_PLAN_MODAL = useDisclosure();
  const WIDGET_MODAL = useDisclosure();

  const handleAddPaymentPlan = () => {
    SELECT_PAYMENT_PLAN_TYPE.onOpen();
    // setShowPreview('false');
  };

  const handleMore = () => {
    PAYMENT_PLAN_MODAL.onOpen();
  };
  useEffect(() => {
    if (unit?.payment_plan?.length == 0 && showPreview == 'true') {
      setFieldValue(`units.${index}.payment_plan`, QUICK_PAYMENT_PLAN);
    }
    if (unit?.payment_plan?.custom_payments?.length == 0 && showPreview == 'true') {
      setFieldValue(`units.${index}.payment_plan`, QUICK_PAYMENT_PLAN);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit?.payment_plan?.length]);

  return (
    <Box mt="60px">
      <HStack
        w="99.7%"
        justify="space-between"
        borderTop={'1px solid #E5E5E5'}
        borderBottom={'1px solid #E5E5E5'}
        py="27px"
      >
        <Text fontSize={'24px'} fontWeight={'500'} color="#191919" ml={0}>
          Does this unit come with a{' '}
          <span onClick={WIDGET_MODAL.onOpen} style={{color: '#4545FE', cursor: 'pointer'}}>
            payment plan
          </span>{' '}
          option?
        </Text>
       
        <ButtonGroup isAttached variant="outline">
          <Box
            variant="default"
            border="1px solid"
            borderColor={themeStyles.color.primary}
            type="button"
            cursor="pointer"
            display="flex"
            bg="transparent"
            fontWeight="400"
            align="center"
            px={4}
            borderRadius="8px"
            h="50px"
            color={themeStyles.color.primary}
            fontSize="16px"
            onClick={handleAddPaymentPlan}
          >
            <Icon alignSelf="center" as={AddIcon} mr="10px" />
            <Text my="auto">Add payment plan </Text>
          </Box>
        </ButtonGroup>
      
      </HStack>
      <PreviewPaymentPlan
        unit={unit}
        index={index}
        values={values}
        previewData={previewData}
        showPreview={showPreview}
        setPreviewData={setPreviewData}
        savedPaymentPlan={savedPaymentPlan}
        setFieldValue={setFieldValue}
        paymentPlan={unit?.payment_plan}
      />

      <SelectPaymentPlanType
        WIDGET_MODAL={WIDGET_MODAL}
        setFieldValue={setFieldValue}
        values={values}
        index={index}
        unit={unit}
        modal={SELECT_PAYMENT_PLAN_TYPE}
        modal2={PAYMENT_PLAN_MODAL}
        modal3={CUSTOM_PAYMENT_PLAN_MODAL}
      />
      <ManualPaymentPlanModal
        unit={unit}
        index={index}
        values={values}
        errors={errors}
        touched={touched}
        showPreview={showPreview}
        modal2={PAYMENT_PLAN_MODAL}
        WIDGET_MODAL={WIDGET_MODAL}
        setFieldValue={setFieldValue}
        setPreviewData={setPreviewData}
        setShowPreview={setShowPreview}
        savedPaymentPlan={savedPaymentPlan}
        setSavedPaymentPlan={setSavedPaymentPlan}
      />
     
      <CustomPaymentPlanModal
        unit={unit}
        index={index}
        values={values}
        WIDGET_MODAL={WIDGET_MODAL}
        setFieldValue={setFieldValue}
        setShowPreview={setShowPreview}
        setPreviewData={setPreviewData}
        modal3={CUSTOM_PAYMENT_PLAN_MODAL}
        setSavedPaymentPlan={setSavedPaymentPlan}
      />
      <ManualPaymentPlanAssistance WIDGET_MODAL={WIDGET_MODAL} />
    </Box>
  );
}

export default WholeUnitsPaymentPlan;
