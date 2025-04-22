import React from 'react';
import {Popup} from '../../ui-lib/ui-lib.components';

export const CustomisedModal = ({isModalOpen, onModalClose, children, ...rest}) => {
  return (
    <Popup isOpen={isModalOpen} onClose={onModalClose} {...rest}>
      <Popup.Header>Text</Popup.Header>
      <Popup.Body mt="0px" mx="0px" px="23px">
        {children}
        {'inCm' + isModalOpen}
      </Popup.Body>
    </Popup>
  );
};
