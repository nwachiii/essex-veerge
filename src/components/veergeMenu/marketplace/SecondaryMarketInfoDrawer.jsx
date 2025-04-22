import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import {useRef} from 'react';
import {NeedHelpIcon} from './icons/NeedHelpIcon';
import {NeedHelpInfoIcon} from './icons/NeedHelpInfoIcon';

export const SecondaryMarketInfoDrawer = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const btnRef = useRef();

  return (
    <>
      <Text
        display={'flex'}
        gap={'7px'}
        alignItems={'center'}
        fontSize={'20px'}
        color={'#4545FE'}
        cursor={'pointer'}
        ref={btnRef}
        onClick={onOpen}
      >
        <NeedHelpIcon /> Need Help?
      </Text>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent fontSize={'16px'} backgroundColor={'#ffffff'} color={'#3D3D3D'} maxW="400px">
          <DrawerHeader padding={'82.5px 20px 22.5px'} display={'flex'} gap={'8px'}>
            <VStack align={'flex-start'} gap={'10px'}>
              <NeedHelpInfoIcon />
              <Text fontSize={'18px'} fontWeight={'500'} color={'#191919'}>
                Secondary Marketplace
              </Text>
            </VStack>
          </DrawerHeader>
          <DrawerCloseButton padding={'20px'} paddingTop={'80px'} />
          <DrawerBody
            color={'#3d3d3d'}
            padding={'20px'}
            display={'flex'}
            gap={'15px'}
            flexDirection={'column'}
            fontSize={'14px'}
          >
            <Heading fontSize={'14px'} lineHeight={'150%'} fontWeight={'600'}>
              Introducing our innovative Secondary Marketplace!
            </Heading>
            <Text mb="15px">
              Now, your application users can experience a seamless and efficient process for
              selling their properties right through your application. It&apos;s a win-win situation
              as you, the application owner, can also benefit by setting a transaction fee on each
              successful sale. With every transaction taking place, you earn a commission – a
              fantastic stream of extra cash-flow that adds to your revenue.
            </Text>
            <Text mb="15px">
              This Secondary Marketplace empowers your application users with a user-friendly
              platform to list their properties, connect with potential buyers, and close deals with
              ease. No more hassle, no more delays. And for you, it opens up a new revenue avenue
              without any additional effort.
            </Text>
            <Text mb="15px">
              Join us in embracing this exciting feature and watch as your application users enjoy a
              smooth selling experience while you boost your income effortlessly.
            </Text>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
