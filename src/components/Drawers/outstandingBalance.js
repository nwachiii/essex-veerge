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

const OutstandingBalance = ({ drawerModal }) => {
  return (
    <Drawer zIndex={'20000 !important'} isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose} >
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
            Outstanding Balance
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
            Outstanding Balance is a cutting-edge revenue management system that streamlines your
            financial processes like never before. With this powerful tool, you can effortlessly
            keep track of all outstanding payments owed by your clients across multiple real estate
            projects.
          </Text>
          <Text>
            {`Gone are the days of manual calculations and time-consuming updates. Our Outstanding
            Balance feature operates in real-time, providing you with up-to-the-minute information
            without the need for any human interaction. It's fast, accurate, and hassle-free.`}
          </Text>
          <Text>
            Stay on top of your finances with ease and ensure that no outstanding payment slips
            through the cracks.
          </Text>
          <Text>
            Embrace the efficiency and convenience of Outstanding Balance, and take your revenue
            management to new heights.
          </Text>
          <Text>
            Welcome to a seamless and automated way of tracking outstanding payments across all your
            real estate endeavors!
          </Text>
        </VStack>
        {/* </DrawerBody> */}
      </DrawerContent>
    </Drawer >
  );
};

export default OutstandingBalance;
