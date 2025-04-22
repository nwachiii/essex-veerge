import React, {useState} from 'react';
import InviteATeamMember from '../components/InviteATeamMember';
import InviteSuccesful from '../components/InviteIsSuccesful';

// import InviteATeamMember from '../components/InviteATeamMember';
// import InviteSuccesful from '../components/inviteSuccesful';

export const InviteTeamMemberScreens = ({
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
            handleInviteScreens={setScreen}
            handleScreen={handleScreen}
            setEmail={setEmail}
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
            pendingListLength={pendingListLength}
            customScrollbarStyles={customScrollbarStyles}
            handleInviteScreens={setScreen}
            handleScreen={handleScreen}
            setEmail={setEmail}
          />
        );

        break;
    }
  };
  return displayAddTeamMemberScreens(screen);
};

export default InviteTeamMemberScreens;
