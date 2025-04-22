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

const ClosingCost = ({drawerModal}) => {
  return (
    <Drawer isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose}>
      <DrawerOverlay />
      <DrawerContent px="28px" pr="10px" marginTop="65px" py="22px" maxW="400px" gap='20px'>
        <DrawerCloseButton />
        <Flex justify="center" direction="column" gap="10px">
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
            Understanding closing costs?
          </Text>
        </Flex>
        <VStack
          align="stretch"
          spacing={'20px'}
          color="#3D3D3D"
          fontSize={'14px'}
          fontWeight={400}
          bg="#FBFCFC"
        >
          <Text>
            {`Closing costs encompass the various expenses and fees that arise during the purchase of a property. These costs are additional to the property's purchase price and cover various aspects of the transaction.`}
          </Text>
          <Text>To include closing costs on a Unit:</Text>
          <Text>
            <b>Step 1:</b> Specify the type of closing cost. Common examples include Homeowners
            Association (HOA) fees, Attorney or Legal fees, development levy, Miscellaneous fees,
            property taxes, etc.
          </Text>
          <Text>
            <b>Step 2:</b> Enter the corresponding amount for each closing cost.
          </Text>
          <Text>
            <b>Step 3:</b> {` Once you have entered all the necessary closing costs, proceed to the next step.`}
          </Text>
          <Text>
            {`If you require any assistance during this process, please don't hesitate to contact our
            support team. We are here to help.`}
          </Text>
        </VStack>
        {/* </DrawerBody> */}
      </DrawerContent>
    </Drawer>
  );
};

export default ClosingCost;
