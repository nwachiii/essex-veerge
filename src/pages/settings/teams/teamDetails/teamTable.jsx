import React, {useState} from 'react';
import {Box, Flex, Text, HStack, Badge, Image, Link} from '@chakra-ui/react';
import {Container3} from '../../../../components/common/containers';
import {MatadorCustomTable} from '../../../../components/common/Table';
import {TeamsMenu} from './menu';
import {changeDateFormat} from '../../../../utils/formatDate';
import useLocalStorage from 'utils/useLocalStorage';
import {TEAMS_ROLES} from '..';

export const TeamTable = ({data, refetch}) => {
  const [user] = useLocalStorage('loggedinUser');

  const TEAM_COLUMNS = data => [
    {
      Header: 'Name',
      accessor: row => {
        return (
          console.log(row),
          (
            <HStack textAlign={'left'} spacing="11px">
              <Image
                alt=""
                height="48px"
                width="48px"
                borderRadius="100%"
                src={row?.img ?? defaultImage?.src}
              />
              <Text>{`${row?.name}`}</Text>
            </HStack>
          )
        );
      },
    },
    {
      Header: 'Role',
      accessor: row => {
        return (
          console.log(row),
          (
            <HStack textAlign={'left'} spacing="10px" width={{base: '100px', '2xl': 'unset'}}>
              <Text textTransform={'capitalize'} whiteSpace={'normal'}>
                {row?.role}
              </Text>
              {row?.email === user?.email ? (
                <Box
                  borderRadius={'12px'}
                  border={'1px solid #1919D8'}
                  color={'#1919D8'}
                  px={'10px'}
                  py={'5px'}
                  fontSize={'12px'}
                  fontWeight={'600px'}
                >
                  You
                </Box>
              ) : null}
            </HStack>
          )
        );
      },
    },
    {
      Header: 'Email Address',
      accessor: row => {
        return (
          <Link href={row?.email === user?.email ? null : `mailto:${row?.email}`}>
            <Text color={'#4545FE'} width={{base: '100px', '2xl': 'unset'}} whiteSpace={'normal'}>
              {row?.email}
            </Text>
          </Link>
        );
      },
    },
    {
      Header: 'Recent Activity',
      accessor: row => {
        return (
          console.log(row),
          (
            <HStack textAlign={'left'} spacing="10px">
              {row?.email !== user?.email && (
                <Text textTransform={'capitalize'}>
                  {changeDateFormat(row?.recent_activity, 'add_time')}
                </Text>
              )}
              {row?.role !== TEAMS_ROLES.admin.toLowerCase()
                ? user?.role === TEAMS_ROLES.admin.toLowerCase() && (
                    <Flex justify={'flex-end'}>
                      <TeamsMenu id={row['id']} refetch={refetch} />
                    </Flex>
                  )
                : null}
            </HStack>
          )
        );
      },
    },
  ];

  return (
    <Box>
      {data ? (
        <MatadorCustomTable
          maxW="1280px"
          minW="100%"
          headerSpace="evenly"
          COLUMNS={TEAM_COLUMNS(data)}
          DATA={data}
        />
      ) : null}
    </Box>
  );
};
export default TeamTable;
