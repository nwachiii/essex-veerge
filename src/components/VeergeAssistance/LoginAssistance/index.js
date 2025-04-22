import React from 'react';
import {Box, Image, Slide, VStack} from '@chakra-ui/react';
import {Widget} from '../../../ui-lib/ui-lib.components/CustomWidget';
import {CustomAccordion} from '../../../ui-lib/ui-lib.components/Accordion';

import veergeAssistanceHeaderImg from '/src/images/icons/veerge-assistance-header-black.svg';
import HavingTroublesSigningIn from './HavingTroublesSigningIn';
import UnauthorizedLoginAttempt from './UnauthorizedLoginAttempt';
import SecuredVeergeAccount from './SecuredVeergeAccount';
import TransferOwnership from './TransferOwnership';
import {VeergeAssistantButton} from 'ui-lib/ui-lib.components';
import {motion} from 'framer-motion';

export const LoginAssistance = ({WIDGET_MODAL}) => {
  const handleOpenWidget = () => {
    WIDGET_MODAL.onOpen();
  };

  return (
    <div>
      {WIDGET_MODAL.isOpen ? null : <VeergeAssistantButton onClick={handleOpenWidget} />}
      <Slide direction="bottom" in={WIDGET_MODAL.isOpen} style={{zIndex: 10}}>
        <Widget
          bg="#F5F5F5"
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
          <Widget.Body
            as={motion.div}
            transition={{type: 'tween', duration: 0.9}}
            pb={'30px'}
            borderRadius="20px 20px 16px 16px"
          >
            <VStack w="full" maxH="445px">
              {LoginWidgets.map((item, idx) => (
                <CustomAccordion bg="#FFFFFF" key={idx} header={item.header}>
                  {item.content}
                </CustomAccordion>
              ))}
            </VStack>
          </Widget.Body>
        </Widget>
      </Slide>
    </div>
  );
};

export default LoginAssistance;

const LoginWidgets = [
  {
    header: 'Having troubles signing in?',
    content: <HavingTroublesSigningIn />,
  },
  {
    header: 'Notification of Unauthorized Login Attempt',
    content: <UnauthorizedLoginAttempt />,
  },
  {
    header: 'Keeping your Veerge account secured',
    content: <SecuredVeergeAccount />,
  },
  {
    header: 'How to Transfer a Veerge Ownership',
    content: <TransferOwnership />,
  },
];
