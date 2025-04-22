import React from 'react';
import {CustomAccordion, Widget} from '../../../ui-lib';
import {Box, Flex, Image, Slide, Text} from '@chakra-ui/react';

import veergeAssistanceHeaderImg from '/src/images/icons/veerge-assistance-header-blue.svg';

import {WidgetTopRightCorner} from '../../../ui-lib/ui-lib.components/CustomWidget/WidgetTopRightCorner';
import {FaRegLightbulb} from 'react-icons/fa';
import {themeStyles} from '../../../theme';
import WhatIsPaymentPlan from './WhatIsPaymentPlan';

export const ManualPaymentPlanAssistance = ({WIDGET_MODAL}) => {
  return (
    <Box position={'relative'}>
      <Slide direction="top" in={WIDGET_MODAL.isOpen}>
        <WidgetTopRightCorner
          minH="fit-content"
          h="560px"
          minW="386px"
          isOpen={WIDGET_MODAL?.isOpen}
          onClose={WIDGET_MODAL?.onClose}
        >
          <WidgetTopRightCorner.Header mx={0} px={0}>
            <Image
              src={veergeAssistanceHeaderImg.src}
              alt=""
              objectFit={'cover'}
              h={'93px'}
              w="full"
            />
          </WidgetTopRightCorner.Header>
          <WidgetTopRightCorner.Body
            bg="#F5F5F5"
            h="605px"
            pb={'30px'}
            borderRadius="20px 20px 16px 16px"
          >
            <CustomAccordion defaultCheckedIndex={0} header={'What is Payment plan?'}>
              <WhatIsPaymentPlan />
            </CustomAccordion>
          </WidgetTopRightCorner.Body>
        </WidgetTopRightCorner>
      </Slide>
    </Box>
  );
};

export default ManualPaymentPlanAssistance;
