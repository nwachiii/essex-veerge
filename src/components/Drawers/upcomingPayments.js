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

const UpcomingPayments = ({ drawerModal }) => {
  return (
    <Drawer isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose} >
      <DrawerOverlay />
      <DrawerContent marginTop='65px' py="22px" maxW="400px" overflowY={'scroll'}>
        <DrawerCloseButton />
        {/* <DrawerBody> */}
        <Flex px={'21px'} justify="center" direction="column" gap="10px">
          <Image
            h="36px"
            w="36px"
            alt=""
            borderRadius={'21px'}
            src={check.src}
            border="6px solid rgba(69, 69, 254, 0.10)"
            bg="rgba(69, 69, 254, 0.10)"
          />
          <Text color="#191919" fontWeight={500} fontSize="18px">
            Upcoming Payments
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
            Upcoming payments on Veerge is your ultimate financial planning companion! This
            cutting-edge tool provides a comprehensive breakdown of all your upcoming deposits,
            making it incredibly advanced and user-friendly.
          </Text>
          <Text>
            {` It has been designed to accommodate customized due payments. This means It factors in
            due payments tailored to the unique financial situation of your subscribers. With the
            ability to use filters, you can easily track your projected inflow over different
            timelines – whether it's weekly, monthly, or beyond.`}
          </Text>
          <Text>
            The best part? All the information you see is in real-time, automatically updated to
            reflect the most current data.
          </Text>
          <b>Get ready to stay on top of your finances effortlessly and efficiently with Veerge!</b>
        </VStack>
        {/* </DrawerBody> */}
      </DrawerContent>
    </Drawer >
  );
};

export default UpcomingPayments;
