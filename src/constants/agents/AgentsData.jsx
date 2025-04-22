import avatar from '/src/images/avatar.svg';
import {HStack, Text} from '@chakra-ui/react';
import React from 'react';
import AgentsNameDrawer from './AgentsNameDrawer';
import ActionAgentDrawer from './ActionAgentDrawer';

export const AGENTS_COLUMN = [
  {
    Header: 'Name',
    accessor: row => {
      return <AgentsNameDrawer row={row} />;
    },
  },
  {
    Header: 'Units Sold',
    accessor: row => row?.listings_sold ?? '0',
  },

  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'Email',
    accessor: row => (
      <HStack maxW="250px" justify="flex-start">
        <Text
          as="span"
          maxW="250px"
          fontSize="14px"
          wordWrap="break-word"
          whiteSpace="break-spaces"
          textAlign="left"
          fontWeight="400"
          color={'#4545FE'}
        >
          <a style={{background: '', width: '150px'}} href={`mailto:${row?.email}`}>
            {row?.email}
          </a>
        </Text>
      </HStack>
    ),
  },
  {
    Header: 'Date Added',
    accessor: 'sign_up_time',
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return <ActionAgentDrawer row={row} />;
    },
  },
];
export default AGENTS_COLUMN;