import React, {Fragment} from 'react';
// import {Widget} from '../../../ui-lib';
import {Box, Image, Slide, Text, VStack} from '@chakra-ui/react';

import veergeAssistanceHeaderImg from '/src/images/icons/veerge-assistance-header-black.svg';
import NeedHelpCreatingAccount from './NeedHelpCreatingAccount';
import {VeergeAssistantButton} from 'ui-lib/ui-lib.components';
import {Widget} from '../../../ui-lib/ui-lib.components/CustomWidget';
import {CustomAccordion} from '../../../ui-lib/ui-lib.components/Accordion';

export const CreateAccountAssistance = ({WIDGET_MODAL}) => {
  const handleOpenWidget = () => {
    WIDGET_MODAL.onOpen();
  };

  return (
    <Fragment>
      {WIDGET_MODAL.isOpen ? null : <VeergeAssistantButton onClick={handleOpenWidget} />}
      <Slide direction="bottom" in={WIDGET_MODAL.isOpen} style={{zIndex: 10}}>
        <Widget
          maxH="595px"
          minH="fit-content"
          h="595px"
          minW="386px"
          isOpen={WIDGET_MODAL?.isOpen}
          onClose={WIDGET_MODAL?.onClose}
        >
          <Widget.Header mx={0} px={0}>
            <Image
              src={veergeAssistanceHeaderImg.src}
              alt=""
              objectFit={'cover'}
              h={'93px'}
              w="full"
            />
          </Widget.Header>
          <Widget.Body pb={'40px'} bg="#F5F5F5" borderRadius="20px 20px 16px 16px">
            <VStack w="full" maxH="445px">
              <CustomAccordion
                bg="#FFFFFF"
                h="fit-content"
                defaultCheckedIndex={0}
                header={'Need help creating an account?'}
                allowToggle={false}
                noHeaderArrow
              >
                <NeedHelpCreatingAccount />
              </CustomAccordion>
            </VStack>
          </Widget.Body>
        </Widget>
      </Slide>
    </Fragment>
  );
};

export default CreateAccountAssistance;
