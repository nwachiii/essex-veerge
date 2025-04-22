import Teams from '../../pages/settings/teams';
import Profile from '../../pages/settings/profile';
import Compliance from '../../pages/settings/compliance';
import Account from '../../pages/settings/account';

export const tabs = [
  {
    tablist: 'Profile',
    component: props => <Profile {...props} />,
  },
  {
    tablist: 'Teams',
    component: props => <Teams {...props} />,
  },
  {
    tablist: 'Compliance',
    component: props => <Compliance {...props} />,
  },
  {
    tablist: 'Account',
    component: props => <Account {...props} />,
  },
];
