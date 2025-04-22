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

const PaymentPlanDrawer = ({ drawerModal }) => {
  return (
    <Drawer isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose} overflowY={'scroll'}>
      <DrawerOverlay />
      <DrawerContent marginTop='65px' py="22px" maxW="400px">
        <DrawerCloseButton />
        <Flex px={'21px'} align={'flex-start'} justify="center" direction="column" gap="10px">
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
            What is payment plan?
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
          overflowY={'auto'}
        >
          <Text>
            In real estate, a <b>Payment Plan</b> refers to an arrangement made between a buyer and a
            seller for the purchase of a property, allowing the buyer to pay for the property over
            an extended period of time, typically in instalments, instead of making a lump sum
            payment upfront. <b>Payment Plans</b> are also known as instalment plans, seller financing, or seller
            carry-back.
          </Text>
          <Text>
            On Veerge, there are two types of payment plans available: the <b>Quick Payment Plan</b>{' '}
            and the <b>Custom Payment Plan.</b>
          </Text>
          <Text>
            For example, let&apos;s consider a property listed for sale at 100 million Naira outright. To
            provide buyers with convenience, the seller offers payment plan options. Under the quick
            payment plan, buyers can choose to pay an initial 20 million Naira and spread the
            remaining amount over 1 year.
          </Text>
          <Text>
            The payment structures can be set as fixed amounts in weekly, monthly, or quarterly
            instalments. For instance, the buyer could opt for 1.6 million Naira weekly, 6.8 million
            Naira monthly, or 20.5 million Naira quarterly (interest inclusive).
          </Text>
          <Text>
            These payment plan types are all considered quick payment plans, including flexible
            payment plans.
          </Text>
          <Text>
            <b>A Flexible Payment Plan </b> is also a type of quick payment plan. In this case, the
            buyer can make payments at their convenience without following a specific instalment
            schedule, as long as it is within the agreed-upon payment plan period.
          </Text>
          <Text>
            On the other hand, a <b>Custom Payment Plan</b> differs slightly. Suppose the property
            is listed for 100 million Naira outright, but the payment plan structure involves an
            initial deposit of 20 million Naira, followed by subsequent payments of 30 million Naira
            after 3 months, 25 million Naira after another 3 months, 20 million Naira after an
            additional 3 months, and finally 10 million Naira after a final 3 months.
          </Text>
          <Text>
            In a <b>Custom Payment Plan</b> on Veerge, the amounts and intervals of payments are not
            fixed and can vary. It&apos;s important to note that for every payment plan created on Veerge,
            a contract must be uploaded. This contract serves as the purchase agreement, and buyers
            are required to agree to its terms before completing the purchase.
          </Text>
          <Text>
            If you need any assistance kindly contact{' '}
            <a href='https://veerge-support.myxellia.io/' target='_blank' rel='noreferrer'>
              <Text as="span" color="#4545FE">
                support
              </Text>
            </a>
          </Text>
        </VStack>
      </DrawerContent>
    </Drawer >
  );
};

export default PaymentPlanDrawer;
