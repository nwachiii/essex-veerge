import React, {useState} from 'react';
import InviteATeamMember from '../components/InviteATeamMember';
import InviteSuccesful from '../components/InviteIsSuccesful';
import ListOfPendingInvites from '../components/PendingInviteslist';
import CancelInvite from '../components/shouldcancelInvite';

export const PendingInvitesScreens = ({
  handleClose,
  pendingList,
  customScrollbarStyles,
  refetch,
  isLoading,
  handleScreen,
}) => {
  const [screen, setScreen] = useState('pendingInvites');
  const [id, setId] = useState('');

  const displayPendingInviteScreen = key => {
    switch (key) {
      case 'pendingInvites':
        return (
          <ListOfPendingInvites
            pendingList={pendingList}
            isLoading={isLoading}
            setPendingInviteId={setId}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            handlePendingInviteScreens={setScreen}
          />
        );
        break;
      case 'cancelInvite':
        return <CancelInvite refetch={refetch} id={id} handlePendingInviteScreens={setScreen} />;
        break;

      default:
        return (
          <ListOfPendingInvites
            pendingList={pendingList}
            isLoading={isLoading}
            setPendingInviteId={setId}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            handlePendingInviteScreens={setScreen}
          />
        );

        break;
    }
  };
  return displayPendingInviteScreen(screen);
};

export default PendingInvitesScreens;
