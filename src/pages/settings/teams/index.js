import React from 'react';
import {ActionBar} from './actions/actionBar';
import {TeamTable} from './teamDetails/teamTable.jsx';
import {fetchDeveloperTeams, fetchRolesAccepted} from '../../../apis/settings.js';
import {AnimatedLoader} from '../../../components';
import {useQuery} from '@tanstack/react-query';
import {AbsoluteCenter, Box, Flex, VStack} from '@chakra-ui/react';

export const TEAMS_ROLES = {
  admin: 'Admin',
  director: 'Director',
  accountant: 'Accountant',
  front_desk: 'Front Desk',
  head_of_sales: 'Heads of Sales',
  finance_controller: 'Finance Controller',
};

export default function Teams() {
  const {data, isLoading, refetch} = useQuery(['fetchAcceptedRoles'], fetchRolesAccepted);

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
    <Box position="relative">
      {isLoading ? (
        <VStack position="relative" mt={{base: '15vh', '2xl': '10vh'}}>
          <AnimatedLoader />
        </VStack>
      ) : (
        <Flex direction={'column'} gap={'24px'}>
          <ActionBar refetch={refetch} />
          <TeamTable data={TEAMS_DATA} refetch={refetch} />
        </Flex>
      )}
    </Box>
  );
}
