import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import check from '../../images/check-circle.svg';

const ContactPerson = ({ drawerModal }) => {
  return (
    <Drawer isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose} >
      <DrawerOverlay />
      <DrawerContent marginTop='65px' py="22px" maxW="400px" overflowY={'scroll'}>
        <DrawerCloseButton />
        <Flex px={'21px'} justify="center" direction="column" gap="10px">
          <Image
            alt=""
            h="36px"
            w="36px"
            borderRadius={'21px'}
            src={check.src}
            border="6px solid rgba(69, 69, 254, 0.10)"
            bg="rgba(69, 69, 254, 0.10)"
          />
          <Text color="#191919" fontWeight={500} fontSize="18px">
            Who is a contact person?
          </Text>
        </Flex>
        <VStack
          px={'21px'}
          mt="20px"
          pt="20px"
          align="stretch"
          spacing={'20px'}
          color="#3D3D3D"
          fontSize={'14px'}
          fontWeight={400}
          bg="#FBFCFC"
        >
          <Text>
            In a real estate listing, a contact person is the designated individual responsible for
            managing inquiries and communication pertaining to the property listed for sale. This
            person serves as the primary point of contact for potential buyers, addressing any
            questions they may have or assisting them in scheduling property viewings.
          </Text>
          <Text>
            The key responsibilities encompass providing accurate and comprehensive information
            about the property, coordinating property showings, skilfully negotiating offers, and
            expertly guiding interested parties through the purchase process. This plays a pivotal
            role in streamlining communication and facilitating a smooth transaction process for all
            parties involved.
          </Text>
        </VStack>
      </DrawerContent>
    </Drawer >
  );
};

export default ContactPerson;
