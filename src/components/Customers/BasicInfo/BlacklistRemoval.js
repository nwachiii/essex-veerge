import React, {useState} from 'react';
import {VStack, Image, Box, Text, Flex, useDisclosure} from '@chakra-ui/react';

import {Button, Popup} from '../../../ui-lib/ui-lib.components';
import successGif from '/src/images/check-icon.gif';
import lock from '/src/images/lock.png';

export const BlacklistRemoval = ({handleBlacklist, isError}) => {
  const BlacklistInfo = useDisclosure();
  const BlacklistSuccess = useDisclosure();
  const [blacklistOTP, setBlacklistOTP] = useState(null);

  const handleBlacklistRequest = () => {
    BlacklistInfo.onClose();
    BlacklistSuccess.onOpen();
    // API request function comes in here
  };
  return (
    <Box>
      <Button
        my="0"
        isDisabled={isError}
        variant="default"
        color="red"
        border="1px solid red"
        onClick={BlacklistInfo.onOpen}
      >
        Remove from Blacklist
      </Button>

      {/* Modal : Blacklist Info */}
      <Popup
        minW="425px"
        h="392px"
        pt="35px"
        pb="15px"
        isOpen={BlacklistInfo.isOpen}
        onClose={BlacklistInfo.onClose}
        isCentered
      >
        <Image alt="" src={lock.src} boxSize="88px" mt="35px" mb="25px" mx="auto" />
        <Text mx="auto" fontSize="24px" fontWeight={600}>
          Remove from Blacklist
        </Text>

        <Popup.Body>
          <VStack w="full" px={0.2}>
            <Text fontSize="14px" textAlign="center">
              You are about to remove this customer from your blacklist, customer would be able to
              access your listings
            </Text>
          </VStack>
          <Button
            borderRadius="72px"
            onClick={handleBlacklistRequest}
            variant="primary"
            mx="auto"
            w="321px"
            h="55px"
          >
            Proceed
          </Button>
        </Popup.Body>
      </Popup>

      {/* Modal : Blacklist Success */}
      <Popup
        minW="425px"
        pt="45px"
        pb="15px"
        h="392px"
        isOpen={BlacklistSuccess.isOpen}
        onClose={BlacklistSuccess.onClose}
        isCentered
      >
        <Image alt="" src={successGif.src} w="108px" mb="25px" mx="auto" />
        <Text textAlign="center" fontSize="24px" fontWeight={600}>
          Customer Removed from Blacklist Successfully
        </Text>

        <Popup.Body>
          <VStack w="full" px={0.2} maxW="320px">
            <Text fontSize="14px" textAlign="center">
              You have successfully remove this customer from your blacklist
            </Text>
          </VStack>
          <Button onClick={handleBlacklist} variant="primary" mx="auto" w="321px" h="55px">
            OK
          </Button>
        </Popup.Body>
      </Popup>
    </Box>
  );
};
