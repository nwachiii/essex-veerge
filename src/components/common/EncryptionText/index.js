import {HStack, Text, Image} from '@chakra-ui/react';
import React, {useState, useEffect} from 'react';
import encryptIcon from '/src/images/icons/encryption-icon.svg';

export const EncryptionText = () => {
  const [isScrolledToBottom, setScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = function () {
      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.onscroll]);
  return (
    <>
      {isScrolledToBottom && (
        <HStack
          position="fixed"
          zIndex={1800}
          bottom=".5rem"
          w="100%"
          justify="center"
          spacing="5px"
          mx="auto"
          pt="10px"
        >
          <Image src={encryptIcon.src} alt="" w="13.33px" h="16px" />
          <Text
            fontWeight="400"
            fontSize="16px"
            lineHeight="20px"
            textAlign="right"
            color="#919191"
          >
            End-to-end encryption
          </Text>
        </HStack>
      )}
    </>
  );
};

export default EncryptionText;
