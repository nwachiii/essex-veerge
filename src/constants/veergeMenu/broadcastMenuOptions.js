import groupIcon from '/src/images/icons/group-user.svg';
import genderIcon from '/src/images/icons/gender-icon.svg';
import incomeIcon from '/src/images/icons/income-icon.svg';
import calendarIcon from '/src/images/icons/calendar-icon.svg';
import locationIcon from '/src/images/icons/location-icon.svg';
import clientTypeIcon from '/src/images/icons/client-icon.svg';
import propertyIcon from '/src/images/icons/property.svg';
import {TabComponentForBroadcast} from '@/components/Drawers/broadcastDrawer/screens/TabComponentForBroadcast';

export const menuOptions = [
  {label: 'Everyone', leftIcon: groupIcon},
  {
    label: 'Client Type',
    leftIcon: clientTypeIcon,
    subOptions: [
      'With asset',
      'Without asset',
      'With fractional',
      'Defaulting',
      'Non-defaulting',
      'With outstanding',
      'Completed Payment',
    ],
  },
  //   {
  //     label: 'Date joined',
  //     leftIcon: calendarIcon,
  //     subOptions: ['A month ago', '2-6 months ago', 'A year ago', '2-5 years ago'],
  //   },
];

export const broadcastTabs = [
  {
    tablist: 'Email',
    component: tabProps => (
      <TabComponentForBroadcast {...tabProps} channel={'email'} data={tabProps.emailHistory} />
    ),
  },
  {
    tablist: 'Push Notification',
    component: tabProps => (
      <TabComponentForBroadcast
        {...tabProps}
        channel={'push notification'}
        data={tabProps.notifHistory}
      />
    ),
  },
];
