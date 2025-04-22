import {useState, useEffect} from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center,
  Image as ChakraImage,
  Icon,
  Text,
  Progress,
  MenuDivider,
} from '@chakra-ui/react';
import {ChevronUpIcon, ChevronRightIcon, ChevronDownIcon} from '@chakra-ui/icons';

import user_fallback from '/src/images/avatar.svg';

import {useRouter} from 'next/router';
import veergeLogo from '/src/images/icons/veergeLogo.svg';
import {BiLogOut} from 'react-icons/bi';
import VeergeQuickAdd from './VeergeQuickAdd';
import {RiShakeHandsFill} from 'react-icons/ri';
import VeergeFeatureMenu from './VeergeFeatureMenu';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import LayoutNotifications from './Layout.Notification';
import FeedbackIcon from '../assets/FeedbackIcon';
import SuggestIdeaIcon from '../assets/SuggestIdeaIcon';
import ReportBugIcon from '../assets/ReportBugIcon';
import ChatIcon from '../assets/ChatIcon';
import SuggestIdea from '../Drawers/SuggestIdea';
import ReportBug from '../Drawers/ReportBug';
import Feedback from '../Drawers/feedback';
import {isRoleRestricted} from 'ui-lib/ui-lib.hooks/isRoleRestricted';
import {UserSettingsDrawer} from '../Drawers/userSettingsDrawer';
import Image from 'next/image';
import {VeergeLogo} from './navbar/svgs';
import ProfileMenuInfoCard from './navbar/profileMenuInfoCard';
import LogOutIcon from '../assets/logOutIcon';
import {fetchDeveloperProfile} from 'apis/settings';
import { loggedinUserStatic } from 'apis/requests';

const NavLink = ({link, children}) => (
  <Link
    prefetch={false}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: '#F5F5F5',
    }}
    _active={{
      textDecoration: 'none',
      bg: '#F5F5F5',
    }}
    _visited={{
      textDecoration: 'none',
      bg: '#F5F5F5',
    }}
    href={link}
  >
    {children}
  </Link>
);

export const LayoutNavbar = ({ activePage, openmanageApp }) => {
  const isPending = false;
  const router = useRouter();
  const [activeLocation, setActiveLocation] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const MENU_DISCLOSURE = useDisclosure();
  const queryClient = useQueryClient();
  const suggestModal = useDisclosure();
  const reportBugModal = useDisclosure();
  const feedModal = useDisclosure();

  const handleLogout = () => {
    queryClient.clear();
    setTimeout(() => {
      router.push('/');
    }, 2400);
    setShowProgress(true);
    localStorage.clear();
  };

  const {data, isError, isLoading, refetch} = useQuery(
    ['fetchDeveloperProfile'],
    fetchDeveloperProfile
  );

  const userInfo = loggedinUserStatic?.develoeper_info;

  let user = userInfo;
  try {
    user =
      typeof window !== 'undefined' &&
      localStorage &&
      localStorage?.getItem('loggedinUser') !== 'undefined' &&
      JSON?.parse(localStorage.getItem('loggedinUser'));
  } catch (err) {
    console.log('user error', err);
  }
  useEffect(() => {
    const activeLink = activePage && activePage.toLowerCase();
    router.pathname.indexOf(activeLink) === -1
      ? setActiveLocation('false')
      : setActiveLocation(activeLink);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const feedModalHandler = () => {
    suggestModal.onClose();
    reportBugModal.onClose();
    feedModal.onOpen();
  };

  const suggestModalHandler = () => {
    feedModal.onClose();
    reportBugModal.onClose();
    suggestModal.onOpen();
  };

  const reportBugModalHandler = () => {
    feedModal.onClose();
    suggestModal.onClose();
    reportBugModal.onOpen();
  };

  return (
    <Stack position="fixed" zIndex={1800} w="100%">
      <Box
        bg={useColorModeValue('gray.900', 'gray.100')}
        px={{base: `32px`, xl: '78px'}}
        py={{base: `13px`, xl: '11px'}}
        pt={{base: '5px', xl: `5px`}}
      >
        <Flex
          // alignItems={'flex-start'}
          alignItems="center"
          textAlign={'left'}
          justifyContent={'space-between'}
          className="header-wrap"
        >
          <HStack alignItems="center" spacing={{base: `26px`, xl: `8px`}}>
            <Link href="/account">
              <VeergeLogo color="#ffffff" />
            </Link>
            <Text
              fontSize={{base: '20px', xl: '24px'}}
              lineHeight={`150%`}
              fontWeight="400"
              fontFamily="Poppins"
              color="#ffffff"
            >
              {user?.team_company_name ?? user?.company_name ?? ''}
            </Text>
          </HStack>
          <Flex align="center">
            <HStack spacing={'24px'} alignItems={'center'} mx={{base: '0px', xl: `54px`}}>
              <UserSettingsDrawer isPending={isPending} />
              {isRoleRestricted('create customer and listing').check ? null : (
                <VeergeQuickAdd isPending={isPending} />
              )}
              <VeergeFeatureMenu openmanageApp={openmanageApp} isPending={isPending} />
              <LayoutNotifications />
            </HStack>
            <Flex
              sx={{
                '.css-ktd6ms': {
                  transformOrigin: 'top',
                  inset: '-10px -50px auto auto !important',
                },
              }}
              alignItems={'center'}
              ml={{base: '24px', xl: `0px`}}
            >
              <Menu
                isOpen={MENU_DISCLOSURE.isOpen}
                onClose={MENU_DISCLOSURE.onClose}
                closeOnSelect={true}
              >
                <MenuButton
                  onClick={MENU_DISCLOSURE.onOpen}
                  alignItems="center"
                  h={{base: `40px`, xl: '48px'}}
                  w={{base: `max-content`, xl: 'fit-content'}}
                  color="white"
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  iconSpacing="14px"
                  rightIcon={
                    MENU_DISCLOSURE.isOpen ? (
                      <ChevronUpIcon color={'#FFFFFF'} fontSize="25px" />
                    ) : (
                      <ChevronDownIcon color={'#FFFFFF'} fontSize="25px" />
                    )
                  }
                >
                  <HStack color={'#FFFFFF'} spacing="8px">
                    <Center
                      position="relative"
                      h={{base: '25px', xl: '34px'}}
                      w={{base: '25px', xl: '34px'}}
                      minW={{base: '25px', xl: '34px'}}
                      borderRadius="full"
                      overflow={`hidden`}
                    >
                      <Image
                        alt=""
                        fill
                        style={{objectFit: `cover`}}
                        src={user?.avatar ?? user_fallback.src}
                      />
                    </Center>
                    <Text
                      fontSize="16px"
                      fontWeight="500"
                      lineHeight="20.29px"
                      textTransform="capitalize"
                      display={{base: `none`, xl: `block`}}
                    >
                      {user?.first_name} {user?.last_name?.slice(0, 1)}
                    </Text>
                  </HStack>
                </MenuButton>

                <MenuList
                  transformOrigin="top !important"
                  w="377px"
                  mr="20px"
                  minH="fit-content"
                  borderRadius="8px"
                  p="16px"
                  alignItems={'center'}
                >
                  <MenuItem
                    mt="0px"
                    bg="#f5f5f5"
                    p="16px 12px"
                    borderRadius="8px"
                    cursor="default"
                    border="0.5px solid #e4e4e4"
                    _hover={{
                      bg: '#f5f5f5',
                      cursor: 'default',
                      boxShadow: 'none',
                    }}
                    _focus={{
                      bg: '#f5f5f5',
                    }}
                    closeOnSelect={false}
                    mb="12px"
                  >
                    <ProfileMenuInfoCard refetch={refetch} user={user} isLoading={isLoading} />
                  </MenuItem>
                  <MenuItem
                    mt="0px"
                    _hover={{
                      bg: 'transparent',
                    }}
                    _focus={{
                      bg: 'transparent',
                    }}
                    p=" 12px 0px"
                    onClick={feedModalHandler}
                  >
                    <HStack w="full" fontWeight={400} justify="space-between">
                      <Flex gap={3} align="center">
                        <FeedbackIcon />
                        <Text fontSize="18px" fontWeight="500" lineHeight="22.82px" color="#292929">
                          Feedback
                        </Text>
                      </Flex>
                    </HStack>
                  </MenuItem>
                  <MenuDivider my="12px" border="none" h="0.5px" bg="#e4e4e4" />

                  <MenuItem
                    mt="0px"
                    _hover={{
                      bg: 'transparent',
                    }}
                    _focus={{
                      bg: 'transparent',
                    }}
                    p=" 12px 0px "
                    onClick={suggestModalHandler}
                  >
                    <HStack w="full" fontWeight={400} justify="space-between">
                      <Flex gap={3} align="center">
                        <SuggestIdeaIcon />
                        <Text fontSize="18px" fontWeight="500" lineHeight="22.82px" color="#292929">
                          Suggest an idea
                        </Text>
                      </Flex>
                    </HStack>
                  </MenuItem>
                  <MenuDivider my="12px" border="none" h="0.5px" bg="#e4e4e4" />

                  <MenuItem
                    mt="0px"
                    _hover={{
                      bg: 'transparent',
                    }}
                    _focus={{
                      bg: 'transparent',
                    }}
                    p=" 12px 0px "
                    onClick={reportBugModalHandler}
                  >
                    <HStack w="full" fontWeight={400} justify="space-between">
                      <Flex gap={3} align="center">
                        <ReportBugIcon />
                        <Text fontSize="18px" fontWeight="500" lineHeight="22.82px" color="#292929">
                          Report a Bug
                        </Text>
                      </Flex>
                    </HStack>
                  </MenuItem>
                  <MenuDivider my="12px" border="none" h="0.5px" bg="#e4e4e4" />

                  <MenuItem
                    mt="0px"
                    _hover={{
                      bg: 'transparent',
                    }}
                    _focus={{
                      bg: 'transparent',
                    }}
                    p=" 12px 0px "
                    onClick={handleLogout}
                  >
                    <HStack w="full" fontWeight={400} justify="space-between">
                      <Flex gap={3} align="center">
                        <LogOutIcon />
                        <Text fontSize="18px" fontWeight="500" lineHeight="22.82px" color="#f04438">
                          Logout
                        </Text>
                      </Flex>
                    </HStack>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Flex>
        {showProgress && (
          <Progress
            w="full"
            size="xs"
            left={'0'}
            colorScheme="blackAlpha"
            top="6.94rem"
            position="fixed"
            isIndeterminate
            zIndex={'1300'}
          />
        )}
        {isOpen ? (
          <Box pb={4} display={{md: 'none'}} className="header-wrap">
            <Stack as={'nav'} spacing={4}>
              {links.map((link, index) => (
                <NavLink link={`/${link}`} key={index}>
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Feedback feedModal={feedModal} />
      <SuggestIdea suggestModal={suggestModal} />
      <ReportBug reportBugModal={reportBugModal} />
    </Stack>
  );
};

export default LayoutNavbar;

const links = ['Account', 'Communities', 'Residents', 'Request', 'Violations'];
