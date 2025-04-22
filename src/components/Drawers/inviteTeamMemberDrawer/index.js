import React, {useState} from 'react';
import {
  Box,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  useToast,
  DrawerContent,
  VStack,
  Button,
} from '@chakra-ui/react';
import plusIconInviteMemberIcon from '/src/images/icons/plusIconInviteMemberIcon.svg';

import PendingInvitesScreens from './screens/PendingInvitesScreens';
import InviteTeamMemberScreens from './screens/InviteTeamMemberScreens';
import {fetchRolesPending} from '../../../apis/settings';
import {useQuery} from '@tanstack/react-query';
import {toastForError} from '../../../utils/toastForErrors';
import {AiOutlinePlus} from 'react-icons/ai';

export const InviteTeamMemberDrawer = ({refetchTeamTab, children}) => {
  const drawerDisclosure = useDisclosure();

  const [screen, setScreen] = useState('inviteToTeam');
  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#e1e1e1',
    },
  };

  const {data, isError, isLoading, error, refetch} = useQuery(
    ['fetchDeveloperRoles'],
    fetchRolesPending
  );
  const toast = useToast();

  toastForError(error, isError, toast);

  const handleScreen = screen => () => setScreen(screen);

  const handleClose = () => {
    setScreen('inviteToTeam');
    return drawerDisclosure.onClose();
  };

  const displayInvites = key => {
    switch (key) {
      case 'inviteToTeam':
        return (
          <InviteTeamMemberScreens
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            refetch={refetch}
            pendingListLength={data?.data?.results?.length}
          />
        );
      case 'pendinginvites':
        return (
          <PendingInvitesScreens
            refetch={refetch}
            isLoading={isLoading}
            refetchTeamTab={refetchTeamTab}
            pendingList={data?.data?.results}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
          />
        );

      default:
        return (
          <InviteTeamMemberScreens
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            refetch={refetch}
            pendingListLength={data?.data?.results?.length}
          />
        );
    }
  };
  return (
    <>
      {children ? (
        <Box as="span" cursor="pointer" onClick={drawerDisclosure.onOpen}>
          {children}
        </Box>
      ) : (
        <Button
          mt="0px"
          // leftIcon={<Image src={plusIconInviteMemberIcon.src} alt="plus icon" />}
          leftIcon={<AiOutlinePlus fontSize={'20px'} />}
          onClick={drawerDisclosure.onOpen}
          width={'fit-content'}
          p="20px"
          h="41px"
          color="#fff"
          bg="#191919"
          borderRadius="12px"
          _hover={{
            opacity: 1,
          }}
          fontWeight={400}
        >
          Invite New Member
        </Button>
      )}
      <Drawer isOpen={drawerDisclosure.isOpen} onClose={handleClose} borderRadius="16px" size="sm">
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          position="relative"
          zIndex={100}
          mt="65.12px"
          // mt="112.12px"

          // minW="400px"
          maxW="400px"
          bg="#fff"
          p="0px"
        >
          {displayInvites(screen)}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default InviteTeamMemberDrawer;
