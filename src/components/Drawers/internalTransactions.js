import {
  Drawer,
  DrawerBody,
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

const InternalTransactions = ({ drawerModal }) => {
  return (
    <Drawer isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose} >
      <DrawerOverlay />
      <DrawerContent marginTop='65px' py="22px" maxW="400px" overflowY={'scroll'}>
        <DrawerCloseButton />
        {/* <DrawerBody> */}
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
            International Transaction
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
            {` Introducing our International Payments solution – a game-changer for your business! With
            this seamless payment collection system, you can now effortlessly receive payments from
            customers across more than 60 countries and in over 135 currencies. The best part? You
            don't need to set up local entities or have a bank in each country. This revolutionary
            feature makes it incredibly easy for diasporan buyers who have always worried about how
            to send money to your country to purchase a property. Now, they can simply link their
            bank accounts from anywhere in the world, and the payment process becomes a breeze.`}
          </Text>
          <b>No more barriers, no more complications.</b>
          <Text>
            By embracing our International Payments system, your business becomes truly global,
            transcending borders and time zones. It operates 24 hours a day, seven days a week, even
            when everyone else is asleep – your business never rests.
          </Text>
          <Text>
            Say goodbye to payment hassles and limited accessibility. Embrace the power of
            International Payments, and watch your business thrive on a global scale like never
            before.
          </Text>
          <b>Welcome to the future of borderless transactions!</b>
        </VStack>
        {/* </DrawerBody> */}
      </DrawerContent>
    </Drawer >
  );
};

export default InternalTransactions;
