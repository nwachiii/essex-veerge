import Account from '../pages/account';
import Dashboard from '../pages/dashboard';
import ManageListing from '../pages/communities';
import ManageCustomers from '../pages/users';
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
import Settings from 'pages/settings';

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
    iconSrc: listing_icon,
    component: <ManageListing />,
    dark_iconSrc: listing_icon_dark,
  },
  {
    linkText: 'Residents',
    iconSrc: users_icon,
    dark_iconSrc: users_icon_dark,
    component: <ManageCustomers />,
  },
  {
    linkText: 'Request',
    iconSrc: request_icon,
    component: <Request />,
    dark_iconSrc: request_icon_dark,
  },
  {
    linkText: 'Violations',
    iconSrc: settings_icon,
    component: <Request />,
    dark_iconSrc: settings_icon_dark,
  },
];
