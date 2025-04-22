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
  HStack,
  Center,
  usePrefersReducedMotion,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import {useRouter} from 'next/router';
import avatarSm from '/src/images/avatar.svg';
import notification from '/src/images/icons/notification.svg';
import {fetchNotif, UpdateStatus} from '../../apis/FetchNotif';
import animatedNotif from '/src/images/animated_icons/alarm.gif';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import newNotif from '/src/images/icons/Iconly/Light/new-notification-icon.svg';
import CustomerDrawer from '../Drawers/customerDrawer';
import {VeergeNotificationsIcon} from './navbar/svgs';
import {keyframes} from '@emotion/react';

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
  const handleOpenDrawer = item => {
    modalDisclosure.onOpen();
    setNameId(item);
    setRunQuery(true);
  };
  const toast = useToast();

  const {data, isError, error, isLoading, refetch} = useQuery(['notif'], fetchNotif, {
    refetchInterval: 60000,
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = () => {
    queryClient.clear();
    setTimeout(() => {
      router.push('/auth/onboarding/login');
    }, 2400);
    return localStorage.clear();
  };

  const mutation = useMutation(data => UpdateStatus(data), {
    onSuccess: async res => {
      queryClient.invalidateQueries(['notif']);
      await queryClient.refetchQueries(['notif']);
    },
    onError: err => {
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

  const dateOrTimeAgo = (ts, data) => {
    const d = new Date();
    const nowTs = Math.floor(d.getTime() / 1000);
    const seconds = nowTs - ts / 1000;

    // more that two days
    if (seconds >= 2 * 24 * 3600) {
      return data;
    }
    // a day
    if (seconds > 24 * 3600) {
      return 'yesterday';
    }

    if (seconds > 3600) {
      const h = seconds / 3600;
      return `${Math.floor(h)} hour${h == 1 ? '' : 's'} ago`;
    }

    if (seconds > 60) {
      const m = seconds / 60;
      return `${Math.floor(m)} minute${m == 1 ? '' : 's'} ago`;
    }
  };

  const handleNotif = (notifonClose, click, notifIsOpen) => {
    if (error?.response?.status === 401) {
      return handleLogout();
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

  const hasAllNotifBeenRead = () => {
    const notif = [...data?.data?.recent, ...data?.data?.older];
    return notif.every(item => item.status === false);
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
  const isNotifAvailable = () => !!data?.data?.recent.length && !!data?.data?.older.length;

  return (
    <Box>
      <Menu isOpen={isOpen} onClose={handleClose} placement="bottom" autoSelect={false}>
        <>
          <MenuButton onClick={() => (handleNotif(onClose, true), onOpen())} position={'relative'}>
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
            w={{base: '90%', md: 467}}
            borderRadius={'lg'}
            borderColor={'#e4e4e4'}
            boxShadow={'xl'}
            sx={{transition: 'opacity 0.001s  ease, transform 0.1s ease'}}
          >
            {/* <Box
                position={'absolute'}
                zIndex={-100}
                top={'-.8rem'}
                // right={'15.7rem'}
                mx="auto"
                right="0"
                left="0"
                width="0"
                height="0"
                borderLeft="70px solid transparent"
                borderRight="70px solid transparent"
                borderBottom="80px solid #FFFFFF"
              /> */}
            <Heading>
              <h1>Notifications</h1>
              {toggleMarkAsReadText == 'false' ? (
                check_notif_status().hasUnread ? (
                  <span onClick={handleStatus}>Mark all as read</span>
                ) : null
              ) : null}
            </Heading>
            {isLoading || mutation.isLoading ? (
              <>
                <SkeletonText
                  noOfLines={1}
                  ml="24px"
                  mt="25px"
                  w="60px"
                  skeletonHeight="10px"
                  startColor="gray.300"
                  endColor={'#F3F3F3'}
                />
                <VStack pt="10px" justify="center" w="full" spacing="20px">
                  {[1, 2, 3, 4, 5, 6].map((item, idx) => (
                    <Stack
                      w="full"
                      key={idx}
                      justifyContent="center"
                      alignItems="center"
                      direction="row"
                      spacing={4}
                    >
                      <SkeletonCircle size="10" />
                      <SkeletonText
                        noOfLines={2}
                        spacing="10px"
                        skeletonHeight="10px"
                        width="80%"
                        startColor="gray.300"
                        endColor={'#F3F3F3'}
                      />
                    </Stack>
                  ))}
                </VStack>
              </>
            ) : isError ? (
              handleNotif(onClose, false, isOpen)
            ) : !isNotifAvailable ? (
              <MenuItem mt="24px" cursor="auto" _hover={{background: 'transparent'}}>
                <VStack h="90%" w="full" justify={'center'}>
                  <Image alt="" src={notification.src} />
                  <Text>{`You don't have any notification yet`}</Text>
                </VStack>
              </MenuItem>
            ) : (
              <NotifList>
                <RecentNotifList>
                  <ul>
                    {data.data.recent.map(msg => {
                      return (
                        <li key={msg.id} className={msg.status ? 'unread' : ''}>
                          <Center
                            w="40px"
                            h="40px"
                            minW="40px"
                            minH="40px"
                            borderRadius={'50%'}
                            overflow="hidden"
                            position={'relative'}
                            bg={'#FFFFFF'}
                          >
                            <Image
                              alt=""
                              objectFit={'cover'}
                              fill
                              minH="100%"
                              minW="100%"
                              src={msg.img || avatarSm.src}
                            />
                          </Center>
                          {/* <MessageWrap> */}
                          <Box display="flex" flexDirection="column" gap="8px">
                            {msg?.body_object === null ? (
                              <Text fontSize="14px" color="#191919">
                                {msg.body}
                              </Text>
                            ) : (
                              <Flex flexWrap="nowrap" wordBreak="break-word">
                                <Box fontSize="14px" whiteSpace="normal">
                                  <span
                                    style={{
                                      color: '#4545FE',
                                      textTransform: 'capitalize',
                                      cursor: 'pointer',
                                      fontWeight: '400',
                                    }}
                                    onClick={() => {
                                      onClose();
                                      handleOpenDrawer(msg.add_on);
                                    }}
                                  >
                                    {msg.body_object.name}
                                  </span>
                                  <span style={{color: '#191919'}}>{msg.body_object.message}</span>
                                </Box>
                              </Flex>
                            )}
                            <Flex color="#606060" gap="5px" fontSize="12px" fontWeight={'400'}>
                              <Text paddingRight="5px">
                                {dateOrTimeAgo(msg.time_ago, msg.created_at)}
                              </Text>
                              <Text>{msg.time}</Text>
                            </Flex>
                          </Box>
                          {/* </MessageWrap> */}
                        </li>
                      );
                    })}
                    {data.data.older.map(msg => {
                      return (
                        <li key={msg.id} className={msg.status ? 'unread' : ''}>
                          <Center
                            w="40px"
                            h="40px"
                            minW="40px"
                            minH="40px"
                            borderRadius={'50%'}
                            overflow="hidden"
                            position={'relative'}
                            bg={'#FFFFFF'}
                          >
                            <Image
                              alt=""
                              objectFit={'cover'}
                              minH="100%"
                              minW="100%"
                              fill
                              src={msg.img || avatarSm.src}
                            />
                          </Center>
                          {/* <MessageWrap> */}
                          <Box display="flex" flexDirection="column" gap="8px">
                            {msg?.body_object === null ? (
                              <Text fontSize="14px" color="#191919">
                                {msg.body}
                              </Text>
                            ) : (
                              <Flex flexWrap="nowrap" wordBreak="break-word">
                                <Box fontSize="14px" whiteSpace="normal">
                                  <span
                                    style={{
                                      color: '#4545FE',
                                      textTransform: 'capitalize',
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                      onClose();
                                      handleOpenDrawer(msg.add_on);
                                    }}
                                  >
                                    {msg.body_object.name}
                                  </span>
                                  <span style={{color: '#191919'}}>{msg.body_object.message}</span>
                                </Box>
                              </Flex>
                            )}
                            <Flex color="#606060" gap="5px" fontSize="12px" fontWeight={'400'}>
                              <Text paddingRight="5px">
                                {dateOrTimeAgo(msg.time_ago, msg.created_at)}
                              </Text>
                              <Text>{msg.time}</Text>
                            </Flex>
                          </Box>
                          {/* </MessageWrap> */}
                        </li>
                      );
                    })}
                  </ul>
                </RecentNotifList>
                <OldNotifList></OldNotifList>
              </NotifList>
            )}
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

const NotifList = styled.div`
  height: 490px;
  overflow: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const NotifHeader = styled.h2`
  font-size: 16px;
  font-weight: 600;
  padding: 0 24px;
  font-weight: 600;
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

const MessageWrap = styled.div`
  p {
    font-size: 14px;
    font-weight: 400;
    color: #191919;
	max-width:380px;
  }
  div {
    font-size: 10px;
    color: #606060;
    display: flex;
    gap: 15px;
	font
  }
`;
