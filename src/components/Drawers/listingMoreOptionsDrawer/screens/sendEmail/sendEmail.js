import {
  DrawerCloseButton,
  DrawerContent,
  Flex,
  HStack,
  Heading,
  Image,
  VStack,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {useState} from 'react';
import ClockIcon from '/src/images/icons/clock.svg';
import {SendScreen} from './screens/sendScreen';
import {EmailHistory} from './screens/emailHistory';

export const SendEmailDrawer = ({handleScreen, customScrollbarStyles, handleClose}) => {
  const [screen, setScreen] = useState('sendEmail');

  return (
    <DrawerContent
      position="relative"
      zIndex={100}
      mt="65.12px"
      sx={customScrollbarStyles}
      // mt="112.12px"
      minW="fit-content"
      bg="#fff"
      p="0px"
      //   pr="3px"
    >
      <HStack
        py="30px"
        px="25px"
        h="49.699px"
        bg="#F5F5F5"
        align="center"
        position="relative"
        justify="space-between"
      >
        <Flex gap="5px">
          <Image
            alt="back icon"
            cursor="pointer"
            src={backIcon.src}
            onClick={handleScreen('options')}
          />
          <Heading fontSize="18.9px" fontWeight="700">
            {screen === 'history' ? 'Email History' : 'Send Email'}
          </Heading>
        </Flex>
        <HStack spacing="15px">
          {screen === 'sendEmail' && (
            <HStack
              border="0.676px solid #3D3D3D"
              p="10px"
              rounded="8px"
              cursor="pointer"
              _hover={{bg: 'rgba(0, 0, 0, 0.05)'}}
              onClick={() => setScreen('history')}
            >
              <Image src={ClockIcon.src} alt="" />
            </HStack>
          )}
          <VStack
            w="30px"
            h="30px"
            _hover={{
              width: '30px',
              height: '30px',
            }}
            align="center"
            justify="center"
            position="relative"
            borderRadius="5px"
            transition="0.3s ease-in-out"
          >
            <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
          </VStack>
        </HStack>
      </HStack>
      {screen === 'sendEmail' && <SendScreen customScrollbarStyles={customScrollbarStyles} />}
      {screen === 'history' && <EmailHistory />}
    </DrawerContent>
  );
};
