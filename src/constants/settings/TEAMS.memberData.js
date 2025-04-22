import {Image, Flex} from '@chakra-ui/react';
import React from 'react';
import femaleImg from '../../images/avatar.svg';
import {TeamsMenu} from '../../pages/settings/teams/teamDetails/menu';

export const TEAMS_DATA = [
  {
    id: 1,
    image: femaleImg,
    name: 'Mary Jane',
    role: 'Developer Support',
  },
  {
    id: 2,
    image: femaleImg,
    name: 'Mary Jane',
    role: 'Developer Support',
  },
  {
    id: 3,
    image: femaleImg,
    name: 'Mary Jane',
    role: 'Developer Support',
  },
  {
    id: 4,
    image: femaleImg,
    name: 'Mary Jane',
    role: 'Developer Support',
  },
  {
    id: 5,
    image: femaleImg,
    name: 'Mary Jane',
    role: 'Developer Support',
  },
];

export const TEAMS_COLUMNS_DATA = [
  // {
  //   Header: 'No.',
  //   accessor: 'id',
  // },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Phone Number',
    accessor: 'phone_number',
  },
  {
    Header: 'Role',
    accessor: 'role',
  },
  {
    Header: ' ',
    accessor: row => {
      return (
        <Flex justify={'flex-end'}>
          <TeamsMenu />
        </Flex>
      );
    },
  },
];
