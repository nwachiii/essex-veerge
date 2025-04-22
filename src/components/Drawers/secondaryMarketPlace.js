import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  ListItem,
  OrderedList,
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
            Welcome to Secondary Market Place!
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
            The ultimate destination for homeowners seeking to sell the assets they brought from you
            and an exciting opportunity for subscribers to access early liquidity.
          </Text>
          <Text>
            This marketplace is an integral part of veerge, designed to provide a seamless and
            transparent experience for all users.
          </Text>
          <Text>How it Works:</Text>
          <OrderedList>
            <ListItem>
              <b> Listing Properties:</b> When homeowners decide to sell the assets they originally
              purchased, they can easily list their properties here. You gain direct access to an
              extensive array of available properties, enabling you to explore and invest in
              exciting opportunities.
            </ListItem>
            <ListItem>
              <b> Brokerage Fee:</b> As the platform operator, when users facilitate transactions on
              your application. For each successful sale that takes place on the Secondary
              Marketplace, you can charge a nominal brokerage fee. This fee is another stream of
              revenue for your business.
            </ListItem>
            <ListItem>
              <b> Buy-Back Option:</b> To provide additional convenience, there is a a buy-back
              option feature. This means that, as the platform operator, you may choose to purchase
              properties back from subscribers at mutually agreed-upon terms.
            </ListItem>
            <ListItem>
              <b> Property Showcase:</b> All available properties are prominently displayed on the
              Secondary Marketplace. This user-friendly interface allows you to easily browse
              through various listings, access detailed property information, and make informed
              decisions.
            </ListItem>
          </OrderedList>
        </VStack>
        {/* </DrawerBody> */}
      </DrawerContent>
    </Drawer >
  );
};

export default UpcomingPayments;
