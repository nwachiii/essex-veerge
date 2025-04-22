import React, {useState} from 'react';
import InviteATeamMember from '../components/InviteATeamMember';
import InviteSuccesful from '../components/InviteIsSuccesful';

const InviteTeamMemberScreens = ({
  handleClose,
  pendingListLength,
  customScrollbarStyles,
  refetch,
  handleScreen,
}) => {
  const [screen, setScreen] = useState('invite');
  const [email, setEmail] = useState('');
  const handleInviteScreens = screen => () => setScreen(screen);

  const displayAddTeamMemberScreens = key => {
    switch (key) {
      case 'invite':
        return (
          <InviteATeamMember
            refetch={refetch}
            pendingListLength={pendingListLength}
            customScrollbarStyles={customScrollbarStyles}
            handleInviteScreens={handleInviteScreens}
          />
        );
        break;
      case 'inviteSuccessful':
        return <InviteSuccesful email={email} handleScreen={handleScreen} />;
        break;

      default:
        return (
          <InviteATeamMember
            refetch={refetch}
            historyLength={pendingListLength}
            customScrollbarStyles={customScrollbarStyles}
            handleInviteScreens={handleInviteScreens}
          />
        );

        break;
    }
  };
  return displayAddTeamMemberScreens(screen);
};

export default InviteTeamMemberScreens;
