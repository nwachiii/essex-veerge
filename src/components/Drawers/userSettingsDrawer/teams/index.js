import React from 'react';
import {ActionBar} from './actions/actionBar';
import {TeamTable} from './teamDetails/teamTable.jsx';
import {fetchDeveloperTeams, fetchRolesAccepted} from '/src/apis/settings.js';
import {AnimatedLoader} from '@/components/index';
import manage_roles from '/src/images/icons/manage_team_roles.svg';
import {useQuery} from '@tanstack/react-query';
import {
  AbsoluteCenter,
  Box,
  Center,
  DrawerBody,
  DrawerCloseButton,
  Flex,
  HStack,
  Image,
  Spinner,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import {HiOutlinePencilSquare} from 'react-icons/hi2';
import {IoMdAdd} from 'react-icons/io';
import {isRoleRestricted} from 'ui-lib/ui-lib.hooks/isRoleRestricted';
import InviteTeamMemberDrawer from '../../inviteTeamMemberDrawer';
import {useRouter} from 'next/router';

export const TEAMS_ROLES = {
  admin: 'Admin',
  director: 'Director',
  accountant: 'Accountant',
  front_desk: 'Front Desk',
  head_of_sales: 'Heads of Sales',
  finance_controller: 'Finance Controller',
};

export const TeamsSettingsSection = ({menu_toggle}) => {
  const {data, isLoading, refetch, isError} = useQuery(['fetchAcceptedRoles'], fetchRolesAccepted);
  const router = useRouter();

  let TEAMS_DATA = data?.data?.results?.map(member => {
    return {
      id: member?.id,
      name: member?.name,
      role: member?.role,
      email: member?.email,
      contact_for: member?.contact_for,
      img: member?.img,
      recent_activity: member?.last_activity ?? member?.invited_on,
    };
  });

  return (
    <>
      <HStack
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        mb="10px"
        py="12px"
        px="29px"
        h="49.699px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
        bg="#F5F5F5"
      >
        <Flex width="full" justifyContent="space-between" alignItems="center">
          {menu_toggle}
          <Box display="flex" flexDirection="row" alignItems="center" gap="16px">
            {/* <Tooltip label="Manage Roles">
              <Box
                border="0.68px solid #191919"
                p="10px"
                borderRadius="8.12px"
                _hover={{
                  background: 'rgba(25, 25, 25, 0.10)',
                }}
                cursor="pointer"
                onClick={() => router.push('/manageroles')}
              >
                <Image src={manage_roles.src} alt="log" w="16px" h="16px" alignSelf="center" />
              </Box>
            </Tooltip> */}
            {isRoleRestricted('invite teams members').check ? null : (
              <InviteTeamMemberDrawer refetchTeamTab={refetch}>
                <Tooltip label="Add Team Member">
                  <Box
                    border="0.68px solid #191919"
                    p="10px"
                    borderRadius="8.12px"
                    _hover={{
                      background: 'rgba(25, 25, 25, 0.10)',
                    }}
                    cursor="pointer"
                    fontSize={'15px'}
                  >
                    <IoMdAdd />
                  </Box>
                </Tooltip>
              </InviteTeamMemberDrawer>
            )}
          </Box>
        </Flex>
        <HStack spacing="15px">
          <VStack
            position="relative"
            justify="center"
            align="center"
            w="30px"
            h="30px"
            borderRadius="5px"
            transition="0.3s ease-in-out"
            _hover={{
              width: '30px',
              height: '30px',
            }}
          >
            <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
          </VStack>
        </HStack>
      </HStack>
      <DrawerBody>
        {isLoading ? (
          <Center h="80vh" position="relative">
            {/* <AnimatedLoader /> */}
            <Spinner />
          </Center>
        ) : isError ? (
          <Center h="80vh" position="relative">
            <Text>Something went wrong</Text>
          </Center>
        ) : (
          <>
            <Flex direction={'column'} gap={'24px'}>
              <TeamTable data={TEAMS_DATA} refetch={refetch} />
            </Flex>
          </>
        )}
      </DrawerBody>
    </>
  );
};
