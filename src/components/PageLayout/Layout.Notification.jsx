import React, {useState} from 'react';
import {
  Menu,
  Text,
  Image,
  VStack,
  useToast,
  MenuItem,
  MenuList,
  MenuButton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Box,
  Flex,
  useDisclosure,
  Center,
  StackDivider,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import {useRouter} from 'next/router';
import avatarSm from '/src/images/avatar.svg';
import notification from '/src/images/icons/notification.svg';
import {fetchNotif, UpdateStatus} from '../../apis/FetchNotif';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import CustomerDrawer from '../Drawers/customerDrawer';
import {VeergeNotificationsIcon} from './navbar/svgs';
import {keyframes} from '@emotion/react';
import walletIcon from '/src/images/icons/wallet.svg';
import defaultAvatar from '/src/images/default-avatar.png';
import { CloseIcon } from '@chakra-ui/icons';

const fadeIn = keyframes`
  0% { opacity: 0;scale:0 },
  

  100% { opacity: 1 }
`;

const fadeOut = keyframes`
  from { opacity: 1;  }
  to { opacity: 0;  }
`;

export const LayoutNotifications = () => {
  const [toggleMarkAsReadText, setToggleMarkAsReadText] = useState('false');

  const modalDisclosure = useDisclosure();
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [runQuery, setRunQuery] = useState(false);
  const [nameId, setNameId] = useState();
  const toast = useToast();

  const {data, isError, error} = useQuery(['notif'], fetchNotif, {
    refetchInterval: 60000,
  });

  const queryClient = useQueryClient();
  const router = useRouter();


  const mutation = useMutation(data => UpdateStatus(data), {
    onSuccess: async () => {
      queryClient.invalidateQueries(['notif']);
      await queryClient.refetchQueries(['notif']);
    },
    onError: () => {
      toast({
        title: 'An error occured',
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleStatus = prop => {
    mutation.mutate({
      status: prop === 'unread' ? true : false,
    });
    setToggleMarkAsReadText('true');
  };


  const handleNotif = (notifonClose, click, notifIsOpen) => {
    if (error?.response?.status === 401) {
      // return handleLogout();
      return;
    }
    if (isError) {
      notifIsOpen && notifonClose(true);
      if (click) {
        return toast({
          title: 'Oops ...',
          description: `${
            error?.response?.status === '401'
              ? 'Invalid token'
              : (error?.response?.data?.message ??
                error?.response?.message ??
                error?.message ??
                'Something went wrong,we are working on resolving it')
          }`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return (
        notifIsOpen &&
        toast({
          title: 'Oops ...',
          description: `${
            error?.response?.status === '401'
              ? 'Invalid token'
              : (error?.response?.data?.message ??
                error?.response?.message ??
                error?.message ??
                'Something went wrong,we are working on resolving it')
          }`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        })
      );
    }
  };

  const check_notif_status = () => {
    if (!data?.data?.recent && !data?.data?.older) {
      return false;
    }
    const notif = [...data?.data?.recent, ...data?.data?.older];
    const unread_messages = notif.filter(el => el.status === true);
    return {hasUnread: notif.some(item => item.status === true), count: unread_messages.length};
  };

  const handleClose = () => {
    onClose();
    if (check_notif_status().hasUnread) {
      handleStatus('read');
    }
  };

  return (
    <Box>
      <Menu isOpen={isOpen} onClose={handleClose} placement="bottom" autoSelect={false}>
        <>
          <MenuButton onClick={onOpen}>
            <VStack position="relative">
              {check_notif_status().hasUnread ? (
                <Flex
                  position="absolute"
                  top="4.67px"
                  right="0px"
                  align={'center'}
                  justify={'center'}
                  color="#fff"
                  minW="18px"
                  h="18px"
                  bg="#FE2822"
                  padding={'.1rem'}
                  borderRadius={'16px'}
                >
                  <Text fontSize="10px" color="#fff" fontWeight="600">
                    {check_notif_status().count > 99 ? '99+' : check_notif_status().count}
                  </Text>
                </Flex>
              ) : null}

              <VeergeNotificationsIcon
                cursor="pointer"
                color={isOpen ? 'gray' : '#FFFFFF'}
                mt={'8px'}
              />
            </VStack>

            <Box
              position={'absolute'}
              zIndex={20000}
              bottom={'calc(-100% + 0.8rem)'}
              mx="auto"
              right="0"
              left="0"
              width="0"
              height="0"
              borderLeft="16px solid transparent"
              borderRight="16px solid transparent"
              borderBottom="20px solid #FFFFFF"
              opacity={isOpen ? '1' : '0'}
              pointerEvents={'none'}
              transformOrigin="bottom"
              transitionDuration={isOpen ? '0.6s' : '0s'}
              animation={`${isOpen ? fadeIn : fadeOut} ${isOpen ? '0.6s' : '0s'}  ease`}
            />
          </MenuButton>

          <MenuList
            mt="10px"
            mr="20px"
            minH="570px"
            h="fit-content"
            // position={'absolute'}
            position="relative"
            // right={'-21.2rem'}
            w={{base: '90%', md: '400px' }}
            rounded='0'
            borderColor={'#e4e4e4'}
            boxShadow={'xl'}
            sx={{transition: 'opacity 0.001s  ease, transform 0.1s ease'}}
          >
            <Flex w='full' justify='space-between' align='center' p='16px 20px' bg='#FAFAFA' borderBottom='1px solid #E4E4E7' boxShadow='l'>
              <Text fontSize='17px' fontWeight={600}>Notifications</Text>
              <Flex align='center' gap='12px'>
                <Text fontSize='14px' as="span" color="#4545FE">
                  Mark all as read
                </Text>
                <CloseIcon fontSize='12px' cursor='pointer' color='#71717A' onClick={onClose} />
              </Flex>
            </Flex>
            <Box pt='16px' px="20px">
              <Stack gap="16px" divider={<StackDivider borderColor="#E4E4E7" />}>
                {listNotif.map((msg, idx) => {
                  const {before, bold, after} = parseMessage(msg.text);
                  return (
                    <Flex gap="16px" key={idx}>
                      <Image src={msg?.icon} alt="notification icon" boxSize="40px" />
                      <Stack>
                        <Text fontSize="14px">
                          {before}
                          <Text as="span" fontWeight="bold">
                            {bold}
                          </Text>
                          {after}
                        </Text>
                        <Text fontSize="12px" color="#71717A">
                          {msg.time}
                        </Text>
                      </Stack>
                    </Flex>
                  );
                })}
              </Stack>
              <OldNotifList></OldNotifList>
            </Box>
          </MenuList>
          <CustomerDrawer
            modalDisclosure={modalDisclosure}
            userId={nameId}
            runQuery={runQuery}
            handleCloseDrawer={() => handleNotif(onClose, true)}
          />
        </>
      </Menu>
    </Box>
  );
};
export default LayoutNotifications;

const Heading = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  align-items: flex-end;
  padding: 12px 24px 17px;

  h1 {
    font-size: 20px;
    font-size: clamp(18px, calc(8px + 2vw), 20px);
    font-weight: 600;
  }
  span {
    cursor: pointer;
    font-size: 14px;
    font-size: clamp(12px, calc(5px + 1vw), 14px);
    font-weight: 400;
  }
`;

const RecentNotifList = styled.div`
  padding-top: 5px;
  ul {
    padding: 5px 0 15px;

    .unread {
      background: #f5f5f5;
    }
    li {
      padding: 4px 24px 10px;
      display: flex;
      gap: 20px;

      img {
        object-fit: cover;
      }
    }
  }
`;
const OldNotifList = styled(RecentNotifList)`
  padding-top: 0;
  ul {
    padding: 0 0 15px;
  }
`;


const listNotif = [
  {
    icon: walletIcon.src,
    text: 'New payment received from <b>Sam Bryant (Unit 7-B) $250.00.</b>',
    time: '5 mins ago',
  },
  {
    icon: defaultAvatar.src,
    text: '<b>Emily Johnson (7-A)</b> submitted a payment plan request.',
    time: '5 mins ago',
  },
  {
    icon: walletIcon.src,
    text: 'Overdue balance alert: Jean <b>Darlinton (12-C)</b> now <b>30 days</b> past due.',
    time: '16 Apr, 2025',
  },
];

const parseMessage = text => {
  const regex = /<b>(.*?)<\/b>/;
  const [before, match, after] = text.split(regex);
  return {before, bold: match, after};
};
