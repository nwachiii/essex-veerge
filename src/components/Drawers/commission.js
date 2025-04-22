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

export const Commission = ({drawerModal}) => {
  return (
    <Drawer isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose}>
      <DrawerOverlay />
      <DrawerContent mt="60px" py="22px" maxW="400px" overflowY={'scroll'}>
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
            Commission
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
            In this context, the term <b>&apos;Internal Sales Team&apos;</b> refers to the core members who
            are employed directly by the development company and play a vital role in its
            operations.
          </Text>
          <Text>
            Conversely, <b>&apos;External Registered Realtors&apos;</b> refers to external real estate agents
            who are not on the company&apos;s payroll but have been approved to access and handle the
            company&apos;s listings via the portal.
          </Text>
          <Text>
            If no commissions are to be paid, the entry for the commission amount should be zero.
          </Text>
        </VStack>
        {/* </DrawerBody> */}
      </DrawerContent>
    </Drawer>
  );
};

export default Commission;
