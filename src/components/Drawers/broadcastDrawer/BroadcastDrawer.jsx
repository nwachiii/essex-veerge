import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Image,
  VStack,
} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {getBroadcastHistory} from 'apis/veerge_menu';
import {useState} from 'react';
import {SendBroadcastMessage} from './screens/SendBroadcast';
import ClockIcon from '/src/images/icons/clock.svg';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {BroadcastHistory} from './screens/BroadcastHistory';

export const BroadcastDrawer = ({isOpen, onClose}) => {
  const [screen, setScreen] = useState('sendBroadcast');
  const emailBroadcastHistory = useQuery(['broadcastHistory', 'email'], () =>
    getBroadcastHistory('email')
  );
  const notifBroadcastHistory = useQuery(['broadcastHistory', 'notification'], () =>
    getBroadcastHistory('notification')
  );

  const broadcastHistory =
    emailBroadcastHistory?.data?.data?.data?.length ||
    notifBroadcastHistory?.data?.data?.data?.length;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} onCloseComplete={() => setScreen('sendBroadcast')}>
      <DrawerOverlay />
      <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="400px" bg="#fff">
        <HStack
          py="30px"
          px="25px"
          h="49.699px"
          bg="#F5F5F5"
          align="center"
          position="relative"
          justify="space-between"
        >
          <Flex gap="5px" align={'center'}>
            {screen === 'history' && (
              <Image
                alt="back icon"
                cursor="pointer"
                src={backIcon.src}
                onClick={() => setScreen('sendBroadcast')}
              />
            )}
            <Heading fontSize="18.9px" fontWeight="700">
              Broadcast {screen === 'history' ? 'History' : ''}
            </Heading>
          </Flex>
          <HStack spacing="15px">
            {broadcastHistory && screen === 'sendBroadcast' && (
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
        {screen === 'sendBroadcast' && <SendBroadcastMessage emailHistory={emailBroadcastHistory}
            notifHistory={notifBroadcastHistory} onClose={onClose} />}
        {screen === 'history' && (
          <BroadcastHistory
            emailHistory={emailBroadcastHistory}
            notifHistory={notifBroadcastHistory}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};
