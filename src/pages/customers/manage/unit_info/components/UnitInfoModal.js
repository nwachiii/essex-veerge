import {Box, Image, Text, VStack} from '@chakra-ui/react';

import successGif from '/src/images/check-icon.gif';
import {Button, Popup} from '/src/ui-lib/ui-lib.components';

const UnitInfoUpdateSuccess = ({UnitInfoModal}) => {
  return (
    <>
      <Popup
        minW="450px"
        pt="45px"
        pb="15px"
        h="392px"
        isOpen={UnitInfoModal.isOpen}
        onClose={UnitInfoModal.onClose}
      >
        <Popup.Header>
          <Box mr={5} ml={-4}>
            <Image alt="" src={successGif.src} w="108px" mx="auto" />
          </Box>
        </Popup.Header>
        <Popup.Body mt={-2}>
          <Text textAlign="center" fontSize="24px" fontWeight={600}>
            Unit Info Updated Successfully
          </Text>
          <Button
            onClick={UnitInfoModal.onClose}
            variant="primary"
            mx="auto"
            w="90%"
            h="55px"
            mt={12}
          >
            OK
          </Button>
        </Popup.Body>
      </Popup>
    </>
  );
};

export default UnitInfoUpdateSuccess;
