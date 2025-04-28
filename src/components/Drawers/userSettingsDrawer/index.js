import {
  Badge,
  Box,
  Button,
  Center,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {ProfileSettingsSection} from './profile';
import {TeamsSettingsSection} from './teams';
import {ComplianceSettingsSection} from './compliance';
import {ChevronDownIcon} from '@chakra-ui/icons';
import {RiSettings3Fill} from 'react-icons/ri';
import {useQuery} from '@tanstack/react-query';
import {fetchDevelopersStatus, fetchSettingsRequiredStatus} from 'apis/settings';
import {PaymentGatewayDrawer} from './payment/paymentConfigcontrolRoom';
import {useRouter} from 'next/navigation';
import {ProfileSettingsIcon} from '@/components/PageLayout/navbar/svgs';
import PaymentControlRoom from './payment';
import {BusinessInformation} from './compliance/businessInformation';
import { loggedinUserStatic } from 'apis/requests';

export const UserSettingsDrawer = ({isPending, children}) => {
  const drawerDisclosure = useDisclosure();
  const menuDisclosure = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const isAccountActive = () => loggedinUserStatic?.initial_status === 'Accepted';
  const tabsToRestrict = ['teams', 'payment'];
  const isDisabled = tabName => tabsToRestrict.includes(tabName) && !isAccountActive();

  const all_tabs = [
    'profile',
    'teams',
    // 'account',
    // 'payment',
    'compliance',
  ];
  const [isCompleted, setisCompleted] = useState({
    profile: true,
    compliance: true,
    team: true,
    account: true,
    all: true,
  });
  const [tab, setTab] = useState(all_tabs[0]);
  const {data: settingsStatus, isLoading} = useQuery(
    ['settingsStatus', tab],
    fetchSettingsRequiredStatus
  );
  const developerStatus = useQuery(['developerStatus'], fetchDevelopersStatus);

  useEffect(() => {
    const sections_status = JSON.stringify({
      ...settingsStatus?.data,
    });
    const all_completed = sections_status.includes('false') ? false : true;
    setisCompleted({
      ...isCompleted,
      ...settingsStatus?.data,
      all: all_completed,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsStatus]);

  const close_drawer = () => {
    drawerDisclosure.onClose();
    setTab('');
  };

  const menu_toggle = (
    <Menu isOpen={menuDisclosure.isOpen} onClose={menuDisclosure.onClose}>
      <HStack>
        <MenuButton
          onClick={menuDisclosure.onOpen}
          w="fit-content"
          px="0px"
          as={Button}
          variant="ghost"
          _hover={{bg: 'transparent'}}
          _active={{bg: 'transparent'}}
          fontWeight={600}
          fontSize="16px"
          color="#191919"
          textTransform={'capitalize'}
          iconSpacing="8px"
        >
          {tab === 'profile' ? 'Preferences' : tab === 'compliance' ? 'Business Information' : tab}
          <ChevronDownIcon
            fontSize={'25px'}
            ml="10px"
            transition="0.3s ease-in-out"
            transform={`rotate(${menuDisclosure.isOpen ? '180' : '0'}deg)`}
          />
        </MenuButton>
      </HStack>
      <MenuList w="auto" minW="108px" maxW="fit-content" py="9px" zIndex={'4'}>
        {all_tabs.map((el, i) => {
          return (
            el !== tab && (
              <MenuItem
                isDisabled={isDisabled(el)}
                textTransform={'capitalize'}
                key={i}
                px="14px"
                onClick={() => setTab(el)}
              >
                <HStack gap="10px">
                  <Text fontSize="14px">
                    {el === 'profile'
                      ? 'Preferences'
                      : el === 'compliance'
                        ? 'Business Information'
                        : el}
                  </Text>
                </HStack>
              </MenuItem>
            )
          );
        })}
      </MenuList>
    </Menu>
  );

  const active_tab = {
    profile: <PaymentControlRoom isAccountActive={isAccountActive} menu_toggle={menu_toggle} />,
    //  <ProfileSettingsSection isAccountActive={isAccountActive} menu_toggle={menu_toggle} />,
    teams: <TeamsSettingsSection menu_toggle={menu_toggle} />,
    compliance: <BusinessInformation menu_toggle={menu_toggle} />,
    // compliance: <ComplianceSettingsSection menu_toggle={menu_toggle} />,
    // payment: <PaymentControlRoom isAccountActive={isAccountActive} menu_toggle={menu_toggle} />,
    // <PaymentGatewayDrawer menu_toggle={menu_toggle} />,
    default: <></>,
  }[tab];

  const toggle_settings = () => {
    setTab(all_tabs[0]);
    if (developerStatus.isLoading || !developerStatus?.data?.data.status) {
      // toast({
      //   title:
      //     'Your registration was not approved. Please check your email for details regarding the rejection',
      //   status: 'error',
      //   duration: 2500,
      //   isClosable: true,
      //   position: 'top-right',
      // });
      // setTimeout(() => {
      //   router.push('/account');
      // }, 2500);
    } else {
      if (!drawerDisclosure.isOpen) {
        // drawerDisclosure?.onOpen();
      } else {
        drawerDisclosure.onClose();
      }
    }
  };

  return (
    <>
      <Flex
        as="span"
        direction={'column'}
        onClick={toggle_settings}
        cursor={'pointer'}
        h="max-content"
      >
        {children ? (
          children
        ) : (
          <Box as="span" color="#ffffff" pos={'relative'}>
            {!isCompleted.all && (
              <Flex
                position="absolute"
                top="0px"
                right="-9px"
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
                  {!isCompleted.profile && !isCompleted.compliance ? '2' : '1'}
                </Text>
              </Flex>
            )}
            <ProfileSettingsIcon color={drawerDisclosure?.isOpen ? 'gray' : '#FFFFFF'} />
          </Box>
        )}
      </Flex>
      <Drawer
        isOpen={drawerDisclosure?.isOpen}
        placement="right"
        onClose={close_drawer}
        // size={'sm'}
        blockScrollOnMount
        autoFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent zIndex={55555555} minW="400px" w="400px" pb="22px" pt="67px">
          {active_tab || (
            <Center>
              <Text>Something went wrong</Text>
            </Center>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
