import Account from '../pages/account';
import Dashboard from '../pages/dashboard';
import ManageListing from '../pages/customers';
// import ManageCustomers from '../pages/users';
import Request from '../pages/request';
import users_icon from '/src/images/icons/contact_icon.svg';
import users_icon_dark from '/src/images/icons/users_icon_dark.svg';
import listing_icon from '/src/images/icons/listings_icon.png';
import listing_icon_dark from '/src/images/icons/listings_icon_dark.svg';
import account_icon from '/src/images/icons/account.svg';
import account_icon_dark from '/src/images/icons/account_icon_dark.svg';
import request_icon from '/src/images/icons/request_icon.svg';
import request_icon_dark from '/src/images/icons/request_icon_dark.svg';
import dashboard_icon from '/src/images/icons/dashboard_icon.svg';
import dashboard_icon_dark from '/src/images/icons/dashboard_icon_dark.svg';
import settings_icon from '/src/images/icons/Iconly/Light/Setting.svg';
import settings_icon_dark from '/src/images/icons/settings_icon_dark.svg';
import communitiesIcon_light from '/src/images/layoutNavigationIcons/layoutIconCommunutiesLight.svg';
import communitiesIcon_dark from '/src/images/layoutNavigationIcons/layputIconCommunitiesDark.svg';
import residentIcon_light from '/src/images/layoutNavigationIcons/layoutIconResidentsLight.svg';
import residentIcon_dark from '/src/images/layoutNavigationIcons/layoutIconResidentDark.svg';
import requestIcon_light from '/src/images/layoutNavigationIcons/layoutIconRequestlight.svg';
import requestIcon_dark from '/src/images/layoutNavigationIcons/layoutIconRequestDark.svg';
import violationIcon_light from '/src/images/layoutNavigationIcons/layoutIconViolationLight.svg';
import violationIcon_dark from '/src/images/layoutNavigationIcons/layoutIconViolationDark.svg';

import ManageCustomers from 'pages/residents';

export const dashboardTabs = [
  // {
  //   linkText: 'Dashboard',
  //   iconSrc: dashboard_icon,
  //   component: <Dashboard />,
  //   dark_iconSrc: dashboard_icon_dark,
  // },
  {
    linkText: 'Account',
    iconSrc: account_icon,
    component: <Account />,
    dark_iconSrc: account_icon_dark,
  },
  {
    linkText: 'Communities',
    iconSrc: communitiesIcon_light,
    component: <ManageListing />,
    dark_iconSrc: communitiesIcon_dark,
  },
  {
    linkText: 'Residents',
    iconSrc: residentIcon_light,
    dark_iconSrc: residentIcon_dark,
    component: <ManageCustomers />,
  },
  {
    linkText: 'Request',
    iconSrc: requestIcon_light,
    component: <Request />,
    dark_iconSrc: requestIcon_dark,
  },
  {
    linkText: 'Violations',
    iconSrc: violationIcon_light,
    component: <Request />,
    dark_iconSrc: violationIcon_dark,
  },
];
