import React from 'react';
import {Popup} from 'ui-lib';
import dataMigrationSample from '/src/images/dataMigrationSample.png';
import {Flex, Image} from '@chakra-ui/react';

const ViewDataSample = ({modalDisclosure}) => {
  return (
    <Popup
      mt="6vh"
      size="full"
      minH="679px"
      color="#191919"
      overflowY="auto"
      isOpen={modalDisclosure.isOpen}
      onClose={modalDisclosure.onClose}
      minW={{base: '90%', md: '1190px'}}
      bg="gray"
      closeButtonColor={'#fff'}
      style={{...glassmorphicBg}}
    >
      <Popup.Body h="auto">
        <Flex height="600px" width={'100%'} justifyContent="center" alignItems={'center'}>
          <Image
            src={dataMigrationSample.src}
            alt="data migration sample"
            width={'93%'}
            height="100%"
            fetchPriority="high"
            objectFit={'contain'}
          />
        </Flex>
      </Popup.Body>
    </Popup>
  );
};

export default ViewDataSample;

const glassmorphicBg = {
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
};
