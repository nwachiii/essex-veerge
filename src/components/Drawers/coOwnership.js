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

const CoOwnership = ({ drawerModal }) => {
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
            Co-ownership
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
            Experience the exhilaration of co-owning a property alongside your closest family and
            friends – an opportunity that not only simplifies the process of property acquisition
            but also fortifies your relationships.
          </Text>
          <Text>
            {`  Introducing Veerge's groundbreaking co-ownership feature, which empowers your clients to
            turn this shared dream into a tangible reality.`}
          </Text>
          <Text>
            As the host, they have the privilege of extending invitations to their loved ones who
            already possess your account. And for those who are yet to have an account, they can
            easily send them an invite.
          </Text>
          <Text>
            They can embark on this thrilling journey by having the host collect the email addresses
            of all interested parties and collaboratively decide on the ownership structure. This
            involves determining the percentage of ownership each individual will hold, based on
            their respective financial capacities. Imagine the joy of building your very own
            miniature real estate empire, tailored to your preferences and possibilities!
          </Text>
          <Text>
            {`Veerge's co-ownership feature ensures transparency, simplicity, and security throughout
            the process, making it an excellent opportunity for clients to fulfill their property
            ownership aspirations while strengthening their bonds with loved ones. Educate your
            users to pave the way to making shared property ownership an unforgettable and rewarding
            experience for everyone involved..`}
          </Text>
        </VStack>
        {/* </DrawerBody> */}
      </DrawerContent>
    </Drawer >
  );
};

export default CoOwnership;
