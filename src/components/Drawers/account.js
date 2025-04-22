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

export const AccountDrawer = ({ drawerModal }) => {
  return (
    <Drawer isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose}>
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
            Escrow
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
            In the world of Veerge, Escrow transactions play a vital role in ensuring security and
            completion. These transactions represent a phase where funds are held but not yet
            released, commonly occurring in various scenarios.
          </Text>
          <Text>
            {`In international transactions, it is often used when funds haven't been fully
            transferred or released, ensuring a safe and trustworthy process.`}
          </Text>
          <Text>
            {` Similarly, in co-ownership arrangements, escrow is applied when the initial deposit from
            co-owners hasn't reached the required amount.`}
          </Text>
          <Text>
            The concept of escrow offers peace of mind to all parties involved, as it safeguards
            their interests until the necessary conditions are met. It serves as a protective
            measure, assuring the completion of transactions and fostering confidence in complex
            financial dealings.
          </Text>
          <Text>
            {`Whether it's for international trade or co-ownership arrangements, escrow serves as a
            reliable intermediary, giving everyone involved the assurance that their funds are
            secure until all requirements are fulfilled.`}
          </Text>
        </VStack>
        {/* </DrawerBody> */}
      </DrawerContent>
    </Drawer>
  );
};

export default AccountDrawer;
