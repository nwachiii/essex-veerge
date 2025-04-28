import basketBall from 'images/resident-profile/basketBall.svg';
import vehicle from 'images/resident-profile/vehicle.svg';
import clubHouse from 'images/resident-profile/clubHouse.svg';
import poolParty from 'images/resident-profile/poolParty.svg';
import pet from 'images/resident-profile/pet.svg';
import ppt1 from 'images/resident-profile/ppt1.png';
import ppt2 from 'images/resident-profile/ppt2.png';
import ppt3 from 'images/resident-profile/ppt3.png';

export const portfolio = [
  {
    image: ppt1.src,
    name: '12-D',
    type: 'Oak Ridge',
    tag: 'Owner-Occupied',
    color: 'green',
    balanceColor: 'black',
    balance: '-$800.00(credit)',
    openRequest: '1',
    violation: '0',
  },
  {
    image: ppt2.src,
    name: 'D23',
    type: 'Haven Estate',
    tag: 'Tenant-As Landlord',
    color: 'purple',
    balanceColor: 'red',
    balance: '$200.00(due)',
    openRequest: '0',
    violation: '1',
  },
  {
    image: ppt3.src,
    name: '3 Bedroom',
    type: 'Astrid 2.0',
    tag: 'Owner',
    color: 'green',
    balanceColor: 'black',
    balance: '$0.00',
    openRequest: '2',
    violation: '0',
  },
];

export const requestOrWorkOrder = [
  {
    name: 'Leaking Faucet',
    tag: 'In Progress',
    tagColor: '#92310A',
    tagBg: '#FFF7ED',
    ppt: '12-B',
    firstText: 'WO - 8831',
    secondText: 'SLA 2 hours',
  },
  {
    name: 'Patio Cover',
    tag: 'Committee vote',
    tagColor: '#3737D1',
    tagBg: '#EEF4FF',
    ppt: '14-D',
    firstText: 'WO - 8357',
    secondText: 'SLA 12 Days',
  },
];
export const violation = [
  {
    name: 'Trash Can',
    tag: 'Cured',
    tagColor: '#116932',
    tagBg: '#F0FDF4',
    ppt: '14-D',
    firstText: 'V - 1432',
    secondText: '20 APR',
  },
  {
    name: 'Late Night Noise',
    tag: 'Fined',
    tagColor: '#991919',
    tagBg: '#FEF2F2',
    ppt: '14-D',
    firstText: 'V - 1425',
    secondText: '22 APR',
  },
];
export const upcomingReserve = [
  {
    icon: basketBall.src,
    name: 'Tennis Court #12',
    tagColor: '#13618F',
    tagLeftColor: '#64C6FF',
    tagBg: 'rgba(100, 198, 255, 0.10)',
    month: 'APRIL',
    day: '22',
    firstText: 'Aspen Row, Wisteria Lane',
    secondText: '06:00PM - 07:00PM',
  },
  {
    icon: clubHouse.src,
    name: 'Clubhouse',
    tagColor: '#20751E',
    tagLeftColor: '#06D001',
    tagBg: 'rgba(6, 208, 1, 0.10)',
    month: 'MAY',
    day: '03',
    firstText: 'Pine Grove, Elm Street',
    secondText: '04:00PM - 09:00PM',
  },
  {
    icon: poolParty.src,
    name: 'Pool Party Zone',
    tagColor: '#92310A',
    tagLeftColor: '#F97316',
    tagBg: '#FFEDD5',
    month: 'MAY',
    day: '05',
    firstText: 'Pine Grove, Elm  Street',
    secondText: '01:00PM - 03:00PM',
  },
];

export const documents = [
  {
    name: 'Lease',
    ppt: '14-D',
    firstText: 'Expiration 21 Dec, 2025',
  },
  {
    name: 'HO-6 policy',
    ppt: '12-B',
    firstText: 'Expiration 30 Jun, 2025',
  },
];
export const KYC = [
  {
    name: 'Driver’s License',
    ppt: '14-D',
    firstText: 'Expiration 10 Jan, 2028',
  },
  {
    name: 'International Passport',
    ppt: '12-B',
    firstText: 'Expiration 15 May, 2029',
  },
];
export const pets = [
  {
    icon: pet.src,
    name: 'Pet',
    ppt: '14-D',
    firstText: '1 dog (Labrador)',
  },
  {
    icon: vehicle.src,
    name: 'Vehicles',
    ppt: '12-B',
    firstText: '8JQK321',
  },
  {
    icon: vehicle.src,
    name: 'Vehicles',
    ppt: '12-B',
    firstText: 'TXM 4827',
  },
];
export const board = [
  {
    name: 'Treasurer',
    ppt: 'Oak Ridge',
    firstText: 'Term End 21 Dec, 2026',
  },
  {
    name: 'ARC Member',
    ppt: 'Maple Glen',
    firstText: 'Term End 21 Dec, 2025',
  },
];
