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
import check from '../../images/check-circle.svg';
import WebApp from '../../images/webAppExample.png';

const WebApplication = ({drawerModal}) => {
  return (
    <Drawer isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose}>
      <DrawerOverlay />
      <DrawerContent marginTop="65px" py="22px" maxW="400px" overflowY={'scroll'}>
        <DrawerCloseButton />
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
            What is Web URL?
          </Text>
        </Flex>
        <VStack
          px={'21px'}
          mt="15px"
          pt="20px"
          align="stretch"
          spacing={'20px'}
          color="#3D3D3D"
          fontSize={'14px'}
          fontWeight={400}
          bg="#FBFCFC"
        >
          <Image src={WebApp.src} alt="Example of a web url" />
          <Text>
            A web URL (Uniform Resource Locator) is a reference or address used to locate resources
            on the internet. It serves as a unique string of characters that you type into your web
            browser&apos;s address bar to access a specific webpage, website, or any other resource
            available on the internet. For instance, in the case of Veerge, the URL is the
            destination your users will visit when they seek information on your listing. It acts as
            a virtual pathway that enables users to retrieve information, view images, watch videos,
            or interact with your offerings.
          </Text>
        </VStack>
      </DrawerContent>
    </Drawer>
  );
};

export default WebApplication;